const express = require('express')
const update_status_router = express.Router();
const update_status_controller = require("../../controller/application_controller/update_status_controller")

update_status_router.patch("/", update_status_controller);

module.exports = update_status_router;
