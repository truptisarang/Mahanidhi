import React from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  TextField,
} from "@mui/material";
import "../Profile/PersonalInfo.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import "../Forms/Form.css";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const SchemeForm = (props) => {
  return (
    <>
      <div style={{ margin: "2rem" }}>
        <h3>Post matric scholarship to {props.caste}</h3>
        <div id="form_container">
          <div id="labels">
            <div id="row">
              <FormLabel>Is this renewal application?</FormLabel>
            </div>
            <div id="row">
              <FormLabel>
                Enter your last year MahaEschool Application ID
              </FormLabel>
            </div>
            <div id="row">
              <FormLabel>Leaving Certificate</FormLabel>
            </div>
            <div id="row">
              <FormLabel>
                Declaration of parent's or guardian about number of children
                beneficiaries
              </FormLabel>
            </div>
            <div id="row">
              <FormLabel>
                Caste Validity (Mandatory for professional degree courses,
                professional postgraduate, for non professional courses caste
                validity is not mandatory)
              </FormLabel>
            </div>
            <div id="row">
              <FormLabel>
                Ration Card - to identify number of children in family
              </FormLabel>
            </div>
            <div id="row">
              <FormLabel>
                Enter the number of male children (including yourself) in your
                family with the same parents
              </FormLabel>
            </div>
          </div>
          <div id="controls">
            <div id="row">
              <RadioGroup
                row
                // defaultValue={HaveCC}
                // value={HaveCC}
                // onChange={(e) => {
                //   setHaveCC(e.target.value);
                // }}
                name="radio-buttons-group"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            <div>
              <TextField style={{ width: "80%" }}></TextField>
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Leaving Certificate
                <VisuallyHiddenInput
                // type="file"
                // onChange={(event) => setFiles(event.target.files)}
                // accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              {/* {Files && <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>} */}
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Declaration
                <VisuallyHiddenInput
                // type="file"
                // onChange={(event) => setFiles(event.target.files)}
                // accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              {/* {Files && <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>} */}
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Caste Validity
                <VisuallyHiddenInput
                // type="file"
                // onChange={(event) => setFiles(event.target.files)}
                // accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              {/* {Files && <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>} */}
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Ration Card
                <VisuallyHiddenInput
                // type="file"
                // onChange={(event) => setFiles(event.target.files)}
                // accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              {/* {Files && <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>} */}
            </div>
            <div>
              <TextField
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only a single digit
                  if (value.length >= 0) {
                    e.target.value = value.slice(0, 1);
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "-" ||
                    e.key === "+" ||
                    e.key === "e" ||
                    e.key === "E"
                  ) {
                    e.preventDefault();
                  }
                }}
                type="number"
                InputProps={{ inputProps: { maxLength: 1, min: 0, max: 9 } }}
              ></TextField>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SchemeForm;
