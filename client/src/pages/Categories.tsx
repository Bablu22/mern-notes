import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  Category,
} from "../api/categoriesApi";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<
    number | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (newCategory.trim() === "") {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      const createdCategory = await createCategory({ name: newCategory });
      setCategories([...categories, createdCategory]);
      toast.success("Category created");
      setNewCategory("");
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleEditCategory = (index: number) => {
    setEditingCategoryIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingCategoryIndex(null);

    // Reset category name by pre-fetching categories
    fetchCategories();
  };

  const handleUpdateCategory = async (
    index: number,
    updatedCategory: Category
  ) => {
    try {
      const updatedCategoryData = await updateCategory(updatedCategory);
      const updatedCategories = [...categories];
      updatedCategories[index] = updatedCategoryData;
      setCategories(updatedCategories);
      toast.success("Category updated");
      setEditingCategoryIndex(null);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleCategoryNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedCategory = {
      ...categories[index],
      name: e.target.value,
    };

    const updatedCategories = [...categories];
    updatedCategories[index] = updatedCategory;

    setCategories(updatedCategories);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    category: Category
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUpdateCategory(index, category);
    }
  };

  const handleDeleteCategory = async (index: number) => {
    const categoryIdToDelete = categories[index]._id;

    try {
      await deleteCategory(categoryIdToDelete);
      const updatedCategories = [...categories];
      updatedCategories.splice(index, 1);
      setCategories(updatedCategories);
      setEditingCategoryIndex(null);

      toast.success("Category deleted");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-4xl my-5">
      <h1 className="text-3xl font-semibold mb-6">Categories</h1>
      <form
        className="flex items-center mb-6 space-x-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateCategory();
        }}
      >
        <input
          className="p-3 font-medium block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r"
          type="submit"
        >
          Add
        </button>
      </form>
      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-4 text-left">Category Name</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-gray-50">
                <td className="py-3 px-4">
                  <div className="animate-pulse flex space-x-4">
                    <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="animate-pulse flex space-x-2">
                    <div className="h-4 w-8 bg-gray-300 rounded"></div>
                    <div className="h-4 w-8 bg-gray-300 rounded"></div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                {categories.map((category, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4">
                      {editingCategoryIndex === index ? (
                        <div className="flex">
                          <input
                            className="p-3 font-medium block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            type="text"
                            value={categories[index].name}
                            onChange={(e) => handleCategoryNameChange(e, index)}
                            onKeyDown={(e) =>
                              handleKeyPress(e, index, categories[index])
                            }
                          />
                          <button
                            className="bg-red-500 text-white py-1 px-2 rounded-r"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        category.name
                      )}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      {editingCategoryIndex === index ? (
                        <></>
                      ) : (
                        <>
                          <button
                            className="text-blue-500 hover:text-blue-600"
                            onClick={() => handleEditCategory(index)}
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteCategory(index)}
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categories;
