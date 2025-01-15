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
import { Box, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const MyApplications = () => {
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const [ViewForm, setViewForm] = useState(false);
  const [AllDetails, setAllDetails] = useState("");
  const [SelectedApplication, setSelectedApplication] = useState("");
  const [Applications, setApplications] = useState([]);

  const getApplicationsDetails = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getPersonalDetails",
        { Aadhaar: aadhaar }
      );
      setApplications(response.data.data["Applications"]);
      setAllDetails(response.data.data);
    } catch (error) {
      toast.error("Error while fetching applications");
    }
  };

  useEffect(() => {
    getApplicationsDetails();
  }, [Applications]);

  const handleClose = () => {
    setViewForm(false);
    setSelectedApplication(null);
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
      <h3>My Application</h3>
      <div id="course_detail_table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Application ID</TableCell>
                <TableCell align="right">Department Name</TableCell>
                <TableCell align="right">Scheme Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
                <TableCell align="right">View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Applications.map((app) => {
                return (
                  <TableRow key={app.AppID}>
                    <TableCell align="right">{app.AppID}</TableCell>
                    <TableCell align="right">{app.schemeName}</TableCell>
                    <TableCell align="right">{app.deptName}</TableCell>
                    <TableCell align="right">{app.status}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        disabled={app.status === "Approved"}
                        color="warning"
                        variant="contained"
                      >
                        Cancel
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => {
                          setSelectedApplication(app);
                          setViewForm(true);
                        }}
                      >
                        <VisibilityIcon></VisibilityIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

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
                          {SelectedApplication.AppID}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Scheme Name:</strong>{" "}
                          {SelectedApplication.schemeName}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Aadhaar:</strong>{" "}
                          {SelectedApplication.deptName}
                        </Typography>
                        <Typography sx={{ mb: 1 }}>
                          <strong>Applied Date:</strong> {"Date"}
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
                    // aria-controls="panel4a-content"
                    // id="panel4a-header"
                  >
                    <Typography>Income Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    {/* No content here, making this accordion empty */}
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
                    {/* No content here, making this accordion empty */}
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
                    {/* No content here, making this accordion empty */}
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    // aria-controls="panel4a-content"
                    // id="panel4a-header"
                  >
                    <Typography>Current Course Details</Typography>
                  </AccordionSummary>
                  {/* Empty AccordionDetails */}
                  <AccordionDetails>
                    {/* No content here, making this accordion empty */}
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
                    {/* No content here, making this accordion empty */}
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
