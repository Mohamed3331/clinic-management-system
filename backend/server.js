const express = require("express");
const cors = require("cors");
const MONGODB_URL = require('./db/mongoDBURL')
const patientRouter = require("./routers/patient");
const Patient = require("./models/patient");
const mongoose = require("mongoose");

const app = express();

const port = 5000 || process.env.PORT;

// const client = new MongoClient(MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true});

app.use(express.json());
app.use(cors());
app.use(patientRouter);



app.listen(port, async () => {
  try {
    await mongoose.connect(MONGODB_URL, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,});
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server started on port: " + port);
});


// await client.connect();
// collection = client.db("myFirstDatabase").collection("patients");



// setInterval(() => {
//   if (new Date().getHours() >= 2 && new Date().getHours() <= 6) {
//     Patient.UnRegisterPatients();
//   }
// }, 10800000);