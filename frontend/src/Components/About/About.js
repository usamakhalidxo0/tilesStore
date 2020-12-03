import React, { useContext } from 'react';
import User from '../../User/UserContext';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import UpdateSelf from './UpdateSelf';
import UpdatePassword from './UpdatePassword';

function About(){
    const {user} = useContext(User);
    return(
        <div>
            {!user ? <Redirect to="/"/>:
            <div>
            <UpdateSelf/>
                <hr/>
            <UpdatePassword/>    
            </div>}
        </div>    
    )
}

export default About;