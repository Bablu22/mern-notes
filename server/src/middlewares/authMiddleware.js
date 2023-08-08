const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized. No token provided.", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new AppError("User not found.", 404));
    }

    next();
  } catch (err) {
    return next(new AppError("Unauthorized. Invalid token.", 401));
  }
};

module.exports = { verifyToken };
