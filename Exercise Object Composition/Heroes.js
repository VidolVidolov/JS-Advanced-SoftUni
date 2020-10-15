function solve() {

    let fighter = function (name) {
        [this.name, this.health, this.stamina] = [name, 100, 100];

        this.fight = function () {
            this.stamina--;
            console.log(`${this.name} slashes at the foe!`);
        }
    }

    let mage = function (name) {
        [this.name, this.health, this.mana] = [name, 100, 100];

        this.cast = function (spell) {
            this.mana--;
            console.log(`${this.name} cast ${spell}`);
        }
    }

    return {
        fighter: (name = '') => new fighter(name),
        mage: (name = '') => new mage(name),
    }
}

solve();

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);

