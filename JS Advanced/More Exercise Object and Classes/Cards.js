let result = (function () {
    let Suits = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣',
    }
    let validSuits = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        set face(input) {
            if (validSuits.indexOf(input) !== -1) {
                this.differentFace = input;
            } else {
                throw new Error();
            }
        }
        get face() {
            return this.differentFace;
        }

        set suit(input) {
            if (Object.values(Suits).indexOf(input) !== -1) {
                this.differentSuit = input;
            } else {
                throw new Error();
            }
        }
        get suit() {
            return this.differentSuit;
        }
    }
    return {
        Suits: Suits,
        Card: Card
    }
})();

let Card = result.Card;
let Suits = result.Suits;

let card = new Card('Q', Suits.CLUBS);
card.face = 'A';
card.suit = Suits.DIAMONDS;
let card2 = new Card('1', Suits.DIAMONDS);