function focus() {
    let inputElements = document.getElementsByTagName('input');
    Array.from(inputElements).forEach(x => {
        x.addEventListener('focus', handler);
        x.addEventListener('blur', handler);
    });

    function handler(e) {
        let currTarget = e.target;
        if (currTarget.parentElement.className) {
            currTarget.parentElement.className = '';
        } else {
            currTarget.parentElement.className = 'focused';
        }
    }
}