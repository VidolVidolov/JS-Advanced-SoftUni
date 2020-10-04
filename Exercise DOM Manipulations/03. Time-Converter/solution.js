function attachEventsListeners() {

    let days = document.getElementById('days');
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    document.getElementById('daysBtn').addEventListener('click', () => { calculate(+days.value * 86400) });
    document.getElementById('hoursBtn').addEventListener('click', () => { calculate(+hours.value * 3600) });
    document.getElementById('minutesBtn').addEventListener('click', () => { calculate(+minutes.value * 60) });
    document.getElementById('secondsBtn').addEventListener('click', () => { calculate(+seconds.value) });

    function calculate(second) {
        let day = second / 86400;
        let hour = second / 3600;
        let minute = second / 60;

        days.value = day;
        hours.value = hour;
        minutes.value = minute;
        seconds.value = second;
    }
}