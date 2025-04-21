import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const OrderContext = createContext();

const OrderContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    
    // Fetch user orders
    const fetchUserOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/orders/my-orders`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
            setOrders(response.data);

            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Fetch user order details by ID
    const fetchOrderDetails = async (orderId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/orders/${orderId}`, 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
            setOrderDetails(response.data);

            return response.data;
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

  return (
    <OrderContext.Provider value={{ orders, totalOrders, orderDetails, loading, fetchUserOrders, fetchOrderDetails }}>
        {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;