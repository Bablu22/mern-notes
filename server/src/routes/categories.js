const express = require("express");
const {
  createNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(verifyToken, getAllCategories)
  .post(verifyToken, createNewCategory);

router
  .route("/:id")
  .put(verifyToken, updateCategory)
  .delete(verifyToken, deleteCategory);

module.exports = router;
