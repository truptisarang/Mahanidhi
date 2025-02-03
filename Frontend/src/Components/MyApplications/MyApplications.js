import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { toast, ToastContainer } from "react-toastify";
import Modal from "@mui/material/Modal";
import { Box, Typography, TextField, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyApplications = () => {
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const [AcademicData, setAcademicData] = useState([]);
  const [ViewForm, setViewForm] = useState(false);
  const [AllDetails, setAllDetails] = useState("");
  const [SelectedApplication, setSelectedApplication] = useState("");
  const [Applications, setApplications] = useState([]);
  const [ConfirmDelete, setConfirmDelete] = useState(false); // Modal visibility
  const [DeleteAppID, setDeleteAppID] = useState(null); // AppID to delete
  const [EnteredAppID, setEnteredAppID] = useState(""); // AppID to delete

  const closeDeleteModal = () => {
    setConfirmDelete(false); // Close the modal
    setDeleteAppID(null); // Clear the application ID
    setEnteredAppID("");
  };

  const openDeleteModal = (appID) => {
    setDeleteAppID(appID); // Set the application ID to delete
    setConfirmDelete(true); // Open the modal
  };

  const getApplicationsDetails = async () => {
    try {
      const response = await axios.post(
        "https://mahanidhibackend.onrender.com/getApplications",
        { Aadhaar: aadhaar,mode:"user" }
      );
      if(response.data.data !== null){
        setApplications([response.data.data])
      }
      // setAllDetails(response.data.data);
      // setAcademicData(response.data.data["CourseDetails"]);
    } catch (error) {
      toast.error("Error while fetching applications");
    }
  };

  const getPersonalDetails = async () => {
    try {
      const response = await axios.post(
        "https://mahanidhibackend.onrender.com/getPersonalDetails",
        { Aadhaar: aadhaar }
      );
      setAllDetails(response.data.data);
      setAcademicData(response.data.data["CourseDetails"]);
    } catch (error) {
      toast.error("Error while fetching details");
    }
  };

  useEffect(() => {
    getApplicationsDetails();
    getPersonalDetails()
  }, []);

  const handleClose = () => {
    setViewForm(false);
    setSelectedApplication(null);
  };

  const handleOpen = (appid) => {
    setViewForm(true);
    setSelectedApplication(appid);
  };

  const handleDelete = async (app) => {
    try {
      const response = await axios.post(
        "https://mahanidhibackend.onrender.com/cancelApplication",
        {
          AppID: app.AppID,
        }
      );

      if (response.data.success) {
        toast.success("Application canceled successfully!");
        setConfirmDelete(false);
      } else {
        toast.error(response.data.message || "Failed to cancel application");
      }
    } catch (error) {
      toast.error("Error while canceling the application");
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
      <Modal open={ConfirmDelete} onClose={closeDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cancel Application
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            This action will delete / cancel the application.<br></br>
            To cancel the application, please enter application ID:{" "}
            <strong>{DeleteAppID}</strong>
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Application ID"
              value={EnteredAppID}
              onChange={(e) => setEnteredAppID(e.target.value)}
              error={EnteredAppID !== "" && EnteredAppID !== DeleteAppID}
              helperText={
                EnteredAppID !== "" && EnteredAppID !== DeleteAppID
                  ? "Application ID does not match"
                  : ""
              }
            />
          </Box>
          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              color="error"
              disabled={EnteredAppID !== DeleteAppID}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button variant="outlined" onClick={closeDeleteModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <h3>My Applications</h3>
      <div id="course_detail_table">
      {
        Applications.length === 0 ? (<center>
        You haven't applied to any schemes. <br></br><br/>
        <Button href={'/eligible-schemes'} variant="outlined">Check for eligible scheme</Button>
        </center>) 
        : 
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead >
              <TableRow>
                <TableCell align="center">ApplicationID</TableCell>
                <TableCell align="center">Department Name</TableCell>
                <TableCell align="center">Scheme Name</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Rejection Reason</TableCell>
                <TableCell align="center">Action</TableCell>
                <TableCell align="center">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Applications.map((app) => (
                <TableRow>
                  <TableCell>{app?.applicationId}</TableCell>
                  <TableCell>{app?.Data?.deptName}</TableCell>
                  <TableCell>{app?.Data?.schemeName}</TableCell>
                  <TableCell>{app?.Date}</TableCell>
                  <TableCell>{app?.status}</TableCell>
                  <TableCell>{app?.remarks}</TableCell>
                  <TableCell align="right">
                    <Button
                      size="small"
                      disabled={app?.status === "Approved"}
                      color="warning"
                      variant="contained"
                      onClick={() => openDeleteModal(app?.applicationId)}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      variant="contained"
                      onClick={() => handleOpen(app)}
                    >
                    <VisibilityIcon></VisibilityIcon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>   
      }
        <Modal open={ViewForm}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 700,
              maxHeight: "80vh",
              bgcolor: "background.paper",
              borderRadius: "8px",
              overflowY: "auto",
              boxShadow: 24,
              p: 4,
            }}
          >
            {SelectedApplication && ViewForm ? (
              <>
                <Typography
                  variant="h6"
                  component="h2"
                  textAlign={"center"}
                  gutterBottom
                >
                  Application Details
                </Typography>
                <hr />

                {/* Accordion for Application Details */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Application Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {/* Left Column for Photo */}
                      <Grid item xs={4}>
                        <img
                          src={AllDetails.photo}
                          alt="Applicant"
                          style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                          }}
                        />
                      </Grid>
                      {/* Right Column for Details */}
                      <Grid item xs={8}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Application ID:</strong>{" "}
                          {SelectedApplication.applicationId}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Department Name:</strong>{" "}
                          {SelectedApplication.Data.deptName}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Scheme Name:</strong>{" "}
                          {SelectedApplication.Data.schemeName}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Aadhaar:</strong>{" "}
                          {SelectedApplication.AadhaarNumber}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Applied Date:</strong>{" " + SelectedApplication.Date}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Accordion for Personal Details */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>Personal Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Full Name:</strong> {AllDetails.FullName}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Phone Number:</strong>{" "}
                          {AllDetails.PhoneNumber}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Date of Birth:</strong> {AllDetails.DOB}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Religion:</strong>{" "}
                          {AllDetails.PersonalInfo.Religion}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Parent's/Guardian Mobile No:</strong>{" "}
                          {AllDetails.PersonalInfo.ParentsMobileNo}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Email:</strong>{" "}
                          {AllDetails.PersonalInfo.EmailID}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Gender:</strong> {AllDetails.Gender}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Marital Status:</strong>{" "}
                          {AllDetails.PersonalInfo.MaritalStatus}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>
                            Applicant Full Name (As Per SSC Marksheet/ L.C.):
                          </strong>{" "}
                          {AllDetails.PersonalInfo.AppFullName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {/* Accordion for Permanent Address Details */}
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Permanent Address Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Address:</strong> {AllDetails.Address.Address}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>District:</strong>{" "}
                          {AllDetails.Address.District}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Village:</strong> {AllDetails.Address.Village}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>State:</strong> {AllDetails.Address.State}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Taluka:</strong> {AllDetails.Address.Taluka}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Pincode:</strong> {AllDetails.Address.Pincode}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                  >
                    <Typography>Income Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Family Annual Income:</strong>{" "}
                          {AllDetails.PersonalInfo.IncomeDetails}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Income Certificate Number:</strong>{" "}
                          {AllDetails.PersonalInfo.IncomeCert.Number}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issue Date:</strong>{" "}
                          {AllDetails.PersonalInfo.IncomeCert.IDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issuing Authority:</strong>{" "}
                          {AllDetails.PersonalInfo.IncomeCert.IAuth}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    // aria-controls="panel4a-content"
                    // id="panel4a-header"
                  >
                    <Typography>Domicile Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          {/* <strong>Domicile of Maharashtra:</strong> {AllDetails.PersonalInfo.} */}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Domicile Certificate Number:</strong>{" "}
                          {AllDetails.PersonalInfo.DomicileCert.Number}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issue Date:</strong>{" "}
                          {AllDetails.PersonalInfo.DomicileCert.IDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issuing Authority:</strong>{" "}
                          {AllDetails.PersonalInfo.DomicileCert.IAuth}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    // aria-controls="panel4a-content"
                    // id="panel4a-header"
                  >
                    <Typography>Caste Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          {/* <strong>Domicile of Maharashtra:</strong> {AllDetails.PersonalInfo.} */}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Domicile Certificate Number:</strong>{" "}
                          {AllDetails.PersonalInfo.CasteCert.Number}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issuing District:</strong>{" "}
                          {AllDetails.PersonalInfo.CasteCert.IDist}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issue Date:</strong>{" "}
                          {AllDetails.PersonalInfo.CasteCert.IDate}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Issuing Authority:</strong>{" "}
                          {AllDetails.PersonalInfo.CasteCert.IAuth}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Applicant Name:</strong>{" "}
                          {AllDetails.PersonalInfo.CasteCert.ApplName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                  >
                    <Typography>Current Course Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper}>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Sr No.</TableCell>
                            <TableCell align="right">Year of study</TableCell>
                            <TableCell align="right">
                              Admission Year in College / Institute
                            </TableCell>
                            <TableCell align="right">
                              College Name / School Name
                            </TableCell>
                            <TableCell align="right">Course Name</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Result</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {AcademicData &&
                            AcademicData.map((ad, index) => {
                              return (
                                <>
                                  <TableRow
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell align="center">
                                      {index + 1}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.yearOfStudy}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.admissionYear}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.instituteName}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.courseName}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.completedPursuing}
                                    </TableCell>
                                    <TableCell align="right">
                                      {ad?.result}
                                    </TableCell>
                                  </TableRow>
                                </>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    // aria-controls="panel4a-content"
                    // id="panel4a-header"
                  >
                    <Typography>Hostel Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Beneficiary Category:</strong>{" "}
                          {AllDetails.BeneficiaryCat}
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Button
                  onClick={handleClose}
                  variant="contained"
                  sx={{ mt: 3 }}
                  fullWidth
                >
                  Close
                </Button>
              </>
            ) : (
              <Typography>Loading...</Typography>
            )}
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default MyApplications;
