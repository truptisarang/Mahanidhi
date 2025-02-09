const express = require('express')
const get_application_router = express.Router();
const get_application_controller = require("../../controller/application_controller/get_application_controller");
const verify_token = require("../../middleware/verify_token")
const roleBasedAccess = require('../../middleware/rbac');

get_application_router.post("/", verify_token, roleBasedAccess(['Officer', "User"]),get_application_controller);

module.exports = get_application_router;
