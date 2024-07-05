import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { Formik, useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth/AuthProvider';

function Login() {
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const myFormik = useFormik(
        {
          initialValues: {
            email: "",
            password: ""
          },
          // Validating Forms while entering the data
          validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work
    
            if (!values.password) {
              errors.password = "Please enter password";
            }
            if (!values.email) {
              errors.email = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address';
            }
    
            return errors;
          },
          //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
          onSubmit: async (values) => {
            console.log(values);
            try {
              setLoading(true);
              await login(values);
              navigate("/portal/dashboard");
            } catch (error) {
              console.log(error);
              alert("Email address and password not matched");
              setLoading(false);
            }
          }
    
        });
    return (
        <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                    <div className="card-body p-0">
                        {/* <!-- Nested Row within Card Body --> */}
                        <div className="row">
                            <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                            <div className="col-lg-6">
                                <div className="p-5">
                                    <div className="text-center">
                                        <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                    </div>
                                    <form className="user" onSubmit={myFormik.handleSubmit}>
                                        <div className="form-group">
                                            <input type="email" name='email' value={myFormik.values.email} onChange={myFormik.handleChange} className="form-control form-control-user"
                                                id="exampleInputEmail" aria-describedby="emailHelp"
                                                placeholder="Enter Email Address..." />
                                                <span style={{ color: "red" }}>{myFormik.errors.email}</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" name='password' value={myFormik.values.password} onChange={myFormik.handleChange} className="form-control form-control-user"
                                                id="exampleInputPassword" placeholder="Password" />
                                                <span style={{ color: "red" }}>{myFormik.errors.password}</span>
                                        </div>
                                        <div className="form-group">
                                            <div className="custom-control custom-checkbox small">
                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                <label className="custom-control-label" htmlFor="customCheck">Remember
                                                    Me</label>
                                            </div>
                                        </div>
                                        <input disabled={isLoading} type="submit" value={isLoading ? "Verifying..." : "Login"} className=' btn btn-primary' />
                                    
                                    </form>
                                    <hr />
                                    <div className="text-center">
                                        <a className="small" href="forgot-password.html">Forgot Password?</a>
                                    </div>
                                    {/* <div class="text-center">
                                        <a class="small" href="register.html">Create an Account!</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login