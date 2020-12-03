import React, {useContext} from 'react';
import User from '../../User/UserContext';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


function UserTag(){
    const {user,setUser} = useContext(User);
    let result;
    if(user){
    result =  <Nav><a href="#" className="nav-link" onClick={()=>{Axios.get("/api/v1/users/logout"); setUser(null)}}>logOut</a></Nav> 
    }
    else{
    result = <Nav><Link className="nav-link" to="/signin">Sign In</Link>
    <Link className="nav-link" to="/signup">Sign Up</Link></Nav>
    }
    return result;
}

export default UserTag;