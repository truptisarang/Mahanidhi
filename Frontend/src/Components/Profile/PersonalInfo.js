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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CasteList from "../../data/MatrimonialReligionAndCaste.json";
import { toast, ToastContainer } from "react-toastify";

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

const PersonalInfo = (props) => {
  const [Aadhaar, setAadhaar] = useState("");
  const [Details, setDetails] = useState("");
  const [HaveCC, setHaveCC] = useState("no");
  const [HaveIC, setHaveIC] = useState("no");
  const [HaveDC, setHaveDC] = useState("no");
  const [DomicileM, setDomicileM] = useState("no");
  const [PersonalInfo, setPersonalInfo] = useState();
  
  

  const religion_names = CasteList.religion.map((rel) => rel.name);
  const getfromSession = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  };

  const storeinSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };
  useEffect(() => {
    const storedInfo = getfromSession("PersonalInfo");
    const Havecc = getfromSession("HaveCC");
    const Haveic = getfromSession("HaveIC");
    const Havedc = getfromSession("HaveDC");
    const Domicile_M = getfromSession("Domicile_MH");
    const icname = getfromSession("ICName");
    const ccname = getfromSession("CCName");
    const dcname = getfromSession("DCName");
    setHaveCC(Havecc);
    setHaveIC(Haveic);
    setHaveDC(Havedc);
    setDomicileM(Domicile_M);
    setPersonalInfo(storedInfo);
    setICFile(icname);
    setCCFile(ccname);
    setDCFile(dcname);
  }, []);

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

  const caste_category = [
    { id: 1, name: "OBC" },
    { id: 2, name: "SBC" },
    { id: 3, name: "SC" },
    { id: 4, name: "ST" },
    { id: 5, name: "VJNT" },
    { id: 6, name: "General" },
    { id: 7, name: "SEBC" },
  ];

  const [CCFile, setCCFile] = useState("");
  const [ICFile, setICFile] = useState("");
  const [DCFile, setDCFile] = useState("");
  const { activeStep, setactiveStep } = props.activeStep;
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const getDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getPersonalDetails",
        { Aadhaar: Aadhaar }
      );
      if (response.data.data) {
        setDetails(response.data.data);
        storeinSession("Details", response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (aadhaar) {
      setAadhaar(aadhaar);
    }
  }, []);

  useEffect(() => {
    if (Aadhaar) {
      getDetails();
    }
  }, [Aadhaar]);

  const handleNext = () => {
    storeinSession("PersonalInfo", PersonalInfo);
    storeinSession("HaveIC", HaveIC);
    storeinSession("HaveCC", HaveCC);
    storeinSession("HaveDC", HaveDC);
    storeinSession("Domicile_MH", DomicileM);
    storeinSession("ICName", ICFile);
    storeinSession("CCName", CCFile);
    storeinSession("DCName", DCFile);

    if (activeStep < props.steps.length - 1) {
      setactiveStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <>
      <div id="personal_info_details">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
        />
        <div className="details_pane">
          <h3>Personal Details</h3>
          <div id="txtboxes">
            <div id="txtbox1">
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                  variant="outlined"
                  label="Aadhaar Number"
                  fullWidth
                  disabled
                  value={Aadhaar}
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Name"
                  disabled
                  value={Details.FullName || ""}
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Age"
                  disabled
                  fullWidth
                  value={Details.DOB || ""}
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Gender"
                  disabled
                  value={Details.Gender || ""}
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  required
                  label="Applicant's Full Name (As per SSC Marksheet / LC"
                  fullWidth
                  value={PersonalInfo?.AppFullName}
                  error={PersonalInfo?.AppFullName === ""}
                  helperText={
                    PersonalInfo?.AppFullName === ""
                      ? "Please provide the applicant's full name"
                      : ""
                  }
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      AppFullName: e.target.value,
                    });
                  }}
                ></TextField>
                <FormControl>
                  <InputLabel id="msLabel">Marital Status</InputLabel>
                  <Select
                    style={{ width: "100%" }}
                    labelId="msLabel"
                    label="Marital Status"
                    required
                    value={PersonalInfo?.MaritalStatus}
                    onChange={(e) => {
                      setPersonalInfo({
                        ...PersonalInfo,
                        MaritalStatus: e.target.value,
                      });
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
                  value={PersonalInfo?.EmailID || ""}
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      EmailID: e.target.value,
                    });
                  }}
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Mobile Number"
                  value={Details.PhoneNumber || ""}
                  disabled
                  fullWidth
                ></TextField>
                <TextField
                  variant="outlined"
                  label="Parent's/Guardian's Mobile No."
                  fullWidth
                  value={PersonalInfo?.ParentsMobileNo || ""}
                  required
                  error={PersonalInfo?.ParentsMobileNo === ""}
                  helperText={
                    PersonalInfo?.ParentsMobileNo === ""
                      ? "Please provide phone number"
                      : ""
                  }
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      ParentsMobileNo: e.target.value,
                    });
                  }}
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
                value={PersonalInfo?.Religion || ""}
                required
                onChange={(e) => {
                  setPersonalInfo({
                    ...PersonalInfo,
                    Religion: e.target.value,
                  });
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
                    value={PersonalInfo?.CasteCategory || ""}
                    onChange={(e) => {
                      setPersonalInfo({
                        ...PersonalInfo,
                        CasteCategory: e.target.value,
                      });
                    }}
                  >
                    {caste_category.map((casteC) => {
                      return (
                        <MenuItem key={casteC.id} value={casteC.name}>
                          {casteC.name}
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
                    value={PersonalInfo?.Caste || ""}
                    onChange={(e) => {
                      setPersonalInfo({
                        ...PersonalInfo,
                        Caste: e.target.value,
                      });
                    }}
                  >
                    {/* Check if the user selected rel exists in religion_names then filter caste 
                      by selected rel and then display those castes */}
                    {religion_names.includes(PersonalInfo?.Religion)
                      ? CasteList.religion
                          .filter((rel) => rel.name === PersonalInfo?.Religion)
                          .map((reli) =>
                            reli.castes.map((caste) => (
                              <MenuItem key={caste.id} value={caste.name}>
                                {caste.name}
                              </MenuItem>
                            ))
                          )
                      : null}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel id="haveCC" required>
                    Do you have caste certificate?
                  </FormLabel>
                  <RadioGroup
                    row
                    value={HaveCC || "No"}
                    onChange={(e) => {
                      setHaveCC(e.target.value);
                    }}
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
              {HaveCC === "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      required
                      variant="outlined"
                      label="Caste Certificate Number"
                      fullWidth
                      error={PersonalInfo?.CasteCert?.Number === ""}
                      helperText={
                        PersonalInfo?.CasteCert?.Number === ""
                          ? "Please provide caste certificate number"
                          : ""
                      }
                      value={PersonalInfo?.CasteCert?.Number || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            Number: e.target.value,
                          },
                        })
                      }
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Issuing District"
                      fullWidth
                      error={PersonalInfo?.CasteCert?.IDist === ""}
                      helperText={
                        PersonalInfo?.CasteCert?.IDist === ""
                          ? "Please provide issuing district"
                          : ""
                      }
                      value={PersonalInfo?.CasteCert?.IDist || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IDist: e.target.value,
                          },
                        })
                      }
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Applicant Name"
                      value={PersonalInfo?.CasteCert?.ApplName || ""}
                      error={PersonalInfo?.CasteCert?.ApplName === ""}
                      helperText={
                        PersonalInfo?.CasteCert?.ApplName === ""
                          ? "Please provide applicant name"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            ApplName: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.CasteCert?.IAuth || ""}
                      error={PersonalInfo?.CasteCert?.IAuth === ""}
                      helperText={
                        PersonalInfo?.CasteCert?.IAuth === ""
                          ? "Please provide issuing authority"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IAuth: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      required
                      label="Issuing Date"
                      error={PersonalInfo?.CasteCert?.IDate === ""}
                      helperText={
                        PersonalInfo?.CasteCert?.IDate === ""
                          ? "Please provide issuing date"
                          : ""
                      }
                      value={PersonalInfo?.CasteCert?.IDate || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IDate: e.target.value,
                          },
                        })
                      }
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
                        required
                        onChange={(event) => {
                          const CCfile = event.target.files[0];
                          if (!CCfile) {
                            setCCFile("");
                            setPersonalInfo({
                              ...PersonalInfo,
                              CasteCert: {
                                ...PersonalInfo.CasteCert,
                                CCdoc: "",
                              },
                            });
                            return;
                          } else {
                            const filesize = CCfile.size / 1024;
                            if (filesize > 256 || filesize < 15) {
                              toast.error(
                                "File size should between 15 and 256 kb"
                              );
                            } else {
                              setCCFile(CCfile.name);
                              const reader = new FileReader();
                              reader.onload = () => {
                                setPersonalInfo({
                                  ...PersonalInfo,
                                  CasteCert: {
                                    ...PersonalInfo.CasteCert,
                                    CCdoc: reader.result,
                                  },
                                });
                              };
                              reader.readAsDataURL(CCfile);
                            }
                          }
                        }}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {PersonalInfo?.CasteCert?.CCdoc && (
                      <span style={{ fontSize: ".8rem" }}>{CCFile}</span>
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
                  required
                  error={PersonalInfo?.IncomeDetails === ""}
                  helperText={
                    PersonalInfo?.IncomeDetails === ""
                      ? "Please provide family annual income"
                      : ""
                  }
                  type="number"
                  value={PersonalInfo?.IncomeDetails || ""}
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      IncomeDetails: e.target.value,
                    });
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                ></TextField>
                <FormControl>
                  <FormLabel id="haveIC" required>
                    Do you have income certificate?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="haveIC"
                    value={HaveIC || "No"}
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
              {HaveIC === "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      variant="outlined"
                      label="Income Certificate Number"
                      value={PersonalInfo?.IncomeCert?.Number || ""}
                      required
                      error={PersonalInfo?.IncomeCert?.Number === ""}
                      helperText={
                        PersonalInfo?.IncomeCert?.Number === ""
                          ? "Please provide income certificate number"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            Number: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.IncomeCert?.IAuth || ""}
                      required
                      error={PersonalInfo?.IncomeCert?.IAuth === ""}
                      helperText={
                        PersonalInfo?.IncomeCert?.IAuth === ""
                          ? "Please provide issuing authority"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            IAuth: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      required
                      error={PersonalInfo?.IncomeCert?.IDate === ""}
                      helperText={
                        PersonalInfo?.IncomeCert?.IDate === ""
                          ? "Please provide issuing date"
                          : ""
                      }
                      value={PersonalInfo?.IncomeCert?.IDate || ""}
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            IDate: e.target.value,
                          },
                        })
                      }
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
                        onChange={(event) => {
                          const ICfile = event.target.files[0];
                          if (!ICfile) {
                            setICFile("");
                            setPersonalInfo({
                              ...PersonalInfo,
                              IncomeCert: {
                                ...PersonalInfo.IncomeCert,
                                ICdoc: "",
                              },
                            });
                            return;
                          } else {
                            const filesize = ICfile.size / 1024;
                            if (filesize > 256 || filesize < 15) {
                              toast.error(
                                "File size should between 15 and 256 kb"
                              );
                            } else {
                              setICFile(ICfile.name);
                              const reader = new FileReader();
                              reader.onload = () => {
                                setPersonalInfo({
                                  ...PersonalInfo,
                                  IncomeCert: {
                                    ...PersonalInfo.IncomeCert,
                                    ICdoc: reader.result,
                                  },
                                });
                              };
                              reader.readAsDataURL(ICfile);
                            }
                          }
                        }}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {PersonalInfo?.IncomeCert?.ICdoc && (
                      <span style={{ fontSize: ".8rem" }}>{ICFile}</span>
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
                  value={DomicileM || "No"}
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
              {DomicileM === "Yes" && (
                <FormControl>
                  <FormLabel id="haveDC">
                    Do you have Domicile Certificate ?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="haveDC"
                    value={HaveDC || "No"}
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
              {HaveDC === "Yes" && DomicileM === "Yes" && (
                <>
                  <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                      variant="outlined"
                      label="Domicile Certificate Number"
                      value={PersonalInfo?.DomicileCert?.Number || ""}
                      required
                      error={PersonalInfo?.DomicileCert?.Number === ""}
                      helperText={
                        PersonalInfo?.DomicileCert?.Number === ""
                          ? "Please provide domicile certificate number"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            Number: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.DomicileCert?.IAuth || ""}
                      required
                      error={PersonalInfo?.DomicileCert?.IAuth === ""}
                      helperText={
                        PersonalInfo?.DomicileCert?.IAuth === ""
                          ? "Please provide issuing authority"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            IAuth: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Applicant Name"
                      value={PersonalInfo?.DomicileCert?.ApplName || ""}
                      required
                      error={PersonalInfo?.DomicileCert?.ApplName === ""}
                      helperText={
                        PersonalInfo?.DomicileCert?.ApplName === ""
                          ? "Please provide applicant name"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            ApplName: e.target.value,
                          },
                        })
                      }
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      fullWidth
                      value={PersonalInfo?.DomicileCert?.IDate || ""}
                      required
                      error={PersonalInfo?.DomicileCert?.IDate === ""}
                      helperText={
                        PersonalInfo?.DomicileCert?.IDate === ""
                          ? "Please provide issuing date"
                          : ""
                      }
                      onChange={(e) =>
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            IDate: e.target.value,
                          },
                        })
                      }
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
                        onChange={(event) => {
                          const DCfile = event.target.files[0];
                          if (!DCfile) {
                            setDCFile("");
                            setPersonalInfo({
                              ...PersonalInfo,
                              DomicileCert: {
                                ...PersonalInfo.DomicileCert,
                                DCdoc: "",
                              },
                            });
                            return;
                          } else {
                            const filesize = DCfile.size / 1024;
                            if (filesize > 256 || filesize < 15) {
                              toast.error(
                                "File size should between 15 and 256 kb"
                              );
                            } else {
                              setDCFile(DCfile.name);
                              const reader = new FileReader();
                              reader.onload = () => {
                                setPersonalInfo({
                                  ...PersonalInfo,
                                  DomicileCert: {
                                    ...PersonalInfo.DomicileCert,
                                    Domdoc: reader.result,
                                  },
                                });
                              };
                              reader.readAsDataURL(DCfile);
                            }
                          }
                        }}
                        accept=".pdf, .jpeg, .jpg"
                      />
                    </Button>
                    {PersonalInfo?.DomicileCert?.Domdoc && (
                      <span style={{ fontSize: ".8rem" }}>{DCFile}</span>
                    )}
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details_pane">Wallet Details</div>
        <center>
          <Button variant="contained" onClick={handleNext} >
            Next
          </Button>
        </center>
      </div>
    </>
  );
};

export default PersonalInfo;