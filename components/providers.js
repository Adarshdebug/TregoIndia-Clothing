"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const AuthContext = createContext(null);

const CART_KEY = "tregoindia-cart";

export function Providers({ children }) {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(CART_KEY);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch {
      window.localStorage.removeItem(CART_KEY);
    }
    document.documentElement.dataset.theme = "dark";

    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        setUser(data?.user || null);
      })
      .finally(() => setBooted(true));
  }, []);

  useEffect(() => {
    if (booted) {
      window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  }, [booted, cart]);

  const cartValue = useMemo(() => {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      cart,
      count,
      subtotal,
      addItem(item) {
        setCart((current) => {
          const found = current.find(
            (entry) => entry.productId === item.productId && entry.size === item.size
          );

          if (!found) {
            return [...current, item];
          }

          return current.map((entry) =>
            entry.productId === item.productId && entry.size === item.size
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry
          );
        });
      },
      updateQuantity(productId, size, quantity) {
        setCart((current) =>
          current
            .map((entry) =>
              entry.productId === productId && entry.size === size
                ? { ...entry, quantity: Math.max(1, quantity) }
                : entry
            )
            .filter((entry) => entry.quantity > 0)
        );
      },
      removeItem(productId, size) {
        setCart((current) =>
          current.filter((entry) => !(entry.productId === productId && entry.size === size))
        );
      },
      clearCart() {
        setCart([]);
      }
    };
  }, [cart]);

  const authValue = useMemo(
    () => ({
      user,
      booted,
      setUser
    }),
    [booted, user]
  );

  return (
    <AuthContext.Provider value={authValue}>
      <CartContext.Provider value={cartValue}>{children}</CartContext.Provider>
    </AuthContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

export function useAuth() {
  return useContext(AuthContext);
}
