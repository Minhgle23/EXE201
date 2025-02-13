import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const userId = user.id ? parseInt(user.id) : null;
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const location = useLocation();


  // Fetch cart data from API if user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const response = await fetch('http://localhost:9999/carts');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const userCart = data.find(cart => cart.userId === userId);
          if (userCart) {
            const formattedCart = userCart.totalProducts.map(item => ({
              ...item.product,
              userQuantity: item.quantity,
            }));
            setCart(formattedCart);
          }
        } catch (error) {
          console.error('Error fetching cart data:', error);
        }
      }
    };

    fetchCart();
  }, [userId]);

  // Update total cart items and total price whenever the cart changes
  useEffect(() => {
    const newTotalCartItem = cart.reduce((acc, item) => acc + item.userQuantity, 0);
    const newTotalPrice = cart.reduce((acc, item) => {
      const totalProductPrice = item.price * item.userQuantity;
      return acc + totalProductPrice;
    }, 0);

    setTotalCartItem(newTotalCartItem);
    setTotalPrice(newTotalPrice.toFixed(2));

    // Save cart data to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Save or update cart in API if user is logged in
    if (userId) {
      saveOrUpdateCartInAPI(cart);
    }
  }, [cart, userId]);

  const saveOrUpdateCartInAPI = async (cart) => {
    const cartData = {
      userId: userId,
      totalProducts: cart.map(item => ({
        product: {
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
        },
        quantity: item.userQuantity,
      })),
    };

    try {
      const response = await fetch('http://localhost:9999/carts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const existingCart = data.find(cart => cart.userId === userId);

      if (existingCart) {
        const updateResponse = await fetch(`http://localhost:9999/carts/${existingCart.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        });

        if (!updateResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await updateResponse.json();
        console.log('Cart updated in API:', result);
      } else {
        const createResponse = await fetch('http://localhost:9999/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartData),
        });

        if (!createResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await createResponse.json();
        console.log('Cart saved to API:', result);
      }
    } catch (error) {
      console.error('Error saving or updating cart in API:', error);
    }
  };

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map(item =>
          item.id === product.id ? { ...item, userQuantity: item.userQuantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { ...product, userQuantity: 1 }];
      }
      return updatedCart;
    });
  };

  const clearCart = async () => {
    if (userId) {
      try {
        const response = await fetch('http://localhost:9999/carts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const existingCart = data.find(cart => cart.userId === userId);

        if (existingCart) {
          const deleteResponse = await fetch(`http://localhost:9999/carts/${existingCart.id}`, {
            method: 'DELETE',
          });

          if (!deleteResponse.ok) {
            throw new Error('Network response was not ok');
          }

          console.log('Cart deleted from API');
        }
      } catch (error) {
        console.error('Error deleting cart from API:', error);
      }
    }

    setCart([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    if (location.pathname === '/success') {
      clearCart();
    }
  }, [location]);


  const increaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, userQuantity: item.userQuantity + 1 } : item
      )
    );
  };
  
  const decreaseQuantity = (productId) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.userQuantity > 1 ? { ...item, userQuantity: item.userQuantity - 1 } : item
      )
    );
  };
  return (
    <CartContext.Provider value={{ cart, totalCartItem, totalPrice, addToCart, clearCart, increaseQuantity, decreaseQuantity }}>
    {children}
  </CartContext.Provider>
  );
};

export default CartContext;
