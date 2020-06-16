import React from 'react'
import './styles/styles.scss'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore'
import { dataScrap } from "./gapis/email"
import { addUnit, addService } from "./actions/services"
import {initializeWorkers} from './workers/serviceWorkerInit'
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

let message = "Dear Customer,Your Tamil Nadu Electricity Board (TNEB) electricity bill of Rs.650.00 for Consumer Number 032150031054 is due on 01 aug 2020. Please ignore if already paid.Pay Now To unsubscribe from this reminder, please click here : https://amzn.in/d/4KHuvkf"

console.log(dataScrap("amazonPay", message))

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))