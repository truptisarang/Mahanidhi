const  officer_model = require('../../model/officer_model')
const get_officer_details_controller = async(req, res) =>{
   try{
    const response = await officer_model.find().select('FullName DeptName Designation Role OfficerID');
    if(response){
        res.json({
            data:response
        })
    }else{
        res.json({data:"No record found"})
    }
   }catch(error){
     res.json({msg:"Error while fetching officer details"})
   }
}

module.exports = get_officer_details_controller;