import React from 'react'
import {Route,Navigate} from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = ({component: Component,...rest}) => {
    return (
        <Route
            {...rest}
            element = {props => 
             
                isAuthenticated() ? (
                    <Component {...props} />
                ) : 
                    (
                        <Navigate
                            to={{
                                pathname:"/signin",
                                state:{from : props.location}
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute;