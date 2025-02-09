const generate_OTP = require("./generate_otp");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");
let otpStore = {};
const user_model = require("../../model/users_model")
const officer_model = require("../../model/officer_model")


const generateToken = async (userId, emailid, role) => {
  const payload = {
    id: userId,
    email: emailid,
    role: role,
    iat: Math.floor(Date.now() / 1000),
  };
  const options = { expiresIn: process.env.JWT_EXPIRES_IN };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
  return token;
};

const send_otp_to_mail = async (emailid) => {
  const otp = generate_OTP();
  const otpExpiration = Date.now() + 5 * 60 * 1000;
  otpStore[emailid] = { otp, expiration: otpExpiration };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: emailid,
    subject: "OTP Verification",
    text: `Hello, \n\nYour OTP code is: ${otp}. Please do not share this OTP with anyone.\n\nBest regards,\nMahanidhi`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return otpStore;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
};

const verify_otp = async (emailid, enteredOtp, res, userid, role) => {
  try {
    const otpRecord = otpStore[emailid];
    let response, Role;
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
      console.log(role)
      if(role === "User"){
        response = await user_model.findById({_id:userid},{Password:0})
      }else{
        response = await officer_model.findOne({OfficerID:userid},{Password:0})
        Role = response.Role
      }

      const tkn = await generateToken(userid, emailid, role);
      res.cookie("session_token", tkn, {
        httpOnly: true,
        sameSite: "Strict",
        maxAge: 3600000,
      });

      if(role === "User"){
        return res.json({ success: true, message: "OTP verified successfully!", data:{isProfileCompleted:response.isProfileCompleted,username: response.Username,Aadhaar:response.AadhaarNumber}});
      }else{
        return res.json({ success: true, message: "OTP verified successfully!", data:{fullName:response.FullName, deptName: response.DeptName, role:response.Role}})
      }
    } else {
      return "Invalid OTP. Please try again.";
    }
  } catch (error) {
    console.error("Error during OTP verification:", error);
    return "An error occurred while verifying the OTP. Please try again later.";
  }
};

module.exports = { send_otp_to_mail, verify_otp};
