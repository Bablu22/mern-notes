import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteNote, getNotes } from "../api/notesApi";
import { getCategories } from "../api/categoriesApi";
import { useLocation, useNavigate } from "react-router-dom";

const NoteSkeleton = () => (
  <div className="mb-4 border p-4 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    parseInt(queryParams.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    queryParams.get("search") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.get("category") || ""
  );
  const [categories, setCategories] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [currentPage, searchQuery, selectedCategory]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes(
        currentPage,
        itemsPerPage,
        searchQuery,
        selectedCategory
      );
      setNotes(response.notes);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error fetching notes");
    }
  };

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories(); // Replace with your API call
      setCategories(fetchedCategories);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const handleSearch = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    queryParams.set("search", newSearchQuery);
    queryParams.set("page", "1");
    navigate(`?${queryParams.toString()}`);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    queryParams.set("category", newCategory);
    queryParams.set("page", "1");
    navigate(`?${queryParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    queryParams.set("page", page.toString());
    navigate(`?${queryParams.toString()}`);
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDelete = async (id) => {
    const res = await deleteNote(id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    toast.success("Note deleted successfully");
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or content..."
          value={searchQuery}
          onChange={handleSearch}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-3 font-medium block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {loading
          ? Array.from({ length: itemsPerPage }, (_, index) => (
              <NoteSkeleton key={index} />
            ))
          : notes.map((note) => (
              <div key={note._id} className="mb-4 border p-4">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <img
                  src={note.photoUrl}
                  alt="Note"
                  className="my-2 max-h-40 w-auto"
                />
                <p>{note.content}</p>
                <div className="flex justify-between mt-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => handleUpdate(note._id)}
                  >
                    Update
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center mt-8">
        <ul className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`cursor-pointer px-3 py-2 ${
                currentPage === index + 1 ? "font-bold" : ""
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
