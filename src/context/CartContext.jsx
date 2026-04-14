import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { products } from "../data/products";
import { readStorage, storageKeys, writeStorage } from "../utils/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { currentUser, isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const cartStorageKey = currentUser
    ? `${storageKeys.cart}_${currentUser.id}`
    : storageKeys.cart;
  const wishlistStorageKey = currentUser
    ? `${storageKeys.wishlist}_${currentUser.id}`
    : storageKeys.wishlist;

  useEffect(() => {
    if (!currentUser) {
      setCartItems([]);
      setWishlist([]);
      return;
    }

    setCartItems(readStorage(cartStorageKey, []));
    setWishlist(readStorage(wishlistStorageKey, []));
  }, [cartStorageKey, currentUser, wishlistStorageKey]);

  useEffect(() => {
    if (currentUser) {
      writeStorage(cartStorageKey, cartItems);
    }
  }, [cartItems, cartStorageKey, currentUser]);

  useEffect(() => {
    if (currentUser) {
      writeStorage(wishlistStorageKey, wishlist);
    }
  }, [currentUser, wishlist, wishlistStorageKey]);

  const addToCart = (product) => {
    if (!currentUser) {
      return { ok: false, message: "Login to add products to your cart." };
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    return { ok: true };
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (productId) => {
    if (!currentUser) {
      return { ok: false, message: "Login to save wishlist items." };
    }

    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    return { ok: true };
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const wishlistItems = useMemo(
    () => products.filter((product) => wishlist.includes(product.id)),
    [wishlist]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const shipping = cartItems.length ? 12 : 0;
  const total = subtotal + shipping;
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        canCheckout: isAuthenticated,
        cartCount,
        cartItems,
        clearCart,
        removeFromCart,
        shipping,
        subtotal,
        toggleWishlist,
        total,
        updateQuantity,
        wishlist,
        wishlistItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
