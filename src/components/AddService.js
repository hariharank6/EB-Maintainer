import React from 'react'

export default (props) => (
    <div className="addservice">
        {props && props.service && props.service.serviceNo &&
            <div>
                <input type="number" className="addservice__add-unit" placeholder="Enter the current Unit:"></input>
                {!props.isAddAllEmbed &&
                    <div className="addservice__buttons-container">
                        <button className="addservice__add-button">ADD</button>
                        <button className="addservice__cancel-button">CANCEL</button>
                    </div>
                }
            </div>
        }
    </div>
)