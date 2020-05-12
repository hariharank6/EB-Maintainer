import React from 'react'
import { connect } from 'react-redux'

import {addUnit} from '../actions/services'

class AddService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            units : undefined,
            serviceNo : props.service && props.service.serviceNo ? props.service.serviceNo : undefined
        }
        this.handleInput = this.handleInput.bind(this)
        this.addUnit = this.addUnit.bind(this)
    }
    handleInput(event) {
        const units = event.target.value
        this.setState(() => ({
            units
        }))
    }
    addUnit(event) {
        const units = this.state.units
        const entryDate = "dd/mm/yy"
        this.props.dispatch(addUnit({serviceNo: this.state.serviceNo, units, entryDate}))
    }
    render() {
        return (
            <div className="addservice">
                {this.props.isAddAllEmbed || (this.props.service && this.props.service.serviceNo) ?
                    <div className="addservice__content">
                        <input type="number" onChange={this.handleInput} className="addservice__add-unit" placeholder="Enter the current Unit:"></input>
                        {!this.props.isAddAllEmbed &&
                            <div className="addservice__buttons-container">
                                <button className="addservice__add-button" onClick={this.addUnit}>ADD</button>
                                <button className="addservice__cancel-button">CANCEL</button>
                            </div>
                        }
                    </div>
                    :
                    <div className="addservice__content--error">
                        <div className="addservice__error-text">This is an error entry!</div>
                        <div className="addservice__error-subtext">
                            <button>Go Home</button>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStoreToProps = (state, props) => {
    if(props.isAddAllEmbed) {
        return {services: state.services}
    }
    else {
        return {service: state.services.find((service) => ((service.serviceNo && props.match && props.match.params && props.match.params.serviceNo) && service.serviceNo == props.match.params.serviceNo))}
    }
}

export default connect(mapStoreToProps)(AddService)