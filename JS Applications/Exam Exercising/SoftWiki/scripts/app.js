let userAuth = firebase.auth();

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', function (context) {

        fetch('https://for-exampreps.firebaseio.com/Wiki.json')
            .then(res => res.json())
            .then(data => {
                context.js = [];
                context.cSharp = [];
                context.java = [];
                context.pyton = [];
                Object.keys(data).forEach(key => {
                    let info = data[key];
                    let obj = { key, ...data[key] };
                    if (info.category == 'JavaScript') {
                        context.js.push(obj);
                    } else if (info.category == 'cSharp') {
                        context.cSharp.push(obj);
                    } else if (info.category == 'Java') {
                        context.java.push(obj);
                    } else if (info.category == 'Pyton') {
                        context.pyton.push(obj);
                    }
                })
                extendContext(context)
                    .then(function () {
                        this.partial('templates/home.hbs');
                    })
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

        if (password != repeatPassword) {
            return;
        }

        userAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                saveUserData(res.user.email, res.user.uid);
                this.redirect('#/home');
            });

    })

    this.get('#/login', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('templates/login.hbs');
            })
    })

    this.post('#/login', function (context) {
        let { email, password } = context.params;

        userAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                saveUserData(res.user.email, res.user.uid);
                this.redirect('#/home');
            });
    })

    this.get('#/logout', function (context) {

        localStorage.removeItem('user');
        this.redirect('#/login');
    })

    this.get('#/create', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('templates/create.hbs');
            })
    })

    this.post('#/create', function (context) {
        let { title, category, content } = context.params;
        let user = getUserData().email;
        let obj = {
            title,
            category,
            content,
            creator: user,
        };

        fetch('https://for-exampreps.firebaseio.com/Wiki.json', {
            method: 'POST',
            body: JSON.stringify(obj),
        })
            .then(res => {
                this.redirect('#/home');
            })
    })

    this.get('details/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`)
            .then(res => res.json())
            .then(data => {
                context.data = data;
                context.id = id;
                context.creator = getUserData().email == data.creator;
                extendContext(context)
                    .then(function () {
                        this.partial('templates/details.hbs');
                    })
            })

    })

    this.get('#/edit/:id', function (context) {
        let id = location.href.split('/')[5];

        fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`)
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

        let { title, category, content } = context.params;
        let obj = {
            title,
            category,
            content,
        }
        fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(obj),
        })
            .then(res => {
                this.redirect(`#/details/${id}`);
            })
    })

    this.get('#/delete/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://for-exampreps.firebaseio.com/Wiki/${id}.json`, {
            method: 'DELETE',
        })
            .then(res => this.redirect('#/home'));
    })
    function extendContext(context) {

        context.loggedIn = checkLoggedIn();
        return context.loadPartials({
            'header': 'templates/header.hbs',
            'javaScriptPartial': 'templates/jsArticles.hbs',
            'csharpPartial': 'templates/cSharpArticles.hbs',
            'javaPartial': 'templates/javaArticles.hbs',
            'pytonPartial': 'templates/pytonArticles.hbs',
        })
    }

    function saveUserData(email, id) {
        let user = {
            email,
            id,
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
        let { email, id } = JSON.parse(localStorage.getItem('user'));
        return {
            email,
            id,
        }
    }

})

app.run('#/home');