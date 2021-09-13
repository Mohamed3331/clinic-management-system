const express = require("express");
const Admin = require("../models/adminUser");

const router = new express.Router();

router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await admin.generateAuthToken();

    if (!admin) {
      res.send({ message: "Invalid login" });
    }

    res.send({ admin, token });
  } catch (e) {
    res.send(e);
  }
});

// router.post('/admin/create', async (req, res) => {
//     const admin = new Admin(req.body)

//     try {
//         await admin.save()
//         const token = await admin.generateAuthToken()
//         res.status(201).send( {admin, token} )
//     } catch (e) {
//         res.send(e)
//     }
// })

module.exports = router;
