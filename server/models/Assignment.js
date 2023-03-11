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
    userId:{
        type: String,
        // require: true
    },
    classid:{
        type : String,
        // require: true
    },
    Title:{
        type:String,
        // require: true
    },
    Instructions:{
        type: String,
        // default: ""
    },
    Title:{
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
    Attach:{
        type: String,
    }

},
{timestamps: true}
);

module.exports = mongoose.model("Assignment",AssigmentSchema);