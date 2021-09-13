const mongoose = require("mongoose");
const RegisteredPatient = require("../models/registeredPatients");

const patientSchema = new mongoose.Schema(
  {
    patientDetails: {
      patientName: {
        required: true,
        trim: true,
        type: String,
        index: true,
      },
      age: {
        trim: true,
        type: Number,
      },
      job: {
        required: true,
        type: String,
        trim: true,
      },
      phoneNumber: {
        required: true,
        type: String,
        trim: true,
        unique: true,
        validate: {
          validator: function (val) {
            return val.toString().length >= 11;
          },
          message: `يجب رقم الهاتف ان يكون فوق 11 رقم`,
        },
      },
      birthDate: {
        required: true,
        trim: true,
        type: String,
      },
      insurance: {
        required: true,
        type: String,
      },
    },
    vitalmodifiers: {
      bloodpressure: {
        type: String,
        trim: true,
        default: "",
      },
      bloodtype: {
        type: String,
        trim: true,
        default: "none",
      },
      breathing: {
        type: String,
        trim: true,
        default: "",
      },
      heartrate: {
        type: String,
        trim: true,
        default: "",
      },
      weight: {
        type: String,
        trim: true,
        default: "",
      },
    },
    usualhabits: {
      eatfruits: {
        type: String,
        default: "",
      },
      eatmeat: {
        type: String,
        default: "",
      },
      eatvegetables: {
        type: String,
        default: "",
      },
      alcohol: {
        type: String,
        default: "none",
      },
      smoke: {
        type: String,
        default: "none",
      },
      workout: {
        type: String,
        default: "none",
      },
    },
    patientNotes: {
      notes: {
        type: String,
        trim: true,
        default: "",
      },
    },
    diseases: [],
    alergies: [],
    drugs: [],
    prevsurgeries: [],
    patientNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function (next) {
  const patient = this;
  if (patient.patientDetails.birthDate) {
    patient.patientDetails.age = await (new Date().getFullYear() -
      new Date(patient.birthDate).getFullYear());
  }
  next();
});

patientSchema.pre("remove", async function (next) {
  const patient = this;
  await RegisteredPatient.deleteOne({ _id: patient._id });
  next();
});

// patientSchema.index({ patientName: 'text'});
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
