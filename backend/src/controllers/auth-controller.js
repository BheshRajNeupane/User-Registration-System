const User = require("../model/users-model.js");
const catchAsync = require("../utils/catch-async.js");
const AppError = require("../utils/app-error.js");

//--------Register------------------
exports.register = catchAsync(async (req, res, next) => {
  const { email, name, phone, password } = req.body;

  if (!email || !name || !phone || !password) {
    return next(new AppError("All fields are required!", 400));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email is already registered!", 400));
  }

  await User.create({ email, name, phone, password });

  res.status(201).json({
    status: "success",
  });
});

//-----------Login------------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  req.session.currentUser = {
    id: user._id,
    email: user.email,
  };

  res.status(200).json({
    status: "success",
    message: "Login suceess",
  });
});

//-----------Password Reset------------
exports.reset = catchAsync(async (req, res, next) => {
  const { email, currentPassword, newPassword } = req.body;

  if (!email || !currentPassword || !newPassword) {
    return next(new AppError("Please provide all details!", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Use old email or password!", 401));
  }

  //new password must be different then old one
  if (await user.correctPassword(newPassword, user.password)) {
    return next(new AppError("Please use another password!", 401));
  }

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    status: "success",
    message: " password reset suceessful",
  });
});

//-----------Login check------------
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.session && req.session.currentUser) {
    return next();
  }
  return next(new AppError("Login first to perform task !", 401));
});
