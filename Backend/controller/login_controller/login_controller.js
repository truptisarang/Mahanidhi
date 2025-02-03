const user_model = require("../../model/users_model");
require("dotenv").config()
const bc = require("bcrypt");
const { send_otp_to_mail } = require("./send_otp");

const login_controller = async (req, res) => {
  try {
    const uname = req.body.Username;
    const passwd = req.body.Password;

    if (!uname || !passwd) {
      return res.status(400).json({
        success: false,
        message: "Username and Password are required",
      });
    }

    const response = await user_model.findOne({ Username: uname });
    console.log(response)
    const emailid = response.Email;

    if (response !== null) {
      const comp_pwd = await bc.compare(passwd, response.Password);

      if (comp_pwd === true) {
        await send_otp_to_mail(emailid);
        return res.status(200).json({
          success: true,
          message: "OTP sent to registered email id",
          email:emailid,
          userid:response._id
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
