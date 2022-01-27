const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");
require('dotenv').config()

const auth = async (req, res, next) => {
  let token
  let decoded
  let adminUser
  try {
    // parse token
    token = req.header("Authorization").replace("Bearer ", "");

    // verify token -> return object contains userId or error if failed
    decoded = jwt.verify(token, process.env.DB_JWT);

    // get user from db
    adminUser = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!token || !adminUser) {
      throw new Error(
        "Something went wrong with the authentication process..."
      );
    }

    // pass token and user to the next middleware
    req.token = token;
    req.user = adminUser;
    next();
  } catch (e) {
    return res.status(401).send({ message: "Please Authenticate, " + String(e.message).toUpperCase() });
  }
};

module.exports = auth;
