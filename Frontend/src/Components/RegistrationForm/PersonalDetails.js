import { TextField, Grid, Avatar, IconButton, Typography, Modal, Box} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InfoIcon from '@mui/icons-material/Info';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

import Button from '@mui/material/Button';


const PersonalDetails = (props) =>{
    const {completed, setCompleted} = props.completed;
    const [showPassword, setshowPassword] = useState(false)
    const [anchorEl, setanchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const [usernameerror, setusernameerror] = useState("");
    const [passworderror, setpassworderror] = useState("")
    const [isUsernameValid, setisUsernameValid] = useState(false);
    const [isPasswordValid, setisPasswordValid] = useState(false);
    const [Creds, setCreds] = useState({username: "", password:""})
    const goToNext = props.next;
    const {activeStep, setActiveStep} = props.activeStep;
    const isFormValid = !(isUsernameValid && isPasswordValid);

    const handlePopoverOpen = (e) =>{
      setanchorEl(e.currentTarget)
    }

    const handleComplete = () => {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      goToNext();
    };

    const handlePopoverClose = (e) =>{
      setanchorEl(null)
    }

    const handleBack = () =>{
      setActiveStep(activeStep  - 1);
   }

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

    const ValidateUsername = (e) =>{
      setCreds({...Creds,username:e.target.value})
      const username_regex = /^[A-Za-z][A-Za-z0-9_.]{7,}$/gm;
      

      if(!(e.target.validity.valid)){
        setusernameerror('Please enter username')
      }else{
        setusernameerror("")
          if(!(username_regex.test(e.target.value))){
              setusernameerror("The username must be at least 8 characters long, cannot start with a digit, and may only include the characters (. _)")
              setisUsernameValid(false)
          }else if(Creds.password === e.target.value){
            setusernameerror("Username cannot be same as password.")
            setisUsernameValid(false)
          }else{
            setusernameerror("")
            setisUsernameValid(true)
          }
      }
    }

    const ValidatePassword = (e) =>{
      setCreds({...Creds,password:e.target.value})
      const password = e.target.value;
      const uppercase_regex = /[A-Z]/;
      const lowercase_regex = /[a-z]/;
      const number_regex = /[0-9]/;
      const special_char_regex = /[$@#_]/;

      if(!(e.target.validity.valid)){
        setpassworderror('Please enter password')
        setisPasswordValid(false)
      }else if(password.length < 8){
        setpassworderror("Password must be atleast 8 characters long.")
        setisPasswordValid(false)
      }else if(!uppercase_regex.test(password)){
        setpassworderror("Password must contain atleast 1 uppercase letter.")
        setisPasswordValid(false)
      }else if(!lowercase_regex.test(password)){
        setpassworderror("Password must contain atleast 1 lowercase letter.")
        setisPasswordValid(false)
      }else if(!number_regex.test(password)){
        setpassworderror("Password must contain atleast 1 number.")
        setisPasswordValid(false)
      }else if(!special_char_regex.test(password)){
        setpassworderror("Password must contain atleast 1 special character.")
        setisPasswordValid(false)
      }
      else if(Creds.username === e.target.value.trim()){
        setpassworderror("Password cannot be same as username.")
        setisPasswordValid(false)
      }
      else{
        setpassworderror("")
        setisPasswordValid(true)
      }
    }

    return (
      <>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item size={6}>
            <Avatar src={props.details.photo_url} sx={{height:200, width:200}}/>
          </Grid>

          <Grid item xs={6} container>
              <Grid item xs={12}>
                <TextField label="Full Name" value={props.details?.name} fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="DOB" value={props.details?.dob} fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Gender" value={props.details?.gender} fullWidth disabled/>
              </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Address" value={props.details?.address} fullWidth disabled/>
          </Grid>
           <Grid item xs={6}>
                <TextField label="Aadhaar Number" value={props.details?.aadhaarNumber} fullWidth disabled/>
           </Grid>
           <Grid item xs={6}>
                <TextField label="Username"
                 name='username'
                 onKeyDown={uhandleKeyDown}
                 required 
                 value={Creds.username}
                 error={usernameerror}
                 onChange={ValidateUsername}
                 helperText={usernameerror}                    
                 fullWidth
                 InputProps={{
                  endAdornment:<InputAdornment position='end'>
                     <IconButton 
                     onClick={handlePopoverOpen}
                     ><InfoIcon/></IconButton>
                  </InputAdornment>}}/>
                  <Modal 
                  id='mouse-over-popover'
                  open={open} 
                  onClose={handlePopoverClose}
                  style={{display:'flex', justifyContent:'center', alignItems:'center'}}
                  >
                  <Box sx={{p:1,backgroundColor:"white", borderRadius:'.5rem'}}>
                  <Typography sx={{p:1}}>
                    <h4>Username</h4>
                    1. Username must be atleast 8 characters long.<br></br>
                    2. It should contain only letters, numbers, special characters ( _  . ) <br></br>
                    3. Username and password should not be same.
                    <h4>Password</h4>
                    1. Password should contain atleast 8 characters.<br></br>
                    2. Must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.<br></br>
                    3. Only $, @, #, _ are allowed as special characters
                  </Typography>
                  </Box>
                  </Modal>
           </Grid>
           <Grid item xs={6}>
                 <TextField 
                 required 
                 onChange={ValidatePassword}
                 onKeyDown={phandleKeyDown}
                 error={passworderror} 
                 value={Creds.password}
                 helperText={passworderror} 
                 name='password' 
                 label="Password" 
                 fullWidth type={showPassword ? 'text' : 'password'} 
                 InputProps={{
              endAdornment: <InputAdornment position="end"><IconButton onClick={(e)=>{setshowPassword(!showPassword)}}>{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton></InputAdornment>,
          }}/>
           </Grid>
        </Grid>
        <div style={{marginTop:'1rem', display:'flex', justifyContent:"space-evenly"}}>
        <Button variant='contained'  startIcon={<NavigateBeforeIcon/>} onClick={handleBack}>Back</Button>
        <Button  variant="contained" disabled={isFormValid} onClick={handleComplete} endIcon={<NavigateNextIcon/>} > Next </Button>
        </div>
      </>
    );
}

export default PersonalDetails;