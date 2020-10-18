function solve() {

    class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = gasWeight;
        }
    };

    class PartyBalloon extends Balloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength) {
            super(color, gasWeight);
            this._ribbon = { color: ribbonColor, length: ribbonLength };
        }

        get ribbon() {
            return this._ribbon;
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(color, gasWeight, ribbonColor, ribbonLength, text) {
            super(color, gasWeight, ribbonColor, ribbonLength);
            this._text = text;
        }

        get text() {
            return this._text;
        }
    }

    return { Balloon, BirthdayBalloon, PartyBalloon };
}

solve();

let baloonCreator = solve();

// let ballon = new baloonCreator.Balloon('blue', 20);
// console.log(ballon);
let ribb = new baloonCreator.PartyBalloon('blue', 30, 'white', 70);
console.log(ribb);