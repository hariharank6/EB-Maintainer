import React from "react"
import { connect } from "react-redux"

import { addService } from "../actions/services"
import storeDataConfig from '../store/storeDataInitConfig'

export const storeToStorage = (updatedStoreData) => {
  localStorage.setItem("storeData", JSON.stringify(updatedStoreData))
}

export const storageToStore = (store) => {
  let storeData = storeDataConfig
  try {
    const storageStoreData = localStorage.getItem("storeData")
    if (storageStoreData != null) {
      const storeData = JSON.parse(storageStoreData)
      localStorage.setItem("storeDataBackup", JSON.stringify(storeData))
    }
    else {
      throw new Error()
    }
  }
  catch {
    const storageStoreBackupData = localStorage.getItem("storeDataBackup")
    if (storageStoreBackupData != null) {
      try {
        const storeData = JSON.parse(storageStoreBackupData)
        localStorage.setItem("storeData", JSON.stringify(storeData))
      }
      catch {
        localStorage.setItem("storeData", JSON.stringify(storeData))
        localStorage.setItem("storeDataBackup", JSON.stringify(storeData))
      }
    }
    else {
      localStorage.setItem("storeData", JSON.stringify(storeData))
      localStorage.setItem("storeDataBackup", JSON.stringify(storeData))
    }
  }
  for (const service of storeData.services) {
    store.dispatch(addService(service))
  }
}