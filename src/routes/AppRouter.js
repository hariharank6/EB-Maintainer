import {Route, Switch, BrowserRouter} from 'react-router-dom'

import HomePage from '../components/HomePage'
import AddAllPage from '../components/AddAllPage'
import AddPage from '../components/AddPage'
import SuggestionPage from '../components/SuggestionPage'
import PageNotFound from '../components/PageNotFound'

export default () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={HomePage} exact={true}></Route>
                <Route path="/addall" component={AddAllPage} exact={true}></Route>
                <Route path="/add" component={AddPage} exact={true}></Route>
                <Route path="/suggestions" component={SuggestionPage} exact={true}></Route>
                <Route component={PageNotFound}></Route>
            </Switch>
        </div>
    </BrowserRouter>
)