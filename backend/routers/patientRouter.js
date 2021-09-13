const express = require('express')
const auth = require('../middleware/Auth')
const Patient = require('../models/patient')
const RegisteredPatient = require('../models/registeredPatients')
const router = new express.Router()

router.get('/patient/:id', auth, async (req, res) => {
    const _id = req.params.id
    let patient

    try {
        patient = await Patient.findById({_id});        
        res.status(200).send({ patient })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/patients', async (req, res) => {
    let patients

    try {
        patients = await Patient.find();       
        if (!patients) {
            res.send({ message: 'error happened' })
        }
        res.status(200).send({ patients }) 
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/create/patient', async (req, res) => {

    const { phoneNumber } = req.body.patientDetails;

    let existingPatient
    try {
        existingPatient = await Patient.findOne({ 'patientDetails.phoneNumber': phoneNumber })
    } catch (e) {
      console.log(e)
    }

    if (existingPatient) {
        return res.send({message: 'العيان مسجل بالفعل'})
    } 

    const patient = new Patient(req.body)   

    try {
        await patient.save()
        res.status(201).send({ patient })
    } catch (e) {
        res.send(e)
    }
})

router.patch('/patient/:id', async (req, res) => {
    const _id = req.params.id
    let patient

    try {
        patient = await Patient.findByIdAndUpdate(_id, req.body, {new: true});        
        if (!patient) {
            res.send({message: 'Patient Not Found'})       
        }
        res.status(200).send({ patient })
    } catch (e) {
        res.send(e)
    }
})

router.get('/registerd/patients', async (req, res) => {
    let patients

    try {
        patients = await RegisteredPatient.find();       
        if (!patients) {
            res.send({ message: 'error happened' })
        }
        res.status(200).send({ patients }) 
    } catch (e) {
        res.status(400).send(e)
    }

})

router.post('/register/patient', async (req, res) => {
    const myPatient = req.body
    let patient = new RegisteredPatient({name: myPatient.name , _id: myPatient.id, register: myPatient.register})

    if (!patient) {
        res.status(400).send("patient error bro")
    }
    
    try {
        await patient.save()
        res.status(201).send({ patient })
    } catch (error) {
        
    }    

})

router.delete('/unregister/patient/:id', async (req, res) => {
    try {
        await RegisteredPatient.findByIdAndDelete({_id: req.params.id})
        res.status(200).send("done")
    } catch (error) {
        res.status(400).send(error)
    }

})

router.get("/search", async (req, res) => {
    try {
      let result = await Patient
        .aggregate([
            {
              $search: {
                index: 'defaultt',
                text: {
                  query: `${req.query.term}`,
                  path: "patientDetails.patientName",
                }
              }
            }
          ])
      res.send(result);
    } catch (error) {
      res.send({ message: error.message });
    }
});

module.exports = router
