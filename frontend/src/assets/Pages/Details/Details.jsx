import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { AuthContext } from "../../../context/AuthContextProvider";
import { CartContext } from "../../../context/CartContextProvider";

function Details({ product }) {
  const { user, guestId } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [mainImage, setMainImage] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddToCart = async () => {
    setIsButtonDisabled(true);
    try {
      await addToCart({
        productId: product._id,
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

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product.name]);
  return (
    <>
      <section className="mt-10 mx-8 justify-center flex">
        {/* image/productname */}

        <div className="flex md:flex-row flex-col justify-center items-center gap-8  md:w-[100%] border-gray-400 lg:justify-evenly">
          <div className="flex">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {product.images.slice(0, 3).map((image, index) => (
                <img
                  src={image.url.replace("/upload", "/upload/w_150")}
                  alt={image.altText || `Thumbnail ${index}`}
                  key={index}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    mainImage === image.url
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="border-[2px] border-primaryColor flex justify-center items-center overflow-hidden bg-bg rounded w-[300px] md:w-[360px] ">
              <img
                src={mainImage.replace("/upload", "/upload/f_auto,q_auto,w_360")}
                alt="Main Image"
                className="bg-bg object-cover h-[300px] md:h-[360px]"
              />
            </div>
          </div>

          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overscroll-x-contain space-x-4 mb-4">
            {product.images.map((image, index) => (
              <img
                src={image.url.replace("/upload", "/upload/f_auto,q_auto,w_150")}
                alt={image.altText || `Thumbnail ${index}`}
                key={index}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                  mainImage === image.url
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* productname */}
          <div className="flex flex-col md:max-w-[400px]">
            <p className="font-title tracking-[10%] font-bold text-3xl">
              {product.name}
            </p>

            {product.countInStock ? (
              <>
                {product.price === product.discountPrice ? (
                  <p className="font-bold font-money tracking-widest mt-2 flex items-center justify-start">
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
                  onClick={handleAddToCart}
                  className={`mt-[10px] rounded-[6px] bg-primaryColor text-white p-2 text-[16px] font-bold ${
                    isButtonDisabled
                      ? "cursor-not-allowed"
                      : "cursor-pointer hover:bg-green-700 hover:scale-102 transition-all duration-100"
                  }`}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? "Adding..." : "Add To Cart"}
                </button>
              </>
            ) : (
              <div className="bg-[#85C7C6] select-none text-gray-700 mt-3 w-45 text-center px-2 py-2 font-bold">Out of Stock</div>
            )}
          </div>
        </div>
      </section>
      <hr className="mt-10 border-t-2 border-primaryColor" />
    </>
  );
}

export default Details;
