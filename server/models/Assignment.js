// 3)assignment : 
// Id : ukey
// Classid
// Assigment id : 
// Student submission : [sid , doc , markes , status ]  


const mongoose = require("mongoose");

var someDate = new Date();
var numberOfDaysToAdd = 10;
var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

const AssigmentSchema = new mongoose.Schema({
    user_Id:{
        type: String,
        require: true
    },
    Classid:{
        type : String,
        require: true
    },
    Title:{
        type:String,
        require: true
    },
    Instructions:{
        type: String,
        // default: ""
    },
    Points:{
        type: Number,
        default: 100,
        max: 100,
        min: 0
    },
    DueDate:{
        type: Date,
        default: result
    },
    StudentSubmition: {
        type: Array,
        default : []
    },
    Attach:{
        type: String,
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Assignment",AssigmentSchema);