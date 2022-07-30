import React,{Fragment} from 'react'
import {Link} from "react-router-dom";
import { isAuthenticated, signout } from '../auth/helper';

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
                className='nav-link' to="/user/dashboard">U.Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link'
                style={currentTab("/admin/dashboard")}
                to="/admin/dashboard">A. Dashbord</Link>
            </li>
           {
            !isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link 
                     style={currentTab("/signup")}
                    className='nav-link' to="/signup">Sign up</Link>
                </li>
                <li className="nav-item">
                    <Link 
                     style={currentTab("/signin")}
                     className='nav-link' to="/signin">Sign In</Link>
                </li>
                </Fragment>
            )
                       
            }
           {
                isAuthenticated() && ( <li className="nav-item">
                <span 
                onClick={() => {
                    signout( () => {
                        window.history.pushState({}, undefined, "/");
                        window.location.reload();
                    })
                
                }}
                className="nav-link text-warning">
                    Signout
                </span>
            </li>) 
           }
        </ul>
    </div>
}

export default Menu;