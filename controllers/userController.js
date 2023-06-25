const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../errors/customError");
const cookieToken = require("../utils/cookieToken");

exports.signup = BigPromise(async (req, res, next) => {
  const { name, email, password } = req.body;
  

  if (!email || !password || !name) {
    return next(new CustomError("Name,Email and password are required", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  cookieToken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email,password)

  //check for email and password prescence
  if (!email || !password) {
    return next(new CustomError("please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomError("Email or password does not exist", 400));
  }

  //confirm password
  const isPasswordCorrect = await user.isValidatedPassword(password);

  if (!isPasswordCorrect) {
    return next(new CustomError("Email or password does not exist", 400));
  }

  cookieToken(user, res);
});

exports.logout = BigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Success",
  });
});


