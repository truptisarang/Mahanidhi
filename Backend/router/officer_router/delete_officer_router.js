const express = require('express')
const delete_officer_router = express.Router();
const delete_officer_controller = require("../../controller/officer_controller/delete_officer_controller");
const verify_token = require('../../middleware/verify_token');
const roleBasedAccess = require("../../middleware/rbac")

delete_officer_router.post("/", verify_token, roleBasedAccess(["Admin"]), delete_officer_controller);

module.exports = delete_officer_router;
