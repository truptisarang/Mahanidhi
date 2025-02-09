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
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  
  const [FormData, setFormData] = useState({
    schemeName: props.schemeName,
    deptName: props.deptName,
    IsRenewal: "No",
    MahaESchoolAppID: "",
    LeavingCert: {
      file_name: "",
      file: "",
    },
    ParentDeclaration: {
      file_name: "",
      file: "",
    },
    CasteValidity: {
      file_name: "",
      file: "",
    },
    RationCard: {
      file_name: "",
      file: "",
    },
    NoOfMaleChildren: "",
  });

  

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      if (validateForm()) {
        return;
      }
      const response = await axios.post(`${backend_url}/submitForm`, {
        form_data: FormData,
        Aadhaar: aadhaar,
        date:new Date().toLocaleDateString()
      });
      if (response.data.msg) {
        toast.success("Application submitted successfully", response.data.msg);
        setFormData({
          schemeName: props.schemeName,
          deptName: props.deptName,
          IsRenewal: "No",
          MahaESchoolAppID: "",
          LeavingCert: {
            file_name: "",
            file: "",
          },
          ParentDeclaration: {
            file_name: "",
            file: "",
          },
          CasteValidity: {
            file_name: "",
            file: "",
          },
          RationCard: {
            file_name: "",
            file: "",
          },
          NoOfMaleChildren: "",
        });
      }
    } catch (error) {
      console.log(error)
      if(error.response){
        toast.error("Error:", error);
      }
    }
  };

  const validateForm = () => {
    if (
      FormData.IsRenewal === "" ||
      FormData.LeavingCert === "" ||
      FormData.ParentDeclaration === "" ||
      FormData.RationCard === "" ||
      FormData.NoOfMaleChildren === ""
    ) {
      toast.error("Please fill all the fields");
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        theme="colored"
      />
      <div style={{ margin: "2rem" }}>
        <h3>{props.schemeName}</h3>
        <p>{props.deptName}</p>
        <div id="form_container">
          <div id="labels">
            <div id="row">
              <FormLabel required>Is this renewal application?</FormLabel>
            </div>
            {FormData.IsRenewal === "Yes" && (
              <div id="row">
                <FormLabel required>
                  Enter your last year MahaEschool Application ID
                </FormLabel>
              </div>
            )}
            <div id="row">
              <FormLabel required>Leaving Certificate</FormLabel>
            </div>
            <div id="row">
              <FormLabel required>
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
              <FormLabel required>
                Ration Card - to identify number of children in family
              </FormLabel>
            </div>
            <div id="row">
              <FormLabel required>
                Enter the number of male children (including yourself) in your
                family with the same parents
              </FormLabel>
            </div>
          </div>
          <div id="controls">
            <div id="row">
              <RadioGroup
                row
                value={FormData.IsRenewal}
                onChange={(e) => {
                  setFormData({ ...FormData, IsRenewal: e.target.value });
                }}
                name="radio-buttons-group"
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </div>
            {FormData.IsRenewal === "Yes" && (
              <div>
                <TextField
                  style={{ width: "80%" }}
                  value={FormData.MahaESchoolAppID}
                  onChange={(e) => {
                    setFormData({
                      ...FormData,
                      MahaESchoolAppID: e.target.value,
                    });
                  }}
                ></TextField>
              </div>
            )}
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
                  type="file"
                  required
                  onChange={(event) => {
                    const CCfile = event.target.files[0];
                    if (!CCfile) {
                      setFormData({ ...FormData.LeavingCert, LeavingCert: "" });
                      toast.error("Please upload leaving certificate");
                      return;
                    } else {
                      const filesize = CCfile.size / 1024;
                      if (filesize > 256 || filesize < 15) {
                        toast.error("File size should between 15 and 256 kb");
                      } else {
                        console.log(CCfile.name);
                        setFormData((prevState) => ({
                          ...prevState,
                          LeavingCert: {
                            ...prevState.LeavingCert,
                            file_name: CCfile.name,
                          },
                        }));
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData((prevState) => ({
                            ...prevState,
                            LeavingCert: {
                              ...prevState.LeavingCert,
                              file: reader.result,
                            },
                          }));
                        };
                        reader.readAsDataURL(CCfile);
                      }
                    }
                  }}
                  accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              <br></br>
              {FormData?.LeavingCert && (
                <>
                  <a
                    style={{ fontSize: ".8rem" }}
                    href={FormData?.LeavingCert.file}
                    download={FormData?.LeavingCert.file_name}
                  >
                    {FormData?.LeavingCert.file_name}
                  </a>
                </>
              )}
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
                  type="file"
                  required
                  onChange={(event) => {
                    const CCfile = event.target.files[0];
                    if (!CCfile) {
                      setFormData({
                        ...FormData.ParentDeclaration,
                        ParentDeclaration: "",
                      });
                      toast.error("Please upload declaration");
                      return;
                    } else {
                      const filesize = CCfile.size / 1024;
                      if (filesize > 256 || filesize < 15) {
                        toast.error("File size should between 15 and 256 kb");
                      } else {
                        setFormData((prevState) => ({
                          ...prevState,
                          ParentDeclaration: {
                            ...prevState.ParentDeclaration,
                            file_name: CCfile.name,
                          },
                        }));
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData((prevState) => ({
                            ...prevState,
                            ParentDeclaration: {
                              ...prevState.ParentDeclaration,
                              file: reader.result,
                            },
                          }));
                        };
                        reader.readAsDataURL(CCfile);
                      }
                    }
                  }}
                  accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              <br></br>
              {FormData?.ParentDeclaration && (
                <>
                  <a
                    style={{ fontSize: ".8rem" }}
                    href={FormData?.ParentDeclaration.file}
                    download={FormData?.ParentDeclaration.file_name}
                  >
                    {FormData?.ParentDeclaration.file_name}
                  </a>
                </>
              )}
            </div>
            <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Caste Validity Certificate
                <VisuallyHiddenInput
                  type="file"
                  required
                  onChange={(event) => {
                    const CCfile = event.target.files[0];
                    if (!CCfile) {
                      setFormData({
                        ...FormData.CasteValidity,
                        CasteValidity: "",
                      });
                      toast.error("Please upload caste validity certificate");
                      return;
                    } else {
                      const filesize = CCfile.size / 1024;
                      if (filesize > 256 || filesize < 15) {
                        toast.error("File size should between 15 and 256 kb");
                      } else {
                        setFormData((prevState) => ({
                          ...prevState,
                          CasteValidity: {
                            ...prevState.CasteValidity,
                            file_name: CCfile.name,
                          },
                        }));
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData((prevState) => ({
                            ...prevState,
                            CasteValidity: {
                              ...prevState.CasteValidity,
                              file: reader.result,
                            },
                          }));
                        };
                        reader.readAsDataURL(CCfile);
                      }
                    }
                  }}
                  accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              <br></br>
              {FormData?.CasteValidity && (
                <>
                  <a
                    style={{ fontSize: ".8rem" }}
                    href={FormData?.CasteValidity.file}
                    download={FormData?.CasteValidity.file_name}
                  >
                    {FormData?.CasteValidity.file_name}
                  </a>
                </>
              )}
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
                  type="file"
                  required
                  onChange={(event) => {
                    const CCfile = event.target.files[0];
                    if (!CCfile) {
                      setFormData({ ...FormData.RationCard, RationCard: "" });
                      toast.error("Please upload declaration");
                      return;
                    } else {
                      const filesize = CCfile.size / 1024;
                      if (filesize > 256 || filesize < 15) {
                        toast.error("File size should between 15 and 256 kb");
                      } else {
                        setFormData((prevState) => ({
                          ...prevState,
                          RationCard: {
                            ...prevState.RationCard,
                            file_name: CCfile.name,
                          },
                        }));
                        const reader = new FileReader();
                        reader.onload = () => {
                          setFormData((prevState) => ({
                            ...prevState,
                            RationCard: {
                              ...prevState.RationCard,
                              file: reader.result,
                            },
                          }));
                        };
                        reader.readAsDataURL(CCfile);
                      }
                    }
                  }}
                  accept=".pdf, .jpeg, .jpg"
                />
              </Button>
              <br></br>
              {FormData?.RationCard && (
                <>
                  <a
                    style={{ fontSize: ".8rem" }}
                    href={FormData?.RationCard.file}
                    download={FormData?.RationCard.file_name}
                  >
                    {FormData?.RationCard.file_name}
                  </a>
                </>
              )}
            </div>
            <div>
              <TextField
                onChange={(e) => {
                  const value = e.target.value;
                  // Allow only a single digit
                  if (value.length >= 0) {
                    e.target.value = value.slice(0, 1);
                  }
                  setFormData({
                    ...FormData,
                    NoOfMaleChildren: e.target.value,
                  });
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
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={"1rem"}
        >
          <Button variant="contained" color="success" onClick={submitForm}>
            Submit
          </Button>
        </Box>
      </div>
    </>
  );
};

export default SchemeForm;
