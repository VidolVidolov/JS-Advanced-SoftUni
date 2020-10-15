function solve() {

    let myObj = {
        __proto__: {},
        extend: function (input) {
            Object.keys(input).forEach(element => {
                if (typeof input[element] === 'function') {
                    this.__proto__ [element]= input[element];
                } else {
                    this[element] = input[element];                   
                }
            })
        }
    }
    return myObj;
}

solve();