import React from 'react'

export default class Service extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpened: false
        }
        console.log(this.state)
        this.toggleMoreInfo = this.toggleMoreInfo.bind(this)
    }
    toggleMoreInfo() {
        this.setState((prevState) => {
            // console.log(prevState)
            return {isOpened : !prevState.isOpened}
        })
        // console.log(this.state)
    }
    render() {
        return (
            <div>
                {this.props && this.props.service && this.props.service.serviceNo && typeof this.props.service.units != "undefined" && typeof this.props.service.rate != "undefined" && this.props.service.nickname && this.props.service.entryDate &&
                    <div className= {this.state.isOpened ? 'service service--expanded' : 'service'}>
                        <div className="service__titlebar" onClick={this.toggleMoreInfo}>
                            <div className="service__title">{this.props.service.nickname}</div>
                            <div className="service__title-rate">{this.props.service.currencyCode + "." + this.props.service.rate}</div>
                            <button className="service__add-button">Add</button>
                        </div>
                        {this.props.service.entryDate &&
                            <div className="service__unbilled-container">
                                <div className="service__unbilled-title">Unbiled:</div>
                                <div className="service__unbilled-content">
                                    <div className="service__unbilled-entry-date">{this.props.service.entryDate}</div>
                                    <div className="service__unbilled-units">{this.props.service.units}</div>
                                    <div className="service__unbilled-amount">{this.props.service.currencyCode + "." + this.props.service.rate}</div>
                                </div>
                            </div>
                        }
                        {(this.props.service.billData && this.props.service.billData.billAmount && this.props.service.billData.dueDate) &&
                            <div className="service__bill-container">
                                <div className="service__bill-title">Bill:</div>
                                <div className="service__bill-content">
                                    <div className="service__due-date">{this.props.service.billData.dueDate}</div>
                                    <div className="service__bill-amount">{this.props.service.currencyCode + "." + this.props.service.billData.billAmount}</div>
                                    <div className="service__payment-status">{this.props.service.billData.paymentDate ? "Paid" : "Not Paid"}</div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}