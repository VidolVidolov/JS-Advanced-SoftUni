function printDeckOfCards(cards) {
    function makeCard(face, suit) {

        class Card {
            constructor(face, suit) {
                this.face = face;
                this.suit = suit;
            }

            get face() {
                return this._face;
            }

            set face(face) {
                if (face !== '2' && face !== '3' && face !== '4' && face !== '5' && face !== '6' && face !== '7' && face !== '8' && face !== '9' && face !== '10' && face !== 'J' && face !== 'Q' && face !== 'K' && face !== 'A') {
                    console.log(`Invalid card: ${face}${suit}`);
                }
                this._face = face;
            }

            get suit() {
                return this._suit;
            }

            set suit(suit) {
                if (suit !== 'S' && suit !== 'H' && suit !== 'D' && suit !== 'C') {
                    console.log(`Invalid card: ${face}${suit}`);
                }
                this._suit = suit;
            }

            toString() {
                let facee = this._face;
                let suitt;
                if (this._suit == 'S') {
                    suitt = '\u2660';
                } else if (this._suit == 'H') {
                    suitt = '\u2665';
                } else if (this._suit == 'D') {
                    suitt = '\u2666';
                } else if (this._suit == 'C') {
                    suitt = '\u2663';
                }

                return facee + suitt;
            }
        }

        let obj = new Card(face, suit);
        return obj;
    }

    let result = [];
    cards.forEach(card => {
        let cardFaces = card.split('');
        let suit = cardFaces.pop();
        let face = [...cardFaces].join('');
        result.push('' + makeCard(face, suit));
    });

    console.log(result.join(' '));
}


let log = [];
let oldCon = console.log;
console.log = (str) => log.push(str);

printDeckOfCards(['AS', '10D', 'KH', '2C']);

console.log(log[0] == 'A\u2660');
console.log(log[0] == '10\u2666');
console.log(log[0] == 'K\u2665');
console.log(log[0] == '2\u2663');

console.log = oldCon;