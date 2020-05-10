import React from 'react'

export default (props) => (
    <div>
        {props && props.service && props.service.serviceNo && typeof props.service.units != "undefined" && typeof props.service.rate != "undefined" && props.service.nickname && props.service.entryDate &&
            <div className="service">
                <div className="service__titlebar">
                    <div className="service__title">{props.service.nickname}</div>
                    <div className="service__title-rate">{props.service.rate}</div>
                    <button className="service__add-button">Add</button>
                </div>
                {(props.service.billData && props.service.billData.billAmount && props.service.billData.dueDate) &&
                    <div className="service__content">
                        <div className="service__billTitle">Bill details:</div>
                        <div className="service__bill-content">
                            <div className="service__billAmount">{props.service.billData.billAmount}</div>
                            <div className="service__dueDate">{props.service.billData.dueDate}</div>
                            <div className="service__isPaid">{props.service.billData.paymentDate ? "Paid" : "Not Paid"}</div>
                        </div>
                    </div>
                }
            </div>
        }
    </div>
)