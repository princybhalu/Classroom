const User = require("../models/User");
const router = require("express").Router();


//Login
router.post("/login", async (req,res)=>{


    try{
        //checking for correct email
        const user = await User.findOne({userId:req.body.userId});
        !user && res.status(404).json("user not found")


        //check for correct password
        //here we are using bcrypt method compare for comparing password
        // const validPassword = await compare(req.body.password,user.dob);
        var validPassword;
        if(user.dob === req.body.password)
            validPassword = true;
        else
            validPassword = false;
        !validPassword && res.status(400).json("wrong password")


        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err);
    }
   


});


module.exports = router;
