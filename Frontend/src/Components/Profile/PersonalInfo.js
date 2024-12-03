import {
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  InputAdornment,
} from "@mui/material";
import "../Profile/PersonalInfo.css";
import { useState } from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
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

const PersonalInfo = () => {
  const [MaritalStatus, setMaritalStatus] = useState("");
  const [Religion, setReligion] = useState("");
  const [HaveCC, setHaveCC] = useState("No");
  const [HaveIC, setHaveIC] = useState("No");
  const [HaveDC, setHaveDC] = useState("No");
  const [DomicileM, setDomicileM] = useState("No");

  const religions = [
    "Buddhist",
    "Christian",
    "Jain",
    "Muslim",
    "Parsi",
    "Sikh",
    "Jews",
    "Hindu",
  ];
  const [Files, setFiles] = useState("");
  return (
    <>
      <div id="personal_info_details">
        <div className="details_pane">
          <h3>Personal Details</h3>
          <div id="txtboxes">
            <div id="txtbox1">
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  variant="outlined"
                  label="Aadhaar Number"
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Name"
                  fullWidth
                ></TextField>
                <TextField variant="outlined" label="Age" fullWidth></TextField>
                <TextField
                  variant="outlined"
                  label="Gender"
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Applicant's Full Name (As per SSC Marksheet / LC"
                  fullWidth
                ></TextField>
                <FormControl>
                  <InputLabel id="msLabel">Marital Status</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="msLabel"
                    label="Marital Status"
                    value={MaritalStatus}
                    onChange={(e) => {
                      setMaritalStatus(e.target.value);
                    }}
                  >
                    <MenuItem value={"Unmarried"}>Unmarried</MenuItem>
                    <MenuItem value={"Married"}>Married</MenuItem>
                    <MenuItem value={"Divorcee"}>Divorcee</MenuItem>
                    <MenuItem value={"Widow"}>Widow</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div id="txtbox2">
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  variant="outlined"
                  label="Email ID"
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Mobile Number"
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Parent's/Guardian's Mobile No."
                  fullWidth
                ></TextField>
              </Box>
            </div>
          </div>
        </div>
        <div className="details_pane">
          <h3>Religion Details</h3>
          <div id="txtboxes">
            <FormControl>
              <InputLabel id="rLabel">Religion</InputLabel>
              <Select
                labelId="rLabel"
                label="Religion"
                value={Religion}
                onChange={(e) => {
                  setReligion(e.target.value);
                }}
              >
                {religions.map((rel, index) => {
                  return (
                    <MenuItem key={index} value={rel}>
                      {rel}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="details_pane">
          <h3>Caste Details</h3>
          <div id="txtboxes">
            <div id="txtbox1">
              <Box display="flex" flexDirection="column" gap={2}>
                <FormControl>
                  <InputLabel id="cLabel">Caste Category</InputLabel>
                  <Select
                    labelId="cLabel"
                    label="Caste Category"
                    value={Religion}
                    onChange={(e) => {
                      setReligion(e.target.value);
                    }}
                  >
                    {religions.map((rel, index) => {
                      return (
                        <MenuItem key={index} value={rel}>
                          {rel}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id="casteLabel">Caste</InputLabel>
                  <Select
                    labelId="casteLabel"
                    label="Caste"
                    value={Religion}
                    onChange={(e) => {
                      setReligion(e.target.value);
                    }}
                  >
                    {religions.map((rel, index) => {
                      return (
                        <MenuItem key={index} value={rel}>
                          {rel}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel id="haveCC">
                    Do you have caste certificate?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="haveCC"
                    defaultValue={HaveCC}
                    value={HaveCC}
                    onChange={(e) => {
                      setHaveCC(e.target.value);
                    }}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </div>
            <div id="txtbox2">
              {HaveCC == "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      variant="outlined"
                      label="Caste Certificate Number"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing District"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Applicant Name"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      fullWidth
                    ></TextField>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Certificate
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFiles(event.target.files)}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {Files && (
                      <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>
                    )}
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details_pane">
          <h3>Income Details</h3>
          <div id="txtboxes">
            <div id="txtbox1">
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  variant="outlined"
                  label="Family Annual Income"
                  type="number"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                ></TextField>
                <FormControl>
                  <FormLabel id="haveIC">
                    Do you have income certificate?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="haveIC"
                    defaultValue={HaveIC}
                    value={HaveIC}
                    onChange={(e) => {
                      setHaveIC(e.target.value);
                    }}
                    name="radio-buttons-ic-group"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </div>
            <div id="txtbox2">
              {HaveIC == "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      variant="outlined"
                      label="Income Certificate Number"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      fullWidth
                    ></TextField>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Certificate
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFiles(event.target.files)}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {Files && (
                      <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>
                    )}
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details_pane">
          <h3>Domicile Details</h3>
          <div id="txtboxes">
            <div id="txtbox1">
              <FormControl>
                <FormLabel id="DomM">
                  Are you Domicile of Maharashtra / Maharashtra-Karnataka Border
                  ?
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="DomM"
                  defaultValue={DomicileM}
                  value={DomicileM}
                  onChange={(e) => {
                    setDomicileM(e.target.value);
                  }}
                  name="radio-buttons-domM-group"
                >
                  <FormControlLabel
                    value="Yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              {DomicileM == "Yes" && (
                <FormControl>
                  <FormLabel id="haveDC">
                    Do you have Domicile Certificate ?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="haveDC"
                    defaultValue={HaveDC}
                    value={HaveDC}
                    onChange={(e) => {
                      setHaveDC(e.target.value);
                    }}
                    name="radio-buttons-dc-group"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              )}
            </div>
            <div id="txtbox2">
              {HaveDC == "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      variant="outlined"
                      label="Domicile Certificate Number"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Applicant Name"
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      fullWidth
                    ></TextField>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Certificate
                      <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => setFiles(event.target.files)}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {Files && (
                      <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>
                    )}
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details_pane">Wallet Details</div>
      </div>
    </>
  );
};

export default PersonalInfo;
