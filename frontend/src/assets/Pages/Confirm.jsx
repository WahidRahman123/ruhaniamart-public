import { useContext, useEffect } from "react";
import { LuCircleCheckBig } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { CheckoutContext } from "../../context/CheckoutContextProvider";
import { CartContext } from "../../context/CartContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

export default function Confirm() {
  const navigate = useNavigate();
  const { checkout } = useContext(CheckoutContext);
  const { clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if(user) {
      if (checkout && checkout._id) {
        clearCart();
        localStorage.removeItem("cart");
      } else {
        navigate("/myprofile");
      }
    } else { 
      navigate('/');
    }
  }, [checkout, navigate]);

  return user && (
    <div className="flex flex-col items-center justify-center mt-5 p-6 pt-2">
      <div className=" rounded-4xl  text-center max-w-lg">
        <LuCircleCheckBig className="text-primaryColor md:text-7xl text-5xl mx-auto" />
        <h2 className="md:text-[36px] text-[28px] font-bold  mt-4 text-primaryColor font-primary">
          Your Order is Received
        </h2>
        <p className="md:text-[28px] text-[24px] font-bold mt-4  font-primary">
          One of our sales representative will call you to cofirmed your Order
        </p>

        {checkout && (
          <>
            <p className="text-[18px] font-bold text-gray-700 mt-6">
              Your Order Invoice Number:{" "}
              <span className="text-blue-600 font-bold">#{checkout._id}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
