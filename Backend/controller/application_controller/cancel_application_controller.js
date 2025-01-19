const userModel = require("../../model/users_model")

const cancel_application_controller = async (req, res) => {
    const { AppID } = req.body;
    try {
      const result = await userModel.findOneAndUpdate({"AppID": AppID}, { $pull: { Applications: { AppID } } },{ new: true });
      console.log(result)    
      if (result) {
        res.json({ success: true, message: "Application canceled successfully" });
      } else {
        res.json({ success: false, message: "Failed to cancel application" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
module.exports = cancel_application_controller;