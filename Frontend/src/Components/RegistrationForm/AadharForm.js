import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import './AadharForm.css'
import { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import WalletCreation from './WalletCreation';
import {MuiOtpInput} from 'mui-one-time-password-input'
import axios from 'axios';
import Guide from './Guide';


const steps = [
    'Aadhaar Number',
    'Personal Details',
    'Wallet Creation',
    'Guide'
  ];


const AadharForm = () =>{
    const [Aadhar, setAadhar] = useState(null);
    const [Error, setError] = useState("");
    const [activeStep , setActiveStep]  = useState(0)
    const [completed, setCompleted] = useState({});
    const [OTPsent, setOTPsent] = useState(false);
    const [OTP, setOTP] = useState('');
    const [userData , setuserData] = useState({});

    const checkAadharNumber = (e)=>{
      const aadhaar = e.target.value;
      setAadhar(aadhaar)
      if(e.target.value.length < 12){
        setError("Please enter 12 digit Aadhaar number")
      }else{
        setError("")
      }
    }

    const totalSteps = () => {
      return steps.length;
    };

    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };

  

    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };

    const goToNext = (e) =>{
      if(!Aadhar){
        setError("Please enter valid 12-digit Aadhaar number")
      }else{
        const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i)=> !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
      }
    }

    
    
    const sendOTP = async() =>{
      const response = await axios.post("https://a01b5d91-f944-407e-b99f-c1dc524c1dcc.mock.pstmn.io/auth/sendOTP");
      console.log(response)
      setOTPsent(true)
    }

    const verifyOTP = async() =>{
      const response = await axios.post("https://a01b5d91-f944-407e-b99f-c1dc524c1dcc.mock.pstmn.io/auth/verifyOTP");
      console.log(response);
      setuserData(response.data?.data);
      if (response?.data?.status === "success"){
        setOTP("")
        setOTPsent(false)
        goToNext();
      }
    }

    const handleKeyDown=(e)=>{
      const special_char_regex = /[0-9]{12}/
      if(!special_char_regex.test(e.key)){
        e.preventDefault();
      }
    }

    const handleOTP = (newValue) =>{
      setOTP(newValue)
    }

    return (
      <>
        <h3>Beneficiary Registration</h3>
        <Box sx={{ width: "100%"}}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <div id='Form'>
            <form autoComplete='off'>
                {activeStep ===
                 0 && <TextField 
                    label="Enter Aadhaar No"
                    color='secondary'
                    fullWidth
                    inputProps={{
                      maxLength:12
                    }}
                    required
                    onChange={checkAadharNumber}
                    error={Error && Error}
                    helperText={Error && Error}
                    value={Aadhar}
                />}
                {activeStep === 1 && <PersonalDetails details={userData} activeStep={{activeStep,setActiveStep}} completed={{completed, setCompleted}} next={goToNext}/>}
                {activeStep === 2 && <WalletCreation next={goToNext}/>}
                {activeStep === 3 && <Guide/>}
            </form>
        </div>

        {activeStep === 0 && <Button variant="contained"  id='btnBack' onClick={sendOTP}> Send otp </Button>}
        {OTPsent &&  <div >
          <MuiOtpInput id='otp' length={6} value={OTP} onChange={handleOTP}/> 
          <Button variant="contained" disabled={OTP.length != 6} onClick={verifyOTP}> verify otp </Button>
        </div>
       }
      </>
    );
}

export default AadharForm; 
