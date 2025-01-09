const user_model = require('../../model/users_model')
const get_personal_data_controller = async(req, res) =>{
    const { Aadhaar } = req.body;
    // console.log(Aadhaar)
    const response = await user_model.findOne({ AadhaarNumber : Aadhaar},{Username:0,Password:0});
    res.json({
        data:response
    })
}

module.exports = get_personal_data_controller;