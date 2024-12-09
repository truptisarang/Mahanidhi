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
} from "@mui/material";

const Post_mat_SBC = () => {
  const duration = "Admission date to till exam completion date";
  const benefits = [
    {
      group: "A",
      hostlers: "Rs. 425 per month",
      dayScholars: "Rs. 190 per month",
      duration,
    },
    {
      group: "B",
      hostlers: "Rs. 290 per month",
      dayScholars: "Rs. 190 per month",
      duration,
    },
    {
      group: "C",
      hostlers: "Rs. 290 per month",
      dayScholars: "Rs. 190 per month",
      duration,
    },
    {
      group: "D",
      hostlers: "Rs. 230 per month",
      dayScholars: "Rs. 120 per month",
      duration,
    },
    {
      group: "E",
      hostlers: "Rs. 150 per month",
      dayScholars: "Rs. 90 per month",
      duration,
    },
  ];

  return (
    <>
      <div style={{ margin: "3rem" }}>
        <h3>Post Matric Scholarship to SBC students</h3>
        <div>
          <b>Department Name</b> <br></br>
          VJNT,OBC and SBC Welfare Department
          <hr></hr>
          <b>Overview</b>
          <div>
            • Providing financial assistance for education. <br></br>• Creating
            a passion for higher education. <br></br>• Providing students the
            opportunity to go to the mainstream of education through education.{" "}
            <br></br>• Scholarship scheme to avoid transparency, co-ordination
            and delay. <br></br>• Benefits of Tuition Fees, Exam Fees and
            Maintenance Allowance are paid to only SBC category students.
            <br></br>
          </div>
          <hr></hr>
          <b>Benefits</b>
          <p>If applicant selects one of the following course group</p>
          <div>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <b>Course Group</b>
                    </TableCell>
                    <TableCell>
                      <b>Hostlers</b>
                    </TableCell>
                    <TableCell>
                      <b>Day Scholars (Non-Hostlers)</b>
                    </TableCell>
                    <TableCell>
                      <b>Duration</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {benefits.map((benefit) => (
                    <TableRow key={benefit.group}>
                      <TableCell>{benefit.group}</TableCell>
                      <TableCell>{benefit.hostlers}</TableCell>
                      <TableCell>{benefit.dayScholars}</TableCell>
                      <TableCell>{benefit.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <p>
              Tuition Fee, Exam Fee and Maintenance allowance are paid 100% to
              applicants who’s studying in government/aided/unaided institutions
              in professional courses and non-professional courses.<br></br>
              If Applicant get admission in government hostel then he will
              eligible only 1/3rd amount of hostlers.<br></br>
              For B.Ed and D.Ed courses : 100 % benefit (Tuition Fees, Exam Fees
              and Maintenance Allowance) is applicable for D.Ed, B.Ed courses.
              For students studying in Aided, UnAided for D.Ed, B.Ed courses
              then Fee structure is applicable as per Government rates for same
              course
              <br></br>Note : If applicant takes an admission on or before 20th
              of any month should entitle date maintenance allowance will be
              issued for that current month. Other wise maintenance allowance
              will be entitle from next month.<br></br>
            </p>
            <hr></hr>
            <b>Eligibility</b>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                1) The parents/Guardians annual Income should be less than or
                equal to Rs.1.50 Lac.
              </div>
              <div>2) Applicants must be belongs to SBC category.</div>
              <div>3) Applicants should be residents of Maharashtra.</div>
              <div>
                4) Applicants must be pursuing the education course approved by
                the government from class Post-Matric.
              </div>
              <div>
                5) If Applicant fails in particular year then he will get the
                Tuition Fees, Exam Fees and Maintenance allowance of that
                particular academic year but he/she will not get the benefit
                until he/she gets promoted to next higher class.
              </div>
              <div>
                6) Applicant should be come through CAP round for only
                professional courses.
              </div>
              <div>
                7) Only two children (i)any number of girls applicants allowed.
                ii) boys applicants maximum 2 of the same parent will be
                eligible for the Scholarship.
              </div>
              <div>
                8) No scholarship will be paid to the Applicants under this
                scheme from the date he /she accepts another Scholarship /
                stipend.
              </div>
              <div>9) 75 % attendance is mandatory for current year.</div>
              <div>
                10) Applicant will be eligible for scholarship if he / she
                changes the course Non – Professional to Professional but he
                will not be eligible if he / she changes the course from
                Professional to Non – Professional.
              </div>
              <div>
                11) Scholarships/freeship will continue until Applicant
                completes one course. Ex. - 11th, 12th Arts - B.A., M.A. ,
                M.Phil., P.H.D. If, Applicant completed B.A and B.Ed. course and
                later after taking admission for M.A., for M.A. course He/she
                will not be allowed for scholarship/freeship. But after
                admission to M.B.A. after B.Ed, it can be eligible for
                scholarship/freeship as it is a professional postgraduate
                course.
              </div>
              <div>
                12) Applicant studying in particular
                professional/Non-Professional course, and availing benefits of
                scholarship/freeship for that academic course and if he/she
                wants to change his existing Professional/Non-Professional
                course in between academic years he/she will not be eligible for
                freeship/scholarship for further course.
              </div>
            </div>
            <hr></hr>
            <b>Renewal Policy</b>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                1) The Applicant have to pass the previous year examination.
              </div>
              <div>
                2) In case of SBC if Applicant fails for a year then the
                Applicant is not paid any reimbursement for that particular
                year.
              </div>
              <div>
                3) For Group A – If an applicant pursuing Group A course fails
                in the examination for the 1st time the award may be renewed.
                For second & sub sequent failure in any class the Applicant
                shall bear his / her own expenses until he / she secure
                promotion to the next higher class.
              </div>
              <div>
                4) For Group B,C,D,E - he/she has to secure promotion to higher
                class(For second & sub sequent failure in any class the
                Applicant shall bear his / her own expenses until he / she
                secure promotion to the next higher class.).
              </div>
              <div>
                5) If due to any medical condition or due to any unforeseeable
                event the Applicant cannot appear in the annual examination, the
                head master of the college can approve or certify that if the
                Applicant would have appeared in the annual examination, he
                would have been able to pass the examination. This will be only
                allowed if the head of the institution is satisfied by the
                submission of medical proof or any other required sufficient
                proof that the Applicant presents to the college.
              </div>
            </div>
          </div>
          <hr></hr>
          <b>Documents Required</b>
          <div>1. <b>Caste certificate</b> - should be issued by competent authority(Issued by Govt. of Maharashtra) This certificate considered as Proof of Resident.</div>
          <div>2. <b>Income certificate / Income Declaration</b> - should be issued by competent authority</div>
          <div>3. <b>Caste Validity Certificate</b> – (Mandatory for Professional Degree courses, Professional Post Graduate. For Non Professional courses caste validity is not mandatory)</div>
          <div>4. <b>HSC or SSC marksheet or last examination marksheet.</b></div>
          <div>5. <b>Gap certificate</b> - Not mandatory but in case of gap it is mandatory.</div>
          <div>6. <b>If applicable father/Guardians death certificate.</b></div>
          <div>7. <b>Ration Card</b> for identify number of children in family.</div>
          <div>8. <b>Leaving Certificate</b></div>
          <div>9. <b>Declaration certificate of parents/guardians about number of children beneficiaries.</b></div>
        </div>
        <center><Button variant='contained'>apply</Button></center>
      </div>
    </>
  );
};

export default Post_mat_SBC;
