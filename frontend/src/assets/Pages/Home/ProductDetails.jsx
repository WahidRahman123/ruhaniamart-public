import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContextProvider";
import { CartContext } from "../../../context/CartContextProvider";
import { toast } from "sonner";

const url = import.meta.env.VITE_BACKEND_URI;

const ProductDetails = ({ categoryId }) => {
  const [products, setProducts] = useState("");
  const { user, guestId } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [pid, setPid] = useState(null);

  const handleAddToCart = async (e, id) => {
    setPid(id);
    e.stopPropagation();
    e.preventDefault();
    setIsButtonDisabled(true) 
    try {
      await addToCart({
        productId: id,
        quantity: 1,
        guestId,
        userId: user?._id,
      });

      toast.success("Product added to cart!", {
        duration: 1000,
      });
    } catch (error) {
      toast.error("Cannot added to the cart!", {
        duration: 1000,
      });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const fetchHomeProductData = async () => {
    const { data } = await axios.get(
      `${url}/api/products?categoryId=${categoryId}`
    );
    // console.log(data);
    setProducts(data);
  };
  useEffect(() => {
    fetchHomeProductData();
  }, []);
  return products.length ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 place-content-center place-items-center">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} reloadDocument>
          <div className="" key={product._id}>
            <div className="xl:h-[295px] xl:w-[196px] sm:h-[270px] sm:w-[165px] h-[235px] w-[140px] 2border-[2px] border-cardBorder hover:border-[3px] shadow-xs shadow-gray-500  mt-8  flex flex-col items-center justify-center hover:scale-102  cursor-pointer hover:border-primaryColor">
              <div className="xl:h-[150px] sm:h-[135px] h-[120px] xl:w-[150px] sm:w-[130px] w-[110px] border-[1px] border-primaryColor hover:border-3 flex justify-center items-center">
                <img
                  src={product.images[0].url.replace("/upload", "/upload/w_150")}
                  alt={product.images[0].altText || product.name}
                  className="xl:h-[140px] sm:h-[125px] h-[110px] xl:w-[140px] sm:w-[120px] w-[110px] object-cover"
                />
              </div>
              <p
                className="font-primary text-secondaryColor mt-2 font-[18px] text-center truncate w-28 sm:w-32 md:w-36"
                title={`${product.name}`}
              >
                {product.name}
              </p>

              {/* product Price */}
              {product.countInStock ? (
                <>
                  {product.price === product.discountPrice ? (
                    <p className="font-bold font-money tracking-widest mt-2 flex items-center justify-center">
                      <span className="text-lg font-extrabold">
                        Tk {product.price}
                      </span>
                      <span className="line-through text-gray-600 text-sm ml-1.5">
                        Tk {product.originalPrice}
                      </span>
                    </p>
                  ) : (
                    <p className="font-bold font-money tracking-widest mt-2 ">
                      <span className="font-money tracking-widest">
                        TK {product.price}
                      </span>
                    </p>
                  )}

                  <button
                    onClick={(e) => handleAddToCart(e, product._id)}
                    disabled={isButtonDisabled}
                    className={`mt-2 border-primaryColor border-1 rounded-4xl px-2 font-primary font-[16px] ${
                      isButtonDisabled && product._id === pid
                        ? "cursor-not-allowed text-gray-600"
                        : "cursor-pointer hover:bg-primaryColor hover:text-titleColor transition-all duration-100"
                    }`}
                  >
                    {isButtonDisabled && product._id === pid ? "Adding..." : "Add To Cart"}
                  </button>
                </>
              ) : (
                <>
                  <p className="mt-7">
                    <span className="font-bold font-sans text-red-600 tracking-wide">
                      Out Of Stock
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-[#404040] text-2xl rounded mt-2 drop-shadow-sm font-bold w-full min-h-30 flex justify-center items-center bg-[#7fc0bf] select-none">
      No Product Available
    </div>
  );
};

export default ProductDetails;
