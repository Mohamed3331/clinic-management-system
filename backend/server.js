const express = require("express");
const cors = require("cors");
const MONGODB_URL = require("./db/mongoDBURL");
const patientRouter = require("./routers/patientRouter");
const adminRouter = require("./routers/adminRouter");
const { errorRouteMiddleware } = require("./middleware/ErrorHandler");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(patientRouter);
app.use(adminRouter);
app.use(errorRouteMiddleware);

app.listen(port, async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("database connected");
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
  console.log("server started on port: " + port);
});
