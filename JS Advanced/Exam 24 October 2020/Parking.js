class Parking {
    constructor(capacity) {
        this.capacity = capacity;
        this.vehicles = [];
        this.parkingSpots = [];
    }

    addCar(carModel, carNumber) {
        if (this.vehicles.length >= this.capacity) {
            throw new Error(`Not enough parking space.`);
        }
        let car = {
            carModel,
            carNumber,
            payed: false,
        }

        this.vehicles.push(car);
        return `The ${carModel}, with a registration number ${carNumber}, parked.`
    }

    removeCar(carNumber) {
        let checker = this.vehicles.find(x => x.carNumber == carNumber);
        if (checker == undefined) {
            throw new Error('The car, you\'re looking for, is not found.');
        }

        if (checker.payed == false) {
            throw new Error(`${carNumber} needs to pay before leaving the parking lot.`)
        } else {
            let index = this.vehicles.indexOf(checker);
            this.vehicles.splice(index, 1);
            return `${carNumber} left the parking lot.`;
        }
    }

    pay(carNumber) {
        let checker = this.vehicles.find(x => x.carNumber == carNumber);

        if (checker == undefined) {
            throw new Error(`${carNumber} is not in the parking lot.`);
        }

        if (checker.payed === true) {
            throw new Error(`${carNumber}'s driver has already payed his ticket.`);
        } else {
            checker.payed = true;
            return `${carNumber}'s driver successfully payed for his stay.`;
        }
    }


    getStatistics(carNumber) {
        let output = '';
        if (carNumber == undefined) {
            output += `The Parking Lot has ${this.capacity - this.vehicles.length} empty spots left.\n`;
            let sorted = this.vehicles.sort((a, b) => a.carModel.localeCompare(b.carModel));

            sorted.forEach(x => {
                output += `${x.carModel} == ${x.carNumber} - ${x.payed == false ? 'Not payed' : 'Has payed'}\n`;
            });
        } else {
            let x = this.vehicles.find(x => x.carNumber == carNumber);
            output += `${x.carModel} == ${x.carNumber} - ${x.payed == false ? 'Not payed' : 'Has payed'}`;
        }

        return output.trim();
    }


}

const parking = new Parking(12);

console.log(parking.addCar("Volvo t600", "TX3691CA"));
console.log(parking.getStatistics());

console.log(parking.pay("TX3691CA"));
console.log(parking.removeCar("TX3691CA"));
