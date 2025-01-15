const express = require('express')
const submit_application_router = express.Router();
const submit_application_controller = require("../../controller/application_controller/submit_application_controller")

submit_application_router.post("/", submit_application_controller);

module.exports = submit_application_router;
