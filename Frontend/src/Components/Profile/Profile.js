import { StepLabel, Stepper, Step, Button} from "@mui/material";
import Box from '@mui/material/Box';
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";
import { AddressInfo } from "./AddressInfo";
import CurrentCourse from "./CurrentCourse";
import PastQualification from "./PastQualification";

const Profile = () =>{
    //  
    const steps = ["Personal Information","Address Information", "Current Course", "Past Qualification"];
    const [activeStep, setactiveStep] = useState(0);
    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setactiveStep((prevStep) => prevStep + 1);
        }
      };

      const handleBack = () => {
        if (activeStep < steps.length - 1) {
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
        {activeStep === 0 && <PersonalInfo/>}
        {activeStep === 1 && <AddressInfo/>}
        {activeStep === 2 && <CurrentCourse/>}
        {activeStep === 3 && <PastQualification/>}
        <Box display={"flex"} alignItems={'center'} justifyContent={'center'} gap={2}>
                {activeStep !== 0 && <Button variant="contained" onClick={handleBack}>Back</Button>}
                {activeStep === 3 && <Button variant="contained" color="success">Save</Button>}
                {activeStep !== 3 && <Button variant="contained" onClick={handleNext}>Next</Button>}
        </Box>
        </>
    )
}

export default Profile;