import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  Box,
  IconButton,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const OfficerDashboard = () => {
  const [openViewModal, setopenViewModal] = useState(false);
  const [Applications, setApplications] = useState([]);
  const [SelectedApplication, setSelectedApplication] = useState([]);
  const [OpenApproveModal, setOpenApproveModal] = useState(false);
  const [OpenRejectModal, setOpenRejectModal] = useState(false);
  const [EnteredAppID, setEnteredAppID] = useState("");
  const [Reason, setReason] = useState();
  const [Amount, setAmount] = useState("");
  const [touched, setTouched] = useState(false);

  const handleOpenViewModal = (appData) => {
    setopenViewModal(true);
    setSelectedApplication(appData);
  };

  const handleAmountChange = (e) => {
    // Ensure the input is a number or empty string
    const value = e.target.value;
    if (value === "" || /^[0-9]+(\.[0-9]*)?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleCloseViewModal = () => {
    setopenViewModal(false);
    setSelectedApplication("");
  };

  const deptName = useSelector((state) => state.Officer.deptName);
  const getApplications = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getApplications",
        {
          mode: "officer",
          DeptName: deptName,
          scrutinised: false,
          status: "Pending",
        }
      );
      if (response.data.data) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getApplications();
  }, []);

  const updateStatus = async (data) => {
    try {
      const response = await axios.patch("http://localhost:5000/updateStatus", {
        Data: data,
      });
      if (response.data.success === true) {
        toast.success("Status updated!!");

        setOpenApproveModal(false);
        setOpenRejectModal(false);
        setReason(null);
      }
    } catch (error) {
      toast.error(
        "Error while updating the status of the application. Please try again"
      );
    }
  };

  const handleAcceptApp = (data) => {
    updateStatus(data);
  };

  const handleBlur = () => {
    setTouched(true); // Mark field as touched when the user moves out of the input
  };

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ margin: "1rem" }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
      />
      <h3>Pending Applications</h3>
      <Modal
        open={OpenApproveModal}
        onClose={(e) => {
          setOpenApproveModal(false);
          setAmount("");
          setEnteredAppID("")
          setTouched(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <center>
              Are you sure you want to accept the application ? <br></br>{" "}
            </center>
            <center>To confirm please enter application id</center>
            <center>
              <strong>{SelectedApplication?.applicationId}</strong>
            </center>
          </Typography>
          <Box
            display={"flex"}
            margin={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap="1rem"
          >
            <TextField
              fullWidth
              label="Enter Application ID"
              onChange={(e) => setEnteredAppID(e.target.value)}
              value={EnteredAppID}
              error={
                EnteredAppID !== "" &&
                EnteredAppID !== SelectedApplication?.applicationId
              }
              helperText={
                EnteredAppID !== "" &&
                EnteredAppID !== SelectedApplication?.applicationId
                  ? "Application ID does not match"
                  : ""
              }
            >
              Enter Application ID
            </TextField>
            <TextField
              value={Amount}
              label={"Amount (In INR )"}
              onChange={handleAmountChange}
              fullWidth
              onBlur={handleBlur} // Track blur event to set the field as touched
              error={touched && Amount === ""} // Error only if touched and empty
              helperText={
                touched && Amount === "" ? "Please enter the amount" : ""
              }
              type={"text"}
            ></TextField>
            <Button
              variant="contained"
              color="success"
              onClick={(e) =>
                handleAcceptApp({ appid: EnteredAppID, amount: Amount, status: "Approved" })
              }
              disabled={EnteredAppID !== SelectedApplication?.applicationId || Amount === ""}
            >
              Approve
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={OpenRejectModal}
        onClose={(e) => setOpenRejectModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component={"h5"} color="red" gutterBottom>
            <center>Reject</center>
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            <center>
              Are you sure you want to reject the application ? <br></br>{" "}
            </center>
            <center>Enter reason for rejection</center>
          </Typography>
          <Box
            display={"flex"}
            margin={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap="1rem"
          >
            <TextField
              fullWidth
              label="Reason for rejection"
              onChange={(e) => setReason(e.target.value)}
              value={Reason}
              error={Reason == ""}
              helperText={Reason == "" && "Enter Reason for rejection"}
            >
              Enter Application ID
            </TextField>
            <Button
              variant="contained"
              color="warning"
              onClick={(e) =>
                handleAcceptApp({
                  appid: SelectedApplication?.applicationId,
                  remarks: Reason,
                  status: "Reject",
                })
              }
              disabled={Reason == ""}
            >
              Reject
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openViewModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: 24,
            width: "80%",
            maxWidth: "600px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 id="modal-modal-title">
              Documents - {SelectedApplication?.applicationId}
            </h2>

            <IconButton variant="contained" onClick={handleCloseViewModal}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </div>
          <div>
            {SelectedApplication?.Data?.LeavingCert?.file && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Leaving Certificate
                </AccordionSummary>
                <AccordionDetails>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={SelectedApplication?.Data?.LeavingCert?.file}
                      plugins={[defaultLayoutPluginInstance]}
                    ></Viewer>
                  </Worker>
                </AccordionDetails>
              </Accordion>
            )}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                Parent Declaration
              </AccordionSummary>
              <AccordionDetails>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={SelectedApplication?.Data?.ParentDeclaration?.file}
                    plugins={[defaultLayoutPluginInstance]}
                  ></Viewer>
                </Worker>
              </AccordionDetails>
            </Accordion>
            {SelectedApplication?.Data?.CasteValidity?.file && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Caste Validity
                </AccordionSummary>
                <AccordionDetails>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={SelectedApplication?.Data?.CasteValidity?.file}
                      plugins={[defaultLayoutPluginInstance]}
                    ></Viewer>
                  </Worker>
                </AccordionDetails>
              </Accordion>
            )}
            {SelectedApplication?.Data?.RationCard?.file && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  Ration Card
                </AccordionSummary>
                <AccordionDetails>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer
                      fileUrl={SelectedApplication?.Data?.RationCard?.file}
                      plugins={[defaultLayoutPluginInstance]}
                    ></Viewer>
                  </Worker>
                </AccordionDetails>
              </Accordion>
            )}
          </div>
        </Box>
      </Modal>
      <Box sx={{ width: 1000 }}>
        {Applications.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#F9EE99" }}>
                <TableRow>
                  <TableCell>
                    <b>Sr No.</b>
                  </TableCell>
                  <TableCell>
                    <b>Application ID</b>
                  </TableCell>
                  <TableCell>
                    <b>Applicant Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Department</b>
                  </TableCell>
                  <TableCell>
                    <b>Scheme Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Submission Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Status</b>
                  </TableCell>
                  <TableCell>
                    <b>Actions</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Applications.map((app, index) => {
                  return (
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{app.applicationId}</TableCell>
                      <TableCell>{app.applicantName}</TableCell>
                      <TableCell>{app.Data.deptName}</TableCell>
                      <TableCell>{app.Data.schemeName}</TableCell>
                      <TableCell>{app.Date}</TableCell>
                      <TableCell>{app.status}</TableCell>
                      <TableCell>
                        <Box
                          display={"flex"}
                          alignItems={"center"}
                          gap={"1rem"}
                        >
                          <IconButton
                            color="black"
                            onClick={() => {
                              handleOpenViewModal(app);
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            color="success"
                            onClick={(e) => {
                              setOpenApproveModal(true);
                              setSelectedApplication(app);
                            }}
                          >
                            <DoneAllIcon />
                          </IconButton>
                          <IconButton
                            color="warning"
                            onClick={(e) => {
                              setOpenRejectModal(true);
                              setSelectedApplication(app);
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <center>No pending applications !!!</center>
        )}
      </Box>
    </div>
  );
};

export default OfficerDashboard;
