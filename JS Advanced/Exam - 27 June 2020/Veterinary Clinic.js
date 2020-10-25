class VeterinaryClinic {

    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = 0;
    }

    newCustomer(ownerName, petName, kind, procedures) {

        if (this.currentWorkload >= this.capacity) {
            throw new Error('Sorry, we are not able to accept more patients!');
        }
        let checker = this.clients.find(x => {
            let name = Object.keys(x)[0];
            let currPetName = Object.values(x)[0].petName;
            if (name == ownerName && currPetName == petName) {
                return x;
            }
        });

        if (checker !== undefined) {
            if (checker[ownerName].procedures.length > 0) {
                throw new Error(`This pet is already registered under ${Object.keys(checker)[0]} name! ${petName} is on our lists, waiting for ${checker[ownerName].procedures.join(', ')}.`);
            } else {
                checker[ownerName].procedures = procedures;
            }
        } else if(!checker) {
            let person = {};
            person[ownerName] = {
                petName,
                kind: kind.toLowerCase(),
                procedures,
            }
            this.clients.push(person);
        }

        this.currentWorkload++;
        return `Welcome ${petName}!`;
    }

    onLeaving(ownerName, petName) {
        let checker = this.clients.find(x => {
            let name = Object.keys(x)[0];
            if (name == ownerName) {
                return x;
            }
        });

        if (checker == undefined) {
            throw new Error('Sorry, there is no such client!');
        }

        let checker2 = this.clients.find(x => {
            let name = Object.keys(x)[0];
            let currPetName = Object.values(x)[0].petName;
            if (name == ownerName && currPetName == petName) {
                return x;
            }
        });

        if (checker2 == undefined || checker2[ownerName].procedures.length == 0) {
            throw new Error(`Sorry, there are no procedures for ${petName}!`);
        } else {
            this.totalProfit += checker2[ownerName].procedures.length * 500;
            this.currentWorkload--;
            checker2[ownerName].procedures = [];
            return `Goodbye ${checker2[ownerName].petName}. Stay safe!`
        }
    }

    toString() {
        let howBusy = Math.floor(this.currentWorkload / this.capacity * 100);
        let result = `${this.clinicName} is ${howBusy}% busy today!\n`;
        result += `Total profit: ${this.totalProfit.toFixed(2)}$\n`;
        let sorted = this.clients.sort((a, b) => {
            let A = Object.keys(a)[0];
            let B = Object.keys(b)[0];
            return A.localeCompare(B);
        });
        let dumbfuck = []; // because I structured my info wrong way
        for (const person of sorted) {
            let allInfo = this.clients.filter(x => Object.keys(x)[0] == Object.keys(person)[0]);
            let sortedFinal = allInfo.sort((a, b) => {
                let A = Object.values(a)[0].petName;
                let B = Object.values(b)[0].petName;
                return A.localeCompare(B);
            })
            let nameMaybe = Object.keys(allInfo[0])[0];
            let check = dumbfuck.includes(nameMaybe);
            if (!check) {
                for (const iterator of sortedFinal) {
                    let name = Object.keys(iterator)[0];
                    if (!dumbfuck.includes(name)) {
                        result += `${name} with:\n`;
                        dumbfuck.push(name);
                    }
                    result += `---${iterator[name].petName} - a ${iterator[name].kind.toLowerCase()} that needs: ${iterator[name].procedures.join(', ')}\n`;
                }
            }

        }
        return result.trim();
    }
}


let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));
console.log(clinic.newCustomer('Jim Jones', 'Ram', 'Cat', ['A154B']));
console.log(clinic.newCustomer('Jim Jones', 'Salute', 'Cat', ['A154B']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Dog', ['A154B']));



// console.log(clinic.newCustomer('Jim Jones', 'Tony', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));
// console.log(clinic.newCustomer('Jim Jones', 'Rab', 'Dog', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));

// // console.log(clinic.newCustomer('Aim ', 'Tony', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));

// // console.log(clinic.newCustomer('Bi Jones', 'Sarahhh', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));

// // console.log(clinic.newCustomer('Cimi Jones', 'Zombo', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));
// // console.log(clinic.newCustomer('Dim Jos', 'Kucho', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));
// // console.log(clinic.newCustomer('Eim Jone', 'Kat', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));
// // console.log(clinic.newCustomer('Eim Jone1', 'Kat', 'Cat', ['ascaca', 'asacihasc', 'casbcia', 'cabic']));

// console.log(clinic.onLeaving('Jim Jones', 'Tony'));
// console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
// console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B']));

// console.log(clinic.onLeaving('Jim Jones', 'Tom'));

console.log(clinic.toString());
console.log(clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']));
console.log(clinic.onLeaving('Jim Jones', 'Sara'));

console.log(clinic.toString());
