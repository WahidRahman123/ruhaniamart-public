import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContextProvider";

function PaymentAError() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate]);
  return (
    user && (
      <div className="flex flex-col justify-center items-center mt-15">
        <p className=" mb-8 text-[48px] font-poppins font-bold tracking-wider text-red-500 ">
          Order Failed!
        </p>
        <p className="md:text-[36px] text-[24px] font-poppins font-bold tracking-[5%] ">
          Something Error Happend
        </p>
        <Link to="/">
          {" "}
          <button
            type="submit"
            className="bg-primaryColor text-white font-poppins w-full text-center p-2 px-10 mt-5 mb-16 rounded-[16px] font-bold text-xl hover:bg-green-700  hover:scale-102 transition-all duration-200 cursor-pointer"
          >
            Go to Home
          </button>{" "}
        </Link>
      </div>
    )
  );
}

export default PaymentAError;
