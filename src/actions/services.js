const addService = ({
    serviceNo = undefined,
    nickname = "",
    entryDate = undefined,
    currencyCode = "₹",
    units = undefined,
    rate = undefined,
    pastUpdates = [],
    billData = {meterReading : undefined,
        billGeneratedDate : undefined
    }
} = {}) => ({
    type: "ADD_SERVICE",
    data: {
        serviceNo,
        nickname,
        entryDate,
        currencyCode,
        units,
        rate,
        pastUpdates,
        billData
    }
})

const addUnit = ({
    serviceNo = undefined, 
    units = undefined, 
    entryDate = "" 
    } = {}) => ({
    type: "ADD_UNIT",
    data: {
        serviceNo,
        units,
        entryDate
    }
})

const addAllUnits = ({services = []} = {}) => ({
    type: "ADD_ALL_UNITS",
    data: {
        services
    }
})

const addBillData = ({
    billAmount = undefined, 
    dueDate = undefined, 
    serviceN0 = undefined
    }) => ({
        type: "ADD_BILL_DATA",
        data: {
            billAmount,
            dueDate,
            serviceN0
        }
    })
export {addService, addUnit, addAllUnits, addBillData}