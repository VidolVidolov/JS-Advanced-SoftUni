import { saveUserData, extendContext } from '../Helpers/helpers.js';
import { userAuth } from '../auth.js';

export function getLogin(context) {

    extendContext(context)
        .then(function () {
            this.partial('templates/login.hbs');
        })
}

export function postLogin(context) {
    let { email, password } = context.params;

    userAuth.signInWithEmailAndPassword(email, password)
        .then(res => {
            saveUserData(res.user.email, res.user.uid);
            this.redirect('#/home');
        });
}