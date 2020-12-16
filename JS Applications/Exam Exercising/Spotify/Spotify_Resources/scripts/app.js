const userAuth = firebase.auth();
const app = Sammy('#root', function () {

    this.use('Handlebars', 'hbs');

    this.get('/home', async function getHome(context) {

        fetch('https://for-exampreps.firebaseio.com/Spotify.json')
            .then(res => res.json())
            .then(data => {
                if (data == null) {
                    context.songs = [];
                } else {
                    context.songs = Object.keys(data).map(id => {
                        let obj = { id, ...data[id] }
                        if (data[id].creator == getUserData().email) {
                            Object.assign(obj, { creator: true });
                        } else {
                            Object.assign(obj, { creator: false });
                        }
                        return obj;
                    });
                    context.songs.sort((a, b) => b.likes - a.likes);
                }
                extendContext(context)
                    .then(function () {
                        this.partial('templates/home.hbs');
                    })
            })

    });

    this.get('/register', function getRegister(context) {

        extendContext(context)
            .then(function () {
                this.partial('templates/register.hbs');
            })

    });
    this.post('/register', function postRegister(context) {
        let { email, password } = context.params;

        userAuth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res);
                saveUserData(res.user.email, res.user.uid);
                this.redirect('/home');
            });
    });

    this.get('/login', function getLogin(context) {

        extendContext(context)
            .then(function () {
                this.partial('templates/login.hbs');
            })
    })
    this.post('/login', function postLogin(context) {
        let { email, password } = context.params;

        userAuth.signInWithEmailAndPassword(email, password)
            .then(res => {
                saveUserData(res.user.email, res.user.uid);
                this.redirect('/home');
            });
    })

    this.get('/logout', function logout(context) {

        localStorage.removeItem('user');
        this.redirect('/login');
    })

    this.get('/create', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('templates/create.hbs');
            })
    })
    this.post('/create', function (context) {
        let { title, artist, imageUrl } = context.params;

        let obj = { title, artist, imageUrl, creator: getUserData().email, likes: 0, listened: 0 };
        fetch('https://for-exampreps.firebaseio.com/Spotify.json', {
            method: 'POST',
            body: JSON.stringify(obj)
        })
            .then(res => {
                this.redirect('/home');
            })
    })

    this.get('/delete/:id', function () {
        let id = location.href.split('/')[4];
        fetch(`https://for-exampreps.firebaseio.com/Spotify/${id}.json`, { method: 'DELETE' })
            .then(res => this.redirect('/home'));
    });

    this.get('/like/:id', function () {
        let id = location.href.split('/')[4];

        fetch(`https://for-exampreps.firebaseio.com/Spotify/${id}.json`)
            .then(res => res.json())
            .then(data => {
                data.likes++;
                fetch(`https://for-exampreps.firebaseio.com/Spotify/${id}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ likes: data.likes }),
                })
                    .then(res => this.redirect('/home'));
            })
    });

    this.get('/listen/:id', function () {
        let id = location.href.split('/')[4];

        fetch(`https://for-exampreps.firebaseio.com/Spotify/${id}.json`)
            .then(res => res.json())
            .then(data => {
                data.listened++;
                fetch(`https://for-exampreps.firebaseio.com/Spotify/${id}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ listened: data.listened }),
                })
                    .then(res => this.redirect('/home'));
            })
    });

    this.get('/mySongs', function (context) {

        fetch('https://for-exampreps.firebaseio.com/Spotify.json')
            .then(res => res.json())
            .then(data => {
                if (data == null) {
                    context.songs = [];
                } else {
                    
                    context.songs = Object.keys(data).map(id => {
                        let obj = { id, ...data[id] }
                        if (data[id].creator == getUserData().email) {
                            Object.assign(obj, { creator: true });
                        } else {
                            Object.assign(obj, { creator: false });
                        }
                        return obj;
                    });
                    context.songs = context.songs.filter(x => x.creator == true);
                    context.songs.sort((a, b) => b.listened - a.listened);
                }
                extendContext(context)
                    .then(function () {
                        this.partial('templates/mySongs.hbs');
                    })
            })
    });


    function extendContext(context) {

        context.loggedIn = checkLoggedIn();
        if (context.loggedIn) {
            context.email = getUserData().email;
        }
        return context.loadPartials({
            'header': 'templates/header.hbs',
            'song': 'templates/singleSong.hbs',
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

app.run('/home');