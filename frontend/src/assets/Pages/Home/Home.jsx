import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Category from "./Category";
import Product from "./Product";
import { useLocation } from "react-router-dom";

function Home() {
  //* For remembering last visited page
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);
  }, [location]);
  return (
    <>
      <div className="overflow-x-hidden">
        <Hero />
        <Category />
        <Product />
      </div>
    </>
  );
}

export default Home;
