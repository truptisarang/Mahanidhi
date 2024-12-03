import React from "react";
import TextField from '@mui/material/TextField';

export const AddressInfo = () => {
  return (
    <div id="txtboxes">
      <TextField
      label="Address"
      multiline
      rows={2}
      variant="outlined" 
      fullWidth 
    />
    <TextField
      label="State"
      variant="outlined" 
      fullWidth 
    />
    <TextField
      label="District"
      variant="outlined" 
      fullWidth 
    />
    <TextField
      label="Taluka"
      variant="outlined" 
      fullWidth 
    />
    <TextField
      label="Village"
      variant="outlined" 
      fullWidth 
    />
    <TextField
      label="Pincode"
      variant="outlined" 
      fullWidth 
    />
    </div>
  );
};
