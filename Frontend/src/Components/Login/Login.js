import React, { useState } from "react";
import "../Login/Login.css";
import { Button, IconButton, InputAdornment, TextField, Typography, Modal, Box } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess} from "../../redux/slices/profile_completion_slice";
import { OfficerloginSuccess } from "../../redux/slices/officer_slice";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

axios.defaults.withCredentials = true;

const Login = (props) => {
  const [showPassword, setshowPassword] = useState(false);
  const [OTPsent, setOTPsent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Userid, setUserid] = useState("");
  const [Loading, setLoading] = useState(false);
  const [LoadingVerifyOTP, setLoadingVerifyOTP] = useState(false);
  const [Role, setRole] = useState("User")
  const [OpenForgotPwd, setOpenForgotPwd] = useState(false)
  const [forgot_pwd_email, setforgot_pwd_email] = useState("")
  const [isValid, setIsValid] = useState(null);
  const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isProfileCompleted = useSelector(
    (state) => state.Profile.isProfileCompleted
  );
  const uname = useSelector((state) => state.Profile.username);
  const role = useSelector((state) => state.Officer.role);

  const uhandleKeyDown = (e) => {
    const valid_special_character = /^[A-Za-z0-9._]/;
    if (!valid_special_character.test(e.key)) {
      e.preventDefault();
    }
  };

  const phandleKeyDown = (e) => {
    const special_char_regex = /[A-Za-z0-9$#@_.]/;
    if (!special_char_regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const validateEmail = (email) => {
    setIsValid(emailRegex.test(email));
    console.log(emailRegex.test(email))
  };

  const backend_url = process.env.REACT_APP_BACKEND_URL;


  const handleOfficerLogin = async (e) => {
    try {
      setLoading(true)
      const response = await axios.post(`${backend_url}/officerLogin`, {
        Username,
        Password,
      });
      setEmail(response.data.email)
      setUserid(response.data.userid)
      setRole(response.data.role)
      if (response.data.success === true) {
        toast.success(response.data.message);
        setOTPsent(true);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(response.data.message); 
      }
    } catch (error) {
      setLoading(false)
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "Something went wrong!"}`
        );
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleLogin = async (e) => {
    try {
      setLoading(true);
      const response = await axios.post(`${backend_url}/login`, {
        Username,
        Password,
      });
      setEmail(response.data.email);
      setUserid(response.data.userid);
      setRole(response.data.role);
      // Check if the response indicates success
      if (response.data.success === true) {
        toast.success(response.data.message);
        setOTPsent(true);
        setLoading(false);
      } else {
        setLoading(false)
        toast.error(response.data.message); // Message from backend in case of failure
      }
    } catch (error) {
      // Enhanced error handling
      setLoading(false)
      if (error.response) {
        toast.error(
          `Error: ${error.response.data || "Something went wrong!"}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleNavigation = async () => {
    if (OTP) {
      setLoadingVerifyOTP(true);
      const response = await axios.post(`${backend_url}/verifyOTP`, {
        email: Email,
        enteredOtp: OTP,
        userId: Userid,
        role: Role,
      });
      
      console.log(response)
      if (response.data.success === true) {
        toast.success(response.data.message);
        setLoadingVerifyOTP(false);
        if(Role  === "User"){
          dispatch(
            loginSuccess({
              isProfileCompleted: response.data.data.isProfileCompleted,
              username: response.data.data.username,
              aadhaar: response.data.data.Aadhaar,
              isLoggedIn: true
            })
          );
        } else{
            dispatch(
              OfficerloginSuccess({
                fullName: response.data.data.fullName,
                deptName: response.data.data.deptName,
                role: response.data.data.role,
                isLoggedIn: true,
              })
            );
        }
        switch (Role) {
            case "Officer":
              navigate("/officer-dashboard");
              break;
            case "Admin":
              navigate("/admin-dashboard");
              break;
            default:
              if (!response.data.data.isProfileCompleted) {
                navigate("/profile");
              } else {
                navigate("/dashboard");
              }
          }
      } else {
        toast.error(response.data.message);
      }
    }
  };

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

      <Modal
        id="mouse-over-popover"
        open={OpenForgotPwd}
        onClose={(e)=>{setOpenForgotPwd(false); setforgot_pwd_email("")}}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ p: 1, backgroundColor: "white", borderRadius: ".5rem", width:"500px"}}>
          <Typography sx={{ p: 1}}>
            <h4>Forgot Password</h4>
            <TextField

            id="outlined-basic"
            label="Enter Email ID"
            variant="outlined"
            error={!isValid}
            helperText={isValid ? "" : "Please enter valid email"}  
            value={forgot_pwd_email}
            fullWidth
            autoComplete="off"
            onChange={(e) => {setforgot_pwd_email(e.target.value); validateEmail(e.target.value)}}
          />
          
          <center style={{margin:'1rem'}}><Button variant="contained" color="success">Send Password Reset Link</Button></center>
          </Typography>
        </Box>
      </Modal>

      <div id="loginContainer">
        {/* <div id="loginHeader">  
                </div> */}
        <div id="rupeeImage">
          <img src="/rupee_symbol-removebg-preview.png" width={200} />
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            fullWidth
            autoComplete="off"
            onKeyDown={phandleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => {
                      setshowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <div id="forgotContainer">
          </div>
          <Button
            variant="contained"
            size="30px"
            disabled={Username === "" || Password === ""}
            onClick={
              props.title === "Officer" ? handleOfficerLogin : handleLogin
            }
          >
            {Loading ? (
              <CircularProgress size={"30px"} color="inherit" />
            ) : (
              "Login"
            )}
          </Button>
          {OTPsent && (
            <>
              <MuiOtpInput
                id="otp"
                value={OTP}
                onChange={setOTP}
                length={6}
                gap={0.5}
                autoFocus
              />
              <Button
                variant="contained"
                disabled={OTP.length !== 6}
                onClick={handleNavigation}
              >
                {LoadingVerifyOTP ? (
                  <CircularProgress size={"30px"} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
