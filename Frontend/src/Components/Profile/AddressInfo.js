import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from 'axios';

export const AddressInfo = (props) => {

  const aadhaar_number = useSelector((state)=>state.Profile.aadhaar)
  const [Address, setAddress] = useState({Address:"", State:"", District:"", Taluka:"", Village:"", Pincode:""})
  const getAdressDetails = async() =>{
    const response = await axios.post("https://mahanidhibackend.onrender.com/getPersonalDetails", {Aadhaar:aadhaar_number})
    setAddress(response.data.data.Address)
  }
  useEffect(()=>{
    const details = JSON.parse(sessionStorage.getItem("Details"))
    getAdressDetails()
    // setAddress(details?.Address)
  },[])
  
  const gotonext = props.nextHandler
  const goback = props.backHandler

  const handleNext = ()=>{
    gotonext()
  }

  return (
    <div>
    <div id="txtboxes">
      <TextField
      label="Address"
      multiline
      rows={2}
      variant="outlined" 
      value={Address?.Address}
      disabled={true}
      fullWidth 
    />
    <TextField
      label="State"
      variant="outlined" 
      value={Address?.State}
      disabled={true}

      fullWidth 
    />
    <TextField
      label="District"
      variant="outlined" 
      value={Address?.District}
      disabled={true}

      fullWidth 
    />
    <TextField
      label="Taluka"
      variant="outlined" 
      value={Address?.Taluka}
      disabled={true}

      fullWidth 
    />
    <TextField
      label="Village"
      variant="outlined" 
      value={Address?.Village}
      disabled={true}

      fullWidth 
    />
    <TextField
      label="Pincode"
      variant="outlined" 
      value={Address?.Pincode}
      disabled={true}
      fullWidth 
    />
    </div>
    <Box display={"flex"} alignItems={'center'} gap={2} justifyContent={'center'}>
    <Button variant="contained" onClick={goback}>Back</Button>
    <Button variant="contained" onClick={handleNext}>Next</Button>
    </Box>
    </div>
  );
};

