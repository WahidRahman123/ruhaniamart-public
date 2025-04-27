import React, { useContext, useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "sonner";
import axios from 'axios';

const AddCategory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [categoryData, setCategoryData] = useState({
    name: "",
    isPopular: false,
  });
  //* Image Section
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    // Creating FormData
    const formData = new FormData();
    formData.append("name", categoryData.name);
    formData.append("isPopular", categoryData.isPopular);
    formData.append("image", file);

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      toast.success("Category added successfully!", {
        style: { backgroundColor: "#1bb33e", color: "#FFFFFF", border: "none" },
      });
      // at last empty the category data
      setCategoryData({
        name: "",
        isPopular: false,
      })
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      console.error(error);
      toast.error("Category add failed!", {
        style: { backgroundColor: "#DC2626", color: "#FFFFFF", border: "none" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Category Management</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold mb-4">Add New Category</h3>

          {/* category name */}
          <div className="mb-4">
            <label className="block  mb-1">Category Name</label>
            <div className="mb-6">
              <input
                type="text"
                value={categoryData.name}
                onChange={(e) =>
                  setCategoryData({ ...categoryData, name: e.target.value })
                }
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          {/* Image select */}
          <div className="mb-4">
            <label className="block mb-1">Select Category Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border rounded font-serif bg-white text-gray-700 cursor-pointer  file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:text-green-500 file:bg-green-100 file:hover:bg-green-200 file:text-bold"
              accept="image/*"
            ></input>
          </div>

          {/* popular or not */}
          <div className="mb-4">
            <label className="block mb-1">Is Popular?</label>
            <select
              value={categoryData.isPopular}
              onChange={(e) =>
                setCategoryData({ ...categoryData, isPopular: e.target.value })
              }
              className="w-full p-2 border rounded font-serif "
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* button */}
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded ${loading ? 'cursor-not-allowed bg-green-400 text-gray-100' : 'cursor-pointer bg-green-500 text-white  hover:bg-green-600'}`}
          >
            <span className="font-bold">{loading ? "Adding..." : "Add Product"}</span>
          </button>
        </div>
      </form>

      {/* back button */}
      <div className="flex justify-end">
        <Link
          to="/admin/category"
          className="flex mt-2 items-center  text-lg font-medium text-green-600 hover:text-blue-800 cursor-pointer"
        >
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>
    </div>
  );
};

export default AddCategory;
