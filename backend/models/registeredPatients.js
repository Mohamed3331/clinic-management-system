const mongoose = require("mongoose");

const registeredPatientsSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      type: String,
    },
    _id: {
      trim: true,
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

registeredPatientsSchema.index({createdAt: 1},{expireAfterSeconds: 5});

const RegisteredPatient = mongoose.model("RegisteredPatient", registeredPatientsSchema);

module.exports = RegisteredPatient;
