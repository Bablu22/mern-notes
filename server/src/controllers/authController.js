const authService = require("../services/authService");
const AppError = require("../utils/appError");
const { isEmailValid, isPasswordValid } = require("../utils/validation");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError("All fields are required", 400);
    }

    if (!isEmailValid(email)) {
      throw new AppError("Invalid email format", 400);
    }

    if (!isPasswordValid(password)) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    const data = await authService.registerUser(name, email, password);
    res.status(201).json({ data });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("All fields are required", 400);
    }

    if (!isEmailValid(email)) {
      throw new AppError("Invalid email format", 400);
    }

    if (!isPasswordValid(password)) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    const data = await authService.loginUser(email, password);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
