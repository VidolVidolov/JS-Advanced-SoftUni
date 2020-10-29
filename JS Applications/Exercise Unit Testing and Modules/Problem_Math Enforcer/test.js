let mathEnforcer= require('./mathEnforcer.js'); // its not working with distructuring syntax in judje so thats why im using the normal way
let { assert } = require('chai');

describe('Testing the module given from the file above', () => {
    describe('Testing the functionality of the addFive function', () => {
        it('Should return undefined if the given parameter is not a number', () => {
            assert.equal(mathEnforcer.addFive('asd'), undefined);
        });

        it('Should return correct output if the given parameter is number', () => {
            assert.equal(mathEnforcer.addFive(5), 10);
        });

        it('Should return correct output if the given parameter is negative number', () => {
            assert.equal(mathEnforcer.addFive(-5), 0);
        });

        it('Should return correct output if the given parameter is floating point number', () => {
            assert.equal(mathEnforcer.addFive(5.4), 10.4);
        });
    });

    describe('Testing the functionality of the subtractTen function', () => {
        it('Should return undefined if the given parameter is not a number', () => {
            assert.equal(mathEnforcer.subtractTen('asd'), undefined);
        });

        it('Should return correct output if the given parameter is number', () => {
            assert.equal(mathEnforcer.subtractTen(10), 0);
        });

        it('Should return correct output if the given parameter is negative number', () => {
            assert.equal(mathEnforcer.subtractTen(-10), -20);
        });

        it('Should return correct output if the given parameter is floating point number', () => {
            assert.equal(mathEnforcer.subtractTen(15.4), 5.4);
        });
    });

    describe('Testing the functionality of the sum function', () => {
        it('Should return undefined if the given FIRST parameter is not a number', () => {
            assert.equal(mathEnforcer.sum('asd', 5), undefined);
        });

        it('Should return undefined if the given SECOND parameter is not a number', () => {
            assert.equal(mathEnforcer.sum(5, 'asd'), undefined);
        });

        it('Should return correct output if the given parameters are numbers', () => {
            assert.equal(mathEnforcer.sum(10, 5), 15);
        });

        it('Should return correct output if the given parameter is negative number', () => {
            assert.equal(mathEnforcer.sum(-10, -5), -15);
        });

        it('Should return correct output if the given parameter is floating point number', () => {
            assert.equal(mathEnforcer.sum(15.4, 4.6), 20);
        });
    });
});
