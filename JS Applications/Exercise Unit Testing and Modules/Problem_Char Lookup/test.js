let lookupChar = require('./charLookUp.js');
let {assert} = require('chai');

describe('Checking if the lookupChar function is working correctly and returning the expected outputs', () => {
    it('Should return undefined if the first parameter is not a string', () => {
        assert.equal(lookupChar(1,1), undefined);
    });

    it('Should return undefined if the second parameter is not a number', () => {
        assert.equal(lookupChar('Hello','a'), undefined);
    });

    it('Should return message if the index is out of bonds', () => {
        assert.equal(lookupChar('Hello', 5), 'Incorrect index');
    });

    it('Should return message if the index is out of bonds', () => {
        assert.equal(lookupChar('Hello', -1), 'Incorrect index');
    });
    
    it('Should return undefined if the index incorectly given', () => {
        assert.equal(lookupChar('Hello', 5.4), undefined);
    });

    it('Should return correct result if the first and second parameter are correct', () => {
        assert.equal(lookupChar('Hello', 1), 'e');
    });
})