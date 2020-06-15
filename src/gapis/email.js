import appConfig from '../store/storeDataInitConfig'
import { changeDateFormat } from "../components/dateComponent"

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

export const dataScrap = (vendor, message) => {
    if (vendor == "amazonPay"){
        const billAmount = parseFloat(message.split("Rs.")[1].split(" ")[0])
        const consumerNumber = parseInt(message.split("Consumer Number ")[1].split(" ")[0].slice(2,))
        const dueDate = changeDateFormat(message.split("due on ")[1].split(".")[0])
        const messageData = {
            billAmount,
            consumerNumber,
            dueDate
        }
        return messageData
    }
    else{
        console.log("Invalid Vendor")
    }
}

export {
    initClient
}