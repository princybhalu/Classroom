const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const ClassroomRoute = require('./routes/classroom');
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

app.use("/user",userRoute);
app.use("/login",loginRoute);
app.use("/classroom",ClassroomRoute);
app.use("/login",loginRoute);

//app.listen(port,function)
app.listen(8800,()=>{
    console.log('Backend Server Is Running')
});