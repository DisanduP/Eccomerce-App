import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart');
      setCartItems(response.data.cartItems);
      setTotal(response.data.total);
      setItemCount(response.data.itemCount);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post('/api/cart/add', { productId, quantity });
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to add to cart'
      };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await axios.put(`/api/cart/update/${itemId}`, { quantity });
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to update cart'
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`/api/cart/remove/${itemId}`);
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to remove from cart'
      };
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear');
      await fetchCart(); // Refresh cart
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to clear cart'
      };
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cartItems,
    total,
    itemCount,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
