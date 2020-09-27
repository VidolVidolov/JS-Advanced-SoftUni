class Rat {
    constructor(name){
        this.name = name;
        this.unitedRats = [];
    }
    

    unite(otherRat){
        let check = otherRat instanceof Rat
        if(check){
            this.unitedRats.push(otherRat);
        }
    }

    getRats(){
        return this.unitedRats;
    }
    toString(){
        let string = `${this.name}`;
        this.unitedRats.forEach(rat => string += `\n##${rat.name}`)
        return string;
    }
}

let firstRat = new Rat("Peter");
console.log(firstRat.toString()); // Peter
console.log(firstRat.getRats()); // []
firstRat.unite(new Rat("George"));
firstRat.unite(new Rat("Alex"));
console.log(firstRat.getRats());
// [ Rat { name: 'George', unitedRats: [] },
//  Rat { name: 'Alex', unitedRats: [] } ]
console.log(firstRat.toString());
// Peter
// ##George
// ##Alex
