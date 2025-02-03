import React from "react";
import Button from '@mui/material/Button';
import { replace, useNavigate } from "react-router-dom";

const Guide = () =>{
    
    const navigate = useNavigate();
    sessionStorage.clear();
    return(
        <>
        <div style={{textAlign:"left"}}>
        <b>Step 1 -  Download MetaMask</b> - <br></br>Follow the link below to download MetaMask extension compatible with your browser.<br></br>
        <center><a href="https://metamask.io/download/" target="_blank">Download MetaMask extension </a></center>

        <b>Step 2 - Set Up MetaMask & import the wallet </b>
        <p> Follow the video from 1:17  to 2:29
        </p>
       {/*  <b>Step 3 - Choose the method to import the account</b>
        <p>
         <b>Import account using Private Key:</b><br></br>
            Select the option "Private Key" from the dropdown.<br></br>
            Enter your private key given to you in wallet-info.txt file in the provided field. Make sure there are no extra spaces or characters.<br></br>
            Click on “Import” to proceed.
        </p> */}
        <center><iframe width="560" height="315" src="https://www.youtube.com/embed/f0B4tAoGNwE?si=X6yXQyDNW2a-2ZG0&amp;start=77&amp;end=149" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></center>
        </div>
            <Button variant="outlined" onClick={(e)=>navigate('/login', {replace:true})}>Done</Button>
        </>
    )
}

export default Guide;