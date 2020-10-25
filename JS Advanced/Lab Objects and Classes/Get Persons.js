function getPersons() {
    class Person {

        constructor(firstName, lastName, age, email) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.email = email;
        }

        toString() {
            return `${this.firstName} ${this.lastName} (age: ${this.age}, email: ${this.email})`;
        }
    }

    let person = new Person('Anna', 'Simpson', 22, 'anna@yahoo.com');
    let person2 = new Person('SoftUni');
    let person3 = new Person('Stephan', 'Johnson', 25);
    let person4 = new Person('Gabriel', 'Piterson', 24, 'g.p@gmail.com');

    let output = [];
    output.push(person);
    output.push(person2);
    output.push(person3);
    output.push(person4);
    return output;
}
getPersons();