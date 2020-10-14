function solve(input) {
    let result = {};
    function factoryWrapper(command, name, arg1, arg2) {

        if (command === 'create') {
            if (arg1 === 'inherit') {
                let parent = result[arg2];
                result[name] = Object.create(parent);
            } else {
                result[name] = {};
            }
        } else if (command === 'set') {
            result[name][arg1] = arg2;
        } else if (command === 'print') {
            let printer = [];
            for (const item in result[name]) {
                printer.push(`${item}:${result[name][item]}`);
            }
            console.log(printer.join(', '));
        }
    }

    let factory = factoryWrapper;

    input.forEach(element => {
        let [command, name, arg1, arg2] = element.split(' ');
        obj = factory(command, name, arg1, arg2);
    });

}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);