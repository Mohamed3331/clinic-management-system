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
  createdAt: { type: Date, expires: 60 * 60 * 12, default: Date.now }, // delete document after 12 hours
});

const RegisteredPatient = mongoose.model(
  "RegisteredPatient",
  registeredPatientsSchema
);

module.exports = RegisteredPatient;
