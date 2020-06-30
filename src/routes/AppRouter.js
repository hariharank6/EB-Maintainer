import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Header from '../components/Header'
import Signin from '../components/Signin'
import HomePage from '../components/HomePage'
import AddAllPage from '../components/AddAllPage'
import AddService from '../components/AddService'
import SuggestionPage from '../components/SuggestionPage'
import PageNotFound from '../components/PageNotFound'

export default () => (
    <BrowserRouter>
        <div>
            <Signin></Signin>
            <Route path="*" component={Header}></Route>
            <Route path="/" component={HomePage} exact={true}></Route>
            <Route path="/addall" component={AddAllPage} exact={true}></Route>
            <Route path="/add/:serviceNo" component={AddService} exact={true}></Route>
            <Route path="/suggestions" component={SuggestionPage} exact={true}></Route>
            <Route component={PageNotFound}></Route>
        </div>
    </BrowserRouter>
)