import React, { createContext, useState } from "react";
import axios from "axios";

export const AdminOrderContext = createContext();

const AdminOrderContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setOrders(response.data);
      setTotalOrders(response.data.length);

      //* Calculating total sales
      const total = orders.reduce((acc, order) => {
        return acc + order.totalPrice;
      }, 0);

      setTotalSales(total);

      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrderStatus = async ({ id, status }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data)
      const updatedOrder = response.data;
      const orderIndex = orders.findIndex(
        (order) => order._id === updatedOrder._id
      );
      if (orderIndex !== -1) {
        setOrders((prev) =>
          prev.map((order, index) =>
            index === orderIndex ? updatedOrder : order
          )
        );
      }
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/api/admin/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setOrders(orders.filter((order) => order._id !== id));

      return id;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminOrderContext.Provider value={{ orders, totalOrders, totalSales, fetchAllOrders, updateOrderStatus, deleteOrder }}>
      {children}
    </AdminOrderContext.Provider>
  );
};

export default AdminOrderContextProvider;
