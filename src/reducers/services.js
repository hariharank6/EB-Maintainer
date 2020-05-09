const calculateRate = () => {
    return calculatedRate;
}
export default (state, action) => {
    switch(action.type) {
        case "ADD_UNIT" :
            if(state && action.data && action.data.serviceNo && action.data.units && action.data.updatedDate) {
                return state.map((service) => {
                    if(service.serviceNo == action.data.serviceNo) {                        
                        const calculatedRate = calculateRate();
                        
                        const pastUpdateData = {
                            units: service.units,
                            rate: service.rate,
                            updatedDate: service.updatedDate,
                            isValidEntry: (service.rate < calculatedRate ? true : false)
                        }

                        service.units = action.data.units
                        service.updatedDate = action.data.updatedDate
                        service.pastUpdates = [...service.pastUpdates, pastUpdateData]
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
                            const calculatedRate = calculateRate();

                            const pastUpdateData = {
                                units: clonedState[stateIteration].units,
                                rate: clonedState[stateIteration].rate,
                                updatedDate: clonedState[stateIteration].updatedDate,
                                isValidEntry: (clonedState[stateIteration].rate < calculatedRate ? true : false)
                            }
    
                            clonedState[stateIteration].units = action.data.units
                            clonedState[stateIteration].updatedDate = action.data.updatedDate
                            clonedState[stateIteration].pastUpdates = [...clonedState[stateIteration].pastUpdates, pastUpdateData]
                            updatedServicesCount++
                            break;
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
            return ;
        case "ADD_LAST_BILL_AMOUNT" :
            return ;
    }
}