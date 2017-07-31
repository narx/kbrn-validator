'use strict';

function validateResult(isValid, message, information){
    return {isValid: isValid, mesage: message, information: information}
}

function kbrnValidate(param) {
    
    // 1. 트림
    var kbrn = String(param).trim();
    
    // 2. 대쉬 제거
    kbrn = kbrn.replace(/-/gi, '');

    // 3. 숫자 여부 확인
    if (kbrn.replace(/[0-9]/g, '').length !== 0){
        // 숫자아님 오류
        return validateResult(false, '문자가 포함되어있습니다.')
    }

    // 4. 자리수 확인
    if (kbrn.length !== 10) {
        // 사업자번호 자리수 오류
        return validateResult(false, '자리수가 맞지 않습니다.');
    }

    console.log('kbrn', kbrn);

    // 5. 검증로직 확인
    var validationNumbers = [1,3,7,1,3,7,1,3,5];
    var sum = 0;
    validationNumbers.forEach(function(num, index){
        sum += num * parseInt(kbrn[index]);
    });
    sum += Math.floor(parseInt(kbrn[8]) * 5 / 10);
    
    var isValid = (10 - (sum % 10)) === parseInt(kbrn[9]);

    if (isValid === false) {
        return validateResult(false, '잘못된 사업자번호 입니다.');
    }

    // 6. 올바른 사업자번호의 경우 사업자 메타데이터 제공
    var information = getInformation(kbrn);
    console.log('information', information);
    return validateResult(true, '올바른 사업자번호입니다.', information);
}

function getInformation(param){

    var taxOfficeCode = param.substring(0,3);
    var typeCode = parseInt(param.substring(3,5));
    var type;
    var detailType;
    var isTaxFree;

    if (checkInRange(typeCode, 1, 79)){
        type = '개인';
        detailType = '개인과세자';
        isTaxFree = false;
    }
    else if (checkInRange(typeCode, 90, 99)){
        type = '개인';
        detailType = '개인면세사업자';
        isTaxFree = true;
    }
    else if (typeCode == 89){
        type = '개인';
        detailType = '법인이 아닌 종교단체';
        isTaxFree = true;
    }
    else if (typeCode == 80){
        type = '개인';
        detailType = '기타 개인 및 다단계판매업자';
        isTaxFree = true;
    }
    else if (checkContain(typeCode, [81, 86, 87])){
        type = '법인';
        detailType = '영리법인의 본점';
        isTaxFree = false;
    }
    else if (typeCode == 82){
        type = '법인';
        detailType = '비영리법인의 본점 및 지점';
        isTaxFree = true;
    }
    else if (typeCode == 83){
        type = '법인';
        detailType = '국가, 지방자치단체, 지방자치단체조합';
        isTaxFree = true;
    }
    else if (typeCode == 84){
        type = '법인';
        detailType = '외국법인의 본점, 지점 및 연락사무소';
        isTaxFree = false;
    }
    else if (typeCode == 85){
        type = '법인';
        detailType = '영리법인의 지점';
        isTaxFree = false;
    }

    
    return {
        taxOfficeCode: String(taxOfficeCode),
        typeCode: String(typeCode),
        type: type,
        detailType: detailType,
        isTaxFree : isTaxFree,
        taxType: isTaxFree ? '면세' : '과세'
    }

    // 범위 체크
    function checkInRange(target, min, max) {
        return (target >= min && target <= max);
    }

    // 포함 체크
    function checkContain(target, array) {
        return array.indexOf(target) !== -1;
    }
}

module.exports = kbrnValidate;