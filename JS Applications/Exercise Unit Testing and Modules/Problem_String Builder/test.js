let StringBuilder = require('./string-builder.js');
let { assert, should } = require('chai');



describe('Stringbuilder', () => {

    function compareArray(source, expected) {
        assert.equal(source.length, expected.length);
        for (let i = 0; i < source.length; i++) {
            assert.equal(source[i], expected[i]);
        }
    }
    let instance;
    beforeEach(() => {
        instance = new StringBuilder();
    });

    describe('constructor', () => {
        it('should work properly with given argument', () => {
            instance = new StringBuilder('hello');
            assert.equal(instance.toString(), instance);
        });

        it('should work properly with no argument', () => {
            assert.equal(instance.toString(), []);
        });

        it('must initialize data to a string array', function () {
            instance = new StringBuilder('hello');
            assert.equal(instance._stringArray instanceof Array, true);
            compareArray(instance._stringArray, Array.from('hello'));
        });
    });

    describe('Class has all the properties', () => {

        it('should have _stringArray', function () {
            assert.equal(instance.hasOwnProperty('_stringArray'), true);
        });
        it('should have append method', () => {
            let expect = true;
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('append'), expect);
        });
        it('should have prepend method', () => {
            let expect = true;
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('prepend'), expect);
        });
        it('should have append insertAt', () => {
            let expect = true;
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('insertAt'), expect);
        });
        it('should have append remove', () => {
            let expect = true;
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('remove'), expect);
        });
        it('should have append toString', () => {
            let expect = true;
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('toString'), expect);
        });
    })
    describe('testing veryfyParam private method', () => {
        it('should throw an error with message', () => {
            assert.throw(() => {
                instance = new StringBuilder(5);
            }, 'Argument must be string');
        })
    });


    describe('append', () => {
        it('should work properly with given argument', () => {
            instance.append('hel');
            instance.append('lo');
            assert.equal(instance.toString(), 'hello');
        });

        it('should throw an error when trying to pass not a string in append', () => {
            assert.throw(() => {
                instance.append({});
            }, 'Argument must be string');
        });

        it('inserts correctly', () => {
            instance = new StringBuilder('hello');
            let str = 'kek';
            instance.insertAt(str, 3);
            let expected = Array.from('hello');
            expected.splice(3, 0, ...str);
            compareArray(instance._stringArray, 'helkeklo');
        });

    });

    describe('prepend', () => {
        it('should work properly with given argument', () => {
            instance.prepend('lo');
            instance.prepend('hel');
            assert.equal(instance.toString(), 'hello');
        });

        it('should throw an error when trying to pass not a string in prepend', () => {
            assert.throw(() => {
                instance.prepend({});
            }, 'Argument must be string');
        });
    });

    describe('insertAt', () => {
        it('method insertAt should work properly with given argument', () => {
            instance.append('Hello');
            instance.insertAt(' SoftUni!', 5)
            assert.equal(instance.toString(), 'Hello SoftUni!');
        });

        it('method insertAt should work properly with given argument', () => {
            instance.append('Heo');
            instance.insertAt('ll', 2)
            assert.equal(instance.toString(), 'Hello');
        });

        it('should throw an error when trying to pass not a string as first param in insertAt', () => {
            assert.throw(() => {
                instance.append('Heo');
                instance.insertAt(2, 2)
            }, 'Argument must be string');
        });

        it('invalid insertAt parameter', () => {
            assert.throw(() => {
                instance.insertAt(5, 1)
            });
        });

    });

    describe('remove', () => {
        it('method reove should work properly with given argument', () => {
            instance.append('Hello');
            instance.remove(4, 1);
            assert.equal(instance.toString(), 'Hell');
        });

        it('method remove should work properly with given argument', () => {
            instance.append('Just tesing');
            instance.remove(4, 4);
            assert.equal(instance.toString(), 'Justing');
        });

    });

    describe('toString', () => {
        it('should return the initial string passed to the constrictor', () => {
            instance = new StringBuilder('hello');
            assert.equal(instance.toString(), 'hello');
        });
    });

    describe('toString', () => {
        it('should return the initial string passed to the constrictor', () => {
            instance = new StringBuilder('hello');
            assert.equal(instance.toString(), 'hello');
        });

        it('should throw an error when trying to pass not a string as first param in insertAt', () => {
            assert.throw(() => {
                instance = new StringBuilder([]);
            }, 'Argument must be string');
        });
    });
})