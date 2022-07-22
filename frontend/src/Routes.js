import React from 'react';
import {BrowserRouter,Routes as Switch,Route} from "react-router-dom";
import Home from './core/Home';
import Signin from './user/Signin';
import Signup from './user/Signup';


export default function Routes() {
  return (
    <BrowserRouter>
        <Switch>
            <Route path="/" element={<Home/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/signin" element={<Signin/>} /> 
        </Switch>
    </BrowserRouter>
  )
}
