const router = require("express").Router();
const mongoose = require("mongoose");
const Material = require("../models/Material");
const upload = require("../middleware/upload");

//Upload Material
//Edit Material
//View Material
//Delete Material

//Upload Material
router.post("/upload",upload.array('Attach[]'),async(req,res)=>{
    try{
        const newMaterial = new Material({
            userId: req.body.userId,
            Classid: req.body.Classid,
            Title: req.body.Title,
            Description:  req.body.Description,
            // Topic :  req.body.Topic, 
            // Attach: req.body.Attach
        });
        // console.log(req.file.path)
        if(req.files){
            let path = ''
            req.files.forEach(function(files,index,arr){
                path = path + files.path + ','
            })
            path = path.substring(0, path.lastIndexOf(","))
            newMaterial.Attach = path
        }
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
router.get("/view/:id",async(req,res)=>{
    try{
        const viewMaterial = await Material.findById(req.params.id);
        res.status(200).json(viewMaterial);
    }catch(err){
        res.status(500).json(err);
    }
});

//Delete Material
router.delete("/delete/:id",async(req,res)=>{
    try{
        const DeleteMaterial = await Material.findById(req.params.id);
        // console.log(DeleteMaterial);
        if(DeleteMaterial.userId === req.body.userId){
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