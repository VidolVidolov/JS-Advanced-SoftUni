
function addEventListeners() {

    let navigationTemplate = Handlebars.compile(document.getElementById('navigation-template').innerHTML);
    let movieCardTemplate = Handlebars.compile(document.getElementById('movie-card-template').innerHTML);

    Handlebars.registerPartial('navigation-template', navigationTemplate);
    Handlebars.registerPartial('movie-card', movieCardTemplate);

    navigate('home');

}

function navigateHandler(e) {
    e.preventDefault();
    if (e.target.tagName != 'A') {
        return;
    }

    let url = new URL(e.target.href);
    navigate(url.pathname.slice(1));
}

function onLoginSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms.login);
    let email = formData.get('email');
    let password = formData.get('password');

    authService.login(email, password)
        .then(data => {
            navigate('home');
        })
}

function onRegisterSubmit(e) {
    e.preventDefault();

    let formData = new FormData(document.forms.reg);
    let email = formData.get('email');
    let password = formData.get('password');
    let repeatPassword = formData.get('repeatPassword');

    if (password != repeatPassword) {
        let section = document.getElementById('errorSection');
        setTimeout(function () {
            section.style.display = 'none';
        }, 1000);
        section.style.display = 'block';
        return;
    }

    authService.register(email, password, repeatPassword)
        .then(data => {
            let section = document.getElementById('success');
            setTimeout(function () {
                section.style.display = 'none';
            }, 1000);
            section.style.display = 'block';
            navigate('home');
        })
}


function addMovieViaForm(e) {
    e.preventDefault();

    let data = new FormData(document.forms.addMovieViaFrom);

    let title = data.get('title');
    let description = data.get('description');
    let imageUrl = data.get('imageUrl');

    authService.addMovie(title, description, imageUrl)
        .then(data => {
            navigate('home');
        })
}

function detailsHandler(e){
    e.preventDefault();
    
}
addEventListeners();