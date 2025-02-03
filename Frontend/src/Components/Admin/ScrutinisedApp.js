import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";


const ScrutinisedApp = () => {
  const deptName = useSelector((state) => state.Officer.deptName);
  const [Applications, setApplications] = useState([])
  const [openViewModal, setopenViewModal] = useState(false);
  const [SelectedApplication, setSelectedApplication] = useState([]);
  const [OpenApproveModal, setOpenApproveModal] = useState(false);
  const [OpenRejectModal, setOpenRejectModal] = useState(false);
  const [EnteredAppID, setEnteredAppID] = useState("");
  const [Reason, setReason] = useState();
  const handleOpenViewModal = (appData) => {
    setopenViewModal(true);
    setSelectedApplication(appData);
  };

  const handleCloseViewModal = () => {
    setopenViewModal(false);
    setSelectedApplication("");
  };
  const getApplications = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/getApplications",
        { mode: "officer", DeptName: deptName, scrutinised:true, status: "Pending" }
      );
      if (response.data.data) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplications()
  }, []);



  return (
    <>
        <h3>Scrutinised Applications</h3>
        <Box sx={{ width: 1000 }}>
        {Applications.length > 0  ? (<TableContainer component={Paper}>
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
                  {/* <b>Actions</b> */}
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
                    {/* <TableCell>
                      <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
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
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>) : <center>You haven't scrutinised any applications yet !!!</center>}
      </Box>
    </>        
    );
};

export default ScrutinisedApp;
