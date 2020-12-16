function solve() {

    let tbody = document.getElementsByTagName('tbody')[0];
    let url = 'https://students-eef70.firebaseio.com/students.json';
    let button = document.getElementById('submit');
    let getAllStudentsButton = document.getElementById('getAll');

    button.addEventListener('click', handler);
    getAllStudentsButton.addEventListener('click', () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let keys = Object.keys(data);
                let sorted = keys.sort((a, b) => data[a].id - data[b].id);
                if(tbody.innerHTML != ''){
                    tbody.innerHTML = '';
                }
                sorted.forEach(x => {
                    let item = document.createElement('tr');
                    item.innerHTML = `<th>${data[x].id}</th>
                    <th>${data[x].firstName}</th>
                    <th>${data[x].lastName}</th>
                    <th>${data[x].facultyNumber}</th>
                    <th>${data[x].grade}</th>`;
                    tbody.appendChild(item);
                })
            })
            .catch(err => window.alert(err.message));
    })

    function handler() {
        let firstName = document.getElementById('firstName');
        let lastName = document.getElementById('lastName');
        let facultyNumber = document.getElementById('fac');
        let grade = document.getElementById('grade');
        let idNumber = document.getElementById('id');
        if (firstName.value !== '' && lastName.value !== '' && facultyNumber.value !== '' && grade.value !== '') {
            let obj = {
                id: idNumber.value,
                firstName: firstName.value,
                lastName: lastName.value,
                facultyNumber: facultyNumber.value,
                grade: grade.value,
            };
            fetch(url, { method: 'POST', body: JSON.stringify(obj) })
                .then(res => res.json())
                .then(data => console.log(data));
        }
        idNumber.value = '';
        firstName.value = '';
        lastName.value = '';
        facultyNumber.value = '';
        grade.value = '';
    }


}

solve();