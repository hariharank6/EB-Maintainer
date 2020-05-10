import React from 'react'

export default (props) => (
    <div>
        {
            (props && props.serviceNo && props.units && props.rate && props.nickname && props.entryDate) &&
            <div className="service">
                <div className="service__titlebar">
                    <div className="service__title">{props.nickname}</div>
                    <div className="service__title-rate">{props.rate}</div>
                    <button className="service__add-button">Add</button>
                </div>
                {(props.billData && props.billData.billAmount && props.billData.dueDate) &&
                    <div className="service__content">
                        <div className="service__billTitle">Bill details:</div>
                        <div className="service__bill-content">
                            <div className="service__billAmount">{props.billData.billAmount}</div>
                            <div className="service__dueDate">{props.billData.dueDate}</div>
                            <div className="service__isPaid">{props.billData.paymentDate ? "Paid" : "Not Paid"}</div>
                        </div>
                    </div>
                }
            </div>
        }
    </div>
)