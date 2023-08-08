const Category = require("../models/category");
const AppError = require("../utils/appError");

// Get categories
const getCategories = async (userId) => {
  const category = await Category.find({ user: userId })
    .sort({ _id: -1 })
    .exec();
  if (!category) {
    throw new AppError("Category not found.", 404);
  }
  return category;
};

// Create a new category
const createCategory = async (name, userId) => {
  const category = await Category.create({ name, user: userId });
  return category;
};

// Update category by ID
const updateCategoryById = async (categoryId, userId, newName) => {
  const category = await getCategoryById(categoryId, userId);

  if (!category) {
    throw new AppError("Category not found.", 404);
  }

  category.name = newName;
  await category.save();

  return category;
};

// Get category by ID
const getCategoryById = async (categoryId, userId) => {
  const category = await Category.findOne({ _id: categoryId, user: userId });
  return category;
};

// Delete category by ID
const deleteCategories = async (categoryId, userId) => {
  const category = await Category.findOneAndDelete({
    _id: categoryId,
    user: userId,
  });

  if (!category) {
    throw new AppError("Category not found.", 404);
  }

  return category;
};

module.exports = {
  getCategories,
  createCategory,
  updateCategoryById,
  deleteCategories,
};
