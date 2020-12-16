import { home, addDestination, addPost, details, edit, editPost, myDestinations, del } from "./catalog.js";
import { login, register, registerPost, loginPost, logout } from './userAuth.js';
const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home);

    this.get('#/register', register);
    this.post('#/register', ctx => { registerPost.call(ctx) });

    this.get('#/login', login);
    this.post('#/login', ctx => { loginPost.call(ctx) });

    this.get('#/logout', logout);

    this.get('#/add', addDestination);
    this.post('#/add', ctx => { addPost.call(ctx) });

    this.get('#/details/:id', details);

    this.get('#/edit/:id', edit);
    this.post('#/edit/:id', ctx => { editPost.call(ctx) });

    this.get('#/myDestinations', myDestinations);
    this.get('#/delete/:id', del);


})


app.run();