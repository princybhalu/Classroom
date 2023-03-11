const router = require("express").Router();
const mongoose = require("mongoose");
const Classroom = require("../models/Classroom");
const User = require("../models/User");

// Create Classroom
// update
// get by id class
// inactive class


//Create Classroom
router.post("/createclass",async(req,res)=>{
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    try{
        const newClass = new Classroom({
            Classcode: makeid(6),
            Sem: req.body.Sem,
            Batch: req.body.Batch,
            Subject: req.body.Subject,
            Department: req.body.Department,
            Classname: req.body.Classname,
            Professor: req.body.Professor_id,
            Subtitle: req.body.Subtitle ,
            ClassActiveStatus: true 
        });
        const Class = await newClass.save();
        const user = await User.findById(req.body.Professor_id);
        await user.updateOne({ $push: { classid: Class._id } });
        res.status(200).json(Class._id);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
});

//Update Classroom
router.put("/updateclass/:id",async(req,res)=>{
    try{
        const updateClass = await Classroom.findById(req.params.id);
        await updateClass.updateOne({$set:req.body});
        res.status(200).json("Classroom has been updated.");
    }catch(err){
        res.status(500).json(err);
    }
});

//Inactive Classroom
router.put("/Inactiveclass/:id",async(req,res)=>{
    try{
        const InactiveclassId = await Classroom.findById(req.params.id);
        if(InactiveclassId.userId === req.body.userId){
            await InactiveclassId.updateOne({$set:{ClassActiveStatus:false}});
            res.status(200).json("Classroom has been inactivate.");
        }else{
            res.status(403).json("You have no permission to delete classroom.")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Get Classroom by id 
router.get("/getclass/:id",async(req,res)=>{
    try{
        const getClassroom = await Classroom.findById(req.params.id);
        res.status(200).json(getClassroom);
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;