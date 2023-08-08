const {
  createCategory,
  getCategories,
  updateCategoryById,
  deleteCategories,
} = require("../services/categoryService");

const createNewCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const category = await createCategory(name, userId);

    res.status(201).json(category);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await getCategories(userId);

    res.status(200).json(categories);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;
    const { name } = req.body;

    const updatedCategory = await updateCategoryById(categoryId, userId, name);

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const categoryId = req.params.id;

    await deleteCategories(categoryId, userId);

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};
