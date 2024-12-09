import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminDashboard = () => {
  return (
    <div style={{ margin: "1rem" }}>
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
                  <IconButton color="info">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="warning">
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
