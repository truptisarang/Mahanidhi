import React, { useState } from "react";
import "../Login/Login.css"
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {MuiOtpInput} from 'mui-one-time-password-input'


const Login = (props) =>{
    const [showPassword, setshowPassword] = useState(true)
    const [OTPsent, setOTPsent] = useState(false)
    const [OTP, setOTP] = useState("");

    const uhandleKeyDown=(e)=>{
        const valid_special_character = /^[A-Za-z0-9._]/
        if(!valid_special_character.test(e.key)){
          e.preventDefault();
        }
      }

    const phandleKeyDown=(e)=>{
        const special_char_regex = /[A-Za-z0-9$#@_]/
        if(!special_char_regex.test(e.key)){
          e.preventDefault();
        }
      }

    const handleLogin = (e) =>{
      setOTPsent(true);
    }

    return (
        <>
            <div id="loginContainer">
                <div id="loginHeader">
                    <p>{props.title} Login</p>
                </div>
                <div id="rupeeImage">
                     <img src="/rupee_symbol-removebg-preview.png" width={200}/> 
                </div>
                <div id="loginForm">
                    <TextField 
                    id="outlined-basic" 
                    label="Username"
                    variant="outlined" 
                    fullWidth 
                    autoComplete="off"
                    onKeyDown={uhandleKeyDown}    
                    />
                    <TextField id="outlined-basic"
                     label="Password"
                     variant="outlined" 
                     type={showPassword ? 'text' : 'password'} 
                     fullWidth 
                     autoComplete="off" 
                     onKeyDown={phandleKeyDown}
                     InputProps={{endAdornment:<InputAdornment position="end">
                        <IconButton
                        onClick={(e)=>{setshowPassword(!showPassword)}} >{showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                     </InputAdornment>}}
                     /> 
                    
                    <div id="forgotContainer">
                            <a href="#">Forgot Password? </a> &nbsp;&nbsp;
                            <a href="#">Forgot Username? </a>
                    </div>
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                    {
                      OTPsent &&
                      <>
                       <MuiOtpInput id='otp' value={OTP} onChange={setOTP} length={6} gap={0.5} autoFocus />                  
                       <Button variant="contained" disabled={OTP.length !== 6}>Verify OTP</Button>
                      </>
                    }
                </div>
            </div>
        </>
    )
}

export default Login;