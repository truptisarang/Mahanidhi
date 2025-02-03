import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Home = () => {

  const eligible_schemes = [
    {
      SchemeName: "Post Matric Scholarship to OBC students",
      DepartmentName: "OBC, SEBC, VJNT & SBC Welfare Department",
      SchemeType: "Scholarship",
      CasteCategory:"OBC",
      MaxIncome:150000,
      link:"/eligible-schemes/post-matric-obc-eligibility-criteria"
    },
    {
      SchemeName: "Post Matric Scholarship to SBC students",
      DepartmentName: "OBC, SEBC, VJNT & SBC Welfare Department",
      SchemeType: "Scholarship",
      CasteCategory:"SBC",
      MaxIncome:150000,
      link:"/eligible-schemes/post-matric-sbc-eligibility-criteria"
    },
    {
      SchemeName: "Post Matric Scholarship to VJNT students",
      DepartmentName: "OBC, SEBC, VJNT & SBC Welfare Department",
      CasteCategory:"VJNT",
      MaxIncome:150000,
      SchemeType: "Scholarship",
      link:"/eligible-schemes/post-matric-vjnt-eligibility-criteria"
    },
  ];


  return (
    <>
      <div id="homeContainer">
        <div id="heroSection">
          <div style={{backgroundImage:`url("/assets/images/maharashtra-2.png")` , backgroundSize:"19.5% auto", backgroundRepeat:"no-repeat", backgroundPosition:"center -5%"}}>
            <img id="gateway" src="/assets/images/mumbai2.png"></img>
          </div>
          <h1 id="title">महा निधी | MahaNidhi</h1>
          <p id="tagline">
            A secure, transparent, and efficient blockchain-based fund
            disbursement system.
          </p>
        </div>
        <div id="department">
          <h1>Scholarships</h1>
          
          <br></br>
          <div id="dept">
          <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: "#F9EE99" }}>
            <TableRow>
              <TableCell>
                <b>Scheme Name</b>
              </TableCell>
              <TableCell>
                <b>Department Name</b>
              </TableCell>
              <TableCell>
                <b>Scheme Type</b>
              </TableCell>
              <TableCell>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
             {
              eligible_schemes.map((scheme)=>{
                    return(
                        <TableRow>
                        <TableCell>{scheme.SchemeName}</TableCell>
                        <TableCell>{scheme.DepartmentName}</TableCell>
                        <TableCell>{scheme.SchemeType}</TableCell>
                        <TableCell><Button href={scheme.link}>Know More</Button></TableCell>
                        </TableRow>
                    )
                })
             }
          </TableBody>
        </Table>
      </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
