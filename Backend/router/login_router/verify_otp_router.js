const express = require('express')
const login_router = express.Router();
const {verify_otp} = require("../../controller/login_controller/send_otp")

login_router.post("/", 
    async (req, res) => {
        try {
          // Extract the necessary data from the request body
          const { email, enteredOtp, userId, role} = req.body;
        //   console.log("Verify router:", email, enteredOtp, userId)  
          // Call verify_otp function and pass the extracted data
          await verify_otp(email, enteredOtp, res, userId, role);  // Pass res and other required data
        } catch (error) {
          console.error("Error in OTP verification route:", error);
          return res.json({
            success: false,
            message: "An error occurred. Please try again later.",
          })
        }
        }
    )

module.exports = login_router;
