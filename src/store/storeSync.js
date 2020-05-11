import React from "react"
import {connect} from "react-redux"

import { addService } from "../actions/services.js"

export const storeToStorage = (data) => {
    const json = JSON.stringify(data)
    localStorage.setItem("data", json)
}

export const storageToStore = (store) => {
    const storeStringData = localStorage.getItem("data")
    const storeData = JSON.parse(storeStringData)
    for (const service of storeData.services){
        store.dispatch(addService(service))
    }
}