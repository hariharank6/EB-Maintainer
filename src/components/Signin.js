import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { getUser, initGoogleSignin, initGuestSignin, handleSignin } from '../gapis/signin'
import { startEmailSyncup } from '../gapis/email'

const Signin = (props) => {
    const [isSignedin, setIsSignedin] = useState(localStorage.getItem("isGoogleSigninProgress") ? "inprogress" : "unknown")

    useEffect(() => {
        getUser().then(signinSuccess, signinFailure)
    }, [])

    const signinSuccess = () => {
        setIsSignedin("signedin")
        startEmailSyncup(props.dispatch ,props.services)
    }

    const signinFailure = () => {
        if(isSignedin == "inprogress") {
            localStorage.removeItem("isGoogleSigninProgress")
            setIsSignedin("unknown")
        }
    }

    return (
        <div>
            {(isSignedin == "unknown" || isSignedin == "inprogress") && (<div className="signin">
                <div className="signin__content">
                    <h1 className="signin__title">Sign up / Go with guest</h1>
                    {isSignedin == "inprogress" ?
                        (<div className="signin__progress">
                            {handleSignin()}
                            Processing signin...
                        </div>) :
                        (<div className="signin__buttonsHolder">
                            <button className="signin__google" onClick={initGoogleSignin}>Google</button>
                            <button className="signin__guest" onClick={() => initGuestSignin()}>Guest</button>
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