const officer_model = require("../../model/officer_model");
const bc = require("bcrypt");

const add_officer_controller  = async(req, res)=>{
    const {OfficerData} = req.body;
    console.log(OfficerData)

    if(OfficerData){
        const pwd = OfficerData.password
        const hashedPwd = await bc.hash(pwd, 10)
        const officer = new officer_model({
            OfficerID:OfficerData.officerid,
            FullName:OfficerData.fullName,
            PhoneNumber:OfficerData.phoneNumber, 
            Username:OfficerData.username,
            Password:hashedPwd,
            Email:OfficerData.email,
            DeptName:OfficerData.department,
            Designation:OfficerData.designation,
            Role:OfficerData.role,
             })
        const savedOfficer = await officer.save();
        if(savedOfficer){
            res.json({msg:"success"})
        }
    }
}

module.exports = add_officer_controller;