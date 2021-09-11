const express = require("express");
const cors = require("cors");
const MONGODB_URL = require('./db/mongoDBURL');
const patientRouter = require("./routers/patientRouter");
const adminRouter = require("./routers/adminRouter");
const Patient = require("./models/patient");
const mongoose = require("mongoose");

const app = express();

const port = 5000 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(patientRouter);
app.use(adminRouter);


app.listen(port, async () => {
  try {
    await mongoose.connect(MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: false});
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server started on port: " + port);
});


// setInterval(() => {
//   if (new Date().getHours() >= 2 && new Date().getHours() <= 6) {
//     Patient.UnRegisterPatients();
//   }
// }, 10800000);