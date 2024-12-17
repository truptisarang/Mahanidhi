const { connectMockAadhaarDB} = require('../../utils/dbConn')
const verify_aadhaar_controller = async(req, res) =>{
    try{
        const { aadhaar_number }  = req.body;
        const aadhaar_model = await connectMockAadhaarDB();
        const aadhaar_record = await aadhaar_model.findOne({AadhaarNumber:aadhaar_number})
        if(!aadhaar_record){
            return res.status(200).json({
                success:false,
                message:"Aadhaar record not found"
            })
        }else{
            return res.status(200).json({
                success:true,
                message:"Aadhaar exists. OTP sent on Aadhaar linked mobile number",
                data:aadhaar_record
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving Aadhaar data",
            error: error.message,
        });
    }
}

module.exports = verify_aadhaar_controller;