const express = require("express");
const auth = require("../middleware/Auth");
const Patient = require("../models/patientModel");
const RegisteredPatient = require("../models/registeredPatientModel");
const router = new express.Router();

// patients CRUD routes
router.get("/patients", async (req, res) => {
  let patients;

  try {
    patients = await Patient.find();
    if (!patients) {
      res.status(401).send({ message: "error happened" });
    }
    res.status(200).send({ patients });
  } catch (e) {
    res.status(401).send({ message: "Something went wrong" });
  }
});

router.get("/patient/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let patient;

  try {
    patient = await Patient.findById({ _id });
    res.status(200).send({ patient });
  } catch (e) {
    res.status(401).send({ message: "Something went wrong" });
  }
});

router.post("/create/patient", async (req, res) => {
  const { phoneNumber } = req.body.patientDetails;

  let existingPatient;
  let newPatient
  try {
    existingPatient = await Patient.findOne({
      "patientDetails.phoneNumber": phoneNumber,
    });
  } catch (e) {
    console.log(e);
  }

  if (existingPatient) {
    return res.send({ message: "العيان مسجل بالفعل" });
  }


  try {
    newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).send({ newPatient });
  } catch (e) {
    res.send(e);
  }
});

router.patch("/patient/:id", auth, async (req, res) => {
  let patient;
  try {
    const _id = req.params.id;
    patient = await Patient.findByIdAndUpdate(_id, req.body, { new: true });
    if (!patient) {
      return res.status(400).send({ message: "Patient Not Found" });
    }
    patient.save()
    res.status(200).send({ patient });
  } catch (e) {
    res.status(400).send({ message: "Patient Update data Failed" });
  }
});

// registerd patients routes
router.get("/registered/patients", async (req, res) => {
  let patients;

  try {
    patients = await RegisteredPatient.find();
    if (!patients) {
      res.send({ message: "error happened" });
    }
    res.status(200).send({ registeredPatients: patients });
  } catch (e) {
    res.status(400).send({ message: "Patient Not Found" });
  }
});

router.post("/register/patient", async (req, res) => {
  const myPatient = req.body;
  let patient
  try {
    patient = new RegisteredPatient({
      name: myPatient.name,
      _id: myPatient.id,
    });
    if (!patient) {
      return res.status(400).send("patient error bro");
    }
    await patient.save();
    res.status(201).send({ patient });
  } catch (error) {
    res.status(400).send({ message: "Patient error" });
  }
});

router.delete("/unregister/patient/:id", async (req, res) => {
  try {
    await RegisteredPatient.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ success: "Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// search results route
router.get("/search", async (req, res) => {
  try {
    let result = await Patient.aggregate([
      {
        $search: {
          index: "defaultt",
          text: {
            query: `${req.query.term}`,
            path: "patientDetails.patientName",
          },
        },
      },
    ]);
    res.send(result);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
