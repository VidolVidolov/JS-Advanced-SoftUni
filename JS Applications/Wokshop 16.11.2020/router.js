let root = document.getElementById('app');


let routes = {
    'login': 'login-template',
    'register': 'register-template',
    'home': 'home-template',
    'addMovie': 'addMovie-template',
    'details': 'details-template'
}

let router = async (fullPath) => {
    let [path, id] = fullPath.split('/');
    console.log(path);
    let appElement = document.getElementById('app');
    let templateData = authService.getData();
    switch (path) {
        case 'home':
            templateData.movies = await authService.getAll()
            break;
        case 'logout':
            authService.logOut();
            return navigate('home');;
        case 'details':
            let movieDetails = await authService.getOne(id);
            Object.assign(templateData, movieDetails);
            break;
        default:
            break;
    }
    let template = Handlebars.compile(document.getElementById(routes[path]).innerHTML);
    appElement.innerHTML = template(templateData);

}

const navigate = (path) => {
    history.pushState({}, '', path);
    router(path);
}
