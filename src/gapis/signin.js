import firebase from 'firebase/app'
import 'firebase/auth'

import appConfig from '../store/storeDataInitConfig'

firebase.initializeApp(appConfig.config.firebase)

const getUser = (setIsSignedin) => {
    return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
            resolve(firebase.auth().currentUser)
        }
        else {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    if(user.isAnonymous) {
                        localStorage.setItem("signinStatus", "guest")    
                        setIsSignedin("guest")
                    }
                    else {
                        localStorage.setItem("signinStatus", "signedin")
                        setIsSignedin("signedin")
                    }
                    resolve(user)
                } else {
                    firebase.auth().signOut().then(()=> {
                        console.log("signed out")
                    })
                    localStorage.setItem("signinStatus", "unknown")
                    setIsSignedin("unknown")
                    reject(null)
                }
            });
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
    localStorage.setItem("signinStatus", "inprogress")
}

const handleSignin = () => {
    firebase.auth().getRedirectResult().then(function (result) {
        const user = result.user;
        if (user?.email && user.uid) {
            localStorage.setItem("userEmail", user.email)
            localStorage.setItem("uid", user.uid)
        }
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
}

const initGuestSignin = (setIsSignedin) => {
    firebase.auth().signInAnonymously().catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            const uid = user.uid;
            localStorage.setItem("signinStatus", "guest")
            setIsSignedin("guest")
            localStorage.setItem("uid", uid)
        } else {
            setIsSignedin("unknown")
        }
    });
}


export {
    getUser,
    initGoogleSignin,
    initGuestSignin,
    handleSignin
}