import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "../Navbar/Navbar.css";
import {useNavigate } from "react-router-dom";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useDispatch, useSelector } from "react-redux";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  IconButton,
  Menu,
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { logout } from "../../redux/slices/profile_completion_slice";
import axios from "axios";
import { Officerlogout } from "../../redux/slices/officer_slice";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.Profile.isLoggedIn);
  const isOfficerLoggedIn = useSelector((state) => state.Officer.isLoggedIn);
  const officerRole = useSelector((state) => state.Officer.role);


  const dispatch = useDispatch()
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/login", { replace: true });
  };

  const onRegister = () => {
    navigate("/registration", { replace: true });
  };

  const onOfficerLogin = () => {
    navigate("/officer-login", { replace: true });
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const Logout = async() =>{
    const response = await axios.post("http://localhost:5000/logout")
    if(officerRole){
      dispatch(Officerlogout())
    }else{
      dispatch(logout())
    }
  }
 

  return (
    <>
      <div id="navContainer">
        <nav>
          <div id="logo">
            <h3>महा निधी</h3>
          </div>
          <div>
          <IconButton style={{ marginLeft: "1rem" }} onClick={(e)=>navigate("/",{replace:true})}>
            <HomeIcon fontSize="large"></HomeIcon>
          </IconButton>
          <IconButton style={{ marginLeft: "1rem" }} onClick={handleClick}>
            <MenuIcon fontSize="large"></MenuIcon>
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={onRegister}>
              <ListItemIcon>
                <PersonAddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </MenuItem>
            
            <MenuItem onClick={onLogin}>
              <ListItemIcon>
                <LoginIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </MenuItem>

            <MenuItem onClick={onOfficerLogin}>
              <ListItemIcon>
                <AdminPanelSettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Officer / Admin Login" />
            </MenuItem>
          </Menu>
          {(isLoggedIn || isOfficerLoggedIn) ? <Button variant={'text'} color="inherit" style={{marginRight:'1rem'}} endIcon={<LogoutIcon></LogoutIcon>} onClick={Logout}>Logout</Button> : null}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
