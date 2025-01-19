const express = require('express')
const add_officer_router = express.Router();
const add_officer_controller = require("../../controller/officer_controller/add_officer_controller")

add_officer_router.post("/", add_officer_controller);

module.exports = add_officer_router;
