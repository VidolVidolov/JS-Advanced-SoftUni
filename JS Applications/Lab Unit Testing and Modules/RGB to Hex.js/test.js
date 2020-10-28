let rgbToHexColor = require('./RGB to Hex.js');
let { assert } = require('chai');


describe('Testing the innitial functionality of RGB Function aka valid input', () => {
    it('Should return undefined if the first param is int bigger than 255', () => {
        assert.equal(undefined, rgbToHexColor(256, 180, 180));
    });
    it('Should return undefined if the second param is int bigger than 255', () => {
        assert.equal(undefined, rgbToHexColor(150, 300, 180));
    });
    it('Should return undefined if the third param is int bigger than 255', () => {
        assert.equal(undefined, rgbToHexColor(180, 180, 300));
    });


    it('Should return undefined if the first param is int lower than 0', () => {
        assert.equal(undefined, rgbToHexColor(-1, 180, 180));
    });
    it('Should return undefined if the second param is int lower than 0', () => {
        assert.equal(undefined, rgbToHexColor(150, -8, 180));
    });
    it('Should return undefined if the third param is int lower than 0', () => {
        assert.equal(undefined, rgbToHexColor(180, 180, -9));
    });


    it('Should return undefined if the first param is not a number', () => {
        assert.equal(undefined, rgbToHexColor('a', 180, 180));
    });
    it('Should return undefined if the second param is not a number', () => {
        assert.equal(undefined, rgbToHexColor(180, 'a', 180));
    });
    it('Should return undefined if the third param is not a number', () => {
        assert.equal(undefined, rgbToHexColor(180, 180, 'a'));
    });


    it('Should return undefined if the first param is object', () => {
        assert.equal(undefined, rgbToHexColor({}, 180, 180));
    });
    it('Should return undefined if the second param is object', () => {
        assert.equal(undefined, rgbToHexColor(180, {}, 180));
    });
    it('Should return undefined if the third param is object', () => {
        assert.equal(undefined, rgbToHexColor(180, 180, {}));
    });


    it('Should return undefined if all params are negative', () => {
        assert.equal(undefined, rgbToHexColor(-1, -1, -1));
    });
});

describe('Testing the return functionality of RGB Function', () => {
    it('Should return correct output', () => {
        assert.equal('#FFFFFF', rgbToHexColor(255, 255, 255));
    });
    it('Should return correct output', () => {
        assert.equal('#636363', rgbToHexColor(99, 99, 99));
    });
    it('Should return correct output', () => {
        assert.equal('#9B9B9B', rgbToHexColor(155, 155, 155));
    });


    it('Should return correct output with triple 0', () => {
        assert.equal('#000000', rgbToHexColor(0, 0, 0));
    });
});