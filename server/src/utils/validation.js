const AppError = require("./appError");

const isEmailValid = (email) => {
  if (!email || typeof email !== "string") {
    return false;
  }
  return /\S+@\S+\.\S+/.test(email);
};

const isPasswordValid = (password) => {
  if (!password || typeof password !== "string") {
    return false;
  }
  return password.length >= 6;
};

const validateCreateNoteRequest = (req) => {
  const { title, content, category, photoUrl } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new AppError("Title is required and should be a non-empty string.");
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    throw new AppError("Content is required and should be a non-empty string.");
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    throw new AppError(
      "Category is required and should be a non-empty string."
    );
  }
  if (!photoUrl || typeof photoUrl !== "string" || photoUrl.trim() === "") {
    throw new AppError(
      "PhotoUrl is required and should be a non-empty string."
    );
  }
};

const validateUpdateNoteRequest = (req) => {
  const { title, content, category } = req.body;

  if (title && (typeof title !== "string" || title.trim() === "")) {
    throw new Error("Title should be a non-empty string if provided.");
  }

  if (content && (typeof content !== "string" || content.trim() === "")) {
    throw new Error("Content should be a non-empty string if provided.");
  }

  if (category && (typeof category !== "string" || category.trim() === "")) {
    throw new Error("Category should be a non-empty string if provided.");
  }
};

module.exports = {
  isEmailValid,
  isPasswordValid,
  validateCreateNoteRequest,
  validateUpdateNoteRequest,
};
