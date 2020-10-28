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
                throw new Error('Error');
            }
            this._face = face;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (suit !== 'S' && suit !== 'H' && suit !== 'D' && suit !== 'C') {
                throw new Error('Error');
            }
            this._suit = suit;
        }

        toString() {
            let facee = this._face;
            let suitt;
            if (this._suit == 'S') {
                suitt = '\u2660';
            } else if (this._suit == 'H') {
                suitt = '\u2665  ';
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

console.log('' + makeCard('A', 'S'));
console.log('' + makeCard('10', 'H'));
console.log('' + makeCard('1', 'C'));
