import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import axios from "axios";
import { toast } from "sonner";
import { BeatLoader } from 'react-spinners'

const BannerManagement = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  const [banners, setBanners] = useState([]);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [bid, setBid] = useState(null);
  const [delLoading, setDelLoading] = useState(false);

  const handleDeleteBanner = async (bannerId) => {
    if (window.confirm("Are you sure you want to delete the Banner?")) {
      setBid(bannerId);
      setDelLoading(true);
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/banner/${bannerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setTriggerUseEffect(!triggerUseEffect);
        toast.success("Banner deleted Successfully!", {
          style: {
            backgroundColor: "#16ba5b",
            color: "#FFFFFF",
            border: "none",
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setDelLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");

    // Creating a FormData
    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/banner`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      setTriggerUseEffect(!triggerUseEffect);
      toast.success("Banner added successfully!", {
        style: { backgroundColor: "#1bb33e", color: "#FFFFFF", border: "none" },
      });
      // at last empty the file
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Reset the file input
      }
    } catch (error) {
      console.error(error);
      toast.error("Banner add failed!", {
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

  const fetchAllBanner = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/banner`
      );
      setBanners(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllBanner();
  }, [triggerUseEffect]);

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold ">Banner Management</h2>
      </div>

      {/* Banner Add Form */}
      <div className="p-6 rounded-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Add a Banner</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border rounded font-serif bg-white text-gray-700 cursor-pointer  file:cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:text-green-500 file:bg-green-100 file:hover:bg-green-200 file:text-bold"
              accept="image/*"
            ></input>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 rounded  ${
              loading ? "cursor-not-allowed text-gray-100 bg-green-400" : "text-white bg-green-500 cursor-pointer hover:bg-green-600"
            }`}
          >
            {loading ? "Adding..." : "Add Banner"}
          </button>
        </form>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4 text-center">Image</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.length > 0 ? (
              banners.map((banner, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4">
                    <img
                      src={banner.image.url.replace("/upload", "/upload/f_auto,q_auto,w_150")}
                      alt={banner.image.altText}
                      className="w-[150px] object-cover rounded mx-auto"
                    />
                  </td>
                  <td className="p-4 text-center">
                    <button
                      disabled={delLoading}
                      onClick={() => handleDeleteBanner(banner._id)}
                      className={`text-center text-white py-2 rounded ${delLoading && banner._id === bid ? 'px-[24px] bg-red-500 cursor-not-allowed' : 'px-4 hover:bg-red-600 bg-red-500 cursor-pointer'}`}
                    >
                      {delLoading && banner._id === bid ? <BeatLoader color="#FFFFFF" size={5} /> : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 ">
                  No Banner found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BannerManagement;
