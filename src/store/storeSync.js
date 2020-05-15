import React from "react"
import {connect} from "react-redux"

import { addService } from "../actions/services.js"

export const storeToStorage = (updatedStoreData) => {
    localStorage.setItem("storeData", JSON.stringify(updatedStoreData))
}

export const storageToStore = (store) => {
    let storeData = {"services":[
        {
            "nickname": "name-3530",
            "serviceNo": 206003530,
            "entryDate": "22/04/2020",
            "currencyCode": "₹",
            "units": 110,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 0,
                "rate": 0,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 0,
                "rate": 0,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 87,
              "meterReading": 100,
              "billGeneratedDate": "19/04/2020",
              "dueDate": "9/05/2020",
              "billAmount": 0,
              "paymentDate": "9/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-1691",
            "serviceNo": 2070031691,
            "entryDate": "27/03/2020",
            "currencyCode": "₹",
            "units": 13760,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 400,
              "meterReading": 13750,
              "billGeneratedDate": "24/03/2020",
              "dueDate": "15/04/2020",
              "billAmount": 830,
              "paymentDate": "14/04/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-1053",
            "serviceNo": 2150031053,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 770,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 550,
              "meterReading": 760,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 2110,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-1054",
            "serviceNo": 2150031054,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 470,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 330,
              "meterReading": 460,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 620,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-1055",
            "serviceNo": 2150031055,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 120,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 80,
              "meterReading": 110,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 0,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-1056",
            "serviceNo": 2150031056,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 260,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 190,
              "meterReading": 250,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 155,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-717",
            "serviceNo": 215003717,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 530,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 23,
                "rate": 423,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 123,
                "rate": 123,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 390,
              "meterReading": 520,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 800,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        },
        {
            "nickname": "name-785",
            "serviceNo": 215003785,
            "entryDate": "15/04/2020",
            "currencyCode": "₹",
            "units": 290,
            "rate": 0,
            "pastUpdates": [
              {
                "units": 0,
                "rate": 0,
                "entryDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": false
              },
              {
                "units": 0,
                "rate": 0,
                "entryDate": "dd/mm/yy",
                "paidDate": "dd/mm/yy",
                "isValidEntry": true,
                "isActualBill": true
              }
            ],
            "billData": {
              "unitsConsumed": 180,
              "meterReading": 280,
              "billGeneratedDate": "12/04/2020",
              "dueDate": "02/05/2020",
              "billAmount": 140,
              "paymentDate": "02/05/2020",
              "isValidEntry": true
            }
        }
    ],suggestions:{}}
    try {
        const storageStoreData = localStorage.getItem("storeData")
        if(storageStoreData != null) {
            const storeData = JSON.parse(storageStoreData)
            localStorage.setItem("storeDataBackup", JSON.stringify(storeData))
        }
        else {
            throw new Error()
        }
    }
    catch {
        const storageStoreBackupData = localStorage.getItem("storeDataBackup")
        if(storageStoreBackupData != null){
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