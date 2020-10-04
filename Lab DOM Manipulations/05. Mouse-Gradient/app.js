function attachGradientEvents() {
    let boxElement = document.getElementById('gradient');
    let resultElement = document.getElementById('result');
    boxElement.addEventListener('mousemove',over);
    function over(e){
        let currLeave = e.offsetX;
        let percetage = Math.floor(currLeave / 300 * 100);
        resultElement.innerText = `${percetage}%`;
    }
    boxElement.addEventListener('mouseout', (e => {
        resultElement.innerText = '';
    }))
}