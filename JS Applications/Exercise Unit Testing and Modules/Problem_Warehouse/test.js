let Warehouse = require('./warehouse.js');
let { assert } = require('chai');


describe('Warehouse', () => {
    let instance;
    beforeEach(() => {
        instance = new Warehouse(25);
    })
    describe('check for all props', () => {
        it('should have all properties', () => {
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('capacity'), true);
            assert.equal(instance.hasOwnProperty('availableProducts'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('addProduct'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('orderProducts'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('occupiedCapacity'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('revision'), true);
            assert.equal(Object.getPrototypeOf(instance).hasOwnProperty('scrapeAProduct'), true);
        });
    });

    describe('constructor', () => {
        it('shuld throw a stirng if constructor gets negative number as input', () => {
            assert.throw(() => {
                let instance = new Warehouse(-5);
            }, 'Invalid given warehouse space');
        });

        it('shuld throw a stirng if constructor gets string as input', () => {
            assert.throw(() => {
                let instance = new Warehouse('asd');
            }, 'Invalid given warehouse space');
        });

        it('shuld throw a stirng if constructor gets NaN as input', () => {
            assert.throw(() => {
                let instance = new Warehouse(NaN);
            }, 'Invalid given warehouse space');
        });
        it('shuld throw a stirng if constructor gets 0 as input', () => {
            assert.throw(() => {
                let instance = new Warehouse(0);
            }, 'Invalid given warehouse space');
        });

        it('Should work properly', () => {
            const expectedCapacity = 25;
            const expectedProducts = { "Food": {}, "Drink": {} };
            assert.equal(instance.capacity, expectedCapacity);
            assert.deepEqual(instance.availableProducts, expectedProducts);
        })
    });

    describe('AddProduct', () => {
        it('should return the object with the given type with already added products', () => {
            let output = instance.addProduct('Food', 'avokado', 5);
            let expected = {
                avokado: 5,
            }
            assert.deepEqual(expected, output);
        });

        it('should return the object with the given type with already added products', () => {
            let output = instance.addProduct('Drink', 'water', 5);
            let expected = {
                water: 5,
            }
            assert.deepEqual(expected, output);
        });

        it('should update quanitity if a product is added more than once', () => {
            instance.addProduct('Drink', 'water', 5);
            let output = instance.addProduct('Drink', 'water', 1);
            let expected = {
                water: 6,
            }
            assert.deepEqual(expected, output);
        });

        it('should throw an error if  there is no more space left', () => {
            assert.throw(() => {
                instance.addProduct('Drink', 'water', 15);
                instance.addProduct('Drink', 'water', 15);
                console.log(instance);
            }, 'There is not enough space or the warehouse is already full');
        });

        it('should throw an error', () => {
            assert.throw(() => {
                instance.addProduct('awt', 'water', 15);
            }, 'Cannot read property \'hasOwnProperty\' of undefined');
        });


    });

    describe('OrderProducts', () => {
        it('shoud return objet with sorted properties by quantity', () => {
            instance.addProduct('Food', 'avokado', 4);
            instance.addProduct('Food', 'rice', 1);
            instance.addProduct('Food', 'pineapple', 2);
            instance.addProduct('Food', 'apple', 5);
            instance.addProduct('Food', 'banana', 3);
            let output = instance.orderProducts('Food');
            let expected = {
                apple: 5,
                avokado: 4,
                banana: 3,
                pineapple: 2,
                rice: 1,
            };
            assert.deepEqual(expected, output);
        });

        it('shoud return objet with sorted properties by quantity', () => {
            instance.addProduct('Food', 'avokado', 1);
            instance.addProduct('Food', 'rice', 1);
            instance.addProduct('Food', 'pineapple', 1);
            instance.addProduct('Food', 'apple', 1);
            instance.addProduct('Food', 'banana', 1);
            let output = instance.orderProducts('Food');
            let expected = {
                avokado: 1,
                rice: 1,
                pineapple: 1,
                apple: 1,
                banana: 1,
            };
            assert.deepEqual(expected, output);
        });

        it('shoud return objet with sorted properties by quantity trying with empty info', () => {
            let output = instance.orderProducts('Food');
            let expected = {};
            assert.deepEqual(expected, output);
        });
    });

    describe('OccupiedCapacity', () => {
        it('should return a number which represents the already occupied place in the warehouse', () => {
            instance.addProduct('Food', 'avokado', 4);
            instance.addProduct('Food', 'rice', 1);
            instance.addProduct('Food', 'pineapple', 2);
            instance.addProduct('Food', 'apple', 5);
            instance.addProduct('Food', 'banana', 3);
            let output = instance.occupiedCapacity();
            assert.equal(15, output);
        });

        it('should return a number which represents the already occupied place in the warehouse', () => {
            let output = instance.occupiedCapacity();
            assert.equal(0, output);
        });
    });

    describe('Revision', () => {
        it('should Returns a string in which we print all products of each type', () => {
            instance.addProduct('Food', 'avokado', 4);
            instance.addProduct('Food', 'rice', 1);
            let output = instance.revision();
            let expected = 'Product type - [Food]\n- avokado 4\n- rice 1\nProduct type - [Drink]';
            assert.equal(expected, output);
        });

        it('should Returns a message for empty wareHouse if it it empty lol', () => {
            let output = instance.revision();
            let expected = 'The warehouse is empty';
            assert.equal(expected, output);
        });
    });

    describe('ScrapeAProduct', () => {
        it('should reduce quantity if the given product exits', () => {
            instance.addProduct('Food', 'avokado', 4);
            instance.addProduct('Food', 'rice', 1);
            let output = instance.scrapeAProduct('avokado', 3);
            let expected = {
                avokado: 1,
                rice: 1,
            };
            assert.deepEqual(expected, output);
        });

        it('should reduce quantity if the given product exits', () => {
            instance.addProduct('Food', 'avokado', 5);
            instance.addProduct('Food', 'rice', 1);
            let output = instance.scrapeAProduct('avokado', 5);
            let expected = {
                avokado: 0,
                rice: 1,
            };
            assert.deepEqual(expected, output);
        });

        it('should reduce quantity if the given product exits', () => {
            instance.addProduct('Food', 'avokado', 5);
            instance.addProduct('Food', 'rice', 1);
            let output = instance.scrapeAProduct('avokado', 7);
            let expected = {
                avokado: 0,
                rice: 1,
            };
            assert.deepEqual(expected, output);
        });

        it('should throw an error if the product does not exist', () => {
            assert.throw(() => {
                instance.addProduct('Food', 'avokado', 5);
                instance.addProduct('Food', 'rice', 1);
                let output = instance.scrapeAProduct('bublegum', 7);
                let expected = 'bublegum do not exists';
                assert.equal(expected, output);
            })
        });

    });
})