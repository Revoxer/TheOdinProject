import { useState, useEffect } from "react";

const CART_KEY = "cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart-updated"));
}

export function useCart() {
  const [items, setItems] = useState(getCart);

  useEffect(() => {
    const sync = () => setItems(getCart());
    window.addEventListener("cart-updated", sync);
    return () => window.removeEventListener("cart-updated", sync);
  }, []);

  const addToCart = (plant) => {
    const current = getCart();
    const exists = current.find((i) => i.id === plant.id);
    const updated = exists
      ? current.map((i) =>
          i.id === plant.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [...current, { ...plant, quantity: 1 }];
    saveCart(updated);
    setItems(updated);
  };

  const updateQty = (id, delta) => {
    const updated = getCart()
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
      .filter((i) => i.quantity > 0);
    saveCart(updated);
    setItems(updated);
  };

  const remove = (id) => {
    const updated = getCart().filter((i) => i.id !== id);
    saveCart(updated);
    setItems(updated);
  };

  return { items, addToCart, updateQty, remove };
}
