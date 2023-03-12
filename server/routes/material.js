const router = require("express").Router();
const mongoose = require("mongoose");
const Material = require("../models/Material");
const upload = require("../middleware/upload");

//Upload Material
//Edit Material
//View Material
//Delete Material

//Upload Material
router.post("/upload",async(req,res)=>{
    try{
        const newMaterial = new Material({
            user_Id: req.body.user_Id,
            Classid: req.body.Classid,
            Title: req.body.Title,
            Description:  req.body.Description,
            Topic :  req.body.Topic, 
            Attach: req.body.Attach
        });
        
        const saveMaterial = await newMaterial.save();
        res.status(200).json(saveMaterial);
    }catch(err){
        console.log(err);   
        res.status(500).json(err);
    }
    
});

//Edit Material
router.put("/edit/:id",async(req,res)=>{
    try{
        const editMaterial = await Material.findById(req.params.id);
        await editMaterial.updateOne({$set:req.body});
        res.status(200).json("Material has been edited.");
        
    }catch(err){
        res.status(500).json(err);
    }
});

//View Material
router.post("/view",async(req,res)=>{
    try{
        const viewMaterial = await Material.find({Classid : req.body.Classid});
        res.status(200).json(viewMaterial);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Material
router.post("/delete/:id",async(req,res)=>{
    try{
        const DeleteMaterial = await Material.findById(req.params.id);
        console.log(DeleteMaterial);
        console.log(DeleteMaterial.user_Id)
        console.log(req.body.user_Id)
        if(DeleteMaterial.user_Id == req.body.user_Id){
            await DeleteMaterial.delete();
            res.status(200).json("Material has been deleted.");
        }
        else{
            res.status(400).json("You can not delete this material.");
        }
    }catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;
