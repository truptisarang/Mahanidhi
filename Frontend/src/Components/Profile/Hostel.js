import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";



const Hostel = (props) => {
  const goback = props.backHandler;
  const [BCategory, setBCategory] = useState("")
  
  return (
    <div>
      <h3>Beneficary Category</h3>
      <RadioGroup 
      row
      value={BCategory}
      onChange={(e)=>{setBCategory(e.target.value)}}>
        <FormControlLabel
          value="Hosteller"
          control={<Radio />}
          label="Hosteller"
        />
        <FormControlLabel
          value="Day Scholar"
          control={<Radio />}
          label="Day Scholar"
        />
      </RadioGroup>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        margin={'1rem'}
        justifyContent={"center"}
      >
        <Button variant="contained" onClick={goback}>
          Back
        </Button>
        <Button variant="contained" color="success" disabled={BCategory.length === 0}>
          Save
        </Button>
      </Box>
    </div>
  );
};

export default Hostel;
