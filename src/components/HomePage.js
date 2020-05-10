import React from 'react'
import {connect} from 'react-redux'

import Header from './Header'

const HomePage = (props) => (
        <div className="home_serviceContainer">
    <div className="home">
        <Header></Header>
        {props.services.map((service) => (
            <Service {...service} key={service.serviceNo}></Service>
        ))}
        </div>
    </div>
)

const storeToProps = (state) => ({
    services: state.services
})

export default connect(storeToProps)(HomePage)