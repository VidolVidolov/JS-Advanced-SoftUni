import { checkLoggedIn, extendContext, getUserData } from './common.js'

export async function home(context) {

    await extendContext(context);

    if (this.loggedIn === true) {
        this.email = getUserData().email;

        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Pets.json`);
        let data = await res.json();
        if (data != undefined) {
            context.data = Object.keys(data).map(id => ({ id, ...data[id] }));
            context.data = context.data.filter(x => x.owner != getUserData().email);
        } else {
            context.data = [];
        }

        this.partial('templates/dashboard.hbs');


    } else {
        this.partial('templates/home.hbs');
    }
}


export async function getAddPet(context) {
    await extendContext(context);
    if (this.loggedIn === true) {
        this.email = getUserData().email;
    }
    this.partial('templates/create.hbs');
}

export async function postAddPet() {
    let { name, description, imageUrl, category } = this.params;
    let token = getUserData().token;
    let obj = { name, description, imageUrl, category, owner: getUserData().email, pets: 0 };

    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Pets.json?auth=${token}`, {
        method: 'POST',
        body: JSON.stringify(obj),
    });

    let data = await res.json();
    this.redirect('/');
}

export async function getDetails(context) {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Pets/${id}.json`);
    let data = await res.json();
    this.data = { id, ...data };
    await extendContext(context);
    this.partial('templates/details.hbs');
}

export async function del() {
    let id = location.href.split('/')[5];
    let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Pets/${id}.json?auth=${getUserData().token}`, { method: 'DELETE' });
    console.log(res);
    this.redirect('/');
}

export async function getMyPets(context) {
    await extendContext(context);

    if (this.loggedIn === true) {
        this.email = getUserData().email;

        let res = await fetch(`https://for-exam-prep-v2.firebaseio.com/Pets.json`);
        let data = await res.json();
        
        if (data != undefined) {
            context.data = Object.keys(data).map(id => {
                 let creator = getUserData().email == data[id].creator;

                 return {
                     id, 
                     ...data[id],
                     creator,
                 }
            });
            context.data = context.data.filter(x => x.owner == getUserData().email);
        } else {
            context.data = [];
        }

        this.partial('templates/myPets.hbs');
    }

}