import React, { useState } from "react";
import { FormControl, InputLabel, Select, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

const PastQualification = () => {
  const [Files, setFiles] = useState("");

  return (
    <div className="details_pane">
      <div id="instruction_box">
        Kindly Fill SSC And HSC Details, Ignore if you already filled
      </div>
      <div id="txtboxes">
        <FormControl>
          <InputLabel id="qualiLabel">Qualification Level</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="qualiLabel"
            label="Qualification Level"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="streamLabel">Stream</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="streamLabel"
            label="Stream"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="completedLabel">Completed</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="completedLabel"
            label="Completed"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="IStateLabel">Institute State</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="IStateLabel"
            label="Institute State"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="IDistLabel">Institute District</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="IDistLabel"
            label="Institute State"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="ITalLabel">Institute Taluka</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="ITalLabel"
            label="Institute Taluka"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="ClgLabel">College Name/ School Name</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="ClgLabel"
            label="College Name/ School Name"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="CourseLabel">Course Name</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="CourseLabel"
            label="Course"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="completedLabel">Board / University</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="completedLabel"
            label="Completed"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="modeLabel">Mode</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="modeLabel"
            label="Mode"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="ayLabel">Admission Year</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="ayLabel"
            label="Admission Year"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="pyLabel">Passing Year</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="pyLabel"
            label="Passing Year"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <FormControl>
          <InputLabel id="resultLabel">Result</InputLabel>
          <Select
            style={{ width: "100%" }}
            labelId="resultLabel"
            label="Result"
            // value={MaritalStatus}
            // onChange={(e) => {
            //   setMaritalStatus(e.target.value);
            // }}
          ></Select>
        </FormControl>
        <TextField variant="outlined" label="Percentage" fullWidth></TextField>
        <TextField variant="outlined" label="Attempts" fullWidth></TextField>
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
            onChange={(event) => setFiles(event.target.files)}
            accept=".pdf, .jpeg, .jpg"
          />
        </Button>
        {Files && <span style={{ fontSize: ".8rem" }}>{Files[0].name}</span>}
      </div>
      <div id="txtbox2" style={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}  sx={{ width: 950 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell align="right">Qualification Level</TableCell>
                <TableCell align="right">Stream</TableCell>
                <TableCell align="right">Course</TableCell>
                <TableCell align="right">Institute State</TableCell>
                <TableCell align="right">Board/University</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Admission Year</TableCell>
                <TableCell align="right">Passing Year</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
    </div>
  );
};

export default PastQualification;
