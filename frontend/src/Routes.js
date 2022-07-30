import React from 'react';
import {BrowserRouter,Routes as Switch,Route, Navigate} from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';
import UserDashBoard from './user/UserDashBoard';
import AdminDashboard from './user/AdminDashBoard';
import { isAuthenticated } from './auth/helper';

export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" element={<Home/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/signin" element={<Signin/>} /> 
            <Route path="/user/dashboard" exact element={isAuthenticated() ? <UserDashBoard/> : <Navigate to="/" />} />
            <Route path="/admin/dashboard" exact element={isAuthenticated() && isAuthenticated().user.role === 1 ? <AdminDashboard/> : <Navigate to="/" />} />
        </Switch>
    </BrowserRouter>
  )
}
