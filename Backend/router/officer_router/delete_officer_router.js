const express = require('express')
const delete_officer_router = express.Router();
const delete_officer_controller = require("../../controller/officer_controller/delete_officer_controller")

delete_officer_router.post("/", delete_officer_controller);

module.exports = delete_officer_router;
