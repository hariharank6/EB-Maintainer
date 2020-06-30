import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let setIconToShowFunc

const Header = () => {
    const [iconToShow, setIconToShow] = useState("none")
    setIconToShowFunc = setIconToShow

    return (
        <div className="header">
            <div className="header__title">Electricity Tracker</div>
            <div className="header__statusContainer">
                <img className={iconToShow == "syncing" ? "header__syncIcon show" : "header__syncIcon"} src="../icons/sync_icon.png"></img>
                <img className={iconToShow == "failed" ? "header__failedIcon show" : "header__failedIcon"} src="../icons/failed_icon.png"></img>
            </div>
            {!location.pathname.includes("addall") &&
                <div className="header__button-wrapper">
                    <Link to="/addall" className="header__addAll"><button className="header_addButton">+</button></Link>
                </div>
            }
        </div>
    )
}

export {
    Header,
    setIconToShowFunc
}