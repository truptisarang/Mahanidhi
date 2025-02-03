const {send_otp_to_mail} = require("../login_controller/send_otp")
const {getAadhaarModel} = require("../../utils/dbConn")
const user_model = require("../../model/users_model")
let otpStore = {}, aadhaar_model;

const verify_aadhaar_controller = async(req, res) =>{
    try{
        const { aadhaar_number }  = req.body;
        console.log(aadhaar_number)
        aadhaar_model = await getAadhaarModel();
        const response = await user_model.findOne({AadhaarNumber:aadhaar_number})
        if (response!== null) {
          return res.json({
            success: false,
            message: "Account already exists with this Aadhaar number."
          });
        }
        const aadhaar_record = await aadhaar_model.findOne({AadhaarNumber:aadhaar_number},{Email:1})
        console.log(aadhaar_record)
        if(!aadhaar_record){
            return res.status(200).json({
                success:false,
                message:"Aadhaar record not found"
            })
        }else{
            otpStore = await send_otp_to_mail(aadhaar_record.Email)
            return res.status(200).json({
                success:true,
                message:"OTP sent to your Aadhaar-linked registered email ID.",
                data:aadhaar_record
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving Aadhaar data",
            error: error.message,
        });
    }
}


const verify_aadhaar_otp = async (id, emailid, enteredOtp, res) => {
    try {
      const otpRecord = otpStore[emailid];
      console.log(otpStore)
      if (!otpRecord) {
        return res.json({ success: false, message: "Invalid OTP" });
      }
  
      // Check if OTP has expired
      if (Date.now() > otpRecord.expiration) {
        // Delete the expired OTP from memory
        delete otpStore[emailid];
        return res.json({
          success: false,
          message: "OTP has expired.",
        });
      }
      if (otpRecord.otp === enteredOtp) {
        delete otpStore[emailid];
        const response = await aadhaar_model.findById({_id:id})
        return res.json({success:true, message:"OTP verified successfully!", data:response})
      } else {
        return res.json({success:false,message:"Invalid OTP"});
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      return "An error occurred while verifying the OTP. Please try again later.";
    }
  };


module.exports = {verify_aadhaar_controller, verify_aadhaar_otp};