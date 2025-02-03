import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStatus } from "../../redux/slices/profile_completion_slice";

const Hostel = (props) => {
  const goback = props.backHandler;
  const [BCategory, setBCategory] = useState("");
  const aadhaarId = useSelector((State) => State.Profile.aadhaar);
  const getData = (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const pi = getData("PersonalInfo");
  const cd = getData("CourseDetails");
  const dispatch = useDispatch();

  const SaveDetails = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/updateProfile/${aadhaarId}`,
        { pi, cd, BCategory }
      );
      console.log(response.data);
      if (response.data.msg === "update_profile_done") {
        dispatch(updateProfileStatus({ isProfileCompleted: true }));
        toast.success("Profile update successfully");
      }
    } catch (error) {
      toast.error("Please try again later");
      console.error(error);
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        theme="dark"
      />
      <h3>Beneficary Category</h3>
      <RadioGroup
        row
        value={BCategory}
        onChange={(e) => {
          setBCategory(e.target.value);
        }}
      >
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
        margin={"1rem"}
        justifyContent={"center"}
      >
        <Button variant="contained" onClick={goback}>
          Back
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={SaveDetails}
          disabled={BCategory.length === 0}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};

export default Hostel;
