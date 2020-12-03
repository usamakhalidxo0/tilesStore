import {useContext} from 'react';
import User from './UserContext';
import axios from 'axios';
function useSignUp(){
    const {setUser} = useContext(User);
    return async function(e){
        e.preventDefault();
        try{
            const res = await axios.post('/api/v1/users/sign-up',{
                email:e.target.email.value,
                password:e.target.password.value,
                passwordConfirm:e.target.passwordConfirm.value,
                role:e.target.role.value
            });
            if(res.data.status==="success"){
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

export default useSignUp;