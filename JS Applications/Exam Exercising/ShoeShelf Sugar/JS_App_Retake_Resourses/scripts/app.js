import { home, login, register, registerPost, loginPost, logout, createOffer, createOfferPost, details, edit, editPost, del, buy } from './catalog.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home);
    this.get('#/register', register);
    this.post('#/register', ctx => { registerPost.call(ctx) });

    this.get('#/login', login);
    this.post('#/login', ctx => { loginPost.call(ctx) });
    this.get('#/logout', logout);

    this.get('#/create', createOffer);
    this.post('#/create', ctx => { createOfferPost.call(ctx) });

    this.get('#/details/:id', details);

    this.get('#/edit/:id', edit);
    this.post('#/edit/:id', ctx => { editPost.call(ctx) });

    this.get('#/delete/:id', del);
    this.get('#/buy/:id', buy);
})

app.run();