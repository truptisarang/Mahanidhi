const express = require('express')
const verify_aadhaar_router = express.Router();
const verify_aadhaar_controller = require("../../controller/registration_controller/verify_aadhaar_controller")

verify_aadhaar_router.post("/", verify_aadhaar_controller);

module.exports = verify_aadhaar_router;
