class Hex {

    constructor(value) {
        this.value = value;
    }

    valueOf() {
        return this.value;
    }

    toString() {
        if (this.value < 0) {
            this.value = 0xFFFFFFFF + this.value + 1;
        }
        return `0x${this.value.toString(16).toUpperCase()}`;
    }
    plus(number){
        let newObj = new Hex(this.value);
        newObj.value += number;
        return newObj;
    }

    minus(number){
        let newObj = new Hex(this.value);
        newObj.value -= number;
        return newObj;
    }

    parse(string){
        return parseInt(string, 16)
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === '0xF');
