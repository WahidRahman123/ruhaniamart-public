import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "sonner";
import { CartContext } from "../../context/CartContextProvider";

function Registration() {
  const { register, loading, user, guestId } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, mergeCart } = useContext(CartContext);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || localStorage.getItem("lastPage");
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    (async () => {
      if (user) {
        if (cart?.products.length > 0 && guestId) {
          await mergeCart({ guestId, user });
          navigate(isCheckoutRedirect ? "/checkout" : redirect);
        } else {
          navigate(isCheckoutRedirect ? "/checkout" : redirect);
        }
      }
    })();
  }, [user, guestId, cart, navigate, isCheckoutRedirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await register({ name, email, password });
    if (data.message && data.success === false) {
      toast.error(data.message, {
        style: { backgroundColor: "#E14D45", color: "#FFFFFF", border: "none", fontSize: "1rem" },
      });
    } else {
      toast.success("Registration Successful!", {
        style: { backgroundColor: "#2ECC71", color: "#FFFFFF", border: "none", fontSize: "1rem" },
      });
    }
  };

  return (
    <section className="flex justify-center items-center  flex-col font-poppins mt-10 ">
      <h1 className="font-primary md:text-[36px] text-[24px] tracking-[5px] font-bold">
        Register Your Account
      </h1>
      <form className="flex  flex-col mt-3" onSubmit={handleSubmit}>
        <p className=" text-[12px] font-bold">
          Register With E-mail / Phone Number
        </p>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your full Name"
          className="bg-white rounded-[10px] w-full p-2 mt-3 shadow-inner shadow-gray-400  placeholder:text-center placeholder:font-poppins placeholder:text-[14px] placeholder:text-gray-400"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@gmail.com"
          className="bg-white rounded-[10px] w-full p-2 mt-3  shadow-inner  shadow-gray-200 placeholder:text-center placeholder:font-poppins placeholder:text-gray-400 placeholder:text-[14px]"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create A Password"
          className="bg-white rounded-[10px] w-full p-2 mt-3 shadow-inner shadow-gray-400    placeholder:text-center placeholder:font-poppins placeholder:text-gray-400 placeholder:text-[14px]"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-center p-2 mt-3 rounded-[16px] font-poppins  font-bold text-xl ${loading ? 'bg-[#3fbf78] text-gray-300 cursor-progress': 'bg-primaryColor text-white  hover:bg-green-700 hover:scale-102 transition-all duration-200 cursor-pointer'}`}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-white font-bold font-poppins text-[14px] text-center ">
          Already Have an account
          <Link
            to={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="text-primaryColor ml-1 mr-1 hover:border-b-2"
          >
            Log In
          </Link>
          Now
        </p>
        <p className="text-[11px] font-poppins mt-8 mb-10">
          By registering you with our
          <Link to="/terms&conditon" className="text-red-400 mx-1 border-b-1">
            Terms and Conditions
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Registration;
