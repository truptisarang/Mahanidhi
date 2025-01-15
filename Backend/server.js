const express = require("express");
const { connectMahanidhiDB } = require("./utils/dbConn");
const verify_aadhaar_router = require("./router/registration_router/verify_aadhaar_router");
const login_router = require("./router/login_router/login_router")
const store_personal_details_router = require("./router/registration_router/store_personal_details_router");
const get_personal_details_router = require("./router/data_router/get_personal_data_router");
const profile_update_router = require("./router/profile_router/profile_update_router");
const submit_application_router = require("./router/application_router/submit_application_router")
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/verifyAadhaar", verify_aadhaar_router);
app.use("/login", login_router);
app.use("/storePersonalDetails", store_personal_details_router);
app.use("/getPersonalDetails", get_personal_details_router);
app.use("/updateProfile/:aadhaarId", profile_update_router);
app.use("/submitForm", submit_application_router);

const startServer = async () => {
  try {
    await connectMahanidhiDB();
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  } catch (error) {
    console.log("Failed to start the server:", error)
  }
};
startServer();