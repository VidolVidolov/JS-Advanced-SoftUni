let isOddOrEven = require('./evenOrOdd.js');
let {assert} = require('chai'); // използвам дистръкчъринг синтаксис за по - малко писане, еквивалентно на let assert = require('chai').assert;

describe('Checking the lenght of a string if it is even or odd', () => {
    it('should return undefined if the onput is not a string', () => {
        assert.equal(isOddOrEven(5), undefined);
    });

    it('should return even if the length of the word is divisible by 2', () => {
        assert.equal(isOddOrEven('test'), 'even');
    });

    it('should return odd if the length of the word is not divisible by 2', () => {
        assert.equal(isOddOrEven('test1'), 'odd');
    });
})