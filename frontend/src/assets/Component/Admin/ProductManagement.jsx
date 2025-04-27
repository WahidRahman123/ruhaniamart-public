import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import axios from "axios";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  const [pid, setPid] = useState(null);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete the Product?")) {
      setPid(id);
      setLoading(true);
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URI}/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setTriggerUseEffect(!triggerUseEffect);
        toast.success("Product deleted Successfully!", {
          style: {
            backgroundColor: "#16ba5b",
            color: "#FFFFFF",
            border: "none",
          },
        });
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetchAllProducts();
  }, [triggerUseEffect]);

  return (
    <div className="max-w-7xl mx-auto p-6 ">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold ">Product Management</h2>
        <Link
          to="/admin/products/add"
          type="submit"
          className="bg-green-500 text-white hover:bg-green-600 rounded px-4 py-2 text-center text-md font-bold cursor-pointer"
        >
          Add Product{" "}
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Original Price</th>
              <th className="py-3 px-4">Discount Price</th>
              <th className="py-3 px-4 text-center">In Stock</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">
                    <span className="text-xl">৳</span>
                    {product.originalPrice
                      ? product.originalPrice
                      : product.price}
                  </td>
                  <td className="p-4">
                    <span className="text-xl">৳</span>
                    {product.discountPrice}
                  </td>
                  <td className="p-4 text-center">
                    {product.countInStock ? "Yes": "No"}
                  </td>
                  <td className="p-4 flex">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loading}
                      className={`text-center text-white py-2 rounded ${loading && product._id === pid ? 'px-[24px] bg-red-500 cursor-not-allowed' : 'px-4 hover:bg-red-600 bg-red-500 cursor-pointer'}`}
                    >
                      {loading && product._id === pid ? <BeatLoader color="#FFFFFF" size={5} /> : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500 ">
                  No Products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
