const express = require('express')
const get_application_router = express.Router();
const get_application_controller = require("../../controller/application_controller/get_application_controller")

get_application_router.post("/", get_application_controller);

module.exports = get_application_router;
