import React from 'react'
import {connect} from 'react-redux'

const HomePage = (props) => (
        <div className="home_serviceContainer">
    <div className="home">
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