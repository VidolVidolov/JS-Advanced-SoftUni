function solve(data, criteria) {

    let visibleData = JSON.parse(data);
    let counter = 0;
    if (criteria === 'all') {
        visibleData.forEach(person => {
            console.log(`${counter}. ${person.first_name} ${person.last_name} - ${person.email}`);
            counter++;
        });
    } else {
        visibleData.forEach(person => {
            let info = pseudoFilter(person, criteria);
            if (info) {
                console.log(`${counter}. ${info.first_name} ${info.last_name} - ${info.email}`);
                counter++;
            }
        })
    }

    function pseudoFilter(perosonInfo, criteria) {
        let [key, value] = criteria.split('-');
        if (perosonInfo[key] === value) {
            return perosonInfo;
        }
    }
}


solve(`[{
    "id": "1",
    "first_name": "Ardine",
    "last_name": "Bassam",
    "email": "abassam0@cnn.com",
    "gender": "Female"
  }, {
    "id": "2",
    "first_name": "Kizzee",
    "last_name": "Jost",
    "email": "kjost1@forbes.com",
    "gender": "Female"
  },  
{
    "id": "3",
    "first_name": "Evanne",
    "last_name": "Maldin",
    "email": "emaldin2@hostgator.com",
    "gender": "Male"
  }]`,
    'gender-Female'
);