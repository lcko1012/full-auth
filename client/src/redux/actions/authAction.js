import ACTIONS from './index'
import axios from 'axios'

//TODO: INSTALL LOGIN DISPATCH
export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}
//TODO: GET INFOR OF USER
export const fetchUser = async (token) => {
    const res = await axios.get('/user/infor', {
        headers: {Authorization: token}
    })
    return res
}

export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}