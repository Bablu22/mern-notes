const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const AppError = require("../utils/appError");
const { json } = require("express/lib/response");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });
};

const registerUser = async (name, email, password) => {
  const userExist = await User.findOne({ email });

  if (userExist) {
    throw new AppError("User already exists", 400);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const { password: userPassword, ...userWithoutPassword } = user.toObject();
  const token = generateToken(userWithoutPassword);

  return { user: userWithoutPassword, token };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid credentials");
  }
  const { password: userPassword, ...userWithoutPassword } = user.toObject();

  const token = generateToken(userWithoutPassword);

  return { user: userWithoutPassword, token };
};

module.exports = { registerUser, loginUser };
