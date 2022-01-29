const header = document.getElementById("header");
const Email = document.getElementById("Email");
const Password = document.getElementById("Password");
const SignIn = document.getElementById("Sign-in");
const account = document.getElementById("account");
const btnText = document.getElementById("btn-text");

const firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);

window.history.forward();
    function noBack() {
        window.history.forward();
}

const clearErrors = () => {
    document.getElementById("Email-error").style.display = "none";
    document.getElementById("Password-error").style.display = "none";
}

const clearInputs = () => {
    Email.innerHTML = '';
    Password.innerHTML = '';
}

btnText.addEventListener('click', () => {
    window.open("Sign-up.html", "_self");
});

const handleSignIn = () => {
        clearErrors();
        const email = Email.value;
        const password = Password.value;
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    document.getElementById("Email-error").innerHTML = err.message; 
                    document.getElementById("Email-error").style.display = "flex";
                    console.log(err.message);
                    break;
                case "auth/wrong-password":
                    document.getElementById("Password-error").style.display = "flex";
                    document.getElementById("Password-error").innerHTML = err.message;
                    console.log(err.message);
                    break;
    }});
    promise.then(user => {
        window.open("./main/index.html", "_self")
    }).catch(error => {
        console.error(error);
    });
};

const handleSignUp = () => {
    clearErrors();
    const email = Email.value;
    const password = Password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch((err) => {
        switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
                document.getElementById("Email-error").innerHTML = err.message; 
                document.getElementById("Email-error").style.display = "flex";
                console.log(err.message);
                break;
            case "auth/weak-password":
                document.getElementById("Password-error").style.display = "flex";
                document.getElementById("Password-error").innerHTML = err.message;
                console.log(err.message);
                break;
}});
};

const logout = () => {
    firebase.auth().SignOut();
};

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
        clearInputs();
        console.log(firebaseUser);
    }
    else {
        console.log('not logged in')
    }
});
