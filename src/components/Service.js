import React from 'react'
import { Redirect, Switch } from "react-router-dom"

export default class Service extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpened: false
        }
        console.log(this.state)
        this.toggleMoreInfo = this.toggleMoreInfo.bind(this)
        this.setRedirect = this.setRedirect.bind(this)
    }
    toggleMoreInfo() {
        this.setState((prevState) => {
            // console.log(prevState)
            return {isOpened : !prevState.isOpened}
        })
        // console.log(this.state)
    }
    setRedirect(serviceNo) {
        event.preventDefault()
        console.log("Button clicked")
        return (<Switch> <Redirect to='/addall' /> </Switch>)
    }
    render() {
        return (
            <div>
                {this.props && this.props.service && this.props.service.serviceNo && this.props.service.nickname && typeof this.props.service.rate != "undefined" &&
                    <div className= {this.state.isOpened ? 'service service--expanded' : 'service'}>
                        <div className="service__titlebar" onClick={this.toggleMoreInfo}>
                            <div className="service__title">{this.props.service.nickname}</div>
                            <div className="service__title-rate">{this.props.service.currencyCode + this.props.service.rate}</div>
                            <button className="service__add-button" onClick={() => this.setRedirect(this.props.service.serviceNo)} >Add</button>
                        </div>
                        {this.props.service.entryDate && typeof this.props.service.units != "undefined" && typeof this.props.service.rate != "undefined" && this.props.service.billData && typeof this.props.service.billData.meterReading != "undefined" && 
                            <div className="service__unbilled-container">
                                <div className="service__unbilled-title">Unbiled:</div>
                                <div className="service__unbilled-content">
                                    <div className="service__unbilled-entry-date">Entry Date: {this.props.service.entryDate}</div>
                                    <div className="service__unbilled-units">Units: {this.props.service.units - this.props.service.billData.meterReading}</div>
                                    <div className="service__unbilled-amount">Amount: {this.props.service.currencyCode + this.props.service.rate}</div>
                                </div>
                            </div>
                        }
                        {this.props.service.billData && typeof this.props.service.billData.billAmount != "undefined" && this.props.service.billData.dueDate &&
                            <div className="service__bill-container">
                                <div className="service__bill-title">Bill:</div>
                                <div className="service__bill-content">
                                    <div className="service__due-date">DueDate: {this.props.service.billData.dueDate}</div>
                                    <div className="service__bill-amount">Bill Amount: {this.props.service.currencyCode + this.props.service.billData.billAmount}</div>
                                    <div className="service__payment-status">Payment Status: {this.props.service.billData.paymentDate ? "Paid" : "Not Paid"}</div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}