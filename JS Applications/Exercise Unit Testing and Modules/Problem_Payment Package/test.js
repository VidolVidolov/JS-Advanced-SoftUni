let PaymentPackage = require('./PaymentPackage.js');
let { assert } = require('chai');


describe('PaymentPackage', () => {
    describe('overall', () => {
        it('should have all properties', () => {
            let instance = new PaymentPackage('smt', 5);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('name'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('value'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('VAT'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('active'), true);

        });
    });

    describe('constructor', () => {
        it('should create instance of the class correctly', () => {
            let instance = new PaymentPackage('name', 584);
            assert.deepEqual(instance, new PaymentPackage('name', 584));
        });
    });

    describe('prop name', () => {

        it('should throw an error when trying to set a empty string', () => {
            assert.throw(() => {
                new PaymentPackage('', 584);
            }, 'Name must be a non-empty string');
        });

        it('should throw an error when trying to set not a stirng as a name', () => {
            assert.throw(() => {
                new PaymentPackage(546, 584);
            }, 'Name must be a non-empty string');
        });

        it('should get the correct value', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.name, 'test');
        });

        it('should change the value of the name correctly', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.name = 'newName', 'newName');
        });
    });

    describe('prop value', () => {

        it('should throw an error when trying to set negative number to value prop', () => {
            assert.throw(() => {
                new PaymentPackage('Pesho', -584);
            }, 'Value must be a non-negative number');
        });

        it('should throw an error when trying to set not a number to value prop', () => {
            assert.throw(() => {
                new PaymentPackage('Pesho', 'a');
            }, 'Value must be a non-negative number');
        });

        it('should get the correct value', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.value, 1);
        });

        it('should change the value of the value prop correctly', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.value = 19, 19);
        });
    });

    describe('prop VAT', () => {

        it('should throw an error when trying to set negative number to VAT prop', () => {
            assert.throw(() => {
                let instance = new PaymentPackage('Pesho', 55);
                instance.VAT = -5;
            }, 'VAT must be a non-negative number');
        });

        it('should throw an error when trying to set not a number to VAT prop', () => {
            assert.throw(() => {
                let instance = new PaymentPackage('Pesho', 55);
                instance.VAT = 'asd';
            }, 'VAT must be a non-negative number');
        });

        it('should get the correct value', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.VAT, 20);
        });

        it('should change the value of the VAT correctly', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.VAT = 19, 19);
        });
    });

    describe('prop active', () => {

        it('should throw an error when trying to pass not a boolean to active prop', () => {
            assert.throw(() => {
                let instance = new PaymentPackage('Pesho', 55);
                instance.active = 'asd';
            }, 'Active status must be a boolean');
        });

        it('should get the correct value', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.active, true);
        });

        it('should change the value of the active prop correctly', () => {
            let newObj = new PaymentPackage('test', 1);
            assert.equal(newObj.active = false, false);
        });
    });

    describe('mehtod toString', () => {

        it('toString should return string containing overview of an instance if ACTIVE', () => {
            let instance = new PaymentPackage('Pesho', 55);
            instance.VAT = 0;
            const output = 'Package: Pesho\n- Value (excl. VAT): 55\n- Value (VAT 0%): 55';
            assert.equal(output, instance.toString());
        });

        it('toString should return string containing overview of an instance if ACTIVE', () => {
            let instance = new PaymentPackage('Pesho', 0);
            instance.VAT = 0;
            const output = 'Package: Pesho\n- Value (excl. VAT): 0\n- Value (VAT 0%): 0';
            assert.equal(output, instance.toString());
        });

        it('toString should return string containing overview of an instance if ACTIVE', () => {
            let instance = new PaymentPackage('Pesho', 55);
            const output = 'Package: Pesho\n- Value (excl. VAT): 55\n- Value (VAT 20%): 66';
            assert.equal(output, instance.toString());
        });

        it('toString should return string containing overview of an instance if NOT ACTIVE', () => {
            let instance = new PaymentPackage('Pesho', 55);
            instance.active = false;
            const output = `Package: Pesho (inactive)\n- Value (excl. VAT): 55\n- Value (VAT 20%): 66`;
            assert.equal(output , instance.toString());
        });
    });
});

