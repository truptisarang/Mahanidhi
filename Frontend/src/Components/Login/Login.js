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
import {setOfficer} from "../../redux/slices/officer_slice";
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
    const role = useSelector((state)=>state.Officer.role)

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
    
    
    const handleOfficerLogin = async (e) =>{
      try {
        const response = await axios.post("http://localhost:5000/officerLogin", { Username, Password });
        if (response.data.success === true) {
            dispatch(setOfficer({
                username: response.data.data.FullName,
                deptName: response.data.data.DeptName,
                role: response.data.data.Role
            }));
            toast.success(response.data.message);
            setOTPsent(true);
        } else {
            toast.error(response.data.message);  // Message from backend in case of failure
        }
    } catch (error) {
        // Enhanced error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            toast.error(`Error: ${error.response.data.message || 'Something went wrong!'}`);
        } else if (error.request) {
            // The request was made but no response was received
            toast.error('No response from the server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            toast.error(`Error: ${error.message}`);
        }
    }
    }

    const handleLogin = async (e) => {
      try {
          const response = await axios.post("http://localhost:5000/login", { Username, Password });
  
          // Check if the response indicates success
          if (response.data.success === true) {
              dispatch(setProfileCompletionStatus({
                  isProfileCompleted: response.data.isProfileCompleted,
                  username: response.data.Username,
                  aadhaar: response.data.Aadhaar
              }));
              toast.success(response.data.message);
              setOTPsent(true);
          } else {
              toast.error(response.data.message);  // Message from backend in case of failure
          }
      } catch (error) {
          // Enhanced error handling
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              toast.error(`Error: ${error.response.data.message || 'Something went wrong!'}`);
          } else if (error.request) {
              // The request was made but no response was received
              toast.error('No response from the server. Please try again later.');
          } else {
              // Something happened in setting up the request that triggered an Error
              toast.error(`Error: ${error.message}`);
          }
      }
  };

    

    const handleNavigation = () =>{
      if(role === "Officer"){
        navigate('/officer-dashboard')
      }else if(role === "Admin"){
        navigate('/admin-dashboard')
      }else{
        if(!isProfileCompleted){
          navigate("/profile")
        }else{
          navigate("/dashboard")
        }
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
                theme="colored"
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
                    <Button variant="contained" disabled={Username === "" || Password === ""} onClick={props.title==="Officer" ? handleOfficerLogin : handleLogin}>Login</Button>
                    {
                      OTPsent &&
                      <>
                       <MuiOtpInput id='otp' value={OTP} onChange={setOTP}  length={6} gap={0.5} autoFocus />                  
                       <Button variant="contained" disabled={OTP.length !== 6} onClick={handleNavigation}>Verify OTP</Button>
                      </>
                    }
                </div>
            </div>
        </>
    )
}

export default Login;