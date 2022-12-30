const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name:{
        type: String,
        require: true
    }
});

module.exports = mongoose.Schema.model("User",UserSchema)