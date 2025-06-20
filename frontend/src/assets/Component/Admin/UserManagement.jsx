import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import { AdminContext } from "../../../context/AdminContextProvider";
import { toast } from "sonner";
import { BeatLoader } from 'react-spinners';

const UserManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { loading, users, addUser, updateUser, deleteUser, fetchUsers } =
    useContext(AdminContext);
  const [delLoading, setDelLoading] = useState(false);
  const [uAddLoading, setUAddLoading] = useState(false);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUAddLoading(true)
      await addUser(formData);

    // Submit the data to the database.
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
    } catch (error) {
      toast.error('User Add Failed!');
    } finally {
      setUAddLoading(false);
    }
  };

  const handleRoleChange = async (userId, name, email, newRole) => {
    await updateUser({ id: userId, name, email, role: newRole });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUid(userId);
      setDelLoading(true);
      try {
        await deleteUser(userId);
      } catch (error) {
        toast.error("Cannot Delete the User!", {
          style: {
            backgroundColor: "#E14D45",
            color: "#FFFFFF",
            border: "none",
            fontSize: "1rem",
          },
        });
      } finally {
        setDelLoading(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      {/* {loading && <p>Loading...</p>} */}
      {/* Add New User Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              minLength={2}
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={uAddLoading}
            className={`py-2 px-4 rounded ${uAddLoading ? 'cursor-not-allowed bg-green-400 text-gray-100': 'cursor-pointer bg-green-500 text-white hover:bg-green-600'}`}
          >
            {uAddLoading ? "Adding..." : "Add user"}
          </button>
        </form>
      </div>

      {/* User List Management */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        user.name,
                        user.email,
                        e.target.value
                      )
                    }
                    className="p-2 border rounded"
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    disabled={delLoading}
                    className={`text-center text-white py-2 rounded ${delLoading && user._id === uid ? 'px-[24px] bg-red-500 cursor-not-allowed' : 'px-4 hover:bg-red-600 bg-red-500 cursor-pointer'}`}
                  >
                    {delLoading && user._id === uid ? <BeatLoader color="#FFFFFF" size={5} /> : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
