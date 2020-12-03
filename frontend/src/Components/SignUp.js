import React, { useContext } from 'react';
import useSignUp from '../User/useSignUp';
import User from '../User/UserContext';
import { Redirect } from 'react-router-dom';

function SignUp(){
    const signUp = useSignUp();
    const {user} = useContext(User);
    return (
    <div>
        {user?<Redirect to="/home"/>:
            <div className="container">
                <form onSubmit={signUp} >
                    <div className="form-group">
                        <label htmlFor="email" >Email</label>
                        <input type="email" name="email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input type="password" name="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm" >passwordConfirm</label>
                        <input type="password" name="passwordConfirm" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <select name="role">
                            <option value="customer">Customer</option>
                            <option value="vendor">Vendor</option>
                        </select>
                        <div className="form-group row justify-content-end">
                            <input type="submit" className="btn btn-primary"/>
                        </div>
                    </div>
                </form>
            </div>        
        }
    </div>     
    )
}

export default SignUp;