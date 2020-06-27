import * as firebase from 'firebase'

import appConfig from '../store/storeDataInitConfig'
import { changeDateFormat, updateServicesInNeedOfData, newBills } from "../common/common"

async function getAccessToken() {
    const url = appConfig.config.url.getAccessToken
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            client_id: appConfig.config.firebase.clientId,
            client_secret: appConfig.config.firebase.clientSecret,
            refresh_token: localStorage.getItem("token"),
            grant_type: 'refresh_token'
        })
    })
    const result = await response.json()
    if (result && result.access_token) {
        return result.access_token
    }
}

async function getEmailIdentifiers() {
    const accessToken = await getAccessToken()
    if (accessToken) {
        const url = appConfig.config.url.getEmailIds
        await fetch(url)
    }
}

export const dataScrap = (vendor, message) => {
    if (vendor == "amazonPay") {
        const billAmount = parseFloat(message.split("Rs.")[1].split(" ")[0])
        const serviceNo = parseInt(message.split("Consumer Number ")[1].split(" ")[0].slice(2,))
        const dueDate = changeDateFormat(message.split("due on ")[1].split(".")[0])
        const messageData = {
            billAmount,
            serviceNo,
            dueDate
        }
        return messageData
    }
    else {
        console.log("Invalid Vendor")
    }
}

const startEmailSyncup = (services) => {
    console.log("services:", services)
    updateServicesInNeedOfData(services)
    //dont return any count, just update it in newBills
    if(newBills?.servicesData?.updateNeeded) {
        let emailIdentifiers = getEmailIdentifiers()

    }
}

export {
    startEmailSyncup
}