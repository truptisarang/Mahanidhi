import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CircularProgress, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import "./AadharForm.css";
import { useState } from "react";
import PersonalDetails from "./PersonalDetails";
import WalletCreation from "./WalletCreation";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import Guide from "./Guide";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const steps = [
  "Aadhaar Number",
  "Personal Details",
  "Wallet Creation",
  "Guide",
];

const AadharForm = () => {
  const [Aadhar, setAadhar] = useState(null);
  const [Error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [OTPsent, setOTPsent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [userData, setuserData] = useState(null);
  const [Loading, setLoading] = useState(false);


  const checkAadharNumber = (e) => {
    const aadhaar = e.target.value;
    setAadhar(aadhaar);
    if (e.target.value.length < 12) {
      setError("Please enter 12 digit Aadhaar number");
    } else {
      setError("");
    }
  };

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const goToNext = (e) => {
    if (!Aadhar) {
      setError("Please enter valid 12-digit Aadhaar number");
    } else {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const verifyAadhaar = async () => {
    try {
    setLoading(true)
    const response = await axios.post("https://mahanidhibackend.onrender.com/verifyAadhaar", {aadhaar_number: Aadhar});
    console.log(response)
      if(response.data.data) {
        setuserData(response.data?.data);
        toast.success(response.data.message);
        setOTPsent(true);
        setLoading(false)
      }else{
        setLoading(false)
        toast.error(response.data.message)
      }
    }catch(error){
      if(error.response){
        toast.error(`Error: ${error.response.data || "Something went wrong!"}`)
        setLoading(false)
      }
    }
  };

  const verifyOTP = async () => {
    const response = await axios.post(
      "https://mahanidhibackend.onrender.com/verifyAadhaarOTP",
      { userData, OTP }
    );
    console.log(response)
    if (response.data.success) {
      toast.success(response.data.message);
      setuserData(response.data.data)
      setOTP("");
      setOTPsent(false);
      goToNext()
    } else {
      toast.error(response.data.message);
      setOTP("");
      setOTPsent(false)
    }
  };

  const handleKeyDown = (e) => {
    const special_char_regex = /[0-9]{12}/;
    if (!special_char_regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleOTP = (newValue) => {
    setOTP(newValue);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <h3>Beneficiary Registration</h3>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <div id="Form">
        <form autoComplete="off">
          {activeStep === 0 && (
            <TextField
              label="Enter Aadhaar No"
              color="primary"
              fullWidth
              inputProps={{
                maxLength: 12,
              }}
              required
              onChange={checkAadharNumber}
              error={Error && Error}
              helperText={Error && Error}
              value={Aadhar}
            />
          )}
          {activeStep === 1 && (
            <PersonalDetails
              details={userData}
              activeStep={{ activeStep, setActiveStep }}
              completed={{ completed, setCompleted }}
              next={goToNext}
            />
          )}
          {activeStep === 2 && <WalletCreation next={goToNext} activeStep={{ activeStep, setActiveStep }}
              completed={{ completed, setCompleted }}/>}
          {activeStep === 3 && <Guide />}
        </form>
      </div>

      {activeStep === 0 && (
        <Button
          variant="contained"
          id="btnBack"
          disabled={Aadhar?.length != 12 || Loading}
          onClick={verifyAadhaar}
          style={{width:"10rem"}}
        >
          {Loading ? <CircularProgress size={'30px'} color="inherit"/> : "Verify Aadhaar"}
        </Button>
      )}
      {OTPsent && (
        <div>
          <MuiOtpInput id="otp" length={6} value={OTP} onChange={handleOTP} />
          <Button
            variant="contained"
            disabled={OTP.length != 6}
            onClick={verifyOTP}
          >
            verify otp
          </Button>
        </div>
      )}
    </>
  );
};

export default AadharForm;
