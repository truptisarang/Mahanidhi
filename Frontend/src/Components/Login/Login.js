import React, { useState } from "react";
import "../Login/Login.css"
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {MuiOtpInput} from 'mui-one-time-password-input'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {setProfileCompletionStatus} from "../../redux/slices/profile_completion_slice";
import { useSelector } from "react-redux";

const Login = (props) =>{
    const [showPassword, setshowPassword] = useState(false)
    const [OTPsent, setOTPsent] = useState(false)
    const [OTP, setOTP] = useState("");
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)
    const uname = useSelector((state)=>state.Profile.username)
    console.log(isProfileCompleted)
    console.log(uname)

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
      
    const handleLogin = async (e) =>{
     try{
      const response = await axios.post("http://localhost:5000/login",{Username, Password})
      if(response.data.success === true) {
        dispatch(setProfileCompletionStatus({isProfileCompleted:response.data.isProfileCompleted, username:response.data.Username, aadhaar:response.data.Aadhaar}))
        toast.success(response.data.message);
        setOTPsent(true);
      }else{
        toast.error(response.data.message);
      }
     } catch(error){
      toast.error(error)
     }
    }

    const handleNavigation = () =>{
      if(!isProfileCompleted){
        navigate("/profile")
      }else{
        navigate("/dashboard")
      }
    }

    return (
        <>
        <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="dark"
              />

            <div id="loginContainer">
                {/* <div id="loginHeader">  
                </div> */}
                <div id="rupeeImage">
                     <img src="/rupee_symbol-removebg-preview.png" width={200}/> 
                </div>
                <div id="loginForm">
                    <p>{props.title} Login</p>
                    <TextField 
                    id="outlined-basic" 
                    label="Username"
                    variant="outlined" 
                    value={Username}
                    fullWidth 
                    autoComplete="off"
                    onKeyDown={uhandleKeyDown}    
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                    <TextField id="outlined-basic"
                     label="Password"
                     variant="outlined" 
                     value={Password}
                     onChange={(e)=>setPassword(e.target.value)}
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
                       <Button variant="contained" disabled={OTP.length !== 6} onClick={handleNavigation}>Verify OTP</Button>
                      </>
                    }
                </div>
            </div>
        </>
    )
}

export default Login;