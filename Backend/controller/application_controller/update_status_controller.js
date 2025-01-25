const app_model = require("../../model/application_model")

const update_status_controller = async(req, res) =>{
    const {Data} = req.body;
    try{
        const response = await app_model.findOneAndUpdate({applicationId:Data.appid},{status:Data.status})
        if(response){
            res.json({success:true})
        }
    }catch(error){
        console.log(error)
    }
}

module.exports = update_status_controller