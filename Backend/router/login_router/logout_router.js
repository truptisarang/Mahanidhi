const express = require('express')
const logout_router = express.Router();
const logout_controller = require("../../controller/login_controller/logout_controller")

logout_router.post("/", logout_controller);

module.exports = logout_router;
