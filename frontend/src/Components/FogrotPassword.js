import React from 'react';
import Axios from 'axios';

function GetReset(props){
    return (
        <div>
            <div className="container">
            <form onSubmit={async function (e){
                e.preventDefault();
                try{ 
                    const res = await Axios.post(`/api/v1/users/forgot-password`,{
                    email:e.target.email.value
                    })
                    if(res.status===200)
                    alert('Token generated, goto your inbox!')
                }
                catch(err){
                    if(err.response)
                    alert(err.response.data.message)
                    else alert(err)
                }
            }} >
                <div className="form-group">
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" className="form-control"/>
                </div>
                <div className="form-group row justify-content-end">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default GetReset;