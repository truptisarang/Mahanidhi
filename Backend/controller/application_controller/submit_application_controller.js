const userModel = require("../../model/users_model")

const submit_application_controller = async(req, res) =>{
    const {form_data, Aadhaar} = req.body;
    const generateApplicationID = () =>{
        const prefix="MN"
        const timestamp = Date.now().toString();
        const randomNumbers = Math.floor(Math.random() * 1e12).toString();
        return `${prefix}${timestamp}${randomNumbers}`
    }
    const AppID = generateApplicationID();
    const applicationDataWithID = {
        ...form_data,  
        AppID  
    };
    try{
        const response = await userModel.findOneAndUpdate({AadhaarNumber:Aadhaar},{$push:{Applications:applicationDataWithID}})
        if(response){
            res.json({msg:AppID})
        }
    }catch(error){
        console.error(error)
    }
}

module.exports = submit_application_controller;