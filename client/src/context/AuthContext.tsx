import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  AuthResponse,
  registerUser,
  ApiError,
} from "../api/authApi";

import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  isLoading: boolean;
  user: {
    name: string;
    email: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false as boolean);
  const [isLoading, setIsLoading] = useState(true as boolean);
  const [user, setUser] = useState({} as { name: string; email: string });

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const data = JSON.parse(userData);
      setUser(data.user);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await loginUser(userData);
      const { data } = response as AuthResponse;
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      toast.success("Login successful!");
    } catch (error: any) {
      const apiError: ApiError = error.response?.data;
      toast.error(apiError.message);
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser({} as { name: string; email: string });
    toast.success("Logout successful!");
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      const response: AuthResponse = await registerUser(userData);
      const { data } = response as AuthResponse;
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Registration successful!");
      setIsLoading(false);
    } catch (error: any) {
      const apiError: ApiError = error.response?.data;
      toast.error(apiError.message);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, register, isLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
