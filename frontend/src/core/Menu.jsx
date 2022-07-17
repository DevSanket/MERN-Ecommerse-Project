import React from 'react'
import {Link} from "react-router-dom";

const currentTab = (path) => {
    if(window.location.pathname ===  path){
        return {color:"#2ecc72"};
    }else{
        return {color:"#FFFFFF"}
    }
}

const Menu = () => {

    return  <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab("/")}  className='nav-link' to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab("/cart")} className='nav-link' to="/cart">Cart</Link>
            </li>
            <li className="nav-item">
                <Link
                style={currentTab("/user/dashboard")}
                className='nav-link' to="/user/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to="/">A. Dashbord</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to="/">Sign up</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to="/">Sign In</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' to="/">Sign out</Link>
            </li>
        </ul>
    </div>
}

export default Menu;