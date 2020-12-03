import React, {useContext} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import UserTag from './UserTag';
import {Link} from 'react-router-dom';
import User from '../../User/UserContext';

function MyNavbar(){
    const {user} = useContext(User);
    return (
        <Navbar bg="light" expand="lg">
            <Link className="navbar-brand" to="/">iTiles</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {user ?
                <Nav className="mr-auto">
                <Link className="nav-link" to="/home">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
                </Nav>
                :null}
                <UserTag/>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MyNavbar;