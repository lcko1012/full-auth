import React, {useEffect} from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import Body from './components/body/Body'
import Header from './components/header/Header'
import axios from 'axios'

import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  //TODO: maintain login
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      
      const getToken = async () => {
        const res = await axios.post("http://localhost:5000/user/refresh_token", null, {withCredentials: true})
        if(res){
          console.log("access" ,res.data.access_token)
          dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
        }

      }
      getToken()
    }
  }, [auth.isLogged, dispatch])

  //TODO: Take infor
  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  }, [token, dispatch])

  return (
    <Router>
      <div className="App">
        <Header />
        <Body />
      </div>
    </Router>

  );
}

export default App;
