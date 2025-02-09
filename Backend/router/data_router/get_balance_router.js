const express = require('express')
const get_balance_router = express.Router();
const get_balance_controller = require("../../controller/services/get_usdc_balance");
const verify_token = require('../../middleware/verify_token');
const roleBasedAccess = require("../../middleware/rbac")

get_balance_router.post("/", verify_token, roleBasedAccess(['User']), get_balance_controller);

module.exports = get_balance_router;
