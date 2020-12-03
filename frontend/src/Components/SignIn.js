import React, { useContext } from 'react';
import useLogin from '../User/useLogin';
import {Link, Redirect} from 'react-router-dom';
import User from '../User/UserContext';

function SignIn(){
    const login = useLogin();
    const {user} = useContext(User);
    return (
        <div>
        {user?<Redirect to="/home"/>:
            <div className="container">
                <form onSubmit={login} >
                    <div className="form-group">
                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input type="password" name="password" className="form-control"/>
                    </div>
                    <div className='form-group'>
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="form-group row justify-content-end">
                        <input type="submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>     
        }   
    </div>     
    )
}

export default SignIn;