const User = require("../models/user");
const BigPromise = require("./bigPromise");
const CustomError = require("../errors/customError");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {

  token = req.header("Authorization").replace("Bearer ", "");
  console.log(token)

  if (!token) {
    return next(new CustomError("Login first to access this page", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});
