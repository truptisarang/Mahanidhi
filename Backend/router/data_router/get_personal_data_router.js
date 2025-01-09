const express = require('express')
const get_personal_data_router = express.Router();
const get_personal_data_controller = require("../../controller/data_controller/get_personal_data_controller")

get_personal_data_router.post("/", get_personal_data_controller);

module.exports = get_personal_data_router;
