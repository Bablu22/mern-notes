import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createNote } from "../api/notesApi";
import { getCategories } from "../api/categoriesApi";

type Note = {
  title: string;
  content: string;
  category: string;
  photoUrl: FileList | null;
};

interface Category {
  _id: string;
  name: string;
}

const CreateNote = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<Note>();

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(false); // Added loading state

  React.useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = async (data: Note) => {
    setLoading(true); // Set loading state to true

    try {
      const formData = new FormData();
      formData.append("file", data.photoUrl![0]);
      formData.append("upload_preset", "redux-tour");
      formData.append("cloud_name", "dmkyaq9vt");

      const imageRes = await fetch(
        "https://api.cloudinary.com/v1_1/dmkyaq9vt/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const res2 = await imageRes.json();
      const imageUrl = res2.url;

      const noteData = {
        title: data.title,
        content: data.content,
        category: data.category,
        photoUrl: imageUrl,
      };

      const response = await createNote(noteData);
      console.log(response);

      if (response) {
        toast.success("Note created successfully");
        reset(); // Reset the form after successful creation
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="p-4 container mx-auto max-w-4xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 space-y-5"
      >
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            {...register("title", { required: true })}
            placeholder="Title"
            className="p-3 font-medium block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">Title is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <textarea
            name="content"
            {...register("content", { required: true })}
            placeholder="Content"
            className="p-3 font-medium block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.content && (
            <span className="text-red-500 text-sm">Content is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <select
            name="category"
            {...register("category", { required: true })}
            className="p-3 font-medium block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">Category is required</span>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <input
            type="file"
            accept="image/*"
            {...register("photoUrl", { required: true })}
            className="p-3 font-medium block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors.photoUrl && (
            <span className="text-red-500 text-sm">Image is required</span>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
