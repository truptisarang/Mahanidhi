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
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

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
  const [openViewModal, setopenViewModal] = useState(false)
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  // const openEModal = () => setopenEditModal(true);
  // const closeEModal = () => setopenEditModal(false);
  const openDModal = () => setopenDeleteModal(true);
  const closeDModal = () => setopenDeleteModal(false);
  const [Applications, setApplications] = useState([])
  const [SelectedApplication, setSelectedApplication] = useState([])

  
  const handleOpenViewModal = (appID) =>{
    setopenViewModal(true)
    setSelectedApplication(appID)
  }
  
  const handleCloseViewModal = () =>{
    setopenViewModal(true)
    setSelectedApplication("")
  }

  const deptName = useSelector((state)=>state.Officer.deptName)
  const getApplications = async() =>{
    try{
      const response = await axios.post("http://localhost:5000/getApplications", {mode:"officer", DeptName:deptName})
      setApplications(response.data.data)
    }catch(error){
      console.log(error)
    }
  }
   useEffect(()=>{
    getApplications()
   },[])

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
      <h2>Officer Dashboard</h2>
      {/* <Modal
        open={openEditModal}
        onClose={closeEModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit
          </Typography>
          <Box display={"flex"} margin={'1rem'} alignItems={"center"} justifyContent={"center"} flexDirection={'column'} gap="1rem">
              <TextField fullWidth label="UserID">UserID</TextField>
              <TextField fullWidth label="Name">Name</TextField>
              <TextField fullWidth label="EmailID">EmailID</TextField>
              <Button variant="contained">Edit</Button>
          </Box>
        </Box>
      </Modal> */}
      <Modal
      open={openViewModal}
      onClose={handleCloseViewModal}
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
        <h2 id="modal-modal-title">Document</h2>        
        {SelectedApplication?.Data?.LeavingCert?.file ? (
          <div>
            <iframe
              src={SelectedApplication?.Data?.LeavingCert?.file}
              width="100%"
              height="500px"
              title="Document PDF"
              style={{ border: 'none' }}
            />
            <Button variant="contained">Close</Button>
          </div>
          
        ) : (
          <p>No image available</p>
        )}
      </Box>
    </Modal>
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
           {
            Applications.map((app,index)=>{
              return (<TableRow>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{app.applicationId}</TableCell>
              <TableCell>{app.Data.schemeName}</TableCell>
              <TableCell>{app.Date}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                  <IconButton color="black" onClick={()=>{handleOpenViewModal(app.applicationId)}}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton color="success" onClick={openDModal}>
                    <DoneAllIcon/>
                  </IconButton>
                  <IconButton color="warning" onClick={openDModal}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>)
            })
           }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OfficerDashboard;
