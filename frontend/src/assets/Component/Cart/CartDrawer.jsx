import React, { useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContent from "./CartContent";
import { AuthContext } from "../../../context/AuthContextProvider";
import { CartContext } from "../../../context/CartContextProvider";

const CartDrawer = ({ cartDrawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const userId = user ? user._id : null;

  const handleCheckout = (e) => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        cartDrawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button */}
      <div className="flex justify-end p-4">
        <button>
          <IoMdClose
            onClick={toggleCartDrawer}
            className="cursor-pointer h-6 w-6 text-gray-600"
          />
        </button>
      </div>

      {/* Cart Contents with scrollable area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl mb-4 font-bold text-gray-800 font-sans tracking-[5%] select-none">
          Your Cart
        </h2>
        {/* Component for Cart Contents */}
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p className="text-lg tracking-wide text-red-900 font-sans bg-gray-200 px-2 py-1 inline-block select-none">Your cart is empty!!</p>
        )}
      </div>

      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="w-full bg-primaryColor text-white cursor-pointer py-3 font-bold font-sans tracking-[5%]"
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center font-sans ">
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
