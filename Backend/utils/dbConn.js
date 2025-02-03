const mongoose = require("mongoose");
const MahanidhiURI =
  "mongodb+srv://truptis3504:ZHUTiIpzNnLqYk7J@cluster0.dmuwoxr.mongodb.net/Mahanidhi?retryWrites=true&w=majority&appName=Cluster0";
const MockAadhaarURI =
  "mongodb+srv://truptis3504:ZHUTiIpzNnLqYk7J@cluster0.dmuwoxr.mongodb.net/MockAadhaarDB?retryWrites=true&w=majority&appName=Cluster0";
exports.MockAadhaarURI = MockAadhaarURI;
let aadhaar_model;

const connectMahanidhiDB = async () => {
  try {
    const MahanidhiDBconn = await mongoose.connect(MahanidhiURI);
    if (MahanidhiDBconn) {
      console.log("Connected to Mahanidhi DB successfully");
    }
  } catch (error) {
    console.error(error);
  }
};

const connectMockAadhaarDB = async () => {
  try {
    const MockAadhaarDBconn = await mongoose.createConnection(MockAadhaarURI);
    console.log("Connected to MockAadhaar DB successfully");
    aadhaar_model =  MockAadhaarDBconn.model(
      "Aadhaar Details",
      mongoose.Schema({
        AadhaarNumber: String,
        FullName: String,
        DOB: String,
        Gender: String,
        Address: Object,
        PhoneNumber: String,
        Email:String
      })
    );
  } catch (error) {
    console.error(error);
  }
};

const getAadhaarModel = () => {
  if (!aadhaar_model) {
    throw new Error("Aadhaar model is not initialized. Ensure the database connection is established first.");
  }
  return aadhaar_model;
};

module.exports = { connectMahanidhiDB, connectMockAadhaarDB, getAadhaarModel};
