import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';

const Signup = () => {

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">
                                Name
                            </label>
                            <input className='form-control' type="text" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">
                                Email
                            </label>
                            <input className='form-control' type="text" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">
                                Password
                            </label>
                            <input className='form-control' type="password" />
                        </div>
                        <button className="btn btn-success btn-block mt-2">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="sign up page" description="A page for user to sign up!">
            {signUpForm()}
        </Base>
    )
}


export default Signup;