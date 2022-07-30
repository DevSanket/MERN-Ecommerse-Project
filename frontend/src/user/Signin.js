import React,{useState} from 'react';
import { Navigate} from 'react-router-dom';
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
                setValues({...values,error:data.error,loading:false});
            }else{
              authenticate(data,() => {
                setValues({
                  ...values,
                  loading:false,
                  didRedirect:true
                })
              })
            }
            window.location.reload();
        })
        .catch(err => {
          console.log("signin request failed");
        })
    }


    const performRedirect = () => {
      if(didRedirect){
        if(user &&  user.role === 1){
            return <Navigate to="/admin/dashboard" />
        }else{
          return <Navigate to="/user/dashboard" />
        }
      }

      if(isAuthenticated()){
        return <Navigate to="/" />;
      }
    }

      const loadingMessage = () => {
        return (
         loading && (
          <div className="alert alert-info">
            <h2>Loading...</h2>
         </div>
         )
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
                        <button onClick={onSubmit}  className="btn btn-success btn-block mt-2">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="sign in page" description="A page for user to sign in!">
          {loadingMessage()}
          {errorMessage()}
          {signInForm()}
          {performRedirect()}
          {/* <p>{JSON.stringify(values)}</p> */}
        </Base>
    )
}


export default Signin;