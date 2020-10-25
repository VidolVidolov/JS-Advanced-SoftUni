class Stringer {

    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = innerLength;
        this.modifiedString = innerString;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        this.innerLength -= length;
        if(this.innerLength < 0){
            this.innerLength = 0;
        }
    }

    toString() {
        if (this.modifiedString.length > this.innerLength) {
            let substring = this.modifiedString.substring(0,this.innerLength);
            substring = substring.concat('...');
            return substring;
        }else if(this.innerLength === 0){
            return '...';
        } else {
            return this.modifiedString;
        }
    }
}



let test = new Stringer("Test", 5);
console.log(test.toString()); // Test
test.decrease(3);
console.log(test.toString()); // Te...
test.decrease(5);
console.log(test.toString()); // ...
test.increase(4);
console.log(test.toString()); // Test
