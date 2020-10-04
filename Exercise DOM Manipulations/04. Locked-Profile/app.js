function lockedProfile() {
    let profiles = document.getElementsByClassName('profile');

    Array.from(profiles).forEach(profile => {
        profile.getElementsByTagName('button')[0].addEventListener('click', handler);
    });

    function handler(e) {
        let profile = e.target.parentElement;
        let isLocked = profile.getElementsByTagName('input')[0];
        let info = profile.getElementsByTagName('div')[0];
        let button = profile.getElementsByTagName('button')[0];
        if (!isLocked.checked) {
            if(button.innerText === 'Show more'){
                info.style.display = 'block';
                button.innerText = 'Hide it';
            }else if(button.innerText === 'Hide it'){
                info.style.display = 'none';
                button.innerText = 'Show more';
            }
        }
    }
}