const express = require('express')
const get_officer_details_router = express.Router();
const get_officer_details_controller = require("../../controller/data_controller/get_officer_details_controller");
const verify_token = require('../../middleware/verify_token');
const roleBasedAccess = require("../../middleware/rbac")

get_officer_details_router.post("/", verify_token, roleBasedAccess(['Admin']), get_officer_details_controller);

module.exports = get_officer_details_router;
