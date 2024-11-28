import React from "react";
import './RegistrationForm.css'
import AadharForm from "./AadharForm";


const RegistrationForm = () =>{
    return (
        <>
            <div id="regiForm">
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