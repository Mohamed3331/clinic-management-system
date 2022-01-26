const jwt = require("jsonwebtoken");
const Admin = require("../models/adminUser");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.DB_JWT);

    const adminUser = await Admin.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!token || !adminUser) {
      throw new Error(
        "Something went wrong with the authentication process..."
      );
    }

    req.token = token;
    req.user = adminUser;
    next();
  } catch (e) {
    res.status(401).send({ message: "Please Authenticate" });
  }
};

module.exports = auth;
