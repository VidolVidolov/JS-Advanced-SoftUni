const apiKey = 'AIzaSyAWCFDImRVMd-lkDysiNxQJFHn7R0LFg7Q';

const authService = {

    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        let data = await response.json();
        localStorage.setItem('auth', JSON.stringify(data));
        return data;
    },

    async register(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });
        let data = await response.json();
        return data;

    },

    getData() {

        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email,
            }
        } catch (error) {
            return {
                isAuthenticated: false,
                email: '',
            }
        }

    },

    logOut() {
        localStorage.setItem('auth', '')
    },

    async addMovie(title, description, imageUrl) {
        let response = await fetch('https://movies-exam-prep-48470.firebaseio.com/.json', {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });
        let data = await response.json();
        return data;
    },

    async getAll() {
        let response = await fetch('https://movies-exam-prep-48470.firebaseio.com/.json');
        let js = await response.json();
        let data = await Object.keys(js).map(key => ({ key, ...js[key] }));
        
        return data;

    },

    async getOne(id){
        let response = await fetch(`https://movies-exam-prep-48470.firebaseio.com/${id}.json`);
        
        return response.json();
    }

}