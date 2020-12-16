import { login } from './login.js';
import { saveUserData, getUserData, checkLoggedIn, success, errorFunc } from './common.js';
const apiKey = 'AIzaSyCT1aAxnRXAEILPuFHWKG74coPT6MGw8wc';

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', async function () {

        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies.json`);
        let data = await res.json();

        if (data == undefined) {
            this.movies = [];
        } else {
            this.movies = Object.keys(data).map(id => ({ id, ...data[id] }));
        }
        await extendContext(this)
        this.partial('templates/home.hbs');
    })

    this.get('#/login', async function () {
        await extendContext(this)
        this.partial('templates/login.hbs');
    })

    this.post('#/login', ctx => { login.call(ctx) });

    this.get('#/register', async function () {
        await extendContext(this)
        this.partial('templates/register.hbs');
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

    this.get('#/addMovie', async function () {
        await extendContext(this)
        this.partial('templates/addMovie.hbs');
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

    this.get('#/details/:id', async function () {
        let id = location.href.split('/')[5];
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json`)
        let data = await res.json();

        this.data = data;
        this.id = id;
        this.likes = data.likes.length - 1;
        this.likedNot = true;
        if (this.data.likes.includes(getUserData().email)) {
            this.likedNot = false;
        }
        if (data.creator == getUserData().email) {
            this.creator = true;
        }
        await extendContext(this)
        this.partial('templates/details.hbs');
    })

    this.get('#/edit/:id', async function () {
        let id = location.href.split('/')[5];
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json`);
        let data = await res.json();

        this.data = data;
        this.id = id;
        await extendContext(this);
        this.partial('templates/edit.hbs');
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

    this.get('#/delete/:id', async function (context) {

        let id = location.href.split('/')[5];
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`, {
            method: 'DELETE'
        });
        
        success('Sucessfully deleted the movie!');
        this.redirect('/');

    })

    this.get('#/like/:id', async function () {
        let id = location.href.split('/')[5];
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`);
        let data = await res.json();
        let likes = data.likes.slice();
        likes.push(getUserData().email);
        try {
            let res1 = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies/${id}.json?auth=${getUserData().token}`, {
                method: 'PATCH',
                body: JSON.stringify({ likes }),
            });
            let data = await res1.json();
            if (data.hasOwnProperty('error')) {
                throw new Error(data.error.message);
            }

            success('Sucessfully liked the movie!');
            this.redirect(`#/details/${id}`);
        } catch (err) {
            errorFunc(err.message)
        }

    })

    this.get('#/search', async function () {
        let { text } = this.params;
        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Movies.json`)
        let data = await res.json();

        if (data == undefined) {
            this.movies = [];
        } else {
            this.movies = Object.keys(data).map(id => ({ id, ...data[id] }));
            this.movies = this.movies.filter(x => x.title.includes(text));
        }
        await extendContext(this)
        this.partial('templates/home.hbs');
    })

    async function extendContext(context) {
        context.loggedIn = checkLoggedIn();
        if (checkLoggedIn()) {
            context.email = getUserData().email;
        }
        return context.partials = {
            'header': await context.load('templates/header.hbs'),
            'movie': await context.load('templates/movie.hbs'),
        }
    }


})

app.run();