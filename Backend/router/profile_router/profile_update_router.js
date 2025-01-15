const express = require('express')
const profile_update_router = express.Router({mergeParams:true});

const profile_update_controller = require("../../controller/profile_controller/profile_update_controller")

profile_update_router.post("/", profile_update_controller);

module.exports = profile_update_router;
