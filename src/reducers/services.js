import moment from "moment"
import storeData from "../store/storeDataInitConfig"

const calculateRate = ({units}, {meterReading}) => {
    const subsidy = 150
    let cost = 0
    const fixedPrice = [0, 20, 30, 50]
    const usedUnits = units - meterReading
    if (usedUnits <= 100){
        cost = 150 + fixedPrice[0]
    }
    else if (usedUnits <= 200){
        cost = (usedUnits * 1.5) + fixedPrice[1]
    }
    else if (usedUnits <= 500){
        cost = (100 * 1.5) + (100 * 2.0) + ((usedUnits - 200) * 3.0) + fixedPrice[2]
    }
    else{
        cost = (100 * 1.5) + (100 * 3.5) + (300 * 4.6) + ((usedUnits - 500) * 6.6) + fixedPrice[3]
    }
    let finalPrice = cost - subsidy
    return finalPrice
}

const calculateUnits = (billAmount) => {
    const subsidy = 150
    let units = 0
    const fixedPrice = [0, 20, 30, 50]
    billAmount += subsidy
    if (billAmount <= 0){
        units = 50
    }
    else if(billAmount <= 320){
        units = (billAmount - fixedPrice[1]) / 1.5
    }
    else if(billAmount <= 1280){
        units = ((billAmount - fixedPrice[2] - 350) / 3) + 200
    }
    else{
        units = ((billAmount - fixedPrice[3] - 1880) / 6.6) + 500
    }
    return units
}

export default (state=[], action) => {
    switch(action.type) {
        case "ADD_SERVICE":
            if(state && action.data && action.data.serviceNo && action.data.units && action.data.billData && action.data.billData.meterReading && action.data.billData.billGeneratedDate){
                let isServiceExist = false
                let services = []
                const calculatedPrice = calculateRate(action.data, action.data.billData)
                action.data.rate = calculatedPrice
                services = state.map((service) => {
                    if (service.serviceNo == action.data.serviceNo) {
                        service = Object.assign(service, action.data)
                        isServiceExist = true
                    }
                })
                if (!isServiceExist){
                    services = [...state,action.data]
                }
                return services
            }
            else {
                console.log("Insufficient data for ADD_SERVICE reducer")
                return state
            }

        case "ADD_UNIT" :
            if(state && action.data && action.data.serviceNo && action.data.units && action.data.entryDate) {
                return state.map((service) => {
                    if(service.serviceNo == action.data.serviceNo) {
                        let clonedService = Object.assign({}, service)
                        const calculatedRate = calculateRate(action.data, clonedService.billData)
                        
                        const pastUpdateData = {
                            units: clonedService.units,
                            rate: clonedService.rate,
                            entryDate: clonedService.entryDate,
                            isValidEntry: (clonedService.units < action.data.units ? true : false)
                        }

                        clonedService.units = action.data.units
                        clonedService.entryDate = action.data.entryDate 
                        clonedService.rate = calculatedRate
                        clonedService.pastUpdates = [...clonedService.pastUpdates, pastUpdateData]
                        return clonedService
                    }
                    return service
                })
            }
            else {
                console.log("insufficient data for ADD_UNIT reducer")
                return state
            }

        case "ADD_ALL_UNITS" :
            if(state && action.data && action.data.services && state.length == action.data.services.length) {
                let clonedState = Object.assign([], state)
                let updatedServicesCount = 0
                for(let stateIteration = 0; stateIteration < clonedState.length; stateIteration++) {
                    for(let actionIteration = 0; actionIteration < action.data.services.length; actionIteration++) {
                        if(clonedState[stateIteration].serviceNo == action.data.services[actionIteration].serviceNo) {
                            const calculatedRate = calculateRate(action.data.services[actionIteration], clonedState[stateIteration].billData)

                            const pastUpdateData = {
                                units: action.data.services[actionIteration].units,
                                rate: calculatedRate,
                                entryDate: action.data.services[actionIteration].entryDate,
                                isValidEntry: (clonedState[stateIteration].units < action.data.services[actionIteration].units ? true : false)
                            }
    
                            clonedState[stateIteration].units = action.data.services[actionIteration].units
                            clonedState[stateIteration].rate = calculatedRate
                            clonedState[stateIteration].entryDate = action.data.services[actionIteration].entryDate
                            clonedState[stateIteration].pastUpdates = [...clonedState[stateIteration].pastUpdates, pastUpdateData]
                            updatedServicesCount++
                            break
                        }
                    }
                }
                if(updatedServicesCount == state.length) {
                    return clonedState
                }
                else {
                    console.log("Data mismatch in Add all units")
                    return state
                }
            }
            else {
                console.log("insufficient data for ADD_ALL_UNITS")
                return state
            }

        case "ADD_BILL_DATA":
            if (state && action && action.data && action.data.serviceNo && action.data.dueDate && typeof action.data.billAmount != "undefined"){
                return state.map((service) => {
                    if(service.serviceNo == action.data.serviceNo) {
                        const billGeneratedDate = moment(action.data.dueDate, storeData.config.dateFormat).subtract(20, "days").format(storeData.config.dateFormat)
                        const unitsConsumed = calculateUnits(action.data.billAmount)
                        const meterReading = service.billData.meterReading + unitsConsumed

                        let clonedService = Object.assign({}, service)
                        const pastUpdateData = {
                            "unitsConsumed": clonedService.billData.unitsConsumed,
                            "meterReading": clonedService.billData.meterReading,
                            "billGeneratedDate": clonedService.billData.billGeneratedDate,
                            "dueDate": clonedService.billData.dueDate,
                            "billAmount": clonedService.billData.billAmount
                        }

                        clonedService.billData.unitsConsumed = unitsConsumed
                        clonedService.billData.meterReading = meterReading 
                        clonedService.billData.billGeneratedDate = billGeneratedDate
                        clonedService.billData.dueDate = action.data.dueDate
                        clonedService.billData.billAmount = action.data.billAmount
                        clonedService.pastUpdates.push(pastUpdateData)
                        return clonedService
                    }
                    return service
                })
            }
            else {
                console.log("Insufficient data for ADD_BILL_DATA reducer")
                return state
            }
            
        default:
            return state
    }
}