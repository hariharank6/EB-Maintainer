import React from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom"

import AddService from './AddService'
import {addAllUnits} from "../actions/services"
class AddAllPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            services: [],
            error: ""
        }
        this.syncServiceData = this.syncServiceData.bind(this)
        this.handleAddAll = this.handleAddAll.bind(this)
    }
    syncServiceData ({serviceNo, units, entryDate} = {}) {
        if(serviceNo && units && entryDate) {
            let isMatchFound = false
            let newServices = this.state.services.map((service) => {
                if(service.serviceNo == serviceNo) {
                    isMatchFound = true
                    return {serviceNo, units, entryDate}
                }
                return service
            })

            if(!isMatchFound) {
                newServices.push({serviceNo, units, entryDate})
            }

            this.setState(() => ({services: newServices, error: ""}))
        }
        else {
            console.log("Missing data for service data syncup")
        }
    }
    handleAddAll() {
        if(this.state.services && this.props.services && this.state.services.length == this.props.services.length) {
            this.props.dispatch(addAllUnits({services: this.state.services}))
            this.props.history.push("/")
        }
        else {
            this.setState({error:"Fill the units for all services"})
        }
    }
    render() {
        return (
            <div className="add-all">
                {this.state && this.state.error && 
                    <em className="add-all__error-message">{this.state.error}</em>
                }
                {this.props && this.props.services && 
                    this.props.services.map((service) => (
                        <AddService service={service} isAddAllEmbed={true} syncServiceData={this.syncServiceData} key={service.serviceNo}></AddService>
                    ))   
                }
                <div className="add-all__buttonsHolder">
                    <Link to="/" className="add-all__cancel"><button className="add-all__cancel-button">Cancel</button></Link>
                    <button className="add-all__add-button" onClick={this.handleAddAll}>Add all</button>
                </div>
            </div>
        )
    }
}

const mapStoreToProps = (state) => ({
    services : state.services
})

export default connect(mapStoreToProps)(AddAllPage)