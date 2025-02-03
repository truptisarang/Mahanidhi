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
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

const EligibleSchemes = () => {
    const [Details, setDetails] = useState({})
    const aadhaar = useSelector((state) => state.Profile.aadhaar);
    const getDetails = async () => {
        try {
          const response = await axios.post(
            "https://mahanidhibackend.onrender.com/getPersonalDetails",
            { Aadhaar: aadhaar }
          );
          if (response.data.data) {
            const data = response.data.data;
            setDetails(data['PersonalInfo'])
          }
        } catch (error) {
          console.log(error);
        }
      };
  useEffect(()=>{
    getDetails()
  },[])
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

 const filter_eligible_schemes = eligible_schemes.filter((scheme)=>Details.CasteCategory === scheme.CasteCategory && parseInt(Details.IncomeDetails) <= scheme.MaxIncome)
 console.log(filter_eligible_schemes)

  return (
    <>
      <p style={{ fontSize: "1.4rem" }}>
        Suggested Eligible Schemes based on Caste Category & Income
      </p>
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
                filter_eligible_schemes.map((scheme)=>{
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
    </>
  );
};

export default EligibleSchemes;
