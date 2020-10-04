function encodeAndDecodeMessages() {
    let [encodeButton, decodeButton] = document.getElementsByTagName('button');
    let [inputTextArea, outputTextArea] = document.getElementsByTagName('textarea');
    encodeButton.addEventListener('click', () => {
        let txtArea = inputTextArea.value;
        let transition = '';
        txtArea.split('').map(x => {
            let decode = x.charCodeAt(0);
            decode++;
            x = String.fromCharCode(decode);
            transition += x;
        });
        inputTextArea.value = '';
        outputTextArea.value = transition;
    });

    decodeButton.addEventListener('click', encodeHandler);
    function encodeHandler() {
        let decodedTxt = outputTextArea.value;
        let transition = decodedTxt.split('').map(x => {
            let decode = x.charCodeAt(0);
            decode--;
            x = String.fromCharCode(decode);
            return x;
        }).join('');
        outputTextArea.value = transition;
    }
}