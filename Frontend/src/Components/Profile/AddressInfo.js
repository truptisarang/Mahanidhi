import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Box, Button } from "@mui/material";

export const AddressInfo = (props) => {
  const [Address, setAddress] = useState({Address:"", State:"", District:"", Taluka:"", Village:"", Pincode:""})

  useEffect(()=>{
    const details = JSON.parse(sessionStorage.getItem("Details"))
    setAddress(details?.Address)
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
      onChange={(e)=>{
        setAddress({...Address, Address:e.target.value})
      }}
      fullWidth 
    />
    <TextField
      label="State"
      variant="outlined" 
      value={Address?.State}
      onChange={(e)=>{
        setAddress({...Address, State:e.target.value})
      }}
      fullWidth 
    />
    <TextField
      label="District"
      variant="outlined" 
      value={Address?.District}
      onChange={(e)=>{
        setAddress({...Address, District:e.target.value})
      }}
      fullWidth 
    />
    <TextField
      label="Taluka"
      variant="outlined" 
      value={Address?.Taluka}
      onChange={(e)=>{
        setAddress({...Address, Taluka:e.target.value})
      }}
      fullWidth 
    />
    <TextField
      label="Village"
      variant="outlined" 
      value={Address?.Village}
      onChange={(e)=>{
        setAddress({...Address, Village:e.target.value})
      }}
      fullWidth 
    />
    <TextField
      label="Pincode"
      variant="outlined" 
      value={Address?.Pincode}
      onChange={(e)=>{
        setAddress({...Address, Pincode:e.target.value})
      }}
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

