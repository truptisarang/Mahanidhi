import { StepLabel, Stepper, Step} from "@mui/material";
import Box from '@mui/material/Box';
import { useState } from "react";
import PersonalInfo from "./PersonalInfo";

const Profile = () =>{
    //  
    const steps = ["Personal Information","Address Information","Other Information", "Current Course", "Past Qualification", "Hostel Details"];
    const [activeStep, setactiveStep] = useState(0);
    return (
        <>
        <Box sx={{width: "100%"}}>
            <Stepper  activeStep={activeStep} alternativeLabel>
               {steps.map((step, index)=>{
                return (
                    <Step>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )
               }) 
                }
            </Stepper>
        </Box>
        <PersonalInfo/>
        </>
    )
}

export default Profile;