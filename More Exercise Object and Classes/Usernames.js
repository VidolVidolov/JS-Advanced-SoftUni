function solve(input) {

    let usernames = {};

    input.forEach(name => {
        if (!usernames[name]) {
            usernames[name] = {};
        }
    });

    let sort = Object.keys(usernames)
                    .sort((a, b) => a.length - b.length || a.localeCompare(b))
                    .forEach(x => console.log(x));
   
}

solve(['Ashton',
    'Kutcher',
    'Ariel',
    'Lilly',
    'Keyden',
    'Aizen',
    'Billy',
    'Braston']
);