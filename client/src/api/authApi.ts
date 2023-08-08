import axios from "axios";
const BASE_URL = "http://localhost:5000/api/auth";

export interface AuthResponse {
  data: {
    user: {
      name: string;
      email: string;
      _id: string;
    };
    token: string;
  };
}

export interface ApiError {
  status: string;
  message: string;
}

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return response.data;
};
