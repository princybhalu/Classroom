const User = require("../models/User");
const router = require("express").Router();

<<<<<<< HEAD

//Login
router.post("/", async (req,res)=>{


=======
//Login
router.post("/", async (req,res)=>{

>>>>>>> 6f1b9e54844c04f8729cdf1519ba01dc9e0fd767
    try{
        //checking for correct email
        const user = await User.findOne({userId:req.body.userId});
        !user && res.status(404).json("user not found")

<<<<<<< HEAD

=======
>>>>>>> 6f1b9e54844c04f8729cdf1519ba01dc9e0fd767
        //check for correct password
        //here we are using bcrypt method compare for comparing password
        // const validPassword = await compare(req.body.password,user.dob);
        var validPassword;
        if(user.dob === req.body.password)
            validPassword = true;
        else
            validPassword = false;
        !validPassword && res.status(400).json("wrong password")

<<<<<<< HEAD

        res.status(200).json(user);




    }catch(err){
        res.status(500).json(err);
    }
   


});


module.exports = router;
=======
        res.status(200).json(user);


    }catch(err){
        res.status(500).json(err);
    }
    

});

module.exports = router;
>>>>>>> 6f1b9e54844c04f8729cdf1519ba01dc9e0fd767
