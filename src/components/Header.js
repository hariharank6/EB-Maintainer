import React from 'react'
import { Link } from 'react-router-dom'

export default (params) => (
    <div className="header">
        <div className="header__title">Electricity Tracker</div>
        <div className="header__statusContainer">
            <img className="header__syncIcon" src="../icons/sync_icon.png"></img>
        </div>
        {!location.pathname.includes("addall") && 
            <div className="header__button-wrapper">
                <Link to="/addall" className="header__addAll"><button className="header_addButton">+</button></Link>
            </div>
        }
    </div>
)