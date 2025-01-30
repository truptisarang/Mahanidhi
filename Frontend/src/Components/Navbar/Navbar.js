import React from "react";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import "../Navbar/Navbar.css"
import { useLocation, useNavigate } from 'react-router-dom'
import CreateIcon from '@mui/icons-material/Create';
import { useSelector } from "react-redux";

const Navbar = () =>{
  const username = useSelector((state)=>state.Profile.username)
  const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)

    const location = useLocation();
    const currentRoute = location.pathname;
    const navigate = useNavigate();

    const onLogin = () =>{
      navigate('/login')
    }

    const onRegister = () =>{
      navigate('/registration')
    }
    
    return (
      <>
        <div id="navContainer">
          <navbar>
            <div id="logo">
              <h3>महा निधी</h3>
            </div>
            <div id="Btnlogin">
              {currentRoute === "/login" ? <Button variant="filled" endIcon={<CreateIcon />} onClick={onRegister}>Register</Button> : <Button variant="filled" endIcon={<LoginIcon />} onClick={onLogin}>Login</Button>}
            </div>
          </navbar>
        </div>
      </>
    );

}
                
export default Navbar;