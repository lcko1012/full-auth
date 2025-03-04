import React,  {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {isEmail, isEmpty, isLength, isMatch} from '../../utils/validation/Validation'

const initialState = {
    name: '',
    email: '' ,
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password, cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]: value,  err:'' , success: ''})
    }

    const handleSubmit = async e => {
        
        e.preventDefault()
        //Kiem tra nhap day du thong tin
        if(isEmpty(name) || isEmpty(password))
            return setUser({...user, err: 'Please fill in all fields', success: ''})

        //Kiem tra cu phap email
        if(!isEmail(email))
            return setUser({...user, err: 'Invalid emails', success:''})
    
        //Kiem tra do dai cua password
        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters", success: ''})
    
        //Kiem tra confirm password
        if(!isMatch(cf_password, password))
            return setUser({...user, err:"Password is not match", success: ''})
        try {
            const res = await axios.post("http://localhost:5000/user/register", {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err)   {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name " 
                    id="name" value={name} name="name" 
                    onChange={handleChangeInput}></input>
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text" placeholder="Enter email address" 
                    id="email" value={email} name="email" 
                    onChange={handleChangeInput}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" 
                    id="password" value={password} name="password"
                    onChange={handleChangeInput}></input>
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" placeholder="Confirm password" 
                    id="cf_password" value={cf_password} name="cf_password"
                    onChange={handleChangeInput}></input>
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>

            <p>Already an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Register
