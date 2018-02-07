'use strict';

var kbrn = require('../index.js');

if (process.argv.length < 3) {
    console.log('사업자번호를 입력해주세요.');
    console.log('예) node ./bin/test 11111111');
    process.exit();
}
var args = process.argv.slice(2);

var testNumber = args[0];

var result = kbrn.validate(testNumber);

if (result.valid) {
    console.log('입력하신 [' + testNumber + ']는 정상적인 사업자번호입니다.');
}
else {
    console.log('입력하신 [' + testNumber + ']는 잘못된 사업자번호입니다.');
    console.log('사유: '+result.message);
}
