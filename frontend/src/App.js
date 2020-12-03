import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SignIn from './Components/SignIn';
import MyNavbar from './Components/Navbar/Navbar';
import SignUp from './Components/SignUp';
import 'bootstrap/dist/css/bootstrap.css';
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import User from './User/UserContext';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import NotFound from './Components/NotFound';
import ForgotPassword from './Components/FogrotPassword';
import PasswordReset from './Components/PasswordReset';
import About from './Components/About/About';

function App(){
  const [user,setUser] = useState(null);
  useEffect(()=>{
    (async function(){
    try{
    const res = await axios.get('/api/v1/users/');
    setUser(res.data.user);
    }
    catch(err){
    }
  })();
},[]);
return (
  <Router>
    <User.Provider value={{user,setUser}}>
      <MyNavbar/>
        <Switch>
          <Route exact strict path="/">
            <LandingPage/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
          <Route exact path="/signin">
            <SignIn/>
          </Route>
          <Route exact path="/signup">
            <SignUp/>
          </Route>
          <Route exact path="/forgot-password">
            <ForgotPassword/>
          </Route>
          <Route exact path="/password-reset/:email/:token">
            <PasswordReset/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
    </User.Provider>
      </Router>
  )
}

export default App;