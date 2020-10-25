function deleteByEmail() {
    let emails = document.getElementsByTagName('td');
    let currEmails = Array.from(emails).filter(x => x.innerText.includes('@')).map(x => x.innerText);
    let inputData = document.getElementsByTagName('input')[0];
    let checker = currEmails.indexOf(inputData.value);
    let msg = document.getElementById('result');
    if (checker !== -1) {
        emails[checker].parentElement.remove();
        msg.innerText = 'Deleted.'
    }else {
        msg.innerText = 'Not found.'
    }

    inputData.value = '';
}