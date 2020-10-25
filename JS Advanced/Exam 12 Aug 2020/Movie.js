class Movie {
    constructor(movieName, ticketPrice) {
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        // add more properties 
        this.profit = 0;
        this.totalSoldTickets = 0;
    }

    newScreening(date, hall, description) {

        let checker = this.screenings.find(x => x.date == date && x.hall == hall);

        if (checker) {
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
        }

        let currScreening = {
            date,
            hall,
            description,
        }

        this.screenings.push(currScreening);
        return `New screening of ${this.movieName} is added.`;
    }

    endScreening(date, hall, soldTickets) {
        let checker = this.screenings.find(x => x.date == date && x.hall == hall);

        if (!checker) {
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
        }

        let currentProfit = Number(soldTickets) * this.ticketPrice;
        this.profit += currentProfit;
        this.totalSoldTickets += Number(soldTickets);

        let index = this.screenings.indexOf(checker);
        this.screenings.splice(index, 1);
        // else may need just to checker.remove() because the connection is by reference
        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`
    }

    toString() {
        let output = `${this.movieName} full information:\n`;
        output += `Total profit: ${this.profit.toFixed(0)}$\nSold Tickets: ${this.totalSoldTickets.toFixed(0)}`;

        if(this.screenings.length > 0){
            output += `\nRemaining film screenings:\n`;

            let sort = this.screenings.sort((a,b) => a.hall.localeCompare(b.hall));

            for (const film of sort) {
                output += `${film.hall} - ${film.date} - ${film.description}\n`;
            }
        }else{
            output += `\nNo more screenings!`;
        }
        return output.trim();
    }
}


let m = new Movie('Wonder Woman 1984', '10.00');
console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`));

console.log(m.newScreening('October 3, 2020', 'Main', `regular`));
console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`));
console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150));
console.log(m.endScreening('October 3, 2020', 'Main', 78));
console.log(m.endScreening('October 3, 2020', 'Main', 78));

// console.log(m.toString());

// m.newScreening('October 4, 2020', '235', `regular`);
// m.newScreening('October 5, 2020', 'Main', `regular`);
// m.newScreening('October 3, 2020', '235', `regular`);
// m.newScreening('October 4, 2020', 'Main', `regular`);
// console.log(m.toString());
