import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './store/configureStore'
import AppRouter from './routes/AppRouter'


const reduxStore = configureStore()

reduxStore.subscribe(() => {
    let storeData = reduxStore.getState()
    console.log(storeData)
})

const providerWrapper = () => (
    <Provider store={reduxStore}>
        <AppRouter></AppRouter>
    </Provider>
)

ReactDOM.render(providerWrapper(), document.getElementById('EBContainer'))