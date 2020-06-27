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
    const correctedDate = moment(inputDate).format(storeData.config.dateFormat)
    return correctedDate
}

const updateServicesInNeedOfData = (services) => {
    //update the global json here
    if (moment().diff(service.billData.billGeneratedDate, "days") > 60){
        return true
    }
    else{
        return false
    }
}

export {
    newBills,
    todaysDate,
    changeDateFormat,
    updateServicesInNeedOfData
}