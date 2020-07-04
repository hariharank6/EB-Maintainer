import React from 'react'
import './styles/styles.scss'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import AppRouter from './routes/AppRouter'
import configureStore from './store/configureStore'
import {initializeWorkers} from './workers/serviceWorkerInit'
import { storeToStorage, storageToStore } from "./store/storeSync"

initializeWorkers()

const reduxStore = configureStore()

storageToStore(reduxStore)

reduxStore.subscribe(() => {
    let storeData = reduxStore.getState()
    storeToStorage(storeData.services)
})

const providerWrapper = () => (
    <Provider store={reduxStore}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))