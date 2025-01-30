const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  applicationId: String,             
  AadhaarNumber: String,
  Date:Date,    
  Data:Object,  
  remarks:String,
  amountinINR:String,
  txHash:String,
  beneficiaryWallet:String,
  disbursedAmount:String,
  status: { type: String, default: "Pending" }, // Current application status
});

const Application = mongoose.model('Application', applicationSchema);
module.exports = Application;