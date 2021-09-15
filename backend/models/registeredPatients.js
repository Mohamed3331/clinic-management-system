const mongoose = require("mongoose");
const registeredPatientsSchema = new mongoose.Schema({
  name: {
    trim: true,
    type: String,
  },
  _id: {
    trim: true,
    type: String,
  },
  createdAt: { type: Date, expires: 3600, default: Date.now },
});


const RegisteredPatient = mongoose.model(
  "RegisteredPatient",
  registeredPatientsSchema
);

module.exports = RegisteredPatient;
