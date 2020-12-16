import { home, create, createPost, details, edit, editPost, del } from "./catalog.js";
import { register, registerPost, login, loginPost, logout } from './userAuth.js';
const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home);

    this.get('#/register', register);
    this.post('#/register', ctx => { registerPost.call(ctx) });

    this.get('#/login', login);
    this.post('#/login', ctx => { loginPost.call(ctx) });

    this.get('#/logout', logout);

    this.get('#/create', create);
    this.post('#/create', ctx => { createPost.call(ctx) });

    this.get('#/details/:id', details);

    this.get('#/edit/:id', edit);
    this.post('#/edit/:id', ctx => { editPost.call(ctx) });
    this.get('#/delete/:id', del);

})

app.run();