class List {

    constructor() {
        this.array = [];
        this.size = this.array.length;
    }

    add(number) {
        this.array.push(number);
        this.sorted();
        this.size = this.array.length;
    }
    remove(index) {
        if (!(index >= this.array.length) && !(index < 0)) {
            this.array.splice(index, 1);
            this.sorted();
            this.size = this.array.length;

        }
    }
    get(index) {
        if (!(index >= this.array.length) && !(index < 0)) {
            this.sorted();
            return this.array[index];

        }
    }

    sorted() {
        this.array = this.array.sort((a, b) => a - b);
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.size);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));
