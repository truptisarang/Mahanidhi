import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Home = () => {
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
          <center>
            Click on the schemes to know more about eligibility criteria
          </center>
          <br></br>
          <div id="dept">
            <Accordion expanded={true}>
              <AccordionSummary
                aria-controls="panel1-content"
                id="panel1-header"
                style={{ backgroundColor: "#CCD343" }}
              >
                Post Matric Scholarship
              </AccordionSummary>
              <AccordionDetails>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    VJNT, SBC and OBC Welfare Department
                  </AccordionSummary>
                  <AccordionDetails>
                    <NavLink
                      className="scheme-link"
                      to={"/post-matric-sbc-eligibility-criteria"}
                    >
                      Post Matric Scholarship to SBC Students
                    </NavLink>
                  </AccordionDetails>
                  <AccordionDetails>
                    <NavLink
                      className="scheme-link"
                      to={"/post-matric-vjnt-eligibility-criteria"}
                    >
                      Post Matric Scholarship to VJNT Students
                    </NavLink>
                  </AccordionDetails>
                  <AccordionDetails>
                    <NavLink
                      className="scheme-link"
                      to={"/post-matric-obc-eligibility-criteria"}
                    >
                      Post Matric Scholarship to OBC Students
                    </NavLink>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
