import React, {useState} from 'react'
import {checkSignin, initGoogleSignin, initGuestSignin, handleSignin} from '../signin/signin'

export default () => {
    const [dummyCount, setDummyCount] = useState(0)
    const forceUpdate = () => {
        setDummyCount(dummyCount + 1)
    }
    return <div>
        {
            checkSignin() ?
            '' :
            <div className="signin">
                {localStorage.getItem("isGoogleSigninProgress") == "true" && handleSignin(forceUpdate)}
                <div className="signin__content">
                    <h1 className="signin__title">Sign up / Go with guest</h1>
                    <div className="signin__buttonsHolder">
                        <button className="signin__google" onClick={initGoogleSignin}>Google</button>
                        <button className="signin__guest" onClick={()=>initGuestSignin(forceUpdate)}>Guest</button>
                    </div>
                </div>
            </div>
        }
    </div>
}