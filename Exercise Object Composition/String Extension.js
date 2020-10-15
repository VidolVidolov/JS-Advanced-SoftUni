(function solve() {

    String.prototype.ensureStart = function (str) {
        if (!this.startsWith(str)) {
            return str + this;
        }
        return this.toString();
    };

    String.prototype.ensureEnd = function (str) {
        if (!this.endsWith(str)) {
            return this + str;
        }
        return this.toString();
    };

    String.prototype.isEmpty = function () {
        let check = this.length == 0 ? true : false;
        return check;
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }
        if (this.length <= n) {
            return this.toString();
        }
        if (this.length > n) {
            let index = this.lastIndexOf(' ');
            if (index == -1) {
                let word = this.substring(0, n - 3);
                word += '...';
                return word.toString();
            }
            let num = this.substring(0, n - 1).lastIndexOf(' ');
            let word = this.substring(0, num);
            return (word + '...').toString();
        }

    };

    String.format = function (string, ...params) {
        let counter = 0;
        while (params.length !== 0) {
            string = string.replace(`{${counter}}`, params.shift());
            counter++;
        }
        return string.toString();
    }
})()

// let str = 'my string';
// str = str.ensureStart('my');
// str = str.ensureStart('hello ');
// str = str.truncate(16);
// str = str.truncate(14);
// str = str.truncate(8);
// str = str.truncate(4);
// str = str.truncate(2);
// str = String.format('The {0} {1} fox',
//     'quick', 'brown');
// str = String.format('jumps {0} {1}',
//     'dog');


