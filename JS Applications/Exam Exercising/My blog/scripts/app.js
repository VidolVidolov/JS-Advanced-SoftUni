import { extendContext, saveUserData, checkLoggedIn, getUserData} from './init.js';

const userAuth = firebase.auth();

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', function (context) {
        extendContext(context)
            .then(function () {
                fetch('https://my-blog-d12fa.firebaseio.com/My-blog.json')
                    .then(res => res.json())
                    .then(posts => {
                        context.posts = Object.keys(posts).map(id => {
                            let user = getUserData().email;
                            let obj;
                            if (posts[id].creator == user) {
                                obj = { id, ...posts[id], creator: true }
                            } else {
                                obj = { id, ...posts[id], creator: false }
                            }
                            return obj;
                        });
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
                this.redirect('#/login');
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
        this.redirect('#/home');
    })

    this.post('#/create-post', function (context) {
        let { title, category, content } = context.params;
        let post = {
            title,
            category,
            content,
            creator: getUserData().email,
        };

        fetch('https://my-blog-d12fa.firebaseio.com/My-blog.json', {
            method: 'POST',
            body: JSON.stringify(post),
        })
            .then(res => {
                this.redirect('#/home');
            })
    })

    this.get('#/details/:id', function (context) {
        let id = location.href.split('/')[5];

        fetch(`https://my-blog-d12fa.firebaseio.com/My-blog/${id}.json`)
            .then(res => res.json())
            .then(data => {
                context.data = data;
                extendContext(context)
                    .then(function () {
                        this.partial('templates/details.hbs');
                    })
            })

    })

    this.get('#/edit/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://my-blog-d12fa.firebaseio.com/My-blog/${id}.json`)
            .then(res => res.json())
            .then(post => {
                context.data = post;
                context.id = id;
                extendContext(context)
                    .then(function () {
                        this.partial('templates/edit.hbs');
                    })
            })

    })

    this.post('#/edit/:id', function (context) {
        let id = location.href.split('/')[5];

        let { title, category, content } = context.params
        let post = {
            title,
            category,
            content,
        };

        fetch(`https://my-blog-d12fa.firebaseio.com/My-blog/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(post),
        })
            .then(res => {
                this.redirect('#/home');
            })

    })

    this.get('#/delete/:id', function (content) {
        let id = location.href.split('/')[5];
        fetch(`https://my-blog-d12fa.firebaseio.com/My-blog/${id}.json`, {
            method: 'DELETE',
        })
            .then(res => this.redirect('#/home'));
    })

})

app.run('#/home');