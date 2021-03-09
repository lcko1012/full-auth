import axios from 'axios'
import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isLength, isMatch} from '../../utils/validation/Validation'


const initialState = {
    password: '',
    cf_password: '',
    err: '',
    success: ''
}


function ResetPassword() {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const {cf_password, password, err, success} = data

    const handleChangeInput = (e) => {
        const {name, value} = e.target
        setData({...data, [name] : value, err: '', success: ''})
    }

    const handleResetPassword = async () => {
        if(isLength(password)){
            return setData({...data, err: "Password must be at least 6 characters", success: ''})
        }
        if(!isMatch(cf_password, password))
            return setData({...data, err:"Password is not match", success: ''})

        try {
            const res = await axios.post('/user/reset', {password}, {
                headers: {Authorization: token}
            })

            return setData({...data, err: "", success: res.data.msg})
        } catch (err) {
            err.response.data.msg && setData({...data, err: err.response.data.msg, success: ''})
        }
        
    }

    return (
        <div className="fg_pass">
            <h2>Forgot your password</h2>
            <div className="row">
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}

                <label htmlFor="password">Enter your password</label>
                <input type="password" name="password" id="password" value={password} 
                onChange={handleChangeInput}></input>

                <label htmlFor="cf_password">Confirm password</label>
                <input type="password" name="cf_password" id="cf_password" value={cf_password} 
                onChange={handleChangeInput}></input>
                <button onClick={handleResetPassword}>Reset Password</button>
            </div>
        </div>
    )
}

export default ResetPassword
