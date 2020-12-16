import { comment, del, details, getCreate, home, like, postCreate, profile } from './catalog.js';
import { getRegister, postRegister, getLogin, postLogin, logout } from './services.js';

const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home);

    this.get('/register', getRegister);
    this.post('/register', (context) => {postRegister.call(context);});

    this.get('/login', getLogin);
    this.post('/login', postLogin);

    this.get('/logout', logout);

    this.get('/create', getCreate);
    this.post('/create', postCreate);

    this.get('#/details/:id', details)
    this.get('#/delete/:id', del)

    this.get('#/like/:id', like)
    this.post('#/comments/:id', comment)

    this.get('/profile', profile);

})

app.run();