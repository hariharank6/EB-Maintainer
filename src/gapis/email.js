import * as firebase from 'firebase'
import appConfig from '../store/storeDataInitConfig'
import { changeDateFormat } from "../common/common"

async function getAccessToken() {
    const url = appConfig.config.url.getAccessToken
    await fetch(url)
}

async function getEmailIds() {
    const url = appConfig.config.url.getEmailIds
    await fetch(url)
}

export const dataScrap = (vendor, message) => {
    if (vendor == "amazonPay"){
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
    else{
        console.log("Invalid Vendor")
    }
}

export {
    getEmailIds
}