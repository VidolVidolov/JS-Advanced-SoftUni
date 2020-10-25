function solve() {
    let button = document.getElementById('dropdown');
    let colorOfButton = document.getElementById("box").style.backgroundColor;
    button.addEventListener('click', () => {
        let listOfOptions = document.getElementById("dropdown-ul");
        let rows = listOfOptions.getElementsByTagName('li');
        if (listOfOptions.style.display == '') {
            listOfOptions.style.display = 'block';
            [...rows].forEach(row => {
                row.addEventListener('click', () => {
                    let color = row.innerText;
                    document.getElementById("box").style.backgroundColor = color;
                    document.getElementById("box").style.color = 'black';
                })
            })
        } else {
            listOfOptions.style.display = 'none';
            document.getElementById("box").style.backgroundColor = 'black';
            document.getElementById("box").style.color = 'white';
        }
    })
}