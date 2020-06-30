import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getUser, initGoogleSignin, initGuestSignin, handleSignin } from '../gapis/signin'
import { startEmailSyncup } from '../gapis/email'

const Signin = (props) => {
    const [isSignedin, setIsSignedin] = useState(localStorage.getItem("signinStatus") ? localStorage.getItem("signinStatus") : "unknown")

    useEffect(() => {
        getUser(setIsSignedin).then(signinSuccess, signinFailure)
    }, [])

    const signinSuccess = () => {
        setIsSignedin("signedin")
        startEmailSyncup(props.dispatch ,props.services)
    }

    const signinFailure = () => {
        if(isSignedin == "inprogress") {
            localStorage.setItem("signinStatus", "unknown")
            setIsSignedin("unknown")
        }
    }

    return (
        <div>
            {(isSignedin == "unknown" || isSignedin == "inprogress") && (<div className="signin">
                <div className="signin__content">
                    <h1 className="signin__title">Get started!</h1>
                    <div className="signin__notOptimised">This web app is designed for mobile devices and not optimsed for other devices. Switch to mobile for best experience.</div>
                    {isSignedin == "inprogress" ?
                        (<div className="signin__progress">
                            {handleSignin()}
                            Processing signin...
                        </div>) :
                        (<div className="signin__buttonsHolder">
                            <button className="signin__google" onClick={initGoogleSignin}>
                                <img style={{width:20 + 'px'}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" className="signin__googleImg"></img>
                                <div>Google</div>
                                </button>
                            <button className="signin__guest" onClick={(setIsSignedin) => initGuestSignin()}>Guest</button>
                        </div>)
                    }
                </div>
            </div>)}
        </div>
    )
}

const storeToProps = (state) => ({
    services: state.services
})

export default connect(storeToProps)(Signin)