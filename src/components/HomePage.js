import React from 'react'
import { connect } from 'react-redux'

import Service from "./Service.js"

const HomePage = (props) => (
    <div className="home_serviceContainer">
        <div className="home">
            {props.services.map((service) => (
                <Service service={service} key={service.serviceNo}></Service>
            ))}
        </div>
    </div>
)

const storeToProps = (state) => ({
    services: state.services
})

export default connect(storeToProps)(HomePage)