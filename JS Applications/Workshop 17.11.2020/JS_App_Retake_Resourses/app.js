
const userAuth = firebase.auth();

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', async function (context) {

        let response = await fetch('https://students-eef70.firebaseio.com/Shoes.json');

        let data = await response.json();
        context.offers = [];
        Object.keys(data).forEach(id => context.offers.push({ id, ...data[id] }));
        extendContext(context)
            .then(function (context) {
                this.partial('./templates/home.hbs');
            })
    });

    this.get('#/register', function (context) {
        extendContext(context)
            .then(function (context) {
                this.partial('./templates/register.hbs');
            })
    })

    this.get('#/login', function (context) {

        extendContext(context)
            .then(function (context) {
                this.partial('./templates/login.hbs');
            })
    })

    this.get('#/logout', function (context) {
        userAuth.signOut()
            .then(res => {
                localStorage.removeItem('user');
                this.redirect('#/home');
            })
            .catch(err => console.log(err.message));
    })

    this.get('#/editOffer/:id', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/editOffer.hbs');
                console.log(context);
                let id = context.params.id;
                let user = getUserData();
                let userId = user.id;
                fetch(`https://students-eef70.firebaseio.com/Shoes/${id}.json`)
                    .then(res => res.json())
                    .then(data => {

                        function editOffer(data, context, id) {
                            let user = getUserData();
                            let button = document.getElementsByTagName('button')[0];
                            button.addEventListener('click', e => {
                                e.preventDefault();
                                let [name, price, imageUrl, brand] = document.getElementsByTagName('input');
                                let description = document.getElementsByTagName('textarea')[0].value;
                                let edited = {
                                    name: name.value,
                                    price: price.value,
                                    imageUrl: imageUrl.value,
                                    description,
                                    brand: brand.value,
                                }

                                let obj = Object.assign(data, edited);
                                fetch(`https://students-eef70.firebaseio.com/Shoes/${id}.json`, {
                                    method: 'PATCH',
                                    body: JSON.stringify(obj),
                                })
                                    .then(data => {
                                        context.redirect('#/home');
                                    })
                            })
                        }
                        editOffer(data, context, id);
                    });

            })
    })

    this.get('#/createOffer', function (context) {

        extendContext(context)
            .then(function (context) {
                this.partial('./templates/createOffer.hbs');
            })
    })

    this.get('#/details/:id', async function (context) {

        let id = context.params.id;
        let response = await fetch(`https://students-eef70.firebaseio.com/Shoes/${id}.json`);

        let data = await response.json();
        const actualOfferData = data;
        const imTheSalesMan = actualOfferData.salesman == getUserData().id ? true : false;
        context.data = { ...actualOfferData, imTheSalesMan };
        if (data.pplBoughtIt.includes(getUserData().id)) {
            context.data.bought = true;
        }
        context.idForProduct = id;

        extendContext(context)
            .then(function () {
                this.partial('./templates/details.hbs');
            })
    })

    this.post('#/register', function (context) {
        let { email, password, rePassword } = context.params;

        if (password != rePassword) {
            return;
        }

        userAuth.createUserWithEmailAndPassword(email, password)
            .then(data => {
                console.log(data);
                this.redirect('#/login');
            })
            .catch(err => console.log(err.message));
    })

    this.post('#/login', function (context) {
        let { email, password } = context.params;

        userAuth.signInWithEmailAndPassword(email, password)
            .then(data => {
                saveUserData(data);
                this.redirect('#/home');
            })
            .catch(err => console.log(err.message));
    })

    this.post('#/createOffer', function (context) {

        let user = getUserData();
        let { name, price, imageUrl, description, brand } = context.params;
        let object = {
            name,
            price,
            imageUrl,
            description,
            brand,
            salesman: user.id,
            pplBoughtIt: [0],
        }
        fetch(`https://students-eef70.firebaseio.com/Shoes.json`, {
            method: 'POST',
            body: JSON.stringify(object),
        })
            .then(res => this.redirect('#/home'))
            .catch(err => console.log(err.message));

    })

    this.get('#/delete/:id', function (context) {
        let id = context.params.id;
        fetch(`https://students-eef70.firebaseio.com/Shoes/${id}.json`, { method: 'DELETE' })
            .then(res => this.redirect('#/home'));
    })

    this.get('#/buy/:id', function (context) {
        let userId = getUserData().id;
        let idForProduct = context.params.id;
        fetch(`https://students-eef70.firebaseio.com/Shoes/${idForProduct}.json`)
            .then(res => res.json())
            .then(offerData => {
                offerData.pplBoughtIt.push(userId);
                fetch(`https://students-eef70.firebaseio.com/Shoes/${idForProduct}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify(offerData),
                })
                .then(res => {
                    this.redirect('#/home');
                })
            })

    })

    function extendContext(context) {

        const user = getUserData();
        context.loggedIn = Boolean(user);
        context.email = user ? user.email : '';
        context.id = user ? user.id : '';

        return context.loadPartials({
            'header': './templates/header.hbs',

            'footer': './templates/footer.hbs',
        })
    }

    function saveUserData(data) {
        let obj = {
            id: data.user.uid,
            email: data.user.email,
            loggedIn: data.user.uid ? data.user.uid : '',
        }
        localStorage.setItem('user', JSON.stringify(obj))
    }
    function getUserData() {
        const user = localStorage.getItem('user')
        return user ? JSON.parse(user) : null;
    }
})


app.run('#/home');
