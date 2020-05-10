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

export const addLastBillAmount = ({lastBillAmount = undefined} = {}) => ({
    type: "ADD_LAST_BILL_AMOUNT",
    data: {
        lastBillAmount
    }
})