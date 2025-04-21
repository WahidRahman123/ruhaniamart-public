import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./assets/Component/Navbar";
import Footer from "./assets/Component/Footer";
import { Toaster } from "sonner";
import { CommonContext } from "./context/CommonContextProvider";

function App() {
  const [allCategories, setAllCategories] = useState(null);
  const { fetchAllCategory } = useContext(CommonContext);
  useEffect(() => {
    (async () => {
      const categories = await fetchAllCategory();
      setAllCategories(categories);
    })();
  }, []);
  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex flex-col">
        <Navbar allCategories={allCategories} />
        <Outlet />
        <Footer allCategories={allCategories} />
      </div>
    </>
  );
}

export default App;
