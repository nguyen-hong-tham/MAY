import React, { createContext, useContext, useState, useEffect } from "react";

export type Topping = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  toppings?: Topping[];  // Topping với đầy đủ thông tin (id, name, price)
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "may_cart";

const isSameItem = (a: CartItem, b: CartItem) =>
  a.id === b.id && JSON.stringify(a.toppings ?? []) === JSON.stringify(b.toppings ?? []);

// Hàm lưu cart vào localStorage
const saveCartToStorage = (cart: CartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

// Hàm khôi phục cart từ localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Khôi phục cart từ localStorage khi load
  useEffect(() => {
    const savedCart = loadCartFromStorage();
    setCart(savedCart);
    setInitialized(true);
  }, []);

  // Lưu cart vào localStorage mỗi khi cart thay đổi
  useEffect(() => {
    if (initialized) {
      saveCartToStorage(cart);
    }
  }, [cart, initialized]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => isSameItem(i, item));
      if (existing) {
        return prev.map((i) =>
         isSameItem(i, item) ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) {
        return prev.filter((i) => !isSameItem(i, item));
      }

      return prev.map((i) =>
        isSameItem(i, item) ? { ...i, quantity } : i
      );
    });
  };

  const removeFromCart = (item: CartItem) => {
    setCart((prev) => prev.filter((i) => !isSameItem(i, item)));
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear cart from localStorage:", error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
