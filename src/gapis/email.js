import moment from "moment"
import * as firebase from 'firebase/app'

import appConfig from '../store/storeDataInitConfig'
import { changeDateFormat, updateServicesInNeedOfData, newBills, clearNewBillData } from "../common/common"
import {addBillData} from '../actions/services'
import {setIconToShowFunc} from '../components/Header'

let emailSyncData = {
    emailIdentifiers: []
}
const loadGapiScript = () => {
    return new Promise((resolve, reject) => {
        let script = document.createElement("script")
        script.type = 'text/javascript'
        script.src = 'https://apis.google.com/js/api.js'
        script.onload = function (e) {
            const initClient = () => {
                gapi.client.init({
                    apiKey: appConfig.config.firebase.apiKey,
                    clientId: appConfig.config.firebase.clientId,
                    discoveryDocs: appConfig.config.firebase.discoveryDocs,
                    scope: appConfig.config.firebase.scopes,
                }).then(() => {
                    resolve()
                }, () => {
                    reject()
                })
            }

            const loadGmail = () => {
                gapi.client.load('gmail', 'v1', () => {
                    initClient()
                });
            }

            gapi.load('client:auth2', loadGmail)
        }
        document.getElementsByTagName('head')[0].appendChild(script);
    })
}

async function getEmailIdentifiers() {
    return firebase.auth().currentUser.getIdToken().then((token) => {
        if(localStorage.getItem("userEmail")) {
            let result = gapi.client.gmail.users.messages.list({
                'userId': localStorage.getItem("userEmail"),
                'q': appConfig.config.email.emailQuery
            })
            result.execute((emailIdentifiers) => {
                emailSyncData.emailIdentifiers = emailIdentifiers.messages
                Promise.resolve()
            })
        }
        else {
            Promise.reject()
        }
    })
}

const dataScrapper = (vendor, message) => {
    if (vendor == "amazonPay") {
        const billAmount = parseFloat(message.split("Rs.")[1].split(" ")[0])
        const serviceNo = parseInt(message.split("Consumer Number ")[1].split(" ")[0].slice(2,))
        const dueDate = changeDateFormat(message.split("due on ")[1].split(".")[0])
        const messageData = {
            billAmount,
            serviceNo,
            dueDate
        }
        for (let i = 0; i < newBills.servicesData.services.length; i++) {
            if (newBills.servicesData.services[i].serviceNo == messageData.serviceNo) {
                if (moment(messageData.dueDate, appConfig.config.dateFormat).diff(moment(newBills.servicesData.services[i].dueDate, appConfig.config.dateFormat), "days") > 30) {
                    newBills.servicesData.services[i] = messageData
                    newBills.servicesData.updatedCount += 1
                }
            }
        }
    }
    else {
        console.log("Invalid Vendor")
    }
    newBills.processingData.processedCount += 1
}

const getEmailData = (emailIdentifier, dataScrapper) => {
    firebase.auth().currentUser.getIdToken().then(function (token) {
        let result = gapi.client.gmail.users.messages.get({
            'userId': localStorage.getItem("userEmail"),
            'id': emailIdentifier
        })
        result.execute((emailData) => {
            dataScrapper(appConfig.config.email.emailVendor, emailData.snippet)
        })
    })
}

async function startEmailSyncup(dispatch, services) {
    updateServicesInNeedOfData(services)
    if (newBills && newBills.servicesData && newBills.servicesData.updateNeeded && newBills.servicesData.updateNeeded != newBills.servicesData.updatedCount) {
        setIconToShowFunc("syncing")
        await loadGapiScript()
        if(typeof gapi == "undefined") {
            console.log("reloading")
            window.location.reload()
        }
        await getEmailIdentifiers()

        let emailBatchTimeGapCount = 0
        let timer = setInterval(() => {
            if (newBills.servicesData.updateNeeded > newBills.servicesData.updatedCount) {
                if (newBills.processingData.processedCount == newBills.processingData.currentBatch * appConfig.config.email.emailsPerBatch || appConfig.config.email.maxEmailBatchSkip == emailBatchTimeGapCount) {
                    emailBatchTimeGapCount = 0
                    if (++newBills.processingData.currentBatch < appConfig.config.email.emailBatchThreshold) {
                        for (let i = (newBills.processingData.currentBatch - 1) * appConfig.config.email.emailsPerBatch; i < appConfig.config.email.emailsPerBatch * newBills.processingData.currentBatch && emailSyncData.emailIdentifiers.length > i; i++) {
                            (function(i) {
                                getEmailData(emailSyncData.emailIdentifiers[i].id, dataScrapper)
                            }(i))
                        }
                    }
                    else {
                        clearInterval(timer)
                        setIconToShowFunc("failed")
                        let service
                        for (service of newBills.servicesData.services){
                            dispatch(addBillData({...service}, dispatch))
                        }
                        clearNewBillData()
                    }
                }
                else {
                    ++emailBatchTimeGapCount
                }
            }
            else {
                clearInterval(timer)
                setIconToShowFunc("none")
                let service
                for (service of newBills.servicesData.services){
                    dispatch(addBillData({...service}, dispatch))
                }
                clearNewBillData()
            }
        }, appConfig.config.email.emailBatchTimeGap * 1000)
    }
}

export {
    dataScrapper,
    startEmailSyncup
}