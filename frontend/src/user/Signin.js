import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Base from '../core/Base';
import { signin,authenticate,isAuthenticated } from '../auth/helper';




const Signin = () => {

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
    });

    const {email,password,error,loading,didRedirect} = values;

    const {user} = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };


      const onSubmit = event => {
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data => {
            if(data.error){
                
            }
        })
    }

      const successMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-success"
                // style={{ display: success ? "" : "none" }}
              >
                New Account was Created Successfully. Please{" "}
                <Link to="/signin"> Login Here </Link>
              </div>
            </div>
          </div>
        );
      };
    
      const errorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label  className="text-light">
                                Email
                            </label>
                            <input
                            onChange={handleChange("email")}
                            value={email}
                            className='form-control' type="text" />
                        </div>
                        <div className="form-group">
                            <label  className="text-light">
                                Password
                            </label>
                            <input
                            onChange={handleChange("password")}
                            value={password}
                            className='form-control' type="password" />
                        </div>
                        <button className="btn btn-success btn-block mt-2">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="sign in page" description="A page for user to sign in!">
            {signInForm()}

        </Base>
    )
}


export default Signin;