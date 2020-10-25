function solve(input) {

    function process() {
        let list = [];

        return {
            add: (item) => list.push(item),
            remove: (item) => {
                while(list.includes(item)){
                    list.splice(list.indexOf(item), 1);
                }
            },
            print: () => console.log(list.join(',')),
        }
    }
    
    let action = process();

    input.forEach(element => {
        let [command, item] = element.split(' ');
        action[command](item);
    });
}

solve(['add peter', 'add george', 'add peter', 'remove peter','print']);