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
import { red } from "@mui/material/colors";

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
  const [PersonalInfo, setPersonalInfo] = useState({
    AppFullName: "",
    ParentsMobileNo: "",
    MaritalStatus: "",
    Religion: "",
    Caste: "",
    CasteCategory: "",
    CasteCert: {
      ApplName: "",
      IAuth: "",
      IDate: "",
      IDist: "",
      Number: "",
      CCdoc: "",
    },
    DomicileCert: {
      ApplName: "",
      IAuth: "",
      IDate: "",
      IDist: "",
      Number: "",
      Domdoc: "",
    },
    IncomeDetails: "",
    IncomeCert: {
      IAuth: "",
      IDate: "",
      IDist: "",
      Number: "",
      ICdoc: "",
    },
  });
  const [Details, setDetails] = useState({
    Aadhaar: "",
    Name: "",
    PhoneNumber: "",
    Age: "",
    Gender: "",
    Email: ""
  });
  const [HaveCC, setHaveCC] = useState("No");
  const [HaveIC, setHaveIC] = useState("No");
  const [HaveDC, setHaveDC] = useState("No");
  const [DomicileM, setDomicileM] = useState("No");
  const [EnableNext, setEnableNext] = useState(true);
  const religion_names = CasteList.religion.map((rel) => rel.name);
  const getfromSession = (key) => {
    return JSON.parse(sessionStorage.getItem(key));
  };

  const storeinSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    getDetails()
    const cc = PersonalInfo?.CasteCert ? "Yes" : "No";
    setHaveCC(cc);
    const ic = PersonalInfo?.IncomeCert ? "Yes" : "No";
    setHaveIC(ic);
    const dommh = PersonalInfo?.DomicileCert ? "Yes" : "No";
    setDomicileM(dommh);
    setHaveDC(dommh);
  }, [PersonalInfo]);

  // useEffect(() => {
  //   const storedInfo = getfromSession("PersonalInfo");
  //   const Havecc = getfromSession("HaveCC");
  //   const Haveic = getfromSession("HaveIC");
  //   const Havedc = getfromSession("HaveDC");
  //   const Domicile_M = getfromSession("Domicile_MH");
  //   const icname = getfromSession("ICName");
  //   const ccname = getfromSession("CCName");
  //   const dcname = getfromSession("DCName");
  //   setHaveCC(Havecc);
  //   setHaveIC(Haveic);
  //   setHaveDC(Havedc);
  //   setDomicileM(Domicile_M);
  //   setPersonalInfo(storedInfo);
  //   setICFile(icname);
  //   setCCFile(ccname);
  //   setDCFile(dcname);
  // }, []);

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
  const [Errors, setErrors] = useState({});
  const { activeStep, setactiveStep } = props.activeStep;
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const getDetails = async () => {
    try {
      const response = await axios.post(
        "https://mahanidhibackend.onrender.com/getPersonalDetails",
        { Aadhaar: aadhaar }
      );
      if (response.data.data) {
        const data = response.data.data;
        setDetails(data);
        setPersonalInfo(data["PersonalInfo"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const validateForm = () => {
  //   let errors = {};
  //   if (HaveCC === "Yes" && PersonalInfo?.CasteCert?.CCdoc === "") {
  //     errors.cc = "Please upload caste certificate";
  //   }
  //   if (HaveIC === "Yes" && PersonalInfo?.IncomeCert?.ICdoc === "") {
  //     errors.ic = "Please upload income certificate";
  //   }
  //   if (HaveDC === "Yes" && PersonalInfo?.DomicileCert?.Domdoc === "") {
  //     errors.dc = "Please upload domicile certificate";
  //   }
  //   if (Object.keys(errors).length > 0) {
  //     setErrors(errors);
  //     setEnableNext(true);
  //   } else {
  //     setErrors({});
  //     setEnableNext(false);
  //   }
  // };

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
                  value={aadhaar}
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
                  label="DOB"
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
                  name="applicant-name"
                  value={PersonalInfo?.AppFullName}
                  error={Errors && Errors.AppName}
                  helperText={Errors.AppName}
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      AppFullName: e.target.value,
                    });
                    if (e.target.value === "") {
                      setErrors({
                        ...Errors,
                        AppName: "Please provide full name",
                      });
                    } else {
                      setErrors({ ...Errors, AppName: "" });
                    }
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
                  value={Details?.Email}
                  error={Errors && Errors.EmailID}
                  helperText={Errors.EmailID || ""}
                  disabled={true}
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
                  value={PersonalInfo?.ParentsMobileNo}
                  error={Errors && Errors.ParentsMobileNo}
                  helperText={Errors.ParentsMobileNo}
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      ParentsMobileNo: e.target.value,
                    });
                    if (e.target.value === "") {
                      setErrors({
                        ...Errors,
                        ParentsMobileNo: "Please provide mobile number",
                      });
                    } else {
                      setErrors({ ...Errors, ParentsMobileNo: "" });
                    }
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
                    value={HaveCC}
                    onChange={(e) => setHaveCC(e.target.value)}
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
                      error={Errors && Errors.CC}
                      helperText={Errors.CC}
                      value={PersonalInfo?.CasteCert?.Number}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            Number: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            CC: "Please provide caste certificate number",
                          });
                        } else {
                          setErrors({ ...Errors, CC: "" });
                        }
                      }}
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Issuing District"
                      fullWidth
                      error={Errors && Errors.IDist}
                      helperText={Errors.IDist}
                      value={PersonalInfo?.CasteCert?.IDist || ""}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IDist: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            IDist: "Please provide issuing district",
                          });
                        } else {
                          setErrors({ ...Errors, IDist: "" });
                        }
                      }}
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Applicant Name"
                      value={PersonalInfo?.CasteCert?.ApplName}
                      error={Errors && Errors.CCApplName}
                      helperText={Errors.CCApplName}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            ApplName: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            CCApplName: "Please provide applicant name",
                          });
                        } else {
                          setErrors({ ...Errors, CCApplName: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      required
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.CasteCert?.IAuth || ""}
                      error={Errors && Errors.IAuth}
                      helperText={Errors.IAuth}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IAuth: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            IAuth: "Please provide issuing authority name",
                          });
                        } else {
                          setErrors({ ...Errors, IAuth: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      required
                      label="Issuing Date"
                      error={Errors && Errors.CCIDate}
                      helperText={Errors.CCIDate}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          CasteCert: {
                            ...PersonalInfo.CasteCert,
                            IDate: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            CCIDate: "Please provide issuing date",
                          });
                        } else {
                          setErrors({ ...Errors, CCIDate: "" });
                        }
                      }}
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
                            toast.error("Please upload income certificate");
                            setPersonalInfo({
                              ...PersonalInfo,
                              CasteCert: {
                                ...PersonalInfo.CasteCert,
                                CCdoc: "",
                              },
                            });
                            return;
                          } else {
                            setErrors({ ...Errors, cc: "" });
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
                      <>
                        <span style={{ fontSize: ".8rem" }}>{CCFile}</span>
                        <span style={{ fontSize: ".8rem", color: "red" }}>
                          {Errors.cc}
                        </span>
                      </>
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
                  value = {PersonalInfo?.IncomeDetails}
                  error={Errors && Errors.FI}
                  helperText={Errors.FI}
                  onChange={(e) => {
                    setPersonalInfo({
                      ...PersonalInfo,
                      CasteCert: {
                        ...PersonalInfo,
                        IncomeDetails: e.target.value,
                      },
                    });
                    if (e.target.value === "") {
                      setErrors({
                        ...Errors,
                        FI: "Please provide family income",
                      });
                    } else {
                      setErrors({ ...Errors, FI: "" });
                    }
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
                      value={PersonalInfo?.IncomeCert?.Number}
                      required
                      error={Errors && Errors.IncomeNum}
                      helperText={Errors.IncomeNum}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            Number: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            IncomeNum:
                              "Please provide income certificate number",
                          });
                        } else {
                          setErrors({ ...Errors, IncomeNum: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.IncomeCert?.IAuth || ""}
                      required
                      error={Errors && Errors.IIAuth}
                      helperText={Errors.IIAuth}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            IAuth: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            IIAuth:
                              "Please provide issuing authority name",
                          });
                        } else {
                          setErrors({ ...Errors, IIAuth: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      required
                      value={PersonalInfo?.IncomeCert?.IDate}
                      error={Errors && Errors.IIDate}
                      helperText={Errors.IIDate}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          IncomeCert: {
                            ...PersonalInfo.IncomeCert,
                            IDate: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            IIDate:"Please provide issuing date",
                          });
                        } else {
                          setErrors({ ...Errors, IIDate: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <Button
                      style={{ marginBottom: "1rem" }}
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
                          // validateForm()
                          if (!ICfile) {
                            setICFile("");
                            toast.error("Please upload income certificate");
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
                      <>
                        <span style={{ fontSize: ".8rem" }}>{ICFile}</span>
                        <span style={{ fontSize: ".8rem" }}>{Errors.ic}</span>
                      </>
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
                      value={PersonalInfo?.DomicileCert?.Number}
                      error={Errors && Errors.DomCNum}
                      helperText={Errors.DomCNum}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            Number: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            DomCNum:"Please provide domicile certificate number",
                          });
                        } else {
                          setErrors({ ...Errors, DomCNum: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Authority"
                      value={PersonalInfo?.DomicileCert?.IAuth || ""}
                      required
                      error={Errors && Errors.DIAuth}
                      helperText={Errors.DIAuth}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            IAuth: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            DIAuth:"Please provide issuing authority",
                          });
                        } else {
                          setErrors({ ...Errors, DIAuth: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Applicant Name"
                      value={PersonalInfo?.DomicileCert?.ApplName || ""}
                      required
                      error={Errors && Errors.DApplName}
                      helperText={Errors.DApplName}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                            ApplName: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            DApplName:"Please provide applicant name",
                          });
                        } else {
                          setErrors({ ...Errors, DApplName: "" });
                        }
                      }}
                      fullWidth
                    ></TextField>
                    <TextField
                      variant="outlined"
                      label="Issuing Date"
                      fullWidth
                      value={PersonalInfo?.DomicileCert?.IDate || ""}
                      required
                      error={Errors && Errors.DDate}
                      helperText={Errors.DDate}
                      onChange={(e) => {
                        setPersonalInfo({
                          ...PersonalInfo,
                          DomicileCert: {
                            ...PersonalInfo.DomicileCert,
                             IDate: e.target.value,
                          },
                        });
                        if (e.target.value === "") {
                          setErrors({
                            ...Errors,
                            DDate:"Please provide issuing date",
                          });
                        } else {
                          setErrors({ ...Errors, DDate: "" });
                        }
                      }}
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
                            toast.error("Please upload domicile certificate");
                            setPersonalInfo({
                              ...PersonalInfo,
                              DomicileCert: {
                                ...PersonalInfo.DomicileCert,
                                DCdoc: "",
                              },
                            });
                            return;
                          } else {
                            setErrors({ ...Errors, dc: "" });
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
                      <>
                        <span style={{ fontSize: ".8rem" }}>{DCFile}</span>
                        <span style={{ fontSize: ".8rem", color: "red" }}>
                          {Errors.dc}
                        </span>
                      </>
                    )}
                  </Box>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="details_pane">Wallet Details</div>
        <center>
          <Button variant="contained"
           onClick={handleNext}
          >
            Next
          </Button>
        </center>
      </div>
    </>
  );
};

export default PersonalInfo;
