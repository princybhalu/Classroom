const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const bodyParser = require("body-parser");
const path = require('path');
const fs = require("fs");
const multer = require("multer");

const userRoute = require('./routes/user');
const ClassroomRoute = require('./routes/classroom');

const Assignment = require('./routes/assignment');
const Material = require('./routes/material');
const loginRoute = require('./routes/login');

//creating an express application which name is app
const app = express();

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


app.use("/user",userRoute);
app.use("/login",loginRoute);
app.use("/classroom",ClassroomRoute);

app.use("/assignment",Assignment);
app.use("/material",Material);

app.use("/login",loginRoute);

// app.set("view engine","ejs");


app.get("/",(req,res)=>{
  res.render("index");
})


//app.listen(port,function)
app.listen(8800,()=>{
    console.log('Backend Server Is Running')
});