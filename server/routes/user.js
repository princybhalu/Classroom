const User = require("../models/User");
const router = require("express").Router();


// Id : unique
//     DOB : Date (string) 
//     Role : 
//     Name : 
//     Email: 
//     Batch: 
//     Department :
//     Classid ;
//    Active status : 



router.post("/register", async(req,res)=>{
    try{
        const newUser = new User({
            dob : req.body.dob,
            role : req.body.role,
            name : req.body.name,
            email : req.body.email,
            batch : req.body.batch,
            department : req.body.department,
            activestatus : true,
        });
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
