const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
          AadhaarNumber: String,
          Role:{type:String, default:"User"},
          FullName: String,
          DOB: String,
          Gender: String,
          Address: Object,
          photo: String,
          PhoneNumber: String,
          Username:String,
          Password: String,
          BeneficiaryCat: String,
          PersonalInfo:{},
          CourseDetails:[],
          Email:String,
          WalletAddress:String,
          isProfileCompleted:{type:Boolean, default:false}
        })
const userModel = new mongoose.model("users", userSchema)
module.exports = userModel;