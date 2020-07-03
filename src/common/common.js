import moment from "moment"
import storeData from "../store/storeDataInitConfig"

let newBills = {
    servicesData: {
        updateNeeded: 0,
        updatedCount: 0,
        services: []
    },
    processingData: {
        processedCount: 0,
        currentBatch: 0
    }
}

const todaysDate = () => {
    const date = moment().format(storeData.config.dateFormat)
    return date
}

const changeDateFormat = (inputDate) => {
    const correctedDate = moment(inputDate, storeData.config.amazonPayDateFormat).format(storeData.config.dateFormat)
    return correctedDate
}

const updateServicesInNeedOfData = (services) => {
    // update the global json here
    let service
    let updateNeededCount = 0
    for (service of services){
        if (moment().diff(moment(service.billData.billGeneratedDate, storeData.config.dateFormat), "days") > 30){
            newBills.servicesData.services.push({
                "serviceNo": service.serviceNo,
                "dueDate": service.billData.dueDate,
                "billAmount": service.billData.billAmount
            })
            updateNeededCount += 1
        }
    }
    newBills.servicesData.updateNeeded = updateNeededCount
    // console.log("newBills", newBills)
}

const clearNewBillData = () => {
    newBills.servicesData.updateNeeded = 0
    newBills.servicesData.updatedCount = 0
    newBills.servicesData.services = []
    newBills.processingData.currentBatch = 0
    newBills.processingData.processedCount = 0
}

export {
    newBills,
    todaysDate,
    changeDateFormat,
    clearNewBillData,
    updateServicesInNeedOfData
}