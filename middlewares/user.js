const User = require("../models/user");
const BigPromise = require("./bigPromise");
const CustomError = require("../errors/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {

  token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new CustomError("Login first to access this page", 401));
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error(err);
    return next(new CustomError("Invalid Token", 401));
  }
});
