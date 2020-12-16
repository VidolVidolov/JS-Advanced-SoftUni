import { home, dashboard, create, createPost, details, commentPost, like, del, profile } from './catalog.js'
import { register, registerPost, login, loginPost, logout } from './userAuth.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home);
    this.get('#/dashboard', dashboard)
    this.get('#/register', register);
    this.post('#/register', ctx => { registerPost.call(ctx) });

    this.get('#/login', login);
    this.post('#/login', ctx => { loginPost.call(ctx) });

    this.get('#/logout', logout);

    this.get('#/create', create)
    this.post('#/create', ctx => { createPost.call(ctx) });

    this.get('#/details/:id', details);

    this.post('#/comment/:id', ctx => { commentPost.call(ctx) });
    this.get('#/like/:id', like);
    this.get('#/delete/:id', del);
    this.get('#/profile', profile);

})

app.run();