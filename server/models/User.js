const mongoose = require("mongoose");

// Id : unique
//     DOB : Date (string) 
//     Role : 
//     Name : 
//     userId
//     Email: 
//     Batch: 
//     Department :
//     Classid ;
//    Active status : 

const UserSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true,
    },
    dob:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        // require: true,
    },
    role:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    batch:{
        type: Number,
        required: true,
    },
    department:{
        type: String,
        required: true,
    },
    classid:{
        type: Array,
        default: []
    },
    activestatus:{
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model("User",UserSchema)