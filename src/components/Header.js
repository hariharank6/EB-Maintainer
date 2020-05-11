import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
    <div className="header">
        <div className="header__title">EB App</div>
        <div className="header__button-wrapper">
            <Link to="/addall" className="header__addAll">Add all</Link>
            <Link to="/suggestions" className="header__suggestions">Suggestions</Link>
        </div>
    </div>
)