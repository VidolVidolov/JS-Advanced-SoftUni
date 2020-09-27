function solve(input) {

    let entities = {
        '&': '&amp;',
        '<': '&lt',
        '>': '&gt',
        '"': '&#34',
        "'": '&#39',
    }
    let checkForEntities = (el) => el.replace(/[&<>'"]/g, symbol => entities[symbol]);
    let html = '<table>\n';
    html += '  <tr><th>name</th><th>score</th></tr>\n';
    let arr = Array.from(input);
    arr.forEach(info => {
            html += '  <tr>'
            html +=`<td>${checkForEntities(info.name)}</td><td>${info.score}</td>`;
            html += '</tr>\n';
    });
    html += '</table>'
    console.log(html);
}
solve([{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]);
