import React from 'react'
import './styles/styles.scss'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore'
import {initializeWorkers} from './workers/serviceWorkerInit'
import { updateServicesInNeedOfData } from "./common/common"
import { storeToStorage, storageToStore } from "./store/storeSync"

initializeWorkers()

const reduxStore = configureStore()

storageToStore(reduxStore)
// console.log(reduxStore.getState())

reduxStore.subscribe(() => {
    let storeData = reduxStore.getState()
    // console.log(storeData)
    storeToStorage(storeData)
})

const providerWrapper = () => (
    <Provider store={reduxStore}>
        <AppRouter></AppRouter>
    </Provider>
)

// const services = [
//     {
//         "nickname": "",
//         "serviceNo": 23423,
//         "entryDate": "dd/mm/yy",
//         "currencyCode": "₹",
//         "units": 23,
//         "rate": 2342,
//         "pastUpdates": [
//           {
//             "units": 23,
//             "rate": 423,
//             "entryDate": "dd/mm/yy",
//             "isValidEntry": true,
//             "isActualBill": false
//           },
//           {
//             "units": 123,
//             "rate": 123,
//             "entryDate": "dd/mm/yy",
//             "isValidEntry": true,
//             "isActualBill": true
//           }
//         ],
//         "billData": {
//           "unitsConsumed": 23,
//           "meterReading": 423,
//           "billGeneratedDate": "20/04/2020",
//           "dueDate": "dd/mm/yy",
//           "billAmount": 123,
//           "isValidEntry": true,
//           "warning": ""
//         }
//       },
//       {
//         "nickname": "",
//         "serviceNo": 49759,
//         "entryDate": "dd/mm/yy",
//         "currencyCode": "₹",
//         "units": 23,
//         "rate": 2342,
//         "pastUpdates": [
//           {
//             "units": 23,
//             "rate": 423,
//             "entryDate": "dd/mm/yy",
//             "isValidEntry": true,
//             "isActualBill": false
//           },
//           {
//             "units": 123,
//             "rate": 123,
//             "entryDate": "dd/mm/yy",
//             "isValidEntry": true,
//             "isActualBill": true
//           }
//         ],
//         "billData": {
//           "unitsConsumed": 23,
//           "meterReading": 423,
//           "billGeneratedDate": "20/03/2020",
//           "dueDate": "dd/mm/yy",
//           "billAmount": 123,
//           "isValidEntry": true,
//           "warning": ""
//         }
//       }
// ]

// updateServicesInNeedOfData(services)

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))