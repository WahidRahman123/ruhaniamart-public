import React, { useContext, useEffect, useState } from "react";
import Details from "./Details";
import Review from "./Review";
import Moredetails from "./Moredetails";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import SimilarProducts from "../SimilarProducts";
import AuthContextProvider, { AuthContext } from "../../../context/AuthContextProvider";

const url = import.meta.env.VITE_BACKEND_URI;

function Fulldetails() {
  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerUseEffect, setTriggerUseEffect] = useState(false);
  
  //* For remembering last visited page
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);
  }, [location]);


  useEffect(() => {
    const fetchData = async () => {
      
      try {
        setIsLoading(true);
        const res1 = await axios.get(`${url}/api/products/${id}`);
        const res2 = await axios.get(`${url}/api/products/similar/${id}`);

        setProduct(res1.data);
        // console.log(product)
        setSimilarProducts(res2.data);
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [id, triggerUseEffect]);

  return isLoading ? (
    <div className="min-h-[30dvh] flex items-center justify-center text-2xl font-bold text-gray-700 select-none">
      Loading...
    </div>
  ) : (
    product ? (
      <div>
        <Details product={product} />
        <Moredetails product={product} triggerUseEffect={triggerUseEffect} setTriggerUseEffect={setTriggerUseEffect}/>
        {/* <Review /> */}
        <SimilarProducts similarProducts={similarProducts} />
      </div>
    ) : (
      <div></div>
    )
  )
}

export default Fulldetails;
