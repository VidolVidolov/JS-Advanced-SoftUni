let Console = require('./C#Console.js');
let { assert } = require('chai');

// Warining writeLine method is static and it should be called ireclty from the class not with instance for those who dont know :)
describe('C# Cosnsole', () => {
    describe('writeLine', () => {
        it('should return the same string if a string is passed as input', () => {
            let output = Console.writeLine('hello');
            assert.equal('hello', output);
        });

        it('should return JSON string if the input is only an object', () => {
            let output = Console.writeLine({ name: 'Pesho' });
            assert.equal('{"name":"Pesho"}', output);
        });

        it('should throw an error if passed multiple args are passed but the first one is not a string', () => {
            assert.throw(() => {
                let output = Console.writeLine(5, 'hehe');
            }, 'No string format given!');
        });

        it('should throw an error if the number of parameters does not correspond to the number of placeholders in the template ', () => {
            assert.throw(() => {
                let output = Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7, 8);
            }, 'Incorrect amount of parameters given!');
        });

        it('should throw an error if the placeholders have indexes not withing the parameters range', () => {
            assert.throw(() => {
                let output = Console.writeLine("The sum of {0} and {13} is {2}", 3, 4, 7);
            }, 'Incorrect placeholders given!');
        });

        it('if input is correct given find all placeholders from the string and exchange them with the supplied parameters', () => {
            let output = Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7);
            let expected = 'The sum of 3 and 4 is 7';
            assert.equal(output, expected);
        });
    })
})