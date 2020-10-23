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

    set budget(value) {
        if (value < 0) {
            throw new Error("The budget cannot be a negative number");
        }
        this._budget = value;
    }

    shopping(product) {
        let [type, price] = product;
        price = Number(price);

        if (price > this.budget) {
            throw new Error("Not enough money to buy this product");
        }

        this.products.push(type);
        this.budget -= price;

        return `You have successfully bought ${type}!`;
    }

    recipes(recipe) {
        // recipe --> { recipeName, productsList:[] }

        let containsAllProducts = true;

        recipe.productsList.forEach(product => {
            if (!this.products.includes(product)) {
                containsAllProducts = false;
            }
        });

        if (!containsAllProducts) {
            throw new Error("We do not have this product");
        }

        this.dishes.push(recipe);
        return `${recipe.recipeName} has been successfully cooked!`;
    }

    inviteGuests(name, dish) {

        if (!this.dishes.some(d => d.recipeName == dish)) {
            throw new Error("We do not have this dish");
        }

        if (this.guests[name] !== undefined) {
            throw new Error("This guest has already been invited");
        }

        this.guests[name] = dish;
        return `You have successfully invited ${name}!`;
    }

    showAttendance() {
        let output = '';

        Object.entries(this.guests).forEach(personArr => {
            let currentDish = this.dishes.find(d => d.recipeName == personArr[1]);
            output += `${personArr[0]} will eat ${personArr[1]}, which consists of ${currentDish.productsList.join(', ')}\n`;
        });

        return output.trim();
    }
}