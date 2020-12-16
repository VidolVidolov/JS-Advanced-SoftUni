export function logout(context) {

    localStorage.removeItem('user');
    this.redirect('#/login');
}