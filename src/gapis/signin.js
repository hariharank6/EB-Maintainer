import * as firebase from 'firebase'
import { initClient } from './email'
import appConfig from '../store/storeDataInitConfig'

firebase.initializeApp(appConfig.config.firebase)
firebase.analytics()

const getUser = () => {
    return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
            resolve(firebase.auth().currentUser)
        }
        else {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    // firebase.auth().signOut().then(()=> {
                    //     console.log("signed out")
                    // })
                    resolve(user)
                } else {
                    // No user is signed in.
                    reject(null)
                }
            });
            // if ((localStorage.getItem("userEmail") && localStorage.getItem("token")) || (localStorage.getItem("isAnonymous") && localStorage.getItem("uid"))) {
            //     return true
            // }
            // return false
        }
    })
}

const initGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope(appConfig.config.firebase.scopes)
    provider.setCustomParameters({
        'access_type': 'offline'
    });
    firebase.auth().signInWithRedirect(provider)
    localStorage.setItem("isGoogleSigninProgress", true)
}

const handleSignin = () => {
    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken;
            console.log("Access token:", token)
            // ...
        }
        // The signed-in user info.
        const user = result.user;
        if (user?.email && user.uid) {
            localStorage.setItem("userEmail", user.email)
            // localStorage.setItem("token", user.refreshToken)
            localStorage.setItem("uid", user.uid)
            localStorage.removeItem("isGoogleSigninProgress")
            // setIsSignedin && setIsSignedin("signedin")
        }
        // else {
        //     localStorage.setItem("isGoogleSigninProgress", false)
        //     setIsSignedin && setIsSignedin()
        // }
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // if (localStorage.getItem("isGoogleSigninProgress") == "true") {
        //     localStorage.setItem("isGoogleSigninProgress", false)
        //     setIsSignedin && setIsSignedin()
        // }
        // ...
    });
}

const initGuestSignin = () => {
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
            // setIsSignedin()
            // ...
        } else {
            // User is signed out.
            // ...
        }
        // ...
    });
}


export {
    getUser,
    initGoogleSignin,
    initGuestSignin,
    handleSignin
}