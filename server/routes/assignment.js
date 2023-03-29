const router = require("express").Router();
const mongoose = require("mongoose");
const Assignment = require("../models/Assignment");
const upload = require("../middleware/upload");
const User = require("../models/User");


//Create Assignment
//Edit Assignment
//View Assignment
//Delete Assignment

//Create Assignment
router.post("/createassignment", async (req, res) => {
    try {
        const newAssignment = new Assignment({
            user_Id: req.body.user_Id,
            Classid: req.body.Classid,
            Title: req.body.Title,
            Instructions: req.body.Instructions,
            Points: req.body.Points,
            DueDate: req.body.DueDate,
            Attach: req.body.Attach
        });
        const saveAssignment = await newAssignment.save();
        console.log(saveAssignment);
        res.status(200).json(saveAssignment);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Edit Assignment
router.post("/editassignment/:id", async (req, res) => {
    try {
        const EditAssignment = await Assignment.findById(req.params.id);
        await EditAssignment.updateOne({ $set: req.body });
        res.status(200).json("Assignment has been edited.");

    } catch (err) {
        res.status(500).json(err);
    }
});

//submit assignment by student
router.post("/submitassignment/:id", async (req, res) => {
    console.log(req.body);
    try {
        const EditAssignment = await Assignment.findById(req.params.id);
        await EditAssignment.updateOne({ $push: { StudentSubmition: req.body } });
        res.status(200).json(req.body);

    } catch (err) {
        res.status(500).json(err);

    }
})

//View Assignment
router.post("/viewAssignment", async (req, res) => {
    try {
        const ViewAssignment = await Assignment.find({ Classid: req.body.Classid });

        var AssigmentWithDate = [];
        for (let i = 0; i < ViewAssignment.length; i++) {
            let date = ViewAssignment[i].createdAt;
            let tempDate = date.toLocaleDateString();

            let updateDate = ViewAssignment[i].updatedAt;
            let tempDate2 = updateDate.toLocaleDateString();

            if (tempDate == tempDate2) {
                tempDate2 = null;
            }

            let tempObject = {
                assignment: ViewAssignment[i],
                createDate: tempDate,
                updateDate: tempDate2
            }

            AssigmentWithDate.push(tempObject);
        }

        res.status(200).json(AssigmentWithDate);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete Assignment
router.post("/delete/:id", async (req, res) => {
    try {
        const DeleteAssignment = await Assignment.findById(req.params.id);
        if (DeleteAssignment.userId === req.body.userId) {
            await DeleteAssignment.delete();
            res.status(200).json("Assignment has been deleted.");
        }
        else {
            res.status(400).json("You can not delete this assignment.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

//get one Assignment
router.get("/getOneAssignment/:id", async (req, res) => {
    try {

        const viewOneAssignment = await Assignment.findById(req.params.id);

        // For Date 
        let date = viewOneAssignment.createdAt;
        let tempDate = date.toLocaleDateString();

        // For proferser Name 
        const proferser = await User.findById(viewOneAssignment.user_Id);
        let proferserName = proferser.name;

        let updateDate = viewOneAssignment.updatedAt;
        let tempDate2 = updateDate.toLocaleDateString();

        if (tempDate == tempDate2) {
            tempDate2 = null;
        }

        let GetDueDate = viewOneAssignment.DueDate ;
        let tempDate3 = GetDueDate.toLocaleDateString();

        let responseBody = {
            assignmentObject: viewOneAssignment,
            createDate: tempDate,
            updateDate: tempDate2,
            proferserName: proferserName ,
            DueDate: tempDate3
        }

        res.status(200).json(responseBody);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;