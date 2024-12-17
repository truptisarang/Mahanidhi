import React from "react";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const Guide = () =>{
    
    const navigate = useNavigate();
    sessionStorage.clear();
    return(
        <>
        <div style={{textAlign:"left"}}>
        <b>Step 1 -  Download MetaMask</b> - <br></br>Follow the link below to download MetaMask extension compatible with your browser.<br></br>
        <center><a href="https://metamask.io/download/" target="_blank">Download MetaMask extension </a></center>

        <b>Step 2 - Set Up MetaMask</b>
        <p>
        Open the MetaMask extension.Click on the option to "Import Wallet."
        Read and accept the terms of use and privacy policy, if prompted.
        </p>
        <b>Step 3 - Choose the method to import the account</b>
        <p>
        <b>Import account using Private Key:</b><br></br>
            Select the option "Private Key" from the dropdown.<br></br>
            Enter your private key given to you in wallet-info.txt file in the provided field. Make sure there are no extra spaces or characters.<br></br>
            Click on “Import” to proceed.
        </p>
        </div>
            <Button variant="outlined" onClick={(e)=>navigate('/login')}>Done</Button>
        </>
    )
}

export default Guide;