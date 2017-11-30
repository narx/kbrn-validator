'use strict';

var expect = require('chai').expect;
var kbrnValidator = require('../../src/kbrn-validator');

describe('오류 테스트', function(){
    var kbrn = "111-11-11111";
    var expected = false;
    var actual = kbrnValidator(kbrn).valid;
    it('사업자번호 ' + kbrn + ' 잘못된 사업자번호', function(){
        expect(actual).to.equal(expected);
    })
})
describe('패스 테스트', function(){
    var kbrn = "3048700790";
    var expected = true;
    var actual = kbrnValidator(kbrn).valid;
    var type = kbrnValidator(kbrn).information.type;
    it('사업자번호 ' + kbrn + ' 올바른 ['+type +'] 사업자번호 ', function(){
        expect(actual).to.equal(expected);
    })
})