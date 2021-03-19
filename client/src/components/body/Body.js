import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import Home from './home/Home'
import Profile from './profile/Profile'
import {useSelector} from 'react-redux'
import EditUser from './profile/EditUser'

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={ isLogged ? NotFound : Login} exact />
                <Route path="/register" component={ isLogged ? NotFound : Register} exact />
                <Route path="/forgot_password" component={ isLogged ? NotFound : ForgotPassword} exact />
                <Route path="/user/reset/:token" component={ isLogged ? NotFound : ResetPassword} exact />
                
                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />


            </Switch>
        </section>
    )
}

export default Body
