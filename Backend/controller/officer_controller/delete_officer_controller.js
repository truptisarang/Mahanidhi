const officer_model = require("../../model/officer_model")

const delete_officer_controller = async (req, res) => {
    const { officer_id } = req.body;
    try {
      const result = await officer_model.deleteOne({ OfficerID: officer_id });
      console.log(result)    
      if (result) {
        res.json({ success: true, message: "Officer deleted successfully" });
      } else {
        res.json({ success: false, message: "Failed to delete the user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
module.exports = delete_officer_controller;