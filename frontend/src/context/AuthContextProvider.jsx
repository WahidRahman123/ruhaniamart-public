import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

// Retrive user info and token from localStorage if available
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Check for existing guest ID in the localStorage or generate a new One
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;

localStorage.setItem("guestId", initialGuestId);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(userFromStorage);
  const [guestId, setGuestId] = useState(initialGuestId);
  const [loading, setLoading] = useState(false);

  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/users/login`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      setUser(response.data.user);

      return response.data.user;
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Extract error message from backend
      } else if (error.response && error.response.data) {
        if (error.response.status === 500) {
          errorMessage = "Server Error";
        }
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/users/register`,
        userData
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Extract error message from backend
      } else if (error.response && error.response.data) {
        if (error.response.status === 500) {
          errorMessage = "Server Error";
        }
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    const newGuestId = `guest_${new Date().getTime()}`;
    setGuestId(newGuestId); // Reset guest ID on logout
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.setItem("guestId", newGuestId);
  };

  const generateNewGuestId = () => {
    const newGuestId = `guest_${new Date().getTime()}`;
    setGuestId(newGuestId);
    localStorage.setItem("guestId", newGuestId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        guestId,
        login,
        register,
        logout,
        loading,
        generateNewGuestId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
