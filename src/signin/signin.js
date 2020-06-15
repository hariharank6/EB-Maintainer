import * as firebase from 'firebase'
import appConfig from '../store/storeDataInitConfig'

firebase.initializeApp(appConfig.config.firebase)

const checkSignin = () => {
    if ((localStorage.getItem("username") && localStorage.getItem("token")) || (localStorage.getItem("isAnonymous") && localStorage.getItem("uid"))) {
        return true
    }
    return false
}

const initGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope("https://www.googleapis.com/auth/gmail.readonly")
    firebase.auth().signInWithRedirect(provider)
    localStorage.setItem("isGoogleSigninProgress", true)
}

const initGuestSignin = (forceUpdate) => {
    firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ...
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            const isAnonymous = user.isAnonymous;
            const uid = user.uid;
            localStorage.setItem("isAnonymous", true)
            localStorage.setItem("uid", uid)
            forceUpdate()
            // ...
        } else {
            // User is signed out.
            // ...
        }
        // ...
    });
}

const handleSignin = (forceUpdate) => {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            console.log("Access token:", token)
            // ...
        }
        // The signed-in user info.
        const user = result.user;
        if (user?.displayName && user.refreshToken && user.uid) {
            localStorage.setItem("username", user.displayName)
            localStorage.setItem("token", user.refreshToken)
            localStorage.setItem("uid", user.uid)
            localStorage.removeItem("isGoogleSigninProgress")
            forceUpdate && forceUpdate()
        }
        else {
            localStorage.setItem("isGoogleSigninProgress", false)
            forceUpdate && forceUpdate()
        }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        if(localStorage.getItem("isGoogleSigninProgress") == "true") {
            localStorage.setItem("isGoogleSigninProgress", false)
            forceUpdate && forceUpdate()
        }
        // ...
    });
}

export {
    checkSignin,
    initGoogleSignin,
    initGuestSignin,
    handleSignin
}