const express = require('express');
const mongoose = require('mongoose');

const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL
//    {userNewUrlParser: true , useUnifiedTopology: true},
)
    .then(() => console.log('connected'))
    .catch(e => console.log(e)
    );


app.listen(8800, () => {
    console.log('Backend Server Is Running')
})

