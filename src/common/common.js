import moment from "moment"
import storeData from "../store/storeDataInitConfig"

export const todaysDate = () => {
    const date = moment().format(storeData.config.dateFormat)
    return date
}

export const changeDateFormat = (inputDate) => {
    const correctedDate = moment(inputDate).format(storeData.config.dateFormat)
    return correctedDate
}

const isEmailDataNeeded = () => {

}

export {
    isEmailDataNeeded
}