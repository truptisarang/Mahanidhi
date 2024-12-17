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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
const AdminDashboard = () => {
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
                <b>UserID</b>
              </TableCell>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Email ID</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Deshpande@21</TableCell>
              <TableCell>Sunil Deshpande</TableCell>
              <TableCell>sd@gmail.com</TableCell>
              <TableCell>
                <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                  <IconButton color="info" onClick={openEModal}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning" onClick={openDModal}>
                    <DeleteIcon />
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

export default AdminDashboard;
