export async function extendContext(context) {
    context.loggedIn = checkLoggedIn();
    if (context.loggedIn === true) {
        context.email = getUserData().email;
    }
    return context.partials = {
        header: await context.load('templates/header.hbs'),
        pet: await context.load('templates/pet.hbs'),
    };
}

export function saveUserData(email, token) {

    let user = {
        email,
        token,
    };
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserData() {
    let { email, token } = JSON.parse(localStorage.getItem('user'));
    return {
        email,
        token,
    }
}

export function checkLoggedIn() {
    let loggedIn = false;
    if (localStorage.getItem('user') != undefined) {
        loggedIn = true;
    }
    return loggedIn;
}

// export function notification(operation, message){
//     let toChange = document.getElementById('notifications');
//     let succ = document.getElementById('infoBox');
//     let error = document.getElementById('errorBox');
//     let loading = document.getElementById('loadingBox');

//     if(operation == 'succ'){
//         succ.textContent = message;
//         succ.children[0].style.display = 'block';
//         setTimeout(function(){
//             succ.children[0].style.display = 'none';
//         },3000);
//     }else if(operation === 'error'){
//         error.children[0].textContent = message;
//         setTimeout(function(){
//             error.children[0].style.display = 'none';
//         },3000);
//     }else {
//         loading.children[0].style.display = 'block';
//         setTimeout(function(){
//             loading.children[0].style.display = 'none';
//         },1000);
//     }
// }