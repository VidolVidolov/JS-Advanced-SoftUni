let userAuth = firebase.auth();

const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    this.get('#/home', function (context) {
        fetch('https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe.json')
            .then(res => res.json())
            .then(data => {
                let shoes = Object.keys(data).map(id => ({ id, ...data[id] }));
                context.shoes = shoes;
                extendcontext(context)
                    .then(function () {
                        this.partial('sss/home.hbs');
                    })
            })

    })

    this.get('#/login', function (context) {

        extendcontext(context)
            .then(function () {
                this.partial('sss/login.hbs');
            })
    })

    this.post('#/login', function (context) {
        let { email, password } = context.params;
        userAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                saveUserData(res.user.email, res.user.uid);
                this.redirect('#/home');
            })
    })

    this.get('#/register', function (context) {
        extendcontext(context)
            .then(function () {
                this.partial('sss/register.hbs');
            })
    })

    this.post('#/register', function (context) {
        let { email, password, repassword } = context.params;
        if (email == '') {
            return;
        }
        if (password.lenght < 6) {
            return;
        }
        if (password != repassword) {
            return;
        }

        userAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                this.redirect('#/home');
            })
    })

    this.get('#/logout', function () {
        localStorage.removeItem('user');
        this.redirect('#/home');
    })

    this.get('#/createOffer', function (context) {

        extendcontext(context)
            .then(function () {
                this.partial('sss/createOffer.hbs');
            })
    })

    this.post('#/createOffer', function (context) {
        let { name, price, imageUrl, description, brand } = context.params;
        if (name == '' || price == '' || imageUrl == '' || description == '' || brand == '') {
            return;
        }
        let offer = {
            name,
            price,
            imageUrl,
            description,
            brand,
            creator: getUserData().id,
            pplBoughtIt: [0],
        };

        fetch('https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe.json', {
            method: 'POST',
            body: JSON.stringify(offer),
        })
            .then(res => {
                this.redirect('#/home');
            })
    })

    this.get('#/details/:id', function (context) {
        let id = location.href.split('/')[5];
        let userId = getUserData().id;
        fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`)
            .then(res => res.json())
            .then(shoe => {
                context.shoe = shoe;
                context.id = id;
                if (shoe.creator == userId) {
                    context.creator = true;
                } else {
                    context.creator = false;
                }
                if(shoe.pplBoughtIt.includes(userId)){
                    context.bought = true;
                }
                extendcontext(context)
                    .then(function () {
                        this.partial('sss/details.hbs');
                    })
            })

    })

    this.get('#/editOffer/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`)
            .then(res => res.json())
            .then(data => {
                context.shoe = data;
                context.id = id;
                extendcontext(context)
                    .then(function () {
                        this.partial('sss/edit.hbs');
                    })
            })
    })

    this.post('#/editOffer/:id', function (context) {
        let id = location.href.split('/')[5];

        let { name, price, imageUrl, description, brand } = context.params;

        let neww = {
            name,
            price,
            imageUrl,
            description,
            brand,
        }
        fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(neww),
        })
            .then(res => {
                this.redirect(`#/details/${id}`);
            })
    })

    this.get('#/delete/:id', function (context) {
        let id = location.href.split('/')[5];

        fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`, {
            method: 'DELETE',
        })
            .then(res => {
                this.redirect('#/home');
            })
    })

    this.get('#/buy/:id', function (context) {
        let id = location.href.split('/')[5];
        let userId = getUserData().id;
        fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`)
            .then(res => res.json())
            .then(shoe => {
                shoe.pplBoughtIt.push(userId);
                fetch(`https://shoe-shop-e6b1c.firebaseio.com/Shop-Shoe/${id}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ pplBoughtIt: shoe.pplBoughtIt }),
                })
                    .then(res => {
                        this.redirect(`#/details/${id}`);
                    })
            })

    })
    
    function extendcontext(context) {
        context.loggedIn = checkLoggedIn();
        if (checkLoggedIn() == false) {
            context.email = '';
        } else {
            context.email = getUserData().email;
        }


        return context.loadPartials({
            'header': 'sss/header.hbs',
            'footer': 'sss/footer.hbs',
            'shoe': 'sss/singleShoe.hbs',
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