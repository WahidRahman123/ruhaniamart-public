import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CommonContext = createContext();

const CommonContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchAllCategory = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/category`);
            setCategories(response.data);
            return response.data
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

  return (
    <CommonContext.Provider value={{ loading, fetchAllCategory, categories }}>
        {children}
    </CommonContext.Provider>
  );
};

export default CommonContextProvider;