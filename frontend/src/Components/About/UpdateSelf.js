import React, { useContext } from 'react';
import Axios from 'axios';
import User from '../../User/UserContext';

function updateSelf(e) {
e.preventDefault();
    (async ()=>{
        try{
        const res = await Axios.patch('/api/v1/users/',{
            email:e.target.email.value
        })
        if(res.status===200)
        alert(res.data.message)
        }
        catch(err){
            if(err.response)
            alert(err.response.data.message)
            else alert(err)    
        }
    
    })()
}

function UpdateSelf(){
    const {user} = useContext(User);
    return(
        <div className="container">
            <form  onSubmit={updateSelf}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name ="email" className="form-control" defaultValue={user.email}/>
                </div>
                <div className="form-group">
                    <input className="form-control btn btn-primary" type="submit" value="Update"/>
                </div>
            </form>
        </div>
        )
}

export default UpdateSelf;