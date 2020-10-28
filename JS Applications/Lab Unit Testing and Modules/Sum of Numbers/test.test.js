const sum = require('./index');
let assert = require('chai').assert;

describe('Testing functionality of the sum function', function () {

    it('should return correct ouput', function () {
        let arr = [1, 2, 3];
        let result = sum(arr);
        assert.equal(result, 6);
    });

    it('should retrun NaN as ouput', function () {
        let arr = ['dasd', 2, 3];
        assert.equal(JSON.stringify(sum(arr)) == JSON.stringify(NaN), true);
    });
    it('should work with negative numbers', function () {
        let arr = [-8, -2, -3];
        let result = sum(arr);
        assert.equal(result, -13);
    });
    it('should work with string numbers', function () {
        let arr = ['-8', '-2', '-3'];
        let result = sum(arr);
        assert.equal(result, -13);
    });
})