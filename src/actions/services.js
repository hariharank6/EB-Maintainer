export const addService = ({
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

export const addUnit = ({serviceNo = undefined, units = undefined, entryDate = ""} = {}) => ({
    type: "ADD_UNIT",
    data: {
        serviceNo,
        units,
        entryDate
    }
})

export const addAllUnits = ({services = []} = {}) => ({
    type: "ADD_ALL_UNITS",
    data: {
        services
    }
})