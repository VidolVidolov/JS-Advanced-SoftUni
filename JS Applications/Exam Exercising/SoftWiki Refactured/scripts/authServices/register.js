import { saveUserData, extendContext } from '../Helpers/helpers.js';
import { userAuth } from '../auth.js';
export function getRegister(context) {
    {
        extendContext(context)
            .then(function () {
                this.partial('templates/register.hbs');
            })
    }
}

export function postRegister(context) {
    let { email, password, repeatPassword } = context.params;

    if (password != repeatPassword) {
        return;
    }

    userAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            saveUserData(res.user.email, res.user.uid);
            this.redirect('#/home');
        });

}