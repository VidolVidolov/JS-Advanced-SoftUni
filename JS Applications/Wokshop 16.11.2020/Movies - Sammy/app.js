const userAuth = firebase.auth();

const app = Sammy('#container', function () {

    this.use('Handlebars', 'hbs');


    this.get('#/home', function (context) {

        fetch('https://wild-wild-west-8e2d7.firebaseio.com/Movies.json')
            .then(res => res.json())
            .then(movies => {
                context.movies = Object.keys(movies).map(key => ({ id: key, ...movies[key] }));
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
            })


    })

    this.get('#/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs')
            })
    })

    this.get('#/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs')
            })
    })

    this.get('#/addMovie', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/addMovie.hbs')
            })
    })

    this.get('#/details/:id', function (context) {
        context.id = location.href.split('/')[5];
        let user = getUser().id;
        fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${context.id}.json`)
            .then(res => res.json())
            .then(movie => {
                if (movie.creator === getUser().id) {
                    context.creator = true;
                } else {
                    context.likes = movie.likes.length;
                    context.creator = false;
                }

                if (movie.likes.includes(user)) {
                    context.notLiked = false;
                } else {
                    context.notLiked = true;
                }
                context.movie = movie;
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })

    })

    this.get('#/editMovie/:id', function (context) {

        let id = location.href.split('/')[5];

        context.id = id;
        fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${id}.json`)
            .then(res => res.json())
            .then(movie => {
                context.movie = movie;
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/editMovie.hbs')
                    })
            })
    })

    this.post('#/register', function (context) {
        let { email, password, repeatPassword } = context.params;

        if (password != repeatPassword) {
            error('Passwords should match!');
            return;
        }

        userAuth.createUserWithEmailAndPassword(email, password)
            .then(function (data) {
                success('Successful Registration!');
                context.redirect('#/home');
            })
            .catch(err => error(err.message));
    })

    this.post('#/login', function (context) {
        let { email, password } = context.params;


        userAuth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
                saveUserData(user);
                success('Successfuly logged in!');
                context.redirect('#/home');
            })
            .catch(err => error(err.message));
    })

    this.get('#/logout', function (context) {

        localStorage.removeItem('user')
        this.redirect('#/home');
    })

    this.post('#/addMovie', function (context) {
        let { title, description, imageUrl } = context.params;
        let user = getUser();
        let creator = user.id;
        let film = {
            title,
            description,
            imageUrl,
            creator,
            likes: [creator]
        };

        fetch('https://wild-wild-west-8e2d7.firebaseio.com/Movies.json', {
            method: 'POST',
            body: JSON.stringify(film),
        })
            .then(res => {
                success('Successfully added movie!');
                this.redirect('#/home');
            })
            .catch(err => error(err.message));
    })

    this.post('#/editMovie/:id', function (context) {
        let { title, description, imageUrl, id } = context.params;
        let movie = {
            title,
            description,
            imageUrl,
        };

        fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify(movie),
        })
            .then(res => {
                success('Successfully edited movie!');
                this.redirect(`#/details/${id}`)
            })
            .catch(err => error(err.message));
    })

    this.get('#/delete/:id', function (context) {
        let id = location.href.split('/')[5];
        console.log(id);
        fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${id}.json`, {
            method: 'DELETE',
        })
            .then(res => {
                success('Successfully deleted movie!');

                this.redirect('#/home');
            })
    })

    this.get('#/like/:id', function (context) {
        let id = location.href.split('/')[5];
        fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${id}.json`)
            .then(res => res.json())
            .then(movie => {
                let { likes } = movie;
                let user = getUser().id;
                likes.push(user);
                console.log(likes);
                fetch(`https://wild-wild-west-8e2d7.firebaseio.com/Movies/${id}.json`, {
                    method: 'PATCH',
                    body: JSON.stringify({ likes }),
                })
                    .then(res => {
                        success('Successfully liked the movie!');
                        this.redirect(`#/details/${id}`);
                    })


            })
    })

    function extendContext(context) {
        context.loggedIn = Boolean(localStorage.getItem('user'));
        let user = JSON.parse(localStorage.getItem('user'));
        user ? context.email = user.email : context.email = '';
        return context.loadPartials({
            'header': './templates/header.hbs',
            'footer': './templates/footer.hbs',
            'movie': './templates/movie.hbs',
        })
    }

    function saveUserData(user) {
        let email = user.user.email;
        let id = user.user.uid;

        localStorage.setItem('user', JSON.stringify({ email, id }));
    }

    function getUser() {
        let email = JSON.parse(localStorage.getItem('user')).email;
        let id = JSON.parse(localStorage.getItem('user')).id;
        let loggedIn = Boolean(localStorage.getItem('user'));
        return {
            email,
            id,
            loggedIn,
        }
    }

    function success(messagee) {
        let box = document.getElementById('success');
        setTimeout(function () {
            box.style.display = 'none';
        }, 1000);
        let message = document.getElementById('successBox');
        message.textContent = messagee;
        box.style.display = 'block';
    }

    function error(messagee) {
        let box = document.getElementById('error');
        setTimeout(function () {
            box.style.display = 'none';
        }, 1000);
        let message = document.getElementById('errorBox');
        message.textContent = messagee;
        box.style.display = 'block';
    }

});
app.run('#/home');