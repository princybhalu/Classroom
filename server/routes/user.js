const User = require("../models/User");
const router = require("express").Router();
const Classroom = require("../models/Classroom");


// Id : unique
//     DOB : Date (string) 
//     Role : 
//     Name : 
//     Email: 
//     Batch: 
//     Department :
//     Classid ;
//    Active status : 


//Register User
router.post("/register", async (req, res) => {
    try {
        const newUser = new User({
            userId: req.body.userId,
            dob: req.body.dob,
            role: req.body.role,
            name: req.body.name,
            email: req.body.email,
            batch: req.body.batch,
            department: req.body.department,
            activestatus: true,
        });
        const saveUser = await newUser.save();
        res.status(200).json(saveUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Inactivate User
router.put("/InactivateUser/:id", async (req, res) => {
    try {
        const InActivateUserId = await User.findById(req.params.id);
        if (InActivateUserId.userId === req.body.userId) {
            // await deleteUserId.deleteOne();
            await InActivateUserId.updateOne({ $set: { activestatus: false } });
            res.status(200).json("User Has Been Inactivate.");
        } else {
            res.status(403).json("You Have No Permission to Delete User")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update User
router.put("/update/:id", async (req, res) => {
    try {
        const updateuser = await User.findById(req.params.id);
        if (updateuser.userId === req.body.userId) {
            await updateuser.updateOne({ $set: req.body });
            res.status(200).json("User Has Been Updated.");
        }
        else {
            res.status(403).json("You Can Not Update User")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get User
router.get("/getOneUser/:id", async (req, res) => {
    try {
        const getOneUser = await User.findById(req.params.id);
        res.status(200).json(getOneUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// get all Students
router.get("/getAllStudents", async (req, res) => {
    try {
        const users = await User.find({ activestatus: true, role: "Student" });

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// get all Professors
router.get("/getAllProfessors", async (req, res) => {
    try {
        const users = await User.find({ activestatus: true, role: "Professor" });
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


// join classroom
router.put("/joinclassRoom", async (req, res) => {
    // request body { userid , classcode}
    try {
        const user = await User.findById(req.body.user_id);
        try{
            const getClassRoom = await Classroom.find({"Classcode" : req.body.class_code});
            try{
                await user.updateOne({ $push: { classid: getClassRoom[0]._id } });
                res.status(200).json(user);
            }catch(err){
                console.log(err);
                res.status(500).json(err);
            }
        } catch (err){
            console.log(err);
            res.status(403).json("ClassRoom Not Found");
        }
    } catch (err) {
        console.log(err);
        res.status(404).json("User Not Found");
    }

});


module.exports = router;

