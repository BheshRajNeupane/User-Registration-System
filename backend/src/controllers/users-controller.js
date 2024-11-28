const User = require("../model/users-model.js");
const catchAsync = require("../utils/catch-async.js");
const AppError = require("../utils/app-error.js");

//------GET ALL USERS--------------
exports.getUsers = catchAsync(async function (req, res, next) {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    data: users,
  });
});

//------EDIT USERS--------------
exports.editUser = catchAsync(async function (req, res, next) {
  // Check if the email already exists for a different user
  const existingEmailUser = await User.findOne({
    email: req.body.email,
    _id: { $ne: req.params.id },
  });



  if (existingEmailUser) {
    return next(
      new AppError("This email is already registered with another account", 409)
    );
  }
  // Update the user with the new data
  await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
  });
});


//------ DELETE  USER--------------
exports.deleteUser = catchAsync(async function (req, res, next) {
  
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No user with that ID", 404));
  }

  res.status(204).json({
    status: "success",
  });
});
