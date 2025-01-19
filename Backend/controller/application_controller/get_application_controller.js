const application_model = require("../../model/application_model")

const get_application_controller = async(req, res) =>{
    try{
        const {Aadhaar, mode, DeptName} = req.body;
        if(mode==="officer"){
            const response = await application_model.find({"Data.deptName":DeptName})
            res.json({data:response})
        }else{
            const response = await application_model.findOne({AadhaarNumber:Aadhaar})
            res.json({data:response})
        }
    }catch(error){
        console.log(error)
        res.json({msg:error})
    }
}

module.exports = get_application_controller;