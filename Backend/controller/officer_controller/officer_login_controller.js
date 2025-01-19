const officer_model = require("../../model/officer_model");
const bc = require("bcrypt");

const login_controller = async (req, res) => {
  try {
    const uname = req.body.Username;
    const passwd = req.body.Password;
    const response = await officer_model.findOne({ Username: uname });
    if (response !== null) {
      const comp_pwd = await bc.compare(passwd, response.Password);
      if (comp_pwd === true) {
        return res.status(200).json({
          success: true,
          message: "OTP sent to registered mobile number",
          data:response
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
