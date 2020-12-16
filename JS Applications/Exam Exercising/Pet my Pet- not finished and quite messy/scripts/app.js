import { getLogin, getRegister, postLogin, postRegister,logout } from './userServise.js'
import { getAddPet, home, postAddPet, getDetails, del, getMyPets} from './catalog.js'

const app = Sammy('#site-content', function () {

    this.use('Handlebars', 'hbs');

    this.get('/', home)

    this.get('/register', getRegister)
    this.post('/register', (context) => {postRegister.call(context)});

    this.get('/login', getLogin)
    this.post('/login', (context) => {postLogin.call(context)})

    this.get('/logout', logout);

    this.get('/addPet', getAddPet);
    this.post('/addPet', (context) => {postAddPet.call(context)})

    this.get('#/details/:id', getDetails)
    this.get('#/delete/:id', del)
    this.get('/myPets', getMyPets)
});

app.run();