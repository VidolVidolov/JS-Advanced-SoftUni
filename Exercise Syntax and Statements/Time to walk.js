function solve(steps, footPrintInMeters, speed) {

    let distance = steps * footPrintInMeters;
    let time = distance / speed * 3.6;
    let breakTime = Math.floor((steps * footPrintInMeters) / 500);
    let totalTime = (breakTime * 60) + time;
    let hours = Math.floor(totalTime / 3600);
    let minutes = Math.floor(totalTime / 60);
    let seconds = Math.round(totalTime - (hours * 3600 + minutes * 60));

    console.log(`${paddingZero(hours)}:${paddingZero(minutes)}:${paddingZero(seconds)}`);

    function paddingZero(number){

        if(number < 10){
            return `0${number}`
        }else {
            return number;
        }
    }
}
//solve(4000, 0.60, 5);
solve(2564, 0.70, 5.5);
