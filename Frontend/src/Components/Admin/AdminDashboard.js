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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const AdminDashboard = () => {
  const [openEditModal, setopenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [ConfirmDelete, setConfirmDelete] = useState(false); // Modal visibility
  const [DeleteAppID, setDeleteAppID] = useState(null); // AppID to delete
  const [EnteredAppID, setEnteredAppID] = useState(""); // AppID to delete
  const departments = [
    "OBC, SEBC, VJNT & SBC Welfare Department",
    "IT",
  ];
  const openEModal = () => setopenEditModal(true);
  const closeEModal = () => setopenEditModal(false);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const closeDeleteModal = () => {
    setConfirmDelete(false); // Close the modal
    setDeleteAppID(null); // Clear the application ID
    setEnteredAppID("");
  };

  const openDeleteModal = (officerid) => {
    setDeleteAppID(officerid); // Set the application ID to delete
    setConfirmDelete(true); // Open the modal
  };
  const openAModal = () => setOpenAddModal(true);
  const closeAModal = () => setOpenAddModal(false);
  function generateEmployeeId() {
    const randomId = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit number
    return `MNO${randomId}`; // Prefix with "MNO"
  }

  const [officerData, setOfficerData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    designation: "",
    officerid: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
    department: "",
    designation: "",
  });

  const handleDelete = async (officerid) => {
    try {
      const response = await axios.post(`${backend_url}/deleteOfficer`, {
        officer_id: DeleteAppID,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setConfirmDelete(false);
        setEnteredAppID("");
      } else {
        toast.error("Failed to delete the user");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while attempting to delete the user.");
    }
  };

  //   const validate = () => {
  //     const newErrors = {};

  //     // Full Name: must be non-empty and only letters and spaces
  //     if (!officerData.fullName || !/^[a-zA-Z\s]+$/.test(officerData.fullName)) {
  //       newErrors.fullName = "Full Name must only contain letters and spaces.";
  //     }
  //     if (!/^[a-zA-Z][a-zA-Z0-9_-]{4,}$/.test(officerData.username)) {
  //         newErrors.username = "Username must start with a letter and be at least 5 characters long, containing only letters, numbers, hyphens, or underscores.";
  //       }
  //     // Password: must be non-empty, at least 6 characters, and must be strong
  //     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{6,}$/.test(officerData.password)) {
  //         newErrors.password = "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 digit, 1 special character, and be at least 6 characters long.";
  //       }

  //     // Email: must be a valid email format
  //     if (!/\S+@\S+\.\S+/.test(officerData.email)) {
  //       newErrors.email = "Valid Email is required.";
  //     }

  //     // Phone Number: must be non-empty and contain only digits (adjust length as needed)
  //     if (!officerData.phoneNumber || !/^\d{10}$/.test(officerData.phoneNumber)) {
  //       newErrors.phoneNumber = "Phone Number must be 10 digits long.";
  //     }
  //     setErrors(newErrors);
  //   };

  const headrow = [
    "Sr No.",
    "OfficerID",
    "FullName",
    "Department Name",
    "Designation",
    "Role",
    "Last login",
    "Actions",
  ];
  const [Details, setDetails] = useState([]);
  const [ShowPassword, setShowPassword] = useState(false);
  useEffect(() => {
    fetchOfficerDetails();
  }, []);

  const fetchOfficerDetails = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/getOfficerDetails`
      );
      if (response) {
        setDetails(response.data.data);
      } else {
        toast.info("Currently no officers have been added.");
      }
    } catch (error) {
      if(error.response)
      toast.error("Error",error.response);
    }
  };

  const handleAddOfficer = async () => {
    console.log(Object.values(errors).some((err) => err === ""));
    // Check if all fields are filled
    if (
      !officerData.fullName ||
      !officerData.username ||
      !officerData.password ||
      !officerData.email ||
      !officerData.phoneNumber ||
      !officerData.role ||
      !officerData.department ||
      !officerData.designation
    ) {
      toast.error("Please fill out all fields");
      return;
    } else {
      if (Object.values(errors).some((err) => err === "")) {
        // Generate unique officer ID
        setOfficerData((prevData) => ({
          ...prevData,
          officerid: generateEmployeeId(),
        }));
        if (officerData && officerData.officerid !== "") {
          const response = await axios.post(
            `${backend_url}/addOfficer`,
            { OfficerData: officerData }
          );
          if (response.data.msg === "success") {
            toast.success("Officer added successfully!");
            setOfficerData({
              fullName: "",
              username: "",
              password: "",
              email: "",
              phoneNumber: "",
              role: "",
              department: "",
              designation: "",
              officerid: "",
            });
            setErrors({
              fullName: "",
              username: "",
              password: "",
              email: "",
              phoneNumber: "",
              role: "",
              department: "",
              designation: "",
            });
            fetchOfficerDetails();
            closeAModal();
          } else {
            toast.error("Some error occurred while adding officer details");
          }
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfficerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // validate()
  };

  return (
    <div style={{ margin: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Admin Dashboard</h2>
        <Button variant="contained" onClick={openAModal}>
          Add officer
        </Button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
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
            Delete User
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            This action will delete the selected user.<br></br>
            To delete the user, please enter Officer ID:{" "}
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
          <Box
            display={"flex"}
            margin={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap="1rem"
          >
            <TextField fullWidth label="UserID">
              UserID
            </TextField>
            <TextField fullWidth label="Name">
              Name
            </TextField>
            <TextField fullWidth label="EmailID">
              EmailID
            </TextField>
            <Button variant="contained">Edit</Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openAddModal}
        // onClose={}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Add Officer
          </Typography>

          <Box
            display={"flex"}
            margin={"1rem"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap="1rem"
          >
            <Grid container spacing={2}>
              {/* Full Name and Username */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={officerData.fullName}
                  onChange={handleInputChange}
                  error={!!errors.fullName} // Show error styling
                  helperText={errors.fullName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={officerData.username}
                  onChange={handleInputChange}
                  error={!!errors.username} // Show error styling
                  helperText={errors.username}
                />
              </Grid>

              {/* Password and Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type={ShowPassword ? "text" : "password"}
                  name="password"
                  error={!!errors.password} // Show error styling
                  helperText={errors.password}
                  value={officerData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => {
                            setShowPassword(!ShowPassword);
                          }}
                          edge="end"
                        >
                          {ShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={officerData.email}
                  onChange={handleInputChange}
                  error={!!errors.email} // Show error styling
                  helperText={errors.email}
                />
              </Grid>

              {/* Phone Number and Role */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={officerData.phoneNumber}
                  error={!!errors.phoneNumber} // Show error styling
                  helperText={errors.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={officerData.role}
                    onChange={handleInputChange}
                    label="Role"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Officer">Officer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Department and Designation */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="department-label">Department</InputLabel>
                  <Select
                    labelId="department-label"
                    id="department-select"
                    name="department"
                    value={officerData.department}
                    onChange={handleInputChange}
                    label="Department"
                  >
                    {departments.map((dept, index) => (
                      <MenuItem key={index} value={dept}>
                        {dept}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  name="designation"
                  value={officerData.designation}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="center"
              gap="1rem"
              marginTop="1rem"
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={closeAModal}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOfficer}
              >
                Add Officer
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#FFF9BF" }}>
              {headrow.map((heading) => {
                return <TableCell>{heading}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Details.map((row, index) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.OfficerID}</TableCell>
                  <TableCell>{row.FullName}</TableCell>
                  <TableCell>{row.DeptName}</TableCell>
                  <TableCell>{row.Designation}</TableCell>
                  <TableCell>{row.Role}</TableCell>
                  <TableCell>{row.LastLogin}</TableCell>
                  <TableCell>
                    <Box display={"flex"} alignItems={"center"} gap={"1rem"}>
                      <IconButton
                        color="warning"
                        onClick={() => openDeleteModal(row.OfficerID)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
