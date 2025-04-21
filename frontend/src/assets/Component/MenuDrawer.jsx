import React, { useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

const MenuDrawer = ({
  drawerOpen,
  toggleMenuDrawer,
  allCategories,
  toggleCartDrawer,
}) => {
  const { cart, clearCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const contactUsHandle = (e) => {
    e.preventDefault();
    toggleMenuDrawer();
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => {
    await logout();
    await clearCart();
    navigate("/login");
  };
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* {Array.isArray(allCategories)} */}
      {/* close button */}
      <div className="flex justify-center p-4">
        <button>
          <IoMdClose
            onClick={toggleMenuDrawer}
            className="cursor-pointer h-6 w-6 text-gray-600"
          />
        </button>
      </div>

      <div className="pr-7 pl-2 ">
        {/* Cart Contents with scrollable area */}
        <div className="flex flex-grow flex-col p-4 overflow-y-auto md:text-[16px] text-[14px] gap-1 text-gray-800 font-sans tracking-[5%] font-[400px]">
          {/* Component for Cart Contents */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "hoverStyle font-bold text-primaryColor"
                : "hoverStyle hover:font-bold transition-all ease-in-out duration-100"
            }
            onClick={toggleMenuDrawer}
          >
            Home
          </NavLink>
          <div
            className="hoverStyle hover:font-bold transition-all ease-in-out duration-100 cursor-pointer"
            onClick={() => {
              toggleMenuDrawer(), toggleCartDrawer();
            }}
          >
            Cart
          </div>
          {user && (
            <>
              <NavLink
                to="/myprofile"
                className={({ isActive }) =>
                  isActive
                    ? "hoverStyle font-bold text-primaryColor"
                    : "hoverStyle hover:font-bold transition-all ease-in-out duration-100"
                }
                onClick={toggleMenuDrawer}
              >
                My Profile
              </NavLink>
              {/* or Admin */}
              {user.role === "admin" && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive
                      ? "hoverStyle font-bold text-primaryColor"
                      : "hoverStyle hover:font-bold transition-all ease-in-out duration-100"
                  }
                  onClick={toggleMenuDrawer}
                >
                  Admin
                </NavLink>
              )}
            </>
          )}

          <div className="select-none">Categories</div>
          <ul className=" p-2 pt-0 flex flex-col mt-0 text-[15px]">
            {Array.isArray(allCategories) && allCategories.length > 0 ? (
              allCategories.map((category, index) => (
                <NavLink
                  to={`/category/${
                    category._id
                  }?categoryName=${encodeURIComponent(category.name)}`}
                  className={({ isActive }) =>
                    isActive
                      ? "hoverStyle font-bold text-primaryColor"
                      : "hoverStyle hover:font-bold transition-all ease-in-out duration-100"
                  }
                  onClick={toggleMenuDrawer}
                  key={index}
                >
                  {category.name}
                </NavLink>
              ))
            ) : (
              <div className="text-gray-600 select-none">No Categories</div>
            )}
          </ul>

          {user ? (
            <div
              onClick={handleLogout}
              className="hoverStyle hover:font-bold transition-all ease-in-out duration-100 cursor-pointer"
            >
              Logout
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "hoverStyle font-bold text-primaryColor"
                  : "hoverStyle hover:font-bold transition-all ease-in-out duration-100"
              }
              onClick={toggleMenuDrawer}
            >
              Sign In
            </NavLink>
          )}

          <div
            className="hoverStyle hover:font-bold transition-all ease-in-out duration-100"
            onClick={contactUsHandle}
          >
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
