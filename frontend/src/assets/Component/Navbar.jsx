import React, { useContext, useState } from "react";
import { BsCart, BsSearch } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Categorybutton from "./Categorybutton";
import MenuDrawer from "./MenuDrawer";
import { toast } from "sonner";
import CartDrawer from "./Cart/CartDrawer";
import { CartContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

function Navbar({ allCategories }) {
  const navigate = useNavigate();
  const [searchbar, setSearcbar] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const { cart, clearCart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleMenuDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCartDrawer = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };

  function handleSearch(e) {
    setSearcbar(e.target.value);
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchbar === "") {
      toast.error("Empty search field!", {
        duration: 1000
      });
    } else {
      navigate(`/search-products?query=${searchbar}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    await clearCart();
    navigate("/login");
  };

  return (
    <>
      <header className="sticky top-0 z-100">
        <div className=" md:flex-nowrap  flex-wrap shadow-xl flex  items-center md:py-2 w-full  rounded-b-[5px]  text-titleColor font-navbarFont justify-between bg-primaryColor md:px-5 p-2 ">
          <div className=" block">
            <button onClick={toggleMenuDrawer} className="cursor-pointer">
              <FaBars className=" text-[18px] mt-1.5 hover:scale-110 text-white" />
            </button>
          </div>

          {/* Menu Drawer */}
          {drawerOpen && (
            <div
              onClick={toggleMenuDrawer}
              className="fixed inset-0 bg-black opacity-50 z-20 transition-all duration-200 ease-in-out"
            ></div>
          )}
          <MenuDrawer
            drawerOpen={drawerOpen}
            toggleMenuDrawer={toggleMenuDrawer}
            toggleCartDrawer={toggleCartDrawer}
            allCategories={allCategories}
          />

          {/* logo */}
          <Link
            to="/"
            className="md:order-1 order-2"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="logo cursor-pointer"> Logo/Name </div>
          </Link>

          {/*  input & search icon */}
          <form
            onSubmit={handleSearchSubmit}
            className=" flex mx-4 md:mt-auto mt-2 relative w-full md:w-auto md:order-2 order-last "
          >
            <input
              type="text"
              onChange={handleSearch}
              value={searchbar}
              placeholder="What Are You Looking for....."
              className="bg-titleColor rounded-[28px] w-full md:max-w-[720px] md:min-w-[320px]  border-none text-sm font-poppins text-black sm:px-6 px-2  py-2  sm:placeholder-gray-400 placeholder-opacity-10 sm:placeholder:text-[11px] placeholder:text-[10px] focus:outline-none "
            />

            <button type="submit">
              <BsSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:scale-120 cursor-pointer md:text-xl text-[14px]" />
            </button>
          </form>

          {/* selectC3ategory */}
          <div className="order-3 hidden lg:block cursor-pointer">
            <Categorybutton allCategories={allCategories} />
          </div>

          {/* Sign Up  */}
          <div className="hidden md:block md:order-4 md:text-xl text-lg order-1">
            {user ? (
              <button
                onClick={handleLogout}
                className="hover:border-gray-300 hover:border-b-2 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "border-gray-300 border-b-2 "
                    : " hover:border-b-2 hover:border-gray-300 "
                }
              >
                Sign In
              </NavLink>
            )}
          </div>
          <div className=" order-5 md:text-xl text-lg hidden md:block">
            <button
              onClick={scrollToFooter}
              className="hover:border-gray-300 hover:border-b-2 cursor-pointer"
            >
              Contact Us
            </button>
          </div>

          {/* Cart */}
          <div className="order-6">
            <div
              onClick={toggleCartDrawer}
              className="relative flex items-center hover:scale-110 mr-2 transition-transform ease-in-out duration-100 cursor-pointer"
            >
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-0 z-2 bg-amber-500  text-white md:text-xs text-[9px] font-bold px-2 py-0.5 rounded-full font-primary">
                  {cartItemCount}
                </span>
              )}
              <div>
                <BsCart className="md:text-3xl text-2xl text-white" />
              </div>
            </div>
          </div>

          {/* Cart Drawer */}
          {cartDrawerOpen && (
            <div
              onClick={toggleCartDrawer}
              className="fixed inset-0 bg-black opacity-50 z-20 transition-all duration-200 ease-in-out"
            ></div>
          )}
          <CartDrawer
            cartDrawerOpen={cartDrawerOpen}
            toggleCartDrawer={toggleCartDrawer}
          />
        </div>
      </header>
    </>
  );
}

export default Navbar;
