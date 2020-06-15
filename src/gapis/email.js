import appConfig from '../store/storeDataInitConfig'

const initClient = () => {
    gapi.load('client:auth2', initClientCbk)
}

const initClientCbk = () => {
    gapi.client.init({
        apiKey: appConfig.config.firebase.apiKey,
        clientId: appConfig.config.firebase.clientId,
        discoveryDocs: "",
        scope: appConfig.config.firebase.scopes
    }).then(function () {
        // Make sure the Google API Client is properly signed in
        if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
            console.log("signed in")
        } else {
            firebase.auth().signOut(); // Something went wrong, sign out
        }
    })
}

export {
    initClient
}