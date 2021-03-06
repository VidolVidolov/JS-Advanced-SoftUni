class ChristmasDinner {
    constructor(budget) {
        this.budget = Number(budget);
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    get budget() {
        return this._budget;
    }
    set budget(budget) {
        if (budget < 0) {
            throw new Error('The budget cannot be a negative number');
        }
        this._budget = budget;
    }

    shopping([product, price]) {
        price = Number(price);

        if (price > this.budget) {
            throw new Error('Not enough money to buy this product');
        }

        this.products.push(product);
        this.budget -= price;
        return `You have successfully bought ${product}!`;
    }

    recipes(recipe) {

        let check = true;

        recipe.productsList.forEach(x => {
            if (!this.products.includes(x)) {
                check = false;
            }
        });

        if (!check) {
            throw new Error('We do not have this product');
        }
        this.dishes.push(recipe);
        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {
        let checker = this.dishes.find(x => x.recipeName === dish);
        if (!checker) {
            throw new Error('We do not have this dish');
        }

        if (this.guests[name] !== undefined) {
            throw new Error('This guest has already been invited');
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let output = '';
        Object.entries(this.guests).forEach(([guest, info]) => {
            let search = this.dishes.find(x => x.recipeName === info);
            output += `${guest} will eat ${info}, which consists of ${search.productsList.join(', ')}\n`;
        })

        return output.trim();
    }
}

let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);
dinner.recipes({
     recipeName: 'Oshav',
     productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');
let actual = dinner.showAttendance();
