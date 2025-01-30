const user_model = require("../../model/users_model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const bc = require("bcrypt");
const generateToken = async(username) =>{
  const payload = {id:username,role:"user", iat:Math.floor(Date.now() / 1000)}
  console.log(payload)
  const options = {expiresIn: process.env.JWT_EXPIRES_IN}
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options)
  return token;
}

const login_controller = async (req, res) => {
  try {
    const uname = req.body.Username;
    const passwd = req.body.Password;
    const response = await user_model.findOne({ Username: uname });
    if (response !== null) {
      const comp_pwd = await bc.compare(passwd, response.Password);
      if (comp_pwd === true) {
        const tkn = await generateToken(uname)
        res.cookie('session_token', tkn, {
          httpOnly:true,  
          sameSite:'Strict',
          maxAge:3600000
        })
        return res.status(200).json({
          success: true,
          message: "OTP sent to registered mobile number",
          isProfileCompleted:response.isProfileCompleted, 
          Username:response.Username,
        });
      }else {
        return res.json({
          success: false,
          message: "Invalid username or password",
        });
      }
    } else {
      return res.json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = login_controller;
