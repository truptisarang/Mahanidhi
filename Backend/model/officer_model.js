const mongoose = require('mongoose')
const officerSchema = mongoose.Schema({
          OfficerID:String,
          FullName: String,
          PhoneNumber: String,
          Username:String,
          Password: String,
          DeptName:String,
          Designation:String,
          Email:String,
          Role:String,
          LastLogin:Date
        })
const officerModel = new mongoose.model("officers", officerSchema)
module.exports = officerModel;