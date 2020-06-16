import React, { useState, useEffect } from 'react'
import { checkSignin, initGoogleSignin, initGuestSignin, handleSignin } from '../gapis/signin'
import {isEmailDataNeeded} from '../common/common'

export default () => {
    const [dummyCount, setDummyCount] = useState(0)
    const forceUpdate = () => {
        setDummyCount(dummyCount + 1)
    }

    return <div>
        {
            (checkSignin() ?
                localStorage.getItem("token") && localStorage.getItem("token").length && isEmailDataNeeded() :
                <div className="signin">
                    <div className="signin__content">
                        <h1 className="signin__title">Sign up / Go with guest</h1>
                        {localStorage.getItem("isGoogleSigninProgress") == "true" ?
                            (<div className="signin__progress">
                                {handleSignin(forceUpdate)}
                                Processing signin...
                            </div>) :
                            <div className="signin__buttonsHolder">
                                <button className="signin__google" onClick={initGoogleSignin}>Google</button>
                                <button className="signin__guest" onClick={() => initGuestSignin(forceUpdate)}>Guest</button>
                            </div>
                        }
                    </div>
                </div>
            )
        }
    </div>
}