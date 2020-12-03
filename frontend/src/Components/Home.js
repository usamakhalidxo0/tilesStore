import React, { useContext } from 'react';
import User from '../User/UserContext';
import { Redirect } from 'react-router-dom';

function Home(){
    const {user} = useContext(User);
    return(
        <div>
            {!user ? <Redirect to="/"/>:null}
            {user ? user.email:null}
        </div>
    )
}

export default Home;