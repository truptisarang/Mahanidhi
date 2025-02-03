const express = require("express");
const rate_limit = require('express-rate-limit')
require('dotenv').config();
const { connectMahanidhiDB, connectMockAadhaarDB } = require("./utils/dbConn");
const {verify_aadhaar_router, verify_aadhaar_otp_router} = require("./router/registration_router/verify_aadhaar_router");
const login_router = require("./router/login_router/login_router")
const store_personal_details_router = require("./router/registration_router/store_personal_details_router");
const get_personal_details_router = require("./router/data_router/get_personal_data_router");
const profile_update_router = require("./router/profile_router/profile_update_router");
const submit_application_router = require("./router/application_router/submit_application_router")
const cancel_application_router = require("./router/application_router/cancel_application_router")
const officer_login_router = require("./router/officer_router/officer_login_router")
const get_officer_details_router = require("./router/data_router/get_officer_details_router");
const get_application_router = require("./router/application_router/get_application_router");
const update_status_router = require("./router/application_router/update_status_router")
const verify_otp_router = require("./router/login_router/verify_otp_router")
const logout_router = require("./router/login_router/logout_router")
const add_officer_router = require("./router/officer_router/add_officer_router");
const delete_officer_router = require("./router/officer_router/delete_officer_router");

const app = express();
const cors = require("cors");

app.use(express.json());
const Loginlimiter = rate_limit({
  max:3,
  windowMs:15 * 60 * 1000,
  message:"Too many requests. Please try again later in 15 minutes."
});

const limiter = rate_limit({
  max:200,
  windowMs:60 * 60 * 1000,
  message:"Too many requests. Please try again later in 15 minutes."
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/login", Loginlimiter)
app.use("/", limiter)
app.use("/verifyAadhaar", Loginlimiter)

app.use("/verifyAadhaar", verify_aadhaar_router);
app.use("/verifyAadhaarOTP", verify_aadhaar_otp_router);
app.use("/login", login_router);
app.use("/verifyOTP", verify_otp_router);
app.use("/storePersonalDetails", store_personal_details_router);
app.use("/getPersonalDetails", get_personal_details_router);
app.use("/updateProfile/:aadhaarId", profile_update_router);
app.use("/submitForm", submit_application_router);
app.use("/cancelApplication", cancel_application_router);
app.use("/getApplications", get_application_router);
app.use("/logout", logout_router);


app.use("/officerLogin", officer_login_router);
app.use("/getofficerDetails", get_officer_details_router);
app.use("/addOfficer", add_officer_router);
app.use("/deleteOfficer", delete_officer_router);
app.use("/updateStatus", update_status_router);
let aadhaar_model;

const startServer = async () => {
  try {
    await connectMahanidhiDB();
    aadhaar_model = await connectMockAadhaarDB();
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.log("Failed to start the server:", error)
  }
};

startServer();
