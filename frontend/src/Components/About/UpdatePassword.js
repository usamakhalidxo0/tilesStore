import React, { useState } from 'react';
import Axios from 'axios';

function updatePassword(e) {
    e.preventDefault();
    (async function(){
        try{
            const res = await Axios.post('/api/v1/users/update-password',{
                oldPassword:e.target.oldPassword.value,
                password:e.target.password.value,
                passwordConfirm:e.target.passwordConfirm.value
            })
            if(res.status===200)
            alert(res.data.message)
        }
        catch(err){
            if(err.response)
            alert(err.response.data.message)
            else alert(err)
        }
    })();
}

function UpdatePassword(){
    const [state, setState] = useState(null);
    return(
        <div className="container">
            <form onSubmit={(e)=>{
                updatePassword(e);
                setState(Math.random());
            }}>
                <div className="form-group">
                    <label>Old Password</label>
                    <input type="password" className="form-control" name="oldPassword"/>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" className="form-control" name="password"/>
                </div>
                <div className="form-group">
                    <label>New Password Confirm</label>
                    <input type="password" className="form-control" name="passwordConfirm"/>
                </div>
                <input type="submit" value="submit" className="form-control btn btn-secondary"/>
            </form>
        </div>
    )
}

export default UpdatePassword;