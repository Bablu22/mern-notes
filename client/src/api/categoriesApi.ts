import axios from "axios";

const BASE_URL = "http://localhost:5000/api/categories";

export interface Category {
  _id: string;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createCategory = async (category: Category): Promise<Category> => {
  const response = await axios.post(BASE_URL, category);
  return response.data;
};

export const deleteCategory = async (id: string): Promise<Category> => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};

export const updateCategory = async (category: Category): Promise<Category> => {
  const response = await axios.put(`${BASE_URL}/${category._id}`, category);
  return response.data;
};

axios.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
