import { useState } from "react";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export default function CategoryButton({ allCategories }) {
  // const allCategories = []
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-auto p-2 gap-1 cursor-pointer"
      >
        <p className="md:text-xl text-lg">Category</p>
        <FaChevronDown
          className={`mt-0.5 pl-1 transition-transform duration-100 ${
            isOpen ? "rotate-0" : "rotate-90"
          }`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="fixed inset-0 bg-transparent cursor-default"
          ></div>
          <ul className="absolute bg-white mt-2 shadow-lg z-20 py-3 w-auto  px-3 rounded max-h-screen">
            {Array.isArray(allCategories) && allCategories.length > 0 ? (
              allCategories.map((category, index) => (
                <div className="flex flex-col" key={index}>
                  <NavLink
                    to={`/category/${
                      category._id
                    }?categoryName=${encodeURIComponent(category.name)}`}
                    className={({ isActive }) => isActive ? "font-bold text-primaryColor font-title whitespace-nowrap text-xl hoverStyle":"hover:border-b text-gray-800  font-[400] font-title whitespace-nowrap text-xl hoverStyle"}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    {category.name}
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="text-gray-600 select-none font-light">
                No Category
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
