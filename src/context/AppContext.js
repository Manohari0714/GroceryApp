import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { INITIAL_PRODUCTS, SEED_USERS } from '../data/products';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users, setUsers] = useState(SEED_USERS);
  const [user, setUser] = useState(null); // logged in user
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [favorites, setFavorites] = useState([]); // product ids
  const [cart, setCart] = useState([]); // [{ id, qty }]

  // ---------- Auth ----------
  const signUp = useCallback(
    ({ name, email, password, phone, role }) => {
      const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (exists) return { ok: false, message: 'An account with this email already exists' };
      const newUser = {
        id: `u-${Date.now()}`,
        role,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        phone: phone.trim(),
        address: '',
      };
      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      setFavorites([]);
      setCart([]);
      return { ok: true };
    },
    [users]
  );

  const signIn = useCallback(
    ({ email, password, role }) => {
      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (!found) return { ok: false, message: 'Invalid email or password' };
      if (found.role !== role)
        return { ok: false, message: `This account is not registered as ${role}` };
      setUser(found);
      setFavorites([]);
      setCart([]);
      return { ok: true };
    },
    [users]
  );

  const signOut = useCallback(() => {
    setUser(null);
    setFavorites([]);
    setCart([]);
  }, []);

  const updateProfile = useCallback(
    (changes) => {
      const updated = { ...user, ...changes };
      setUser(updated);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    },
    [user]
  );

  // ---------- Products (admin) ----------
  const addProduct = useCallback((p) => {
    setProducts((prev) => [{ ...p, id: `p-${Date.now()}`, rating: 4.0, bg: '#E8F5EC' }, ...prev]);
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.id !== id));
    setFavorites((prev) => prev.filter((f) => f !== id));
  }, []);

  // ---------- Favorites ----------
  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));
  }, []);

  // ---------- Cart ----------
  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((c) => c.id === id);
      if (found) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      return [...prev, { id, qty }];
    });
  }, []);

  const addManyToCart = useCallback((ids) => {
    setCart((prev) => {
      let next = [...prev];
      ids.forEach((id) => {
        const found = next.find((c) => c.id === id);
        if (found) next = next.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
        else next.push({ id, qty: 1 });
      });
      return next;
    });
  }, []);

  const increment = useCallback((id) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c)));
  }, []);

  // Subtract: removes the item when quantity reaches 0
  const decrement = useCallback((id) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartItems = useMemo(
    () =>
      cart
        .map((c) => {
          const product = products.find((p) => p.id === c.id);
          return product ? { ...product, qty: c.qty } : null;
        })
        .filter(Boolean),
    [cart, products]
  );

  const cartCount = useMemo(() => cart.reduce((s, c) => s + c.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cartItems.reduce((s, i) => s + i.price * i.qty, 0),
    [cartItems]
  );

  const value = {
    user,
    products,
    favorites,
    cartItems,
    cartCount,
    cartTotal,
    signUp,
    signIn,
    signOut,
    updateProfile,
    addProduct,
    deleteProduct,
    toggleFavorite,
    addToCart,
    addManyToCart,
    increment,
    decrement,
    removeFromCart,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
