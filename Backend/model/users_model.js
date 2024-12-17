const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
          AadhaarNumber: String,
          FullName: String,
          DOB: String,
          Gender: String,
          Address: String,
          photo: String,
          PhoneNumber: String,
          Username:String,
          Password:String,
        })
const userModel = new mongoose.model("users", userSchema)
module.exports = userModel;