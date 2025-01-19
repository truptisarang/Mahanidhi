const express = require('express')
const cancel_application_router = express.Router();
const cancel_application_controller = require("../../controller/application_controller/cancel_application_controller")

cancel_application_router.post("/", cancel_application_controller);

module.exports = cancel_application_router;
 