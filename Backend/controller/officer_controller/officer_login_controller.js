const officer_model = require("../../model/officer_model");
const bc = require("bcrypt");
const { send_otp_to_mail } = require("../login_controller/send_otp");


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

    const response = await officer_model.findOne({ Username: uname });
    const emailid = response.Email;

    if (response !== null) {
      const comp_pwd = await bc.compare(passwd, response.Password);
      
      if (comp_pwd === true) {
        await send_otp_to_mail(emailid);
        return res.status(200).json({
          success: true,
          message: "OTP sent to registered emailid",
          email:emailid,
          userid:response.OfficerID,
          role:response.Role
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
