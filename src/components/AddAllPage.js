import React from 'react'
import {connect} from 'react-redux'
import AddService from './AddService'

const AddAllPage = (props) => (
    <div className="add-all-page">
        {props && props.services && 
            props.services.map((service) => (
                <AddService service={service} isAddAllEmbed={true} key={service.serviceNo}></AddService>
            ))
        }
    </div>
)

const mapStoreToProps = (state) => ({
    services : state.services
})

export default connect(mapStoreToProps)(AddAllPage)