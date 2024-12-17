import React, { useState } from "react";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const OfficerDashboard = () => {
  const [openEditModal, setopenEditModal] = useState(false);
  const [openDeleteModal, setopenDeleteModal] = useState(false);
  const openEModal = () => setopenEditModal(true);
  const closeEModal = () => setopenEditModal(false);
  const openDModal = () => setopenDeleteModal(true);
  const closeDModal = () => setopenDeleteModal(false);

  return (
    <div style={{ margin: "1rem" }}>
      <Modal
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
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={closeDModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete
          </Typography>
          <Box display={"flex"} margin={'1rem'} alignItems={"center"} justifyContent={"center"} flexDirection={'column'} gap="1rem">
              <TextField fullWidth label="UserID">UserID</TextField>
              <TextField fullWidth label="Name">Name</TextField>
              <TextField fullWidth label="EmailID">EmailID</TextField>
              <Button variant="contained">Delete</Button>
          </Box>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>S123457890</TableCell>
              <TableCell>Sunil Deshpande</TableCell>
              <TableCell>12/12/2024</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                  <IconButton color="black" onClick={openDModal}>
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
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OfficerDashboard;
