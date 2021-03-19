import React,  {useState} from 'react'
import {Link, useHistory, useRouteMatch} from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const initialState = {
    email: '' ,
    password: '',
    err: '',
    success: ''
}

function Login() {
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()
    const {email, password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]: value,  err:'' , success: ''})
    }

    const handleSubmit = async e => {
        console.log("call submit function")
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/user/login' , {email, password}, {withCredentials: true})
            
            setUser({...user, err: '', success: res.data.msg})
            localStorage.setItem('firstLogin' , true)

            dispatch(dispatchLogin())
            history.push("/")
        } catch (err)   {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseGoogle = async (response) => {
        console.log(response)
        try {
            const res = await axios.post('http://localhost:5000/user/google_login', {tokenId: response.tokenId}, {withCredentials: true})
            
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin' , true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    const responseFacebook = async (response) => {
        console.log(response)
        try {
            const {accessToken, userID} = response
            const res = await axios.post('http://localhost:5000/user/facebook_login', {accessToken, userID}, {withCredentials: true})
            
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin' , true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg &&
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
    return (
        <div className="login_page">
            <h2>Login</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
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

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password" >Forgot your password</Link>

                </div>
            </form>
            
            <div className="hr">
                Or Login With
            </div>
            <div className="social">
            <GoogleLogin
                clientId="928219660909-33ealu8hipnc5560sn7g84jt4vgr0216.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            </div>
            <FacebookLogin
            appId="275239624114430"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook} />
            
            <p>New Customer? <Link to="/register">Register</Link></p>

        </div>
    )
}

export default Login
