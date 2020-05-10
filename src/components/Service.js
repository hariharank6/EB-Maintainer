import React from 'react'

export default Service = (props) => (
    <div className="service">
        {props && props.serviceNo && props.units && props.rate && props.nickname &&
            <div className="service__titlebar">
                <div className="service__title">{props.nickname}</div>
            </div>
            <button className="service__add">Add</button>
        }
    </div>
)