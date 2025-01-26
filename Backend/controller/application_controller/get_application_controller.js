const application_model = require("../../model/application_model");

const get_application_controller = async (req, res) => {
  try {
    const { Aadhaar, mode, DeptName, scrutinised } = req.body;

    if (mode === "officer") {
      if (scrutinised) {
        // Fetch applications for a department and include applicant names
        const response = await application_model.aggregate([
          {
            $match: { "Data.deptName": DeptName, status: { $ne: "Pending" } }, // Filter by department name
          },
          {
            $lookup: {
              from: "users", // Join with the "users" collection
              localField: "AadhaarNumber", // Field in the application collection
              foreignField: "AadhaarNumber", // Field in the users collection
              as: "application_info", // Name of the joined field
            },
          },
          {
            $unwind: "$application_info", // Flatten the joined array
          },
          {
            $project: {
              Data: 1,
              Date: 1,
              applicationId: 1,
              status: 1, // Include application data
              applicantName: "$application_info.FullName", // Add applicant name
            },
          },
        ]);

        res.json({ data: response });
      }else if(!scrutinised){
        // Fetch applications for a department and include applicant names
        const response = await application_model.aggregate([
          {
            $match: { "Data.deptName": DeptName, status:"Pending" }, // Filter by department name
          },
          {
            $lookup: {
              from: "users", // Join with the "users" collection
              localField: "AadhaarNumber", // Field in the application collection
              foreignField: "AadhaarNumber", // Field in the users collection
              as: "application_info", // Name of the joined field
            },
          },
          {
            $unwind: "$application_info", // Flatten the joined array
          },
          {
            $project: {
              Data: 1,
              Date: 1,
              applicationId: 1,
              status: 1, // Include application data
              applicantName: "$application_info.FullName", // Add applicant name
            },
          },
        ]);

        res.json({ data: response });
      }
    } else {
      // Fetch a single application based on Aadhaar (unchanged)
      const response = await application_model.findOne({
        AadhaarNumber: Aadhaar,
      });
      res.json({ data: response });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred", error: error.message });
  }
};

module.exports = get_application_controller;
