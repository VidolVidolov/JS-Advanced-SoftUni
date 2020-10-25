function solve(area, vol, input) {

    let info = JSON.parse(input);
    let container = [];
    info.forEach(element => {
        let obj = {
            area: Math.abs(area.call(element)),
            volume: Math.abs(vol.call(element)),
        }
        container.push(obj);
    });

    return container;
}

function area() {
    return this.x * this.y;
};

function vol() {
    return this.x * this.y * this.z;
};

let output = solve(area, vol, `[
    {"x":"1","y":"2","z":"10"},
    {"x":"7","y":"7","z":"10"},
    {"x":"5","y":"2","z":"10"}
    ]`);

console.log(output);