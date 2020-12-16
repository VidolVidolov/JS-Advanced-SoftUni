var firebaseConfig = {
    apiKey: "AIzaSyBR6c66U3hFuaZq7aWtdjFkUqELlcZS3-o",
    authDomain: "for-exampreps.firebaseapp.com",
    databaseURL: "https://for-exampreps.firebaseio.com",
    projectId: "for-exampreps",
    storageBucket: "for-exampreps.appspot.com",
    messagingSenderId: "675992163801",
    appId: "1:675992163801:web:abfa68d541c46f927d75c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const userAuth = firebase.auth();
