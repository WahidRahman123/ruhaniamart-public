import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductDetails from "./ProductDetails";

const url = import.meta.env.VITE_BACKEND_URI;

function Product() {
  const [categories, setCategories] = useState(""); // Store categories

  // Fetch data asynchronously
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${url}/api/category`);
      setCategories(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch data when component mounts
  }, []);
  return (
    <>
      <section>
        {/* Heading */}

        <div className="mt-10 px-2 py-1">
          {categories &&
            categories.map((category) => (
              <div key={category._id} className="mb-8">
                <div className=" bg-primaryColor rounded-md flex items-center justify-between gap-1">
                  <p className="pl-5 text-start font-title font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-titleColor tracking-[2px] py-1 ">
                    {category.name}
                  </p>
                  <Link
                    to={`/category/${
                      category._id
                    }?categoryName=${encodeURIComponent(category.name)}`}
                  >
                    <button className="my-2 mr-4 py-1 px-2 bg-white rounded-[10px] top-1 bottom-1 border-black text-black font-primary font-bold text-center border-2 hover:scale-105 cursor-pointer hover:underline text-sm sm:text-base md:text-lg">
                      View All
                    </button>
                  </Link>
                </div>

                <div>
                  {/* Product generating */}
                  <ProductDetails categoryId={category._id} />
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default Product;
