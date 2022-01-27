const express = require("express");
const Admin = require("../models/adminModel");
const auth = require("../middleware/Auth");
const router = new express.Router();

router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    throw new Error("Invalid user or token authentication");
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    const admin = await Admin.findByCredentials(
      req.body.email,
      req.body.password
    );

    if (!admin) res.status(400).send({ message: "Invalid login" });

    const token = await admin.generateAuthToken();

    if (!token) res.status(401).send({ message: "Invalid Token Creation" });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: "Invalid login" });
  }
});

// router.post("/admin/create", async (req, res) => {
//   const admin = new Admin(req.body);

//   try {
//     await admin.save();
//     const token = await admin.generateAuthToken();
//     res.status(201).send({ admin, token });
//   } catch (e) {
//     res.send(e);
//   }
// });

module.exports = router;
