function solve(input) {
    let checkForEscape = str => str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

    let tab = '   ';   
    let students = JSON.parse(input);
    let html = '<table>\n';
    let tableHeadings = Object.keys(students[0]);
    html += `${tab}<tr>`;
    tableHeadings.forEach(x => {
        let add = Number.isFinite(x)
            ? x : checkForEscape(x);
        html += `<th>${add}</th>`;
    });
    html += '</tr>\n'
    for (const element of students) {
        let info = Object.values(element);
        html += `${tab}<tr>`;
        info.forEach(x => {
            let add = Number.isFinite(x)
                ? x : checkForEscape(x);
            html += `<td>${add}</td>`;
        });
        html += `</tr>\n`;
    }

    html += '</table>'
    console.log(html);
}

solve(['[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"},{ "Name": "Gosho", "Age": 18, "City": "Plovdiv" }, { "Name": "Angel", "Age": 18, "City": "Veliko Tarnovo" }]']);