import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";
import { CheckoutContext } from "../../context/CheckoutContextProvider";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, loading, updateCartItemQuantity, removeFromCart } =
    useContext(CartContext);
  const { createCheckout } = useContext(CheckoutContext);
  const { user, guestId } = useContext(AuthContext);
  const [checkoutId, setCheckoutId] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    deliveryLocation: "",
    phone: "",
  });
  const radioItems = [
    { value: "Bkash", label: "Bkash" },
    { value: "Cash on Delivery", label: "Cash on Delivery" },
  ];
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
    setTotal(Math.round(cart.totalPrice) + deliveryCharge);
  }, [cart, navigate, deliveryCharge]);
  
  

  //* Handle adding or subtracting to cart
  const handleAddToCart = async (productId, delta, quantity) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      await updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        guestId,
        userId: user._id,
      });
    }
  };

  const handleRemoveFromCart = async (productId) => {
    await removeFromCart({
      productId,
      guestId,
      userId: user._id,
    });
  };

  //* Handling checkout
  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
        paymentMethod,
        totalPrice: total,
      });

      if (res && res._id) {
        setCheckoutId(res._id); // Set checkout ID if checkout was successful
      }
    }
  };

  //* This should be run after a payment from bkash or other option is successfull
  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId); //* Finalize checkout if payment is successful
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      //* countInStock decreasing
      
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  const handleBkashOrder = async () => {
    try {
      //* Bkash payment code
      //* then confirmation
      let details = "details";
      await handlePaymentSuccess(details);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCashOnDelivery = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URI
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation"); // Redirect after successful checkout
    } catch (error) {
      console.error("Cash on Delivery failed:", error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <section>
      <div className="flex flex-col-reverse md:flex-row gap-6 p-6 bg-gray-100 min-h-screen">
        {/* Form Section */}
        <form
          onSubmit={handleCreateCheckout}
          className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md "
        >
          <p className="m-1 tracking-[8%] font-title mt-2">Email:</p>
          <input
            type="text"
            placeholder=""
            value={user ? user.email : ""}
            className="mb-4 w-full p-2 border-primaryColor border-2 rounded select-none bg-gray-100 text-gray-600"
            disabled
          />
          <p className="m-1 tracking-[8%] font-title mt-2">Full Name:</p>
          <input
            type="text"
            placeholder=""
            required
            value={shippingAddress.name}
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, name: e.target.value })
            }
            className="mb-4 w-full p-2 border-primaryColor border-2 rounded focus:outline-none"
          />
          <p className="m-1 tracking-[8%] font-title mt-2">Mobile Number:</p>
          <input
            type="tel"
            placeholder=""
            required
            value={shippingAddress.phone}
            pattern="^01\d{9}$"
            onChange={(e) =>
              setShippingAddress({ ...shippingAddress, phone: e.target.value })
            }
            className=" w-full p-2 border-primaryColor border-2 rounded focus:outline-none"
          />
          <small className="text-gray-700 select-none">
            Format: 01XXXXXXXXX (11 digits)
          </small>
          <p className="m-1 tracking-[8%] font-title mt-2">Full Address:</p>
          <input
            type="text"
            placeholder=""
            required
            value={shippingAddress.address}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                address: e.target.value,
              })
            }
            className="mb-4 w-full p-2 rounded border-primaryColor border-2 focus:outline-none"
          />
          <p className="m-1 tracking-[8%] font-title mt-2">
            Delivery Location:
          </p>
          <select
            value={shippingAddress.deliveryLocation}
            onChange={(e) => {
              setShippingAddress({
                ...shippingAddress,
                deliveryLocation: e.target.value,
              });
              if(e.target.value === "Inside Dhaka") return setDeliveryCharge(60);
              if(e.target.value === "Outside Dhaka") return setDeliveryCharge(150);
            }}
            required
            className="mb-4 w-full p-2 rounded border-primaryColor border-2 focus:outline-none"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Inside Dhaka">Inside Dhaka</option>
            <option value="Outside Dhaka">Outside Dhaka</option>
          </select>

          <p className="m-1 tracking-[8%] font-title mt-2">
            Select a payment option:
          </p>
          <div className="mb-3">
            {radioItems.map((item, index) => (
              <div className="mb-1 ml-2" key={index}>
                <input
                  name="paymentMethod"
                  type="radio"
                  value={item.value}
                  id={item.value}
                  checked={paymentMethod === item.value}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="ml-2" htmlFor={item.value}>
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          {!checkoutId ? (
            <button
              type="submit"
              className="mt-2 w-full bg-primaryColor hover:bg-green-700 text-white text-xl font-title text-bold p-2 rounded border-primaryColor border-2 focus:outline-none cursor-pointer"
            >
              Continue to Payment
            </button>
          ) : (
            <div>
              {paymentMethod === "Bkash" && (
                <h3
                  onClick={handleBkashOrder}
                  className="text-lg mb-4 w-full bg-[#DB126B] hover:bg-[#bd0f5c] text-white  font-title text-bold p-2 rounded border-primaryColor border-2 focus:outline-none cursor-pointer text-center select-none"
                >
                  Confirm Order with Bkash
                </h3>
              )}

              {/* You can add more orders like nagad, rocket etc. here. */}

              {paymentMethod === "Cash on Delivery" && (
                <h3
                  onClick={handleCashOnDelivery}
                  className="text-lg mb-4 w-full bg-blue-500 hover:bg-blue-700 text-white  font-title text-bold p-2 rounded border-primaryColor border-2 focus:outline-none cursor-pointer text-center select-none"
                >
                  Confirm Order with COD
                </h3>
              )}
            </div>
          )}
        </form>

        {/* Order Details Section */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-[1px]">
                  <th className="p-0.5 text-center font-title tracking font-normal"></th>

                  <th className="p-2 text-left font-title tracking font-normal">
                    Image
                  </th>
                  <th className="p-2 text-left font-title tracking font-normal">
                    Product
                  </th>
                  <th className=" p-2 text-center font-title tracking font-normal">
                    Quantity
                  </th>
                  <th className="p-2 text-right font-title tracking font-normal">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((product, index) => (
                  <tr key={index} className="font-title text-gray-600">
                    <td className="p-0.5 text-center">
                      <button
                        onClick={() => handleRemoveFromCart(product.productId)}
                        className="px-2 py-1 text-red-400 hover:text-red-600 cursor-pointer rounded"
                      >
                        <MdDeleteForever className="text-2xl" />
                      </button>
                    </td>
                    <td className="p-2">
                      <img
                        src={product.image.replace("/upload", "/upload/w_150")}
                        alt={product.name}
                        className="h-[40px] w-[40px] object-cover rounded"
                      />
                    </td>
                    <td className="p-2 tracking-[8%]">{product.name}</td>
                    <td className="p-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleAddToCart(
                              product.productId,
                              -1,
                              product.quantity
                            )
                          }
                          className="px-2 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-[16px] font-[400]">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleAddToCart(
                              product.productId,
                              1,
                              product.quantity
                            )
                          }
                          className="px-2 py-1 cursor-pointer bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-right text-[16px] tracking-wider">
                      {product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quantity Controls */}
          <div className="border-1 border-gray-300 p-4 pb-0 pt-3 flex justify-between items-center font-title mt-10">
            <div>
              <p className="font-title tracking-[8%] p-1">SubTotal</p>
              <p className="font-title tracking-[8%] p-1">Delivery Charge</p>
              <p className="font-title font-extrabold tracking-[6%] p-1 mt-2  ">
                Total
              </p>
            </div>
            <div>
              <p className="font-title tracking-[5%] p-1 text-center">
                <span className="text-[14px]">৳</span> {(Math.round(cart.totalPrice)).toLocaleString()}
              </p>
              <p className="font-title tracking-[5%] p- 1 text-center">
                <span className="text-[14px]">৳</span> {(deliveryCharge).toLocaleString()}
              </p>
              <p className="font-title font-extrabold tracking-[6%] p-1 mt-2  text-center">
                <span className="text-[14px]">৳</span>{" "}
                {(total).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
