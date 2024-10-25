import React from "react";
import './RegistrationForm.css'
import AadharForm from "./AadharForm";
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';


const RegistrationForm = () =>{
    return (
        <>
            <div id="regiForm">
                <div>
                    <navbar>
                        <div id="logo">
                            <h3>भारत निधि</h3>
                        </div>
                        <div id="Btnlogin">
                            <Button variant="filled" endIcon={<LoginIcon/>} > Login </Button>
                        </div>
                    </navbar>
                </div>
                <div id="mainForm">
                    <div id="formContainer">
                            <AadharForm/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegistrationForm;