import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch all the users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setUsers(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Add the create user action
  const addUser = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setUsers((prev) => [...prev, response.data]);

      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update user info
  const updateUser = async ({ id, name, email, role }) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/users/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      const updatedUser = response.data.updatedUser;
      const userIndex = users.findIndex((user) => user._id === updatedUser._id);

      if (userIndex !== -1) {
        setUsers((prevUsers) =>
          prevUsers.map((user, index) =>
            index === userIndex ? updatedUser : user
          )
        );
      }
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URI}/api/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    setUsers(users.filter((user) => user._id !== id));
    return id;
  };

  return (
    <AdminContext.Provider
      value={{ loading, users, fetchUsers, addUser, updateUser, deleteUser }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
