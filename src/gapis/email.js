import moment from "moment"
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
        for (let i = 0; i<newBills.servicesData.services.length; ++i){
            if(newBills.servicesData.services[i].serviceNo == messageData.serviceNo && moment(newBills.servicesData.services[i].dueDate).diff(moment(messageData.dueDate, appConfig.config.dateFormat), "days") > 60){
                newBills.servicesData.services[i] = messageData
                newBills.servicesData.updatedCount += 1
            }
        }
    }
    else {
        console.log("Invalid Vendor")
    }
}

const startEmailSyncup = (services) => {
    console.log("services:", services)
    updateServicesInNeedOfData(services)
    //dont return any count, just update it in newBills
    if(newBills && newBills.servicesData && newBills.servicesData.updateNeeded && newBills.servicesData.updateNeeded != newBills.servicesData.updatedCount) {
        let emailIdentifiers = getEmailIdentifiers()

    }
}

export {
    startEmailSyncup
}