let isSymmetric = require('./checkForSymmetry.js');
let { assert } = require('chai');

describe('Checking for Symmetry', function () {
    it('should return false if the param is not an array', () => {
        assert.equal(false, isSymmetric(''));
    });
    it('should return false if the param is not an array', () => {
        assert.equal(false, isSymmetric({}));
    });


    it('should return true if the array is symmetric', () => {
        assert.equal(true, isSymmetric([1,2,3,3,2,1]));
    });
    it('should return true if the array is symmetric with chars', () => {
        assert.equal(true, isSymmetric(['a','b','c','c','b','a']));
    });


    it('should return false if the array is not symmetric', () => {
        assert.equal(false, isSymmetric([1,2,3,1]));
    });
    it('should return false if the array is not symmetric', () => {
        assert.equal(false, isSymmetric([-1,2,3,1]));
    });


    it('should return false if the array contains not numbers', () => {
        assert.equal(false, isSymmetric(['a','b',3,1]));
    });


    it('should return true if the array\'s lenght is 0', () => {
        assert.equal(true, isSymmetric([]));
    });
    it('should return true if the array\'s lenght is 1', () => {
        assert.equal(true, isSymmetric([1]));
    });


    it('should return false if the input is string', () => {
        assert.equal(false, isSymmetric('aha'));
    });

    it('should return true if the array is mixed', () => {
        assert.equal(true, isSymmetric([5,'hi',{a:5},new Date(),{a:5},'hi',5]));
    });
})
