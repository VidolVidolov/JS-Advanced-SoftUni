function solve(input, sortingType) {

    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;

        }
    }

    let container = [];
    input.forEach(line => {
        let [destination, price, status] = line.split('|');
        let ticket = new Ticket(destination, price, status);
        container.push(ticket);
    });
    let sort = [];
    if (sortingType == 'destination') {
        sort = container.sort((a, b) => a.destination.localeCompare(b.destination));
    } else if (sortingType == 'status') {
        sort = container.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortingType == 'price') {
        sort = container.sort((a, b) => a.price - b.price);
    }
    return sort;
    

}
solve(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'
);