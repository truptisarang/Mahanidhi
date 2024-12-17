const express = require('express')
const store_personal_details_router = express.Router();
const store_personal_details_controller = require("../../controller/registration_controller/store_personal_details_controller")

store_personal_details_router.post("/", store_personal_details_controller);

module.exports = store_personal_details_router;
