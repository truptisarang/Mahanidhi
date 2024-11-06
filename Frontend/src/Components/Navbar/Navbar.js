import React from "react";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import "../Navbar/Navbar.css"

const Navbar = () =>{
    return (
      <>
        <div>
          <navbar>
            <div id="logo">
              <h3>भारत निधि</h3>
            </div>
            <div id="Btnlogin">
              <Button variant="filled" endIcon={<LoginIcon />}>
                Login
              </Button>
            </div>
          </navbar>
        </div>
      </>
    );

}
                
export default Navbar;