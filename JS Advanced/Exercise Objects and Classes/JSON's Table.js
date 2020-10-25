function solve(input) {

    let html = '<table>\n';
    let tab = '   ';
    input.forEach(element => {
        let line = JSON.parse(element);
        html += `${tab}<tr>\n`;
        for (const key in line) {
            html += `${tab}${tab}<td>${line[key]}</td>\n`;
        };
        html += `${tab}</tr>\n`;
    });

    html += '</table>';
    console.log(html);
}

solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
);