import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './styles/styles.scss'

import configureStore from './store/configureStore'
import AppRouter from './routes/AppRouter'
import { addUnit, addService } from "./actions/services.js"
import { storeToStorage, storageToStore } from "./store/storeSync.js"

const reduxStore = configureStore()

storageToStore(reduxStore)
console.log(reduxStore.getState())

reduxStore.subscribe(() => {
    let storeData = reduxStore.getState()
    console.log(storeData)
    storeToStorage(storeData)
})

const providerWrapper = () => (
    <Provider store={reduxStore}>
        <AppRouter></AppRouter>
    </Provider>
)

// reduxStore.dispatch(addService({
//     serviceNo:123,
//     units: 560,
//     nickname: "test123",
//     billData: {
//         meterReading: 10,
//         billGeneratedDate: "dd/mm/yy"
//     }
// }))

// reduxStore.dispatch(addService({
//     serviceNo:1234,
//     units: 234,
//     nickname: "test1234",
//     billData: {
//         meterReading: 150,
//         billGeneratedDate: "dd/mm/yy"
//     }
// }))

// reduxStore.dispatch(addUnit({
//     "serviceNo": 123,
//     "units": 769,
//     "entryDate": "dd/mm/yy"
// }))

// reduxStore.dispatch(addUnit({
//     "serviceNo": 1234,
//     "units": 190,
//     "entryDate": "dd/mm/yy"
// }))

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))