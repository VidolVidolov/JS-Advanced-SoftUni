const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');
    let notificationError = () => {
        let errBox = document.getElementById('errorBox');
        errBox.textContent = 'The passwords didint match';
        setTimeout(() => {
            errBox.style.display = 'none';
        }, 1000);
        errBox.style.display = 'block';
    }

    this.get('home', function (context) {

        checkIfLoggedIn(context);

        loadPartials(context).then(function () {
            this.partial('../templates/home/home.hbs');
        });
    })

    this.get('about', function (context) {

        checkIfLoggedIn(context);


        loadPartials(context).then(function () {
            this.partial('../templates/about/about.hbs');
        });
    })

    this.get('login', function (context) {

        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'loginForm': './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('../templates/login/loginPage.hbs');
        });
    })

    this.get('register', function (context) {

        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'registerForm': './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('../templates/register/registerPage.hbs');
        });
    })

    this.get('catalog', async function (context) {

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let req = fetch('https://database-44edf.firebaseio.com/teams.json')
            .then(res => res.json())
            .then(data => {
                let keys = Object.keys(data);
                let object = {};
                keys.forEach((x, index) => {
                    let obj = {
                        _id: x,
                        name: data[x].name,
                        comment: data[x].comment,
                    };
                    object[index] = obj;
                })

                this.teams = object;
            })

        checkIfLoggedIn(context);
        let currUser = await fetch('https://database-44edf.firebaseio.com/users.json')
                                    .then(res => res.json())
                                    .then(data => {
                                        let info =  JSON.parse(localStorage.getItem('userInfo'));
                                        let key =  Object.keys(data).find(x => data[x].id == info.uid);
                                        let user = data[key];
                                        return user;
                                    });
        console.log(currUser);
        context.hasNoTeam = currUser.hasNoTeam;
        await req;
        this.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'team': '../templates/catalog/team.hbs',
        }).then(function () {
            this.partial('../templates/catalog/teamCatalog.hbs');
        })

    })

    this.get('create', function (context) {

        checkIfLoggedIn(context);

        context.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
            'createForm': '../templates/create/createForm.hbs',
        }).then(function () {
            this.partial('../templates/create/createPage.hbs');
        })
    })

    this.get('logout', function (context) {
        firebase.auth().signOut()
            .then(function (response) {
                localStorage.removeItem('userInfo');
                context.redirect('login');
            }).catch(function (error) {
                notificationError();
            });
    })

    this.get(`-MMBwvw358lnjpDuPFs2`, function (context) {
        console.log(context);
        let id = context.path.split('/').filter(x => x)[1];

        context.loadPartials({
            // 'teamMember': '../templates/catalog/teamMember.hbs',
            // 'teamControls': '../templates/catalog/teamControls.hbs',
        })
        .then(function () {
            // this.partial('../templates/common/header.hbs'),
            // this.partial('../templates/catalog/details.hbs'),
        })

    })


    this.post('create', function (context) {
        let { name, comment } = context.params;
        let team = JSON.stringify({
            name,
            comment,
            members: context.username,
        });

        fetch('https://database-44edf.firebaseio.com/teams.json', { method: 'POST', body: team })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                context.redirect('catalog');
            });
    })

    this.post('register', function (context) {
        let { email, password, repeatPassword } = context.params;

        if (password != repeatPassword) {
            notificationError();
            return;
        }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                let user = JSON.stringify({
                    email: res.user.email,
                    hasNoTeam: true,
                    id: res.user.uid,
                })
                fetch('https://database-44edf.firebaseio.com/users.json', { method: 'POST', body: user })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    });
                this.redirect('home');
            })
            .catch(function (error) {
                console.log(err.message);
            });
    })

    this.post('login', function (context) {

        let { email, password } = context.params;
        let hasNoTeam;
        fetch(`https://database-44edf.firebaseio.com/users.json`)
            .then(res => res.json())
            .then(data => {
                hasNoTeam = Object.keys(data).map(x => data[x].hasNoTeam).join('');
                console.log(hasNoTeam);
            });

        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                localStorage.setItem('userInfo', JSON.stringify({ uid: user.uid, email: user.email, hasNoTeam: hasNoTeam }));
                hasNoTeam = '';
                context.redirect('home')
            })
            .catch(function (error) {
                notificationError();
            });
    })

    function loadPartials(context) {
        return context.loadPartials({
            'header': '../templates/common/header.hbs',
            'footer': '../templates/common/footer.hbs',
        })
    }

    function checkIfLoggedIn(context) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            if (userInfo.uid) {
                context.loggedIn = true;
                context.email = userInfo.email;
                // context.hasNoTeam = userInfo.hasNoTeam;
            }
        }
        return context;
    }
})



app.run('home');


