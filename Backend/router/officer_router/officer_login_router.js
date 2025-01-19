const express = require('express')
const officer_login_router = express.Router();
const officer_login_controller = require("../../controller/officer_controller/officer_login_controller")

officer_login_router.post("/", officer_login_controller);

module.exports = officer_login_router;
