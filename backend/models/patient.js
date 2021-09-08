const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    patientDetails: {
      patientName: {
        required: [true, "Patient name is essential"],
        trim: true,
        type: String,
        index: true,
      },
      age: {
        trim: true,
        type: Number,
      },
      job: {
        required: [true, "job is required"],
        type: String,
        trim: true,
      },
      phoneNumber: {
        required: [true, "phone number required Sir"],
        type: String,
        trim: true,
        unique: true,
        validate: {
          validator: function (val) {
            return val.toString().length === 11;
          },
          message: `Your phone number must be 11 digits`,
        },
      },
      birthDate: {
        required: [true, "birth date is required"],
        trim: true,
        type: String,
      },
      insurance: {
        required: [true, "insurance is required"],
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
    diseases: [{ type: String }],
    alergies: [{ type: String }],
    drugs: [{ type: String }],
    prevsurgeries: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// patientSchema.statics.UnRegisterPatients = async function () {
//   let patients = await Patient.updateMany(
//     {},
//     { $set: { registered: "false" } }
//   );

//   console.log("i raaaaaaaaaaaaaaaan");

//   if (!patients) {
//     throw new Error("Unable to unregister");
//   }

//   return patients;
// };

patientSchema.pre('save', async function (next) {
  const patient = this

  if (patient.birthDate) {
    patient.age = await (new Date().getFullYear() - new Date(patient.birthDate).getFullYear())
  }

  next()
})
patientSchema.index({ patientName: 'text'});
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
