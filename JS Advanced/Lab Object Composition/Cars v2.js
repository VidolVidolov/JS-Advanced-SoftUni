function solve(input) {
    let result = {};

    function factory() {

        return {
            create: (arg1, arg2, arg3) => {
                if (arg2 === 'inherit') {
                    let parent = result[arg3];
                    result[arg1] = Object.create(parent);
                } else {
                    result[arg1] = {};
                }
            },
            set: () => null,
            pring: () => null,
        }
    }

    input.forEach(element => {
        let [command, arg1, arg2, arg3] = element.split(' ');
        factory(command,arg1, arg2, arg3);
    });


}

solve(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2']
);