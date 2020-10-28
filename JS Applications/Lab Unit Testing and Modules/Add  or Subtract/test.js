let createCalculator = require('./AddOrSubstract');
let {assert} = require('chai');

describe('Checking the handling of the module', () => {
    let calc;

    beforeEach(function () {
        calc = createCalculator();
    });

    it('should return object', () => {
        assert.isObject(calc);
    });

    it('should return 0 when we get', () => {
        assert.equal(calc.get(), 0);
    });
    it('should return positive number when adding', () => {
        let input = 1;
        calc.add(input);
        assert.equal(calc.get(), 1);
    });
    it('should return negative number when substracting', () => {
        let input = 1;
        calc.subtract(input);
        assert.equal(calc.get(), -1);
    });

    it('should return 0 number when adding and substracting the same number', () => {
        let input = 1;
        calc.add(input);
        calc.subtract(input);
        assert.equal(calc.get(), 0);
    });
    it('should return the same number when adding and the input is string , aka the functions should parse numbers', () => {
        let input = '5';
        calc.add(input);
        assert.equal(calc.get(), 5);
    });

    it('should return correct number when operating with strings which should be parsed', () => {
        let input = '5';
        calc.add(input);
        calc.subtract(input);
        assert.equal(calc.get(), 0);
    });

    it('should return NaN when text is the input', () => {
        let input = 'text';
        calc.add(input);
        assert.equal(JSON.stringify(calc.get()), JSON.stringify(NaN));
    });
});