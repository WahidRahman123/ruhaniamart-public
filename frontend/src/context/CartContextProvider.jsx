import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [] });
    const [loading, setLoading] = useState(false);
    
    // Load Cart from localStorage
    const loadCartFromStorage = () => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : { products: [] };
    }

    // Save Cart to localStorage
    const saveCartToStorage = (cart) => {
        localStorage.setItem('cart',JSON.stringify(cart));
    }

    // Fetch cart for a user or guest
    const fetchCart = async ({ userId, guestId }) => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/cart`, {
                params: { userId, guestId }
            });
            setCart(response.data);
            saveCartToStorage(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Add an item to the cart for a user or guest
    const addToCart = async ({ productId, quantity, guestId, userId }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/cart`, {
                productId,
                quantity,
                guestId,
                userId
            });

            setCart(response.data);
            saveCartToStorage(response.data);

            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Update the quantity of an item in the cart
    const updateCartItemQuantity = async ({ productId, quantity, guestId, userId }) => {
        setLoading(true);
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/cart`, {
                productId,
                quantity,
                guestId,
                userId
            });

            setCart(response.data);
            saveCartToStorage(response.data);

            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    // Remove an item from the cart
    const removeFromCart = async ({ productId, guestId, userId }) => {
        setLoading(true);
        try {
            const response = await axios({
                method: 'DELETE',
                url: `${import.meta.env.VITE_BACKEND_URI}/api/cart`,
                data: { productId, guestId, userId }
            })

            setCart(response.data);
            saveCartToStorage(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // Merge guest cart into user cart
    const mergeCart = async ({ guestId, user }) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/cart/merge`, { guestId, user }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                }
            });

            setCart(response.data);
            saveCartToStorage(response.data);
            return response.data;
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const clearCart = () => {
        setCart({ products: [] });
        localStorage.removeItem('cart');
    }

    useEffect(() => {
        setCart(loadCartFromStorage());
    }, [])

  return (
    <CartContext.Provider value={{ loadCartFromStorage, saveCartToStorage, fetchCart, addToCart, updateCartItemQuantity, removeFromCart, mergeCart, clearCart, cart, loading }}>
        {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;