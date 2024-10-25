import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './AadharForm.css'
import { useState } from 'react';
import PersonalDetails from './PersonalDetails';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import WalletCreation from './WalletCreation';

const steps = [
    'Aadhar Number',
    'Personal Details',
    'Wallet Creation',
  ];


const AadharForm = () =>{
    const [Aadhar, setAadhar] = useState(null);
    const [Error, setError] = useState("");
    const [activeStep , setActiveStep]  = useState(0)
    const [completed, setCompleted] = useState({});

    const checkAadharNumber = (e)=>{
      if (/^\d{0,12}$/.test(e.target.value)) {
        setAadhar(e.target.value);
        setError("Please enter valid 12-digit Aadhar number")
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

    const handleBack = () =>{
       setActiveStep(activeStep  - 1);
    }
    
    const handleComplete = () => {
      setCompleted({
        ...completed,
        [activeStep]: true,
      });
      goToNext();
    };

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
                {activeStep == 0 && <TextField 
                    label="Enter Aadhaar No"
                    color='secondary'
                    fullWidth
                    required
                    onChange={checkAadharNumber}
                    value={Aadhar}
                    type='number'
                    error={Error && Error}
                    helperText={Error && Error}
                />}
                {activeStep === 1 && <PersonalDetails/>}
                {activeStep === 2 && <WalletCreation/>}
            </form>
        </div>
        {activeStep === 1 && <Button variant="contained" startIcon={<NavigateBeforeIcon/>} id='btnBack' onClick={handleBack} className='btnBack'> Back </Button>}
        {activeStep === 0 && <Button variant="contained"  id='btnBack'> Send otp </Button>}
        {activeStep != 2 && <Button variant="contained" disabled={false} onClick={handleComplete} endIcon={<NavigateNextIcon/>} > Next </Button>}
      </>
    );
}

export default AadharForm; 
