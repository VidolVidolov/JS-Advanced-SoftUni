function solve(input) {

    let site = {};
    input.forEach(line => {
        let [system, component, subComponent] = line.split(' | ');

        if (!site[system]) {
            site[system] = {};
            site[system][component] = [];
            site[system][component].push(subComponent);
        } else {
            if (site[system][component]) {
                site[system][component].push(subComponent);
            } else {
                site[system][component] = [];
                site[system][component].push(subComponent);
            }
        }
    });

    let sortedSystems = Object.keys(site).sort((a, b) => {
        let A = Object.keys(site[a]);
        let B = Object.keys(site[b]);

        return B.length - A.length || a.localeCompare(b);
    })

    sortedSystems.forEach(x => {
        console.log(x);
        let sortedComponents = Object.keys(site[x]).sort((a, b) => site[x][b].length - site[x][a].length);
        sortedComponents.forEach(comp => {
            console.log(`|||${comp}`);
            site[x][comp].forEach(element => console.log(`||||||${element}`));
        })
});
}

solve(['SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'SULS | Lodge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security']
);