const apiKey = 'AIzaSyCT1aAxnRXAEILPuFHWKG74coPT6MGw8wc';

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', function (context) {

        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies.json`)
            .then(res => res.json())
            .then(data => {
                if (data == undefined) {
                    context.movies = [];
                } else {
                    context.movies = Object.keys(data).map(id => ({ id, ...data[id] }));
                }
                extendContext(context)
                    .then(function () {

                        this.partial('templates/home.hbs');
                    })
            })


    })

    this.get('#/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('templates/login.hbs');
            })
    })

    this.post('#/login', function (context) {
        let { email, password } = context.params;
        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty('error')) {
                    errorFunc(data.error.message);
                    return;
                }
                success('Successfully logged in!');
                saveUserData(data.email, data.idToken);
                this.redirect('/');
            })



    })

    this.get('#/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('templates/register.hbs');
            })
    })

    this.post('#/register', function (context) {
        let { email, password, repeatPassword } = context.params;

        if (email == '') {
            errorFunc('Ivnalid email!');
            return;
        }

        if (password.length < 6) {
            errorFunc('Ivnalid password!');

            return;
        }

        if (password !== repeatPassword) {
            errorFunc('Passwords dont match!');

            return;
        }

        fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        })
            .then(res => res.json())
            .then(data => {
                success('Successfully registered!');
                saveUserData(data.email, data.idToken);
                this.redirect('/');
            })
    })

    this.get('#/logout', function () {
        localStorage.removeItem('user');
        this.redirect('/');
    })

    this.get('#/addMovie', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('templates/addMovie.hbs');
            })
    })

    this.post('#/addMovie', function (context) {
        let { title, description, imageUrl } = context.params;

        let obj = { title, description, imageUrl, creator: getUserData().email, likes: [getUserData().email] };

        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies.json?auth=${getUserData().token}`, {
            method: 'POST',
            body: JSON.stringify(obj),
        })
            .then(res => {
                success('Successfully added movie!');
                this.redirect('/');
            })
            .catch(err => errorFunc(err.message));

    })

    this.get('#/details/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json`)
            .then(res => res.json())
            .then(data => {
                context.data = data;
                context.id = id;
                context.likes = data.likes.length - 1;
                context.likedNot = true;
                if (data.likes.includes(getUserData().email)) {
                    context.likedNot = false;
                }
                if (data.creator == getUserData().email) {
                    context.creator = true;
                }
                extendContext(context)
                    .then(function () {
                        this.partial('templates/details.hbs');
                    })
            })

    })

    this.get('#/edit/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json`)
            .then(res => res.json())
            .then(data => {
                context.data = data;
                context.id = id;
                extendContext(context)
                    .then(function () {
                        this.partial('templates/edit.hbs');
                    })
            })
    })

    this.post('#/edit/:id', function (context) {
        let id = location.href.split('/')[5];
        let { title, description, imageUrl } = context.params;
        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`, {
            method: 'PATCH',
            body: JSON.stringify({ title, description, imageUrl }),
        })
            .then(res => {
                success('Successfully edited the movie!');
                this.redirect(`#/details/${id}`);
            })
            .catch(err => errorFunc(err.message));

    })

    this.get('#/delete/:id', function (context) {
        let id = location.href.split('/')[5];

        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`, {
            method: 'DELETE'
        })
            .then(res => {
                success('Sucessfully deleted the movie!');
                this.redirect('/');
            })
            .catch(err => errorFunc(err.message));


    })

    this.get('#/like/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`)
            .then(res => res.json())
            .then(data => {
                data.likes.push(getUserData().email);
                fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ likes: data.likes }),
                })
                    .then(res => {
                        success('Sucessfully liked the movie!');
                        this.redirect(`#/details/${id}`);
                    })
                    .catch(err => errorFunc(err.message));



            })
            .catch(err => errorFunc(err.message));


    })

    this.get('#/search', function (context) {
        let {text} = context.params;
        fetch(`https://for-exam-prep-v2.firebaseio.com/Movies.json`)
            .then(res => res.json())
            .then(data => {
                if (data == undefined) {
                    context.movies = [];
                } else {
                    context.movies = Object.keys(data).map(id => ({ id, ...data[id] }));
                    context.movies = context.movies.filter(x => x.title.includes(text));
                }
                extendContext(context)
                    .then(function () {
                        this.partial('templates/home.hbs');
                    })
            })
    })

    function extendContext(context) {
        context.loggedIn = checkLoggedIn();
        if (checkLoggedIn()) {
            context.email = getUserData().email;
        }
        return context.loadPartials({
            'header': 'templates/header.hbs',
            movie: 'templates/movie.hbs',
        })
    }

    function saveUserData(email, token) {
        let user = {
            email,
            token,
        };
        localStorage.setItem('user', JSON.stringify(user));
    }

    function checkLoggedIn() {
        let loggedIn = false;
        if (localStorage.getItem('user') != undefined) {
            loggedIn = true;
        }
        return loggedIn;
    }

    function getUserData() {
        let { email, token } = JSON.parse(localStorage.getItem('user'));
        return {
            email,
            token,
        }
    }

    function success(message) {
        let box = document.getElementById('successBox');
        box.textContent = message;
        box.parentElement.style.display = 'block';

        setTimeout(function () {
            box.parentElement.style.display = 'none';
        }, 1000)
    }

    function errorFunc(message) {
        let box = document.getElementById('error');
        box.children[0].textContent = message;
        box.style.display = 'block';

        setTimeout(function () {
            box.style.display = 'none';
        }, 1000)
    }
})

app.run();