// 2) material ; 
//     Id : ukey 
//     Classid : 
//     Doc : pdf / image 
//     Title : 
//     Description :
 

const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    Classid:{
        type : String,
        // require: true
    },
    Title:{
        type:String,
        // require: true
    },
    Description:{
        type: String,
        default: ""
    },
    // Topic:{
    //     type: String,
    //     default: ""
    // },
    Attach:{
        type: String
        // data: Buffer,
        // contentType: String
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Material",MaterialSchema);