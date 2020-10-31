function getInfo() {
    let input = document.getElementById('stopId');
    
     // use this if u dont want to use catch
    // let validBuses = [1287, 1308, 1327, 2334].map(x => x.toString());

    let stopName = document.getElementById('stopName');
    let ulBusses = document.getElementById('buses');

    const url = `https://judgetests.firebaseio.com/businfo/${input.value}.json`;

    //this is before using catch block

    // if (!validBuses.includes(input.value)) {
    //     Array.from(ulBusses.children).forEach(x => x.remove());
    //     stopName.textContent = 'Error';
    //     return;
    // }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let buses = Object.entries(data.buses);
            buses.forEach(([key, value]) => {
                Array.from(ulBusses.children).forEach(x => x.remove()); // so the new scedule dont append to the older one 
                let li = document.createElement('li');
                li.textContent = `Buss ${key} arrives in ${value} minutes`;
                ulBusses.appendChild(li);
            })
            stopName.textContent = data.name;
        })
        .catch(() => { // more sophisticated i think :)
            Array.from(ulBusses.children).forEach(x => x.remove());
            stopName.textContent = 'Error';
        })

    input.value = '';
}