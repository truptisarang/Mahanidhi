const application_model = require("../../model/application_model")

const submit_application_controller = async(req, res) =>{
    const {form_data, Aadhaar, date} = req.body;
    const generateApplicationID = () =>{
        const prefix="MN"
        const timestamp = Date.now().toString();
        const randomNumbers = Math.floor(Math.random() * 1e12).toString();
        return `${prefix}${timestamp}${randomNumbers}`
    }
    const AppID = generateApplicationID();
    const applicationDataWithID = {
        Data:{...form_data},  
        applicationId:AppID,
        AadhaarNumber:Aadhaar,
        Date:date
    };
    try{
        const response = await application_model.create(applicationDataWithID)
        if(response){
            res.json({msg:AppID})
        }
    }catch(error){
        res.json({error})
    }
}

module.exports = submit_application_controller;