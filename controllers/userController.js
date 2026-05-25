const User = require("../models/User");

// GET ALL USERS
exports.getUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find().select(
        "-password"
      );

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });
  }
};