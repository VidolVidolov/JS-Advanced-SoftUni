function solve(input) {

    let entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    }
    let checkForEntities = (el) => el.replace(/[&<>'"]/g, symbol => entities[symbol]);
    let html = '<table>\n';
    html += '  <tr><th>name</th><th>score</th></tr>\n';
    let obj = JSON.parse(input);
    obj.forEach(person => {
        html += '  <tr>'
        Object.values(person).forEach(info => html += typeof info === 'number' ? `<td>${info}</td>` : `<td>${checkForEntities(info)}</td>`);
        html += '</tr>\n';
    });
    html += '</table>'
    console.log(html);
}
solve(['[{"name":"Pencho Penchev","score":0},{"name":"<script>alert(\"Wrong!\")</script>","score":1}]']);
