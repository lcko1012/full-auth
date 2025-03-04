import React, {useState} from 'react'
import axios from 'axios'
import {isEmail} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

const initialState = {
    email: '',
    err: '',
    success: ''
}

const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const {email, err, success} = data

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setData({...data, [name] : value, err: '', success: ''})
    }

    const forgotPassword = async () => {

        console.log("click")
        if(!isEmail(email))

            return setData({...data, err: 'Invalid Email', success: ''})

        try {
            console.log("click2")
            const res = await axios.post('http://localhost:5000/user/forgot', {email}, {withCredentials: true})
            
            return setData({...data, err:'', success: res.data.msg})
        } catch (err) {
            err.response.data.msg ?? setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="fg_pass">
            <h2>Forgot your password</h2>
            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="email">Enter your email address</label>
                <input type="email" name="email" id="email" value={email} 
                onChange={handleChangeInput}></input>
                <button onClick={forgotPassword}>Verify your email</button>
            </div>
        </div>
    )
}

export default ForgotPassword
