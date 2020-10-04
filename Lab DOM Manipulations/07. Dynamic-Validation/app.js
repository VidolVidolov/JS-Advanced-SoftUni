function validate() {
    let inputField = document.getElementById('email');
    inputField.addEventListener('change', handler);

    function handler(e) {
        let currElement  = e.target;
        let mailTxt = e.target.value;
        if (/^[a-z]+@[a-z]+\.[a-z]+$/.test(mailTxt)) {
            currElement.className = '';
        } else {
            currElement.className = 'error';
        }
    }
}