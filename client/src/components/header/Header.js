import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

function Header() {
    const auth = useSelector(state => state.auth)
    // console.log(auth)
    const {user, isLogged} = auth

    

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar"> 
            <img src={user.avatar} alt="" /> 
            {user.name}<i class="fas fa-caret-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/">Logout</Link></li>

            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/">KO SHOP</Link></h1>
            </div>

            <ul style={transForm}>
                <li>
                    <Link to="/"><i className="fas fa-shopping-cart"></i>Cart</Link>
                </li>
                {
                    isLogged
                    ? userLink()
                    : <li><Link to="/"><i className="fas fa-user"></i>Sign in</Link></li>
                }
                
            </ul>
        </header>
    )
}

export default Header
