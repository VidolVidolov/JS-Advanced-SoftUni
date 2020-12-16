function authorization() {

    let btn = document.getElementById('btn');
    let inputEmail = document.getElementById('email');
    let inputPass = document.getElementById('psw');

    let btnLogin = document.getElementById('btn-login');
    let inputEmailLogin = document.getElementById('email-login');
    let inputPassLogin = document.getElementById('psw-login');

    let logoutButton = document.getElementById('logOut');

    let currentUser = '';
    logoutButton.addEventListener('click', () => {
        firebase.auth().signOut()
            .then(data => {
                if (currentUser != '') {
                    window.alert('Logged out successfully');
                    currentUser = '';
                } else {
                    throw Error('You are not logged in');
                }
            })
            .catch(err => window.alert(err.message));
    })
    btn.addEventListener('click', (e) => register(e));
    btnLogin.addEventListener('click', (e) => login(e));

    function login(e) {
        e.preventDefault();

        let email = inputEmailLogin.value;
        let password = inputPassLogin.value;

        if (email != '' && password != '') {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(data => {
                    window.alert(`Successfully logged in as ${email}`);
                    currentUser = data.user.email;
                    console.log(data);
                })
                .catch(error => window.alert(error.message));

            inputEmailLogin.value = '';
            inputPassLogin.value = '';
        }
    }

    function register(e) {
        {
            e.preventDefault();
            let email = inputEmail.value;
            let password = inputPass.value;
            if (email != '' && password != '') {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(data => window.alert('Successfuly Registered!'))
                    .catch(err => window.alert(err.message));
                inputEmail.value = '';
                inputPass.value = '';
            }
        }
    }
}

authorization();