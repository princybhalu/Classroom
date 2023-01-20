// Id : ukey
// Classid
// Material id : 
// Student submission : [sid , doc , markes , status ]  

const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({

    classid:{
        type : String,
        require : true,
    },


});

module.exports = mongoose.model("Material",MaterialSchema);