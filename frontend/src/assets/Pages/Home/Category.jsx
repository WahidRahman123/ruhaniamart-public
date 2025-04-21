import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_URI;

function Category() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    const { data } = await axios.get(url + "/api/category/popular");
    setCategory(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <>
      <div className=" mt-10 my-6 px-8 py-1 ">
        {/* title-section */}
        <div className="py-0.5 bg-primaryColor rounded-md ">
          <p className="text-center font-title font-bold text-lg sm:text-xl md:text-2xl text-titleColor tracking-[3px] ">
            Popular Category
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-[#404040] text-2xl rounded mt-2 drop-shadow-sm font-bold">
            Loading...
          </p>
        ) : (
          <div className="card-section mt-8 pt-[2px] py-[1px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-5 lg:gap-6 place-items-center">
            {/* card-1 */}

            {category.length > 0 &&
              category.map((item, index) => (
                <Link
                  to={`/category/${item._id}?categoryName=${encodeURIComponent(
                    item.name
                  )}`}
                  key={index}
                >
                  <div className="border border-cardBorder sm:h-[200px] sm:w-[160px] h-[180px] w-[140px] hover:border-primaryColor hover:scale-105 transition-all duration-100 ease-in-out cursor-pointer  hover:shadow-md shadow-gray-300 shadow-md ">
                    <div className="imageProduct mt-5 flex flex-col justify-center items-center ">
                      <div className="sm:h-[125px] sm:w-[120px] h-[110px] w-[100px] border-primaryColor border-[1px]  p-1 hover:border-2 flex justify-center items-center">
                        <div className="overflow-hidden">
                          <img
                            src={item.image.url.replace("/upload", "/upload/w_150")}
                            alt=""
                            className="sm:h-[110px] sm:w-[100px] h-[95px] w-[85px] object-cover"
                          />
                        </div>
                      </div>

                      <p className="font-primary text-[18px] mt-[10px] text-center tracking-normal truncate w-24 sm:w-28 md:w-30 lg:w-32" title={`${item.name}`}>
                        {item.name}{" "}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Category;
