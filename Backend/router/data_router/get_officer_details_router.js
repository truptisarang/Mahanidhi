const express = require('express')
const get_officer_details_router = express.Router();
const get_officer_details_controller = require("../../controller/data_controller/get_officer_details_controller")

get_officer_details_router.post("/", get_officer_details_controller);

module.exports = get_officer_details_router;
