import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './store/configureStore'
import AppRouter from './routes/AppRouter'
import { addUnit, addService } from "./actions/services.js"


const reduxStore = configureStore()

reduxStore.subscribe(() => {
    let storeData = reduxStore.getState()
    console.log(storeData)
})

reduxStore.dispatch(addService({
    serviceNo:123,
    units: 560,
    billData: {
        meterReading: 10,
        billGeneratedDate: "dd/mm/yy"
    }
}))

reduxStore.dispatch(addUnit({
    "serviceNo": 123,
    "units": 50,
    "entryDate": "dd/mm/yy"
}))

const providerWrapper = () => (
    <Provider store={reduxStore}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))