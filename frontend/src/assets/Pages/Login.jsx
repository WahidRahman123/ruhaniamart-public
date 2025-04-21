import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "sonner";
import { CartContext } from "../../context/CartContextProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user, guestId } = useContext(AuthContext);
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
    const data = await login({ email, password });
    if (data.message && data.success === false) {
      toast.error(data.message, {
        style: { backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none' }
      });
    } else {
      toast.success("Login Successful!", {
        style: {backgroundColor: '#1bb33e', color: '#FFFFFF', border: 'none'}
      });
    }
    
  };

  return (
    <section className="flex justify-center items-center  flex-col font-poppins mt-10">
      <h1 className="font-primary md:text-[36px] text-[24px] tracking-[3px] font-bold">
        Log in to Your Account
      </h1>
      <form className="flex  flex-col mt-3" onSubmit={handleSubmit}>
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
          placeholder="Enter Your A Password"
          className="bg-white rounded-[10px] w-full p-2 mt-3 shadow-inner shadow-gray-400    placeholder:text-center placeholder:font-poppins placeholder:text-gray-400 placeholder:text-[14px]"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-primaryColor text-white font-poppins w-full text-center p-2 mt-3 rounded-[16px] font-bold text-xl hover:bg-green-700 hover:scale-102 transition-all duration-200 cursor-pointer"
        >
          {loading ? "Loggin in..." : "Log In"}
        </button>
        <p className="text-white font-bold font-poppins text-[14px] text-center ">
          Didn’t Have an account
          <Link
            to={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="text-primaryColor ml-1 mr-1 hover:border-b-2"
          >
            Register Here
          </Link>
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

export default Login;
