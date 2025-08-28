// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Persist user in localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Register
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/register", { name, email, password });
      setUser(data); // ← use data directly
    } catch (err) {
      console.error("Register error:", err.response?.data || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      setUser(data); // ← use data directly
    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
