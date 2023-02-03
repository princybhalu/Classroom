const router = require("express").Router();
const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");

//Create Assignment
//Edit Assignment
//View Assignment
//Delete Assignment

//Create Assignment
router.post("/createassignment", async(req,res)=>{
    try{
        const newAssignment = new Assignment({
            userId : req.body.userId,
            classid : req.body.classid,
            Title : req.body.Title,
            Instructions : req.body.Instructions,
            Topic : req.body.Topic,
            Points: req.body.Points,
            DueDate: req.body.DueDate,
            Attach : req.body.Attach
        });
        const saveAssignment = await newAssignment.save();
        res.status(200).json(saveAssignment);
    }catch(err){
        res.status(500).json(err);
    }
});



//Edit Assignment
router.put("/editassignment/:id",async(req,res)=>{
    try{
        const EditAssignment = await Assignment.findById(req.params.id);
        await EditAssignment.updateOne({$set:req.body});
        res.status(200).json("Assignment has been edited.");
        
    }catch(err){
        res.status(500).json(err);
    }
});

//View Assignment
router.get("/view/:id",async(req,res)=>{
    try{
        const ViewAssignment = await Assignment.findById(req.params.id);
        res.status(200).json(ViewAssignment);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Assignment
router.delete("/delete/:id",async(req,res)=>{
    try{
        const DeleteAssignment = await Assignment.findById(req.params.id);
        if(DeleteAssignment.userId === req.body.userId){
            await DeleteAssignment.delete();
            res.status(200).json("Assignment has been deleted.");
        }
        else{
            res.status(400).json("You can not delete this assignment.");
        }
    }catch(err){
        res.status(500).json(err);
    }
})


module.exports = router;