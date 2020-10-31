function solve() {

    // for this task I made simple upgrade that when u cicle through all stops and return to depot it prints error

    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let infoSpan = document.querySelector('.info');
    let currentStop = 'depot';
    let stopsMemory = [];

    let infoForBussStopName;

    function depart() {

        const url = `https://judgetests.firebaseio.com/schedule/${currentStop}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                currentStop = data.next;
                infoSpan.textContent = data.name;
                infoForBussStopName = data.name;
                if (!stopsMemory.includes(data.name)) {
                    stopsMemory.push(data.name);
                } else {
                    infoSpan.textContent = 'Error';
                    if (!stopsMemory.includes(data.name)) {
                        stopsMemory.push(data.name);
                    } else {
                        infoSpan.textContent = 'Error';
                        departButton.disabled = true;
                        arriveButton.disabled = true;
                    }
                }
            });

        departButton.disabled = true;
        arriveButton.disabled = false;
    }

    function arrive() {

        infoSpan.textContent = `Arriving at ${infoForBussStopName}`;
        departButton.disabled = false;
        arriveButton.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();