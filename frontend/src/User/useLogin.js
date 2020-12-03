import {useContext} from 'react';
import User from './UserContext';
import axios from 'axios';

function useLogin(){
    const {setUser} = useContext(User);
    return async function(e){
        e.preventDefault();
        try{
            const res = await axios.post('/api/v1/users/',{
                email:e.target.email.value,
                password:e.target.password.value
            });
            if(res.data.status==="success"){
                const res = await axios.get('/api/v1/users/');
                setUser(res.data.user);
            }
            else alert("Unexpected Response");
        }
        catch(err){
            if(err.response)
            alert(err.response.data.message);
            else 
            alert(err);
        }
    }
}

export default useLogin;