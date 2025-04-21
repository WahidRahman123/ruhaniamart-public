import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CommonContext } from "../../../context/CommonContextProvider";
import { AuthContext } from "../../../context/AuthContextProvider";
import { toast } from "sonner";
import axios from "axios";

const CategoryManagement = () => {
  const { fetchAllCategory, categories } = useContext(CommonContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete the Category?")) {
      setLoading(true);
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setTriggerUseEffect(!triggerUseEffect);
        toast.success("Category deleted Successfully!", {
          style: {
            backgroundColor: "#16ba5b",
            color: "#FFFFFF",
            border: "none",
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }

    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchAllCategory();
  }, [triggerUseEffect]);

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold ">Category Management</h2>
        <Link
          to="/admin/category/add"
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600 rounded px-4 py-2 text-center text-md font-bold cursor-pointer"
        >
          Add Category
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4 text-center">Is Popular</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="p-4 text-center text-gray-900 whitespace-nowrap">
                    {category.isPopular ? "Yes" : "No"}
                  </td>
                  <td className="p-4">
                    <img
                      src={category.image.url?.replace(
                        "/upload",
                        "/upload/w_150"
                      )}
                      alt={category.name}
                      className="h-[40px] w-[40px] object-cover rounded"
                    />
                  </td>
                  <td className="p-4 flex">
                    <Link
                      to={`/admin/category/${category._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      disabled={loading}
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 ">
                  No Category found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryManagement;
