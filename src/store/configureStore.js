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

// SERVICES:
// i. 206003530
// ii. 2070031691
// iii. 2150031053
// iv. 2150031054
// v. 2150031055
// vi. 2150031056
// vii. 215003717
// viii. 215003785