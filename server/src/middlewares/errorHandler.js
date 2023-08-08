const AppError = require("../utils/appError");
const { StatusCodes } = require("http-status-codes");

const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  const message = `Duplicate ${field} '${value}' entered. Please use another value.`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleJWTError = () =>
  new AppError(
    "Invalid JSON web token. Please login again.",
    StatusCodes.UNAUTHORIZED
  );

const handleJWTExpiredError = () =>
  new AppError(
    "JSON web token has expired. Please login again.",
    StatusCodes.UNAUTHORIZED
  );

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, StatusCodes.BAD_REQUEST);
};

const handleDevelopmentError = (err, res) => {
  return res.status(err.statusCode).json({
    status: "error",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleProductionError = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
  } else {
    // For unexpected errors during production
    console.error("ERROR 💥", err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    handleDevelopmentError(err, res);
  } else if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    if (error.code === 11000) error = handleDuplicateKeyError(error);
    if (error.name === "ValidationError") error = handleValidationError(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.name === "MongoError") error = handleDuplicateKeyError(error);

    handleProductionError(error, res);
  }
};
