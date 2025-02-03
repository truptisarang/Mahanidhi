const express = require('express')
const verify_aadhaar_router = express.Router();
const verify_aadhaar_otp_router = express.Router();

const {verify_aadhaar_controller, verify_aadhaar_otp} = require("../../controller/registration_controller/verify_aadhaar_controller")

verify_aadhaar_router.post("/", verify_aadhaar_controller);

verify_aadhaar_otp_router.post("/", async(req, res) =>{
    try{
        const {userData, OTP} = req.body;
        await verify_aadhaar_otp(userData._id, userData.Email,OTP, res)
    }catch(error){
        console.log(error)
    }
})

module.exports = {verify_aadhaar_router, verify_aadhaar_otp_router};
