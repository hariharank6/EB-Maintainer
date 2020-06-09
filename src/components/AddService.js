import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import {addUnit} from '../actions/services'

class AddService extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            units : 0,
            serviceNo : props.service && props.service.serviceNo ? props.service.serviceNo : undefined
        }
        this.handleInput = this.handleInput.bind(this)
        this.addUnit = this.addUnit.bind(this)
    }
    componentDidUpdate() {
        this.props.syncServiceData && this.props.syncServiceData({serviceNo: this.state.serviceNo, units: this.state.units, entryDate: '15/05/20'})
    }
    handleInput(event) {
        const units = event.target.value
        if(units) {
            this.setState(() => ({units}))
        }
    }
    addUnit(event) {
        const units = this.state.units
        const entryDate = "dd/mm/yy"
        this.props.dispatch(addUnit({serviceNo: this.state.serviceNo, units, entryDate}))
        this.props.history.push("/")
    }
    render() {
        return (
            <div className={this.props.isAddAllEmbed ? "addservice add-all-embed" : "addservice standalone"}>
                {this.props.isAddAllEmbed || (this.props.service && this.props.service.serviceNo && this.props.service.nickname) ?
                    <div className="addservice__content">
                        <div className = 'addservice__title'>{this.props.service.nickname}</div>
                        <input type="number" value={this.state.units} onChange={this.handleInput} className="addservice__add-unit" placeholder="Enter the current Unit:"></input>
                        {!this.props.isAddAllEmbed &&
                            <div className="addservice__buttons-container">
                                <button className="addservice__add-button" onClick={this.addUnit}>ADD</button>
                                <Link to="/" className="addservice__cancel"><button className="addservice__cancel-button">CANCEL</button></Link>
                            </div>
                        }
                    </div>
                    :
                    <div className="addservice__content--error">
                        <div className="addservice__error-text">This is an error entry!</div>
                        <div className="addservice__error-subtext">
                        <Link to="/"><button>Go Home</button></Link>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStoreToProps = (state, props) => {
    if(props.isAddAllEmbed) {
        return {service: props.service}
    }
    else {
        return {service: state.services.find((service) => ((service.serviceNo && props.match && props.match.params && props.match.params.serviceNo) && service.serviceNo == props.match.params.serviceNo))}
    }
}

export default connect(mapStoreToProps)(AddService)