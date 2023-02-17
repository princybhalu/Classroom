const mongoose = require("mongoose")


const ClassSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    Classcode:{
        type: String,
        unique: true
    },
    Sem:{
        type: Number,
        required: true
    },
    Batch:{
        type: Number,
        required: true
    },
    Subject:{
        type: String,
        required: true
    },
    Department:{
        type: String,
        required: true
    },
    Classname:{
        type: String,
        required: true
    },
    Subtitle:{
        type: String,
        default: ""
    },
    Teacher:{
        type: String,
        required: true,
    },
    ClassActiveStatus:{
        type: Boolean,
        default: false
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Classroom",ClassSchema)