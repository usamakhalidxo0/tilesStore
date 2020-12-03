import React from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function PasswordReset(props){
    const {email,token}=useParams();
    return(
        <div>
           <div className="container">
                <form onSubmit={async function(e){
                    e.preventDefault()
                    try{
                        const res = await Axios.post(`/api/v1/users/password-reset/${email}/${token}`, {
                            password:e.target.password.value,
                            passwordConfirm:e.target.passwordConfirm.value
                        })
                        if(res.status===200)
                        alert('Password reset successful!')
                    }
                    catch(err){
                        if(err.response)
                        alert(err.response.data.message)
                        else alert(err)
                    }
                }} >
                    <div className="form-group">
                        <label htmlFor="password" >Password</label>
                        <input type="password" name="password" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm" >passwordConfirm</label>
                        <input type="password" name="passwordConfirm" className="form-control"/>
                    </div>
                    <div className="form-group row justify-content-end">
                        <input type="submit" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset;