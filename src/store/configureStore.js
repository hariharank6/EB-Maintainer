import {createStore, combineReducers} from 'redux'

import servicesReducer from '../reducers/services'
import suggestionsReducer from '../reducers/suggestions'

export default () => (
    createStore(
        combineReducers({
            services : servicesReducer,
            suggestions : suggestionsReducer 
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)