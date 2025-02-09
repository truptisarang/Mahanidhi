const express = require('express')
const update_status_router = express.Router();
const update_status_controller = require("../../controller/application_controller/update_status_controller");
const verify_token = require('../../middleware/verify_token');
const roleBasedAccess = require("../../middleware/rbac")

update_status_router.patch("/", verify_token, roleBasedAccess(["Officer"]), update_status_controller);

module.exports = update_status_router;
