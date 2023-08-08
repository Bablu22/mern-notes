import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

type Note = {
  title: string;
  content: string;
  category: string;
  photoUrl: string;
};

export const getNotes = async (
  page,
  limit,
  searchQuery = "",
  selectedCategory = null
) => {
  const response = await axios.get(
    `http://localhost:5000/api/notes?page=${page}&limit=${limit}&searchQuery=${searchQuery}&selectedCategory=${selectedCategory}`
  );
  return response.data;
};

export const createNote = async (note: Note) => {
  const res = await axios.post(API_URL, note);
  return res.data;
};

export const getNote = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const updateNote = async (id: string, note: Note) => {
  const res = await axios.put(`${API_URL}/${id}`, note);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

axios.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  const token = user ? JSON.parse(user).token : "";
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers["Content-Type"] = "application/json";

  return config;
});
