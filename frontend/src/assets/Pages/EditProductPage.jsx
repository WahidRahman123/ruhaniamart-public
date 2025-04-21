import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { CommonContext } from "../../context/CommonContextProvider";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { fetchAllCategory } = useContext(CommonContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    discountPrice: 0,
    countInStock: "",
    categoryName: "",
    brand: "",
  });
  const [productImages, setProductImages] = useState([]);

  //* Fetch the product
  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  //* Image
  const [files, setFiles] = useState([]);
  const onSelectFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const existingFileNames = files.map((file) => file.name);

    const filteredFiles = selectedFiles.filter(
      (file) => !existingFileNames.includes(file.name)
    );

    setFiles((prev) => [...prev, ...filteredFiles]);
  };

  const [deleteImages, setDeleteImages] = useState([]);
  //* image

  //* Checkbox handling
  const handleCheckbox = (e) => {
    const { value, checked } = e.target;

    setDeleteImages((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  //* Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // creating FromData
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("originalPrice", productData.originalPrice);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("countInStock", productData.countInStock);
    formData.append("categoryName", productData.categoryName);
    formData.append("brand", productData.brand);

    //* Image appending to formData
    files.forEach((file) => {
      formData.append("images", file);
    });

    //* deleteImages appending to formdata
    deleteImages.forEach((file) => {
      formData.append("deleteImages[]", file);
    });

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      toast.success("Product updated successfully!", {
        style: { backgroundColor: "#1bb33e", color: "#FFFFFF", border: "none" },
      });
      // navigate to the product page

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Product update failed!", {
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

  useEffect(() => {
    (async () => {
      const categories = await fetchAllCategory();
      setCategories(categories);
      const product = await fetchProduct(id);
      console.log(product);
      setProductData({
        ...productData,
        name: product.name,
        description: product.description,
        originalPrice: product.originalPrice,
        discountPrice: product.discountPrice,
        countInStock: product.countInStock,
        categoryName: product.category.name,
        brand: product.brand,
      });
      setProductImages(product.images);
    })();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            onChange={handleChange}
            rows={4}
            required
          />
        </div>

        {/* Original Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Original Price</label>
          <input
            type="number"
            name="originalPrice"
            value={productData.originalPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min={0}
            required
          />
        </div>

        {/*Discount Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min={0}
            max={productData.originalPrice}
            required
          />
          <p className="text-sm text-red-500 select-none">
            Discount price should not be higher than original price (
            {productData.originalPrice})
          </p>
        </div>

        {/* Count In stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            In Stock or Available
          </label>

          <select
            value={productData.countInStock}
            onChange={(e) =>
              setProductData({ ...productData, countInStock: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md font-serif"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>

        {/* Select Category */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Category</label>
          <select
            value={productData.categoryName}
            onChange={(e) =>
              setProductData({ ...productData, categoryName: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-md font-serif"
            required
          >
            <option value="" disabled>
              Select an option
            </option>
            {categories.length > 0 &&
              categories.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {/* Brand Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand Name</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
            <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center w-full cursor-pointer">
              <MdOutlineFileUpload />
              <span>Choose Images To Upload</span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={onSelectFile}
                accept="image/*"
              />
            </label>
            {files.length > 0 && (
              <p className="text-gray-600 mt-2">
                {files.length} File(s) Chosen
              </p>
            )}

            {files.length > 0 && files.length > 3 && (
              <div>
                <span className="text-red-600">
                  You can't upload more than <b>3</b> images
                </span>
                <br />
                <span className="text-gray-700">
                  Please delete <b>{files.length - 3}</b> of them
                </span>
              </div>
            )}

            <div className="mt-4 space-y-2">
              {files.length > 0 &&
                files.map((file, index) => (
                  <div
                    key={index}
                    className="flex  justify-between bg-blue-100 p-2 rounded-md text-blue-900 font-medium text-sm sm:text-base"
                  >
                    <span className="w-50 truncate text-left">
                      {file.name.trim()}
                    </span>
                    <TiDeleteOutline
                      className="text-2xl cursor-pointer text-red-500 hover:text-red-600"
                      onClick={() => setFiles(files.filter((f) => f !== file))}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Delete and Thumbnail */}
        <div className="mb-3 ">
          {productImages.length > 0 &&
            productImages.map((img, index) => (
              <div key={index} className="flex items-center mb-3">
                <img
                  className="w-20 h-20 object-cover rounded-lg"
                  src={img.url.replace("/upload", "/upload/w_150")}
                  alt="thumbnail"
                />
                <div>
                  <input
                    className="ml-3"
                    type="checkbox"
                    id={img._id}
                    value={img.altText}
                    onChange={handleCheckbox}
                    checked={deleteImages.includes(img.altText)}
                  />
                </div>
                <label className="ml-2" htmlFor={img._id}>
                  Delete?
                </label>
              </div>
            ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 cursor-pointer"
        >
          {loading ? "Editing..." : "Edit Product"}
        </button>
      </form>

      {/* use back button */}
      <div className="flex justify-end">
        <Link
          to="/admin/products"
          className="flex mt-4 items-center text-lg font-medium text-green-600 hover:text-blue-800 cursor-pointer"
        >
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>
    </div>
  );
};

export default EditProductPage;
