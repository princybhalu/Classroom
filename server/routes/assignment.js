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
});

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

        let GetDueDate = viewOneAssignment.DueDate;
        let tempDate3 = GetDueDate.toLocaleDateString();

        console.log("due date");
        console.log(GetDueDate)

        let submitArray = [];
        for (let i = 0; i < viewOneAssignment.StudentSubmition.length; i++) {
            console.log(viewOneAssignment.StudentSubmition[i].DateWhenAssign);
            let submitDate = viewOneAssignment.StudentSubmition[i].DateWhenAssign;
            let temp1 = new Date(submitDate);

            console.log("submitDate");
            console.log(submitDate);
            console.log(temp1.toLocaleDateString());


            let SubmitStatus;

            // var difference = submitDate - GetDueDate; // difference in milliseconds

            // const TOTAL_MILLISECONDS_IN_A_WEEK = 1000 * 60 * 60 * 24 * 7;

            // if (Math.floor(difference / TOTAL_MILLISECONDS_IN_A_WEEK) >= 0) {
            //     SubmitStatus = "Submission On Time"
            // }else{
            //     SubmitStatus = "Late Submited";
            // }

            // if(new Date(GetDueDate.toLocaleDateString()).getTime() >= new Date(temp1.toLocaleDateString()).getTime() ){
            //         SubmitStatus = "Submission On Time"
            // }else{
            //         SubmitStatus = "Late Submited";
            // }

            // console.log(SubmitStatus);

            let tempObject = {
                DateWhenAssign: temp1.toLocaleDateString(),
                // SubmitStatus: SubmitStatus
                userId: viewOneAssignment.StudentSubmition[i].userId,
                userUserId: viewOneAssignment.StudentSubmition[i].userUserId,
                Attach: viewOneAssignment.StudentSubmition[i].Attach,
                Points: viewOneAssignment.StudentSubmition[i].Points,
            }

            submitArray.push(tempObject);

        }

        let responseBody = {
            assignmentObject: viewOneAssignment,
            createDate: tempDate,
            updateDate: tempDate2,
            proferserName: proferserName,
            DueDate: tempDate3,
            SubmitArray: submitArray
        }

        res.status(200).json(responseBody);
    } catch (err) {
        res.status(500).json(err);
    }
});

// req : assid , userid , points , 
// add points in assignment 
router.put("/addPointsInSubmission", async (req, res) => {

    try {
        const result = await Assignment.updateOne({ _id: req.body.Assignment_id, "StudentSubmition.userId": req.body.user_id }, { $set: { "StudentSubmition.$.Points": req.body.Points } });
        console.log(result);
        const viewOneAssignment = await Assignment.findById(req.body.Assignment_id);
        
        res.status(200).json(viewOneAssignment);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

});



module.exports = router;