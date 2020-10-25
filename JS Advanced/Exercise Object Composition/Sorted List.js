function main() {

    let collection = [];

    return {
        add: function (element) {
            collection.push(element);
            collection.sort((a, b) => a - b),
            this.size++;
            return collection;
        },
        remove: function (index) {
            if (collection[index] !== undefined) {
                let reomved = collection.splice(index, 1);
                this.size--;
                return reomved;
            }
        },
        get: (index) => {
            if (collection[index] !== undefined) {
                return collection[index];
            }
        },
        size: 0,
    }
}

let test = main();
test.add(5);
test.add(3)
console.log(test.get(0));
test.remove(0);
console.log(test.get(0));
let result = test.size;
console.log(result);