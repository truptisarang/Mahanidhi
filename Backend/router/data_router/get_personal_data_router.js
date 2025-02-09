const express = require('express')
const get_personal_data_router = express.Router({mergeParams:true});
const get_personal_data_controller = require("../../controller/data_controller/get_personal_data_controller");
const verify_token = require('../../middleware/verify_token');

get_personal_data_router.post("/", verify_token, get_personal_data_controller);

module.exports = get_personal_data_router;
