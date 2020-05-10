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
                        const calculatedPrice = calculateRate(action.data, clonedService.billData)
                        
                        const pastUpdateData = {
                            units: clonedService.units,
                            rate: clonedService.rate,
                            entryDate: clonedService.entryDate,
                            isValidEntry: (clonedService.units < action.data.units ? true : false)
                        }

                        clonedService.units = action.data.units
                        clonedService.entryDate = action.data.entryDate 
                        clonedService.rate = calculatedPrice
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
                            const calculatedRate = calculateRate(action, clonedState[stateIteration].billData)

                            const pastUpdateData = {
                                units: clonedState[stateIteration].units,
                                rate: clonedState[stateIteration].rate,
                                entryDate: clonedState[stateIteration].entryDate,
                                isValidEntry: (clonedState[stateIteration].units < action.data.services[actionIteration].units ? true : false)
                            }
    
                            clonedState[stateIteration].units = action.data.units
                            clonedState[stateIteration].entryDate = action.data.entryDate
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
        default:
            return state
    }
}