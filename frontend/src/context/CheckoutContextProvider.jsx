import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CheckoutContext = createContext();

const CheckoutContextProvider = ({ children }) => {
    const [checkout, setCheckout] = useState(null);
    const [loading, setLoading] = useState(false);

    // Create a checkout session
    const createCheckout = async (checkoutdata) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/checkout`, checkoutdata, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            setCheckout(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <CheckoutContext.Provider value={{ checkout, createCheckout, loading }}>
        {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;