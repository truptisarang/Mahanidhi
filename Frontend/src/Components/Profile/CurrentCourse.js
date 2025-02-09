import React, { useEffect, useState } from "react";
import "../Profile/CurrentCourse.css";
import {
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  IconButton,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import statesWithDistricts from "./States";
import Qualification from "../../data/Qualification";
import Stream from "../../data/Stream";
import CollegeNames from "../../data/CollegeNames";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSelector } from "react-redux";


const CurrentCourse = (props) => {
  const aadhaar = useSelector((state) => state.Profile.aadhaar);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const getDetails = async () => {
    try {
      const response = await axios.post(
        `${backend_url}/getPersonalDetails`,
        { Aadhaar: aadhaar }
      );
      if (response.data.data) {
        const data = response.data.data;
        setCourseData(data["PersonalInfo.CourseDetails"] || {});
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDetails()
    const CourseDetails = JSON.parse(sessionStorage.getItem("CourseDetails")) || [];
    setAcademicData(CourseDetails);
  }, []);
  const [AcademicData, setAcademicData] = useState([]);
  const [CourseData, setCourseData] = useState({
    admissionYear: "",
    instituteName: "",
    instituteState: "",
    instituteDistrict: "",
    instituteTaluka: "",
    qualification: "",
    stream: "",
    courseName: "",
    yearOfStudy: "",
    completedPursuing: "",
    isProfessional: "",
    mode: "",
    result: "",
  });

  const yos = [
    "Direct Second Year",
    "Direct Third Year",
    "First Year",
    "Second Year",
    "Third Year",
  ];

  const goback = props.backHandler;
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 5;
    const yearArray = [];
    for (let i = minYear; i <= currentYear; i++) {
      yearArray.push(i);
    }
    return yearArray;
  };
  const SaveDetails = () => {
    const course_data = [...AcademicData, CourseData];
    setAcademicData(course_data);
    sessionStorage.setItem("CourseDetails", JSON.stringify(course_data));
    setCourseData({
      admissionYear: "",
      instituteName: "",
      instituteState: "",
      instituteDistrict: "",
      instituteTaluka: "",
      qualification: "",
      stream: "",
      courseName: "",
      yearOfStudy: "",
      completedPursuing: "",
      isProfessional: "",
      mode: "",
      result: "",
    });
  };

  const DeleteCourseData = (index) => {
    // exclude the element index from the array and create a new array set the array to the state variable
    const updateAD = AcademicData.filter((_, i) => i != index);
    setAcademicData(updateAD);
  };

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
              name="admyear"
              style={{ width: "100%" }}
              labelId="AYLabel"
              label="Admission Year in Current Course"
              value={CourseData?.admissionYear}
              onChange={(e) =>
                setCourseData({ ...CourseData, admissionYear: e.target.value })
              }
            >
              {generateYears().map((year, index) => {
                return (
                  <MenuItem key={index} value={year}>
                    {year}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="IStateLabel">Institute State</InputLabel>
            <Select
              name="IState"
              style={{ width: "100%" }}
              labelId="IStateLabel"
              label="Institute State"
              value={CourseData?.instituteState}
              onChange={(e) =>
                setCourseData({ ...CourseData, instituteState: e.target.value })
              }
            >
              {statesWithDistricts.map((state, index) => {
                return (
                  <MenuItem key={index} value={state.state}>
                    {state.state}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="IDistLabel">Institute District</InputLabel>
            <Select
              name="IDist"
              style={{ width: "100%" }}
              labelId="IDistLabel"
              label="Institute District"
              value={CourseData?.instituteDistrict}
              onChange={(e) =>
                setCourseData({
                  ...CourseData,
                  instituteDistrict: e.target.value,
                })
              }
            >
              {statesWithDistricts
                .filter((state) => state.state === CourseData?.instituteState)
                .map((st) =>
                  st.districts.map((dist, index) => (
                    <MenuItem key={index} value={dist}>
                      {dist}
                    </MenuItem>
                  ))
                )}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="ITalLabel">Institute Taluka</InputLabel>
            <Select
              style={{ width: "100%" }}
              name="ITal"
              labelId="ITalLabel"
              label="Institute Taluka"
              value={CourseData?.instituteTaluka}
              onChange={(e) =>
                setCourseData({
                  ...CourseData,
                  instituteTaluka: e.target.value,
                })
              }
            >
              {statesWithDistricts
                .filter((state) => state.state === CourseData?.instituteState)
                .map((st) =>
                  st.districts.map((dist, index) => (
                    <MenuItem key={index} value={dist}>
                      {dist}
                    </MenuItem>
                  ))
                )}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="QualiLabel">Qualification</InputLabel>
            <Select
              name="Quali"
              style={{ width: "100%" }}
              labelId="QualiLabel"
              label="Qualification"
              value={CourseData?.qualification}
              onChange={(e) =>
                setCourseData({ ...CourseData, qualification: e.target.value })
              }
            >
              {Qualification.map((quali) => {
                return <MenuItem value={quali}>{quali}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="StreamLabel">Stream</InputLabel>
            <Select
              name="Stream"
              style={{ width: "100%" }}
              labelId="StreamLabel"
              label="Stream"
              value={CourseData?.stream}
              onChange={(e) =>
                setCourseData({ ...CourseData, stream: e.target.value })
              }
            >
              {Stream.map((st) => {
                return <MenuItem value={st}>{st}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="ClgLabel">College Name/ School Name</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="ClgLabel"
              name="ClgName"
              label="College Name/ School Name"
              value={CourseData?.instituteName}
              onChange={(e) =>
                setCourseData({ ...CourseData, instituteName: e.target.value })
              }
            >
              {CollegeNames.map((cldata) => {
                return <MenuItem value={cldata.name}>{cldata.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="CourseLabel">Course Name</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="CourseLabel"
              label="Course Name"
              name="course_name"
              value={CourseData?.courseName}
              onChange={(e) =>
                setCourseData({ ...CourseData, courseName: e.target.value })
              }
            >
              {CollegeNames.filter(
                (cldata) => cldata.name === CourseData?.instituteName
              ).map((clg) => {
                return clg.courses.map((c, index) => (
                  <MenuItem key={index} value={c}>
                    {c}
                  </MenuItem>
                ));
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="YosLabel">Year of study</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="YosLabel"
              name="Yos"
              label="Year of study"
              value={CourseData?.yearOfStudy}
              onChange={(e) =>
                setCourseData({ ...CourseData, yearOfStudy: e.target.value })
              }
            >
              {yos.map((yostudy) => {
                return <MenuItem value={yostudy}>{yostudy}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="CPLabel">Completed / Pursuing</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="CPLabel"
              name="Degree_Status"
              label="Completed / Pursuing"
              value={CourseData?.completedPursuing}
              onChange={(e) =>
                setCourseData({
                  ...CourseData,
                  completedPursuing: e.target.value,
                })
              }
            >
              <MenuItem value={"Completed"}>Completed</MenuItem>
              <MenuItem value={"Pursuing"}>Pursuing</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="ProfLabel">Is Professional?</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="ProfLabel"
              name="Is_professional"
              label="Is Professional?"
              value={CourseData?.isProfessional}
              onChange={(e) =>
                setCourseData({ ...CourseData, isProfessional: e.target.value })
              }
            >
              <MenuItem value={"Non Professional Course"}>
                Non Professional Course
              </MenuItem>
              <MenuItem value={"Professional Course"}>
                Professional Course
              </MenuItem>
            </Select>
          </FormControl>
         {CourseData.completedPursuing === "Completed" ? <FormControl>
            <InputLabel id="resultLabel">Result</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="resultLabel"
              name="result"
              label="Result"
              value={CourseData?.result}
              onChange={(e) =>
                setCourseData({ ...CourseData, result: e.target.value })
              }
            >
              <MenuItem value={"Passed"}>Passed</MenuItem>
              <MenuItem value={"Failed"}>Failed</MenuItem>
            </Select>
          </FormControl> : null}

          <FormControl>
            <InputLabel id="ModeLabel">Mode</InputLabel>
            <Select
              style={{ width: "100%" }}
              labelId="ModeLabel"
              label="Mode"
              name="mode"
              value={CourseData?.mode}
              onChange={(e) =>
                setCourseData({ ...CourseData, mode: e.target.value })
              }
            >
              <MenuItem value={"Regular"}>Regular</MenuItem>
              <MenuItem value={"Distance/Correspondence"}>
                Distance / Correspondence
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
          <Button
            variant="contained"
            color="success"
            onClick={SaveDetails}
            disabled={
              !Object.values(CourseData).every((value) => {
                return value !== "";
              })
            }
          >
            Save
          </Button>
        </Box>
      </div>
      <div id="course_detail_table">
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Sr No.</TableCell>
                <TableCell align="right">Year of study</TableCell>
                <TableCell align="right">
                  Admission Year in College / Institute
                </TableCell>
                <TableCell align="right">College Name / School Name</TableCell>
                <TableCell align="right">Course Name</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Result</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AcademicData && AcademicData.map((ad, index) => {
                return (
                  <>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell  align="right">{ad?.yearOfStudy}</TableCell>
                      <TableCell align="right">{ad?.admissionYear}</TableCell>
                      <TableCell align="right">{ad?.instituteName}</TableCell>
                      <TableCell align="right">{ad?.courseName}</TableCell>
                      <TableCell align="right">{ad?.completedPursuing}</TableCell>
                      <TableCell align="right">{ad?.result}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(e) => DeleteCourseData(index)}>
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box></Box>
      </div>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={'1rem'}>
        <Button variant="contained" onClick={goback}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={props.nextHandler}
          disabled={AcademicData?.length === 0}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CurrentCourse;
