import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import './styles/styles.scss'

import configureStore from './store/configureStore'
import AppRouter from './routes/AppRouter'
import { addUnit, addService } from "./actions/services"
import { storeToStorage, storageToStore } from "./store/storeSync"
import {initializeWorkers} from './workers/serviceWorkerInit'

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

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))