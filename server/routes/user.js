const User = require("../models/User");
const router = require("express").Router();


router.post("/", async(req,res)=>{
    
    try{
        const newUser = new User({name : req.body.name});
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;
