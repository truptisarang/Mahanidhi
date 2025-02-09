const express = require('express')
const add_officer_router = express.Router();
const add_officer_controller = require("../../controller/officer_controller/add_officer_controller");
const verify_token = require('../../middleware/verify_token');
const roleBasedAccess = require("../../middleware/rbac")

add_officer_router.post("/", verify_token, roleBasedAccess(["Admin"]) ,add_officer_controller);

module.exports = add_officer_router;
