import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'

const initialState = {
    name: '',
    password: '',
    cf_password: "",
    err: '',
    success: ''
}



function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const {email, password, cf_password , name, err, success}  = data

    const handleChane = e => {
        const {name, value} = e.target
        setData({...data, err: '', success: '', [name]:value})
    }


    const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]
            console.log(file)
            if(!file) 
            {
                return setData({...data, err: "No files were uploaded", success: ''})
            }
                
            if(file.size > 1024*1024){
                return setData({...data, err: "Size too large", success: ''})
                
            } // 1mb


            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                return setData({...data, err: "File format is incorrect", success: ''})
            }
            
            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData,{
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)

        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ""})
        }
    }
    const updateInfor = () => {
        try {
            
            axios.patch('/user/update', {
                name: name ? name : user.name,
                avatar: avatar ? avatar : user.avatar
            }, {
                headers: {Authorization: token}
            })

            setData({...data, err: '', success:"Updated Success!!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const updatePassword = () => {
        if(isLength(password)){
            return setData({...data, err:"Password must be at least 6 characters", success: '' })
        }

        if(!isMatch(cf_password, password)){
            return setData({...data, err: "Password did not match", success: ''})
        }

        try {
            
            axios.post('/user/reset', {
                password
            }, {
                headers: {Authorization: token}
            })

            setData({...data, err: '', success:"Updated Success!!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg, success: ''})
        }
    }

    const handleUpdate = () => {
        if(name || avatar) updateInfor()
        if(password) updatePassword()
    }


    return (
        <>
        {err && showErrMsg(err)}
        {success && showSuccessMsg(success)}
        {loading && <h3>Loading...</h3>}
        <div className="profile_page">
            <div className="col-left">
                <h2>User Profile</h2>
                <div className="avatar">
                    <img src={avatar ? avatar : user.avatar} />
                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" name="file" id="file_up" onChange={changeAvatar}/>
                    </span>
                    

                </div>
            
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" 
                    onChange={handleChane}
                    placeholder="Your Name" defaultValue={user.name}/>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Your Email address" 
                    defaultValue={user.email}
                    disabled/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="New Password" 
                    onChange={handleChane}
                    value={password}/>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Comfirm new password</label>
                    <input type="password" name="cf_password" id="cf_password" placeholder="Comfirm Password" 
                    onChange={handleChane}
                    value={cf_password}/>
                </div>
                
                <button disabled={loading} onClick={handleUpdate}>Update</button>

            </div>
            <div className="col-right">
                <h2>{isAdmin ? "User" : "MyOrders"}</h2>

                <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Admin</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Admin</td>
                            <td>Action</td>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile
