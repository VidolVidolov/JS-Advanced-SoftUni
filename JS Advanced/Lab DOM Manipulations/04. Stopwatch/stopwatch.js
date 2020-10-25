function stopwatch() {
    let startButton = document.getElementById('startBtn');
    let time = document.getElementById('time');
    let stopButton = document.getElementById('stopBtn');
    let counter = 0;
    let intervalID = 0;
    startButton.addEventListener('click', () => {
        time.innerText = '00:00';
        intervalID = setInterval(() => {
            counter++;
            let seconds = counter % 60;
            let mins = Math.floor(counter / 60);
            time.innerText = `${mins < 10 ? `0${mins}` : mins}:${seconds < 10 ? `0${seconds}` : seconds}`;
        }, 1000)
        startButton.disabled = true;
        stopButton.disabled = false;
    })
    stopButton.addEventListener('click', () => {
        clearInterval(intervalID);
        stopButton.disabled = true;
        startButton.disabled = false;

    })
}