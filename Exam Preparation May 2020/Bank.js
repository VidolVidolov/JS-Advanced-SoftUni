class Bank {
    constructor(bankName) {
        this._bankName = bankName;
        this.allCustomers = [];
    }


    newCustomer(customer) {
        if (this.allCustomers.find(x => x.personalId == customer.personalId) != undefined) {
            throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`)
        } else {
            this.allCustomers.push(customer);
        }
        return customer;
    }

    depositMoney(personalId, amount) {
        let checker = this.allCustomers.find(x => x.personalId == personalId);
        if (checker == undefined) {
            throw new Error('We have no customer with this ID!');
        } else {
            if (!checker.totalMoney) {
                checker.totalMoney = 0;
            }
            checker.totalMoney += amount;
            if (!checker.transactions) {
                checker.transactions = [];
            }
            checker.transactions.push(`${checker.firstName} ${checker.lastName} made deposit of ${amount}$`);
        }

        return `${checker.totalMoney}$`
    }

    withdrawMoney(personalId, amount) {
        let checker = this.allCustomers.find(x => x.personalId == personalId);
        if (checker == undefined) {
            throw new Error('We have no customer with this ID!');
        } else {
            if (checker.totalMoney >= amount) {
                checker.totalMoney -= amount;
            } else {
                throw new Error(`${checker.firstName} ${checker.lastName} does not have enough money to withdraw that amount!`)
            }
            checker.transactions.push(`${checker.firstName} ${checker.lastName} withdrew ${amount}$`);
        }
        return `${checker.totalMoney}$`

    }


    customerInfo(personalId) {
        let checker = this.allCustomers.find(x => x.personalId == personalId);
        if (checker == undefined) {
            throw new Error('We have no customer with this ID!');
        } else {
            let output = `Bank name: ${this._bankName}\nCustomer name: ${checker.firstName} ${checker.lastName}\nCustomer ID: ${checker.personalId}\nTotal Money: ${checker.totalMoney}$\n`;
            output += 'Transactions:\n';
            let count = checker.transactions.length;
            checker.transactions.reverse().forEach(element => {
                output += `${count}. ${element}!\n`;
                count--;
            });
            return output.trim();
        }

    }
}



let bank = new Bank("SoftUni Bank");
console.log(bank.newCustomer({ firstName: "Svetlin", lastName: "Nakov", personalId: 6233267 }));
console.log(bank.newCustomer({ firstName: "Mihaela", lastName: "Mileva", personalId: 4151596 }));


bank.depositMoney(6233267, 250);
console.log(bank.depositMoney(6233267, 250));
bank.depositMoney(4151596, 555);

console.log(bank.withdrawMoney(6233267, 125));

console.log(bank.customerInfo(6233267));
