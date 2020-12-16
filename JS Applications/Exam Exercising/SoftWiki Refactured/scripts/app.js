import { getRegister, postRegister } from './authServices/register.js';
import { getLogin, postLogin } from './authServices/login.js';
import { logout } from './authServices/logout.js';
import { del, getCreatePost, getDetails, getEdit, home, postCreatePost, postEdit } from './catalog/catalog.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home)
    this.get('#/home', home)

    this.get('#/register', getRegister);
    this.post('register', postRegister);

    this.get('#/login', getLogin);
    this.post('#/login', postLogin);

    this.get('#/logout', logout);

    this.get('#/create', getCreatePost);
    this.post('#/create', postCreatePost);

    this.get('#/details/:id', getDetails);

    this.get('#/edit/:id', getEdit);
    this.post('#/edit/:id', postEdit);

    this.get('#/delete/:id', del)

})

app.run();