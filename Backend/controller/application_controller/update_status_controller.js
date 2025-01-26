const app_model = require("../../model/application_model");

const update_status_controller = async (req, res) => {
  const { Data } = req.body;
  console.log(Data.appid)
  try {
    if (Data.status === "Reject") {
      const response = await app_model.findOneAndUpdate(
        { applicationId: Data.appid },
        { status: Data.status, remarks: Data.remarks }
      );
      if (response) {
        res.json({ success: true });
      }
    } else {
      const response = await app_model.findOneAndUpdate(
        { applicationId: Data.appid },
        { status: Data.status}
      );
      if (response) {
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = update_status_controller;
