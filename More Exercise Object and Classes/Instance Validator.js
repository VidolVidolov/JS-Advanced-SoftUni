class CheckingAccount {

    constructor(clientId, email, firstName, lastName) {
        this.checkId(clientId);
        this.validEmail(email);
        this.validName(firstName);
        this.validNameLast(lastName);
    }

    get clientId() {
        return this.currId;
    }
    checkId = (number) => {
        let check = /^[0-9]{6}$/.exec(number);
        if (check) {
            this.currId = number;
        } else {
            throw new TypeError('Client ID must be a 6-digit number');
        }
    }
    get email() {
        return this.currMail;
    }
    validEmail = (string) => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.exec(string)) {
            this.currMail = string;
        } else {
            throw new TypeError('Invalid e-mail');
        }
    }
    get firstName() {
        return this.name;
    }
    validName = (string) => {
        if (/^[A-z]{3,20}$/.exec(string)) {
            this.name = string;
        } else {
            if(string.length < 3 || string.length > 20){
                throw new TypeError(`First name must be between 3 and 20 characters long`);
            }else {
                throw new TypeError('First name must contain only Latin characters');
            }
        }
    }
    get lastName(){
        return this.name;
    }
    validNameLast = (string) => {
        if (/^[A-z]{3,20}$/.exec(string)) {
            this.name = string;
        } else {
            if(string.length < 3 || string.length > 20){
                throw new TypeError(`Last name must be between 3 and 20 characters long`);
            }else {
                throw new TypeError('Last name must contain only Latin characters');
            }
        }
    }
}

let acc = new CheckingAccount('4234415', 'petkan@another.co.uk', 'Petkan', 'Draganov');

