const userModel = require("../../model/users_model")

const profile_update_controller = async(req, res) =>{
    try{
        const {aadhaarId} = req.params;
        // console.log(aadhaarId)
        const {pi,cd, BCategory} = req.body;
        // console.log(typeof BCategory)
        const response = await userModel.findOneAndUpdate({AadhaarNumber:aadhaarId},{PersonalInfo:pi, CourseDetails:cd, isProfileCompleted:true, BeneficiaryCat:BCategory})
        if(response){
            res.json({msg:"update_profile_done"})
        }
    }catch(error){
        console.log(error)
        res.json({msg:"update profile failed"})
    }
}
module.exports = profile_update_controller;