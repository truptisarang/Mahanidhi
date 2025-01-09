const express = require('express')
const login_router = express.Router();
const login_controller = require("../../controller/login_controller/login_controller")

login_router.post("/", login_controller);

module.exports = login_router;
