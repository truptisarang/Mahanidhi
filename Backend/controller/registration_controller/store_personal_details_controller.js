const usersModel = require("../../model/users_model")
const bc = require("bcrypt")

const store_personal_details_controller = async(req, res) =>{
    const {creds, pd, walletAddr} = req.body;

    try{
        const pwd = creds.password;
        const hashedPwd = await bc.hash(pwd, 10)
        console.log(creds, pd, walletAddr)
        const user = new usersModel({AadhaarNumber:pd.AadhaarNumber,FullName:pd.FullName,DOB:pd.DOB,Gender:pd.Gender,Address:pd.Address,
            PhoneNumber:pd.PhoneNumber, photo:pd.photo, Username:creds.username, Password:hashedPwd, Email:pd.Email, WalletAddress:walletAddr})
        const savedUser = await user.save();
        if(savedUser){
            res.json({success:true, message:"User registered successfully"});
        }
    }catch(error){
        console.error(error)
    }
}
module.exports = store_personal_details_controller;