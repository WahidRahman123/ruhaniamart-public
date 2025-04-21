import React, { useContext, useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { CartContext } from "../../../context/CartContextProvider";

const CartContent = ({ cart, userId, guestId }) => {
  const { updateCartItemQuantity, removeFromCart } = useContext(CartContext);

  // Handle adding or subtracting to cart
  const handleAddToCart = async (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      await updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId,
      });
    }
  };

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart({
      productId,
      guestId,
      userId,
    });
  };

  return (
    <>
    {cart.products.map((product, index) => (
      <div
        key={index}
        className="flex items-center gap-4 py-4 border-b border-gray-200"
      >
        <img
          src={product.image.replace("/upload", "/upload/w_150")}
          className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-lg"
          alt={product.name}
        />

        <div className="flex-1 min-w-0 font-sans">
          <h3 className="font-semibold text-gray-800 tracking-[5%] truncate">{product.name}</h3>
          
          <p className="text-black tracking-tighter mt-1">TK {product.price.toLocaleString()}</p>

          <div className="flex items-center mt-3 gap-2">
            <button
              onClick={() => handleAddToCart(product.productId, -1, product.quantity)}
              className="border text-black border-gray-300 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 text-gray-800 font-semibold tracking-[5%] text-center">{product.quantity}</span>
            <button
              onClick={() => handleAddToCart(product.productId, 1, product.quantity)}
              className="border text-black border-gray-300 rounded-md w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => handleRemoveFromCart(product.productId)}
          className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
          aria-label="Remove item"
        >
          <RiDeleteBin3Line className="h-5 w-5" />
        </button>
      </div>
    ))}
  </>
  );
};

export default CartContent;
