import { StepLabel, Stepper, Step, Button} from "@mui/material";
import Box from '@mui/material/Box';
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { AddressInfo } from "./AddressInfo";
import CurrentCourse from "./CurrentCourse";
import PastQualification from "./PastQualification";
import Hostel from "./Hostel";

const Profile = () =>{
    //  
    const steps = ["Personal Information","Address Information", "Current Course", "Hostel Details"];
    const [activeStep, setactiveStep] = useState(0);
    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setactiveStep((prevStep) => prevStep + 1);
        }
      };

      const handleBack = () => {
        if (activeStep <= steps.length - 1) {
            setactiveStep((prevStep) => prevStep - 1);
        }
      };

    return (
        <>
        <Box sx={{width: "100%"}}>
            <Stepper  activeStep={activeStep} alternativeLabel>
               {steps.map((step, index)=>{
                return (
                    <Step key={index}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )
               }) 
                }
            </Stepper>
        </Box>
        {activeStep === 0 && <PersonalInfo activeStep={{activeStep,setactiveStep}} steps={steps}/>}
        {activeStep === 1 && <AddressInfo nextHandler={handleNext} backHandler={handleBack}/>}
        {activeStep === 2 && <CurrentCourse nextHandler={handleNext} backHandler={handleBack}/>}
        {/* {activeStep === 3 && <PastQualification/>} */}
        {activeStep === 3 && <Hostel backHandler={handleBack}/>}
        </>
    )
}

export default Profile;