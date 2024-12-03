import React from "react";
import "../Profile/CurrentCourse.css";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CurrentCourse = () => {
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1} margin={"1rem"}>
      <div id="instruction_box">
        <b>1.</b> Kindly fill the details of your current course in
        chronological order: Eg. First Year, Second Year, Third Year etc..
        <br></br>
        <b>2.</b> The current year of study of the course should have Pursuing
        status. Eg: You are studying in 3rd year then please make 3 entries with
        First Year and Second Year with status as Completed and Third year as
        Pursuing.
        <br></br>
        <b>3.</b> If your current course is second year pursuing then click on
        Delete Button, add first course year details as completed and update the
        second year course details for the current pursuing year as Pursuing and
        click on save.
      </div>
      <div className="details_pane">
        <div id="txtboxes">
          <FormControl>
            <InputLabel id="AYLabel">
              Admission Year in Current Course
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="AYLabel"
              label="Admission Year in Current Course"
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
            <InputLabel id="QualiLabel">Qualification</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="QualiLabel"
              label="Qualification"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <FormControl>
            <InputLabel id="StreamLabel">Stream</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="StreamLabel"
              label="Stream"
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
              label="Course Name"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <FormControl>
            <InputLabel id="YosLabel">Year of study</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="YosLabel"
              label="Year of study"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <FormControl>
            <InputLabel id="CPLabel">Completed / Pursuing</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="CPLabel"
              label="Completed / Pursuing"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <FormControl>
            <InputLabel id="ProfLabel">Is Professional?</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="ProfLabel"
              label="Is Professional?"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <FormControl>
            <InputLabel id="CatLabel">
              Is Admission Through Open Or Reserved Category ?
            </InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="CatLabel"
              label="Is Admission Through Open Or Reserved Category ?"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            ></Select>
          </FormControl>
          <TextField label="Gap Years" type="number"></TextField>
          <FormControl>
            <InputLabel id="ModeLabel">Mode</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="ModeLabel"
              label="Mode"
              // value={MaritalStatus}
              // onChange={(e) => {
              //   setMaritalStatus(e.target.value);
              // }}
            >
              <MenuItem value={"Regular"}>Regular</MenuItem>
              <MenuItem value={"Distance/Correspondence"}>
                Distance / Correspondence
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button variant="contained" color="success">Save</Button>
        </Box>
      </div>
      <div id="course_detail_table">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell align="right">Year of study</TableCell>
                <TableCell align="right">Admission Date</TableCell>
                <TableCell align="right">Admission Year in College / Institute</TableCell>
                <TableCell align="right">College Name / School Name</TableCell>
                <TableCell align="right">Course Name</TableCell>
                <TableCell align="right">University Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default CurrentCourse;
