// Cart Context - Demonstrates Context API for global state management
// Used for managing shopping cart across the entire application

import React, { createContext, useContext, useState, useCallback, useMemo } from "react";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Demonstrates useCallback to prevent unnecessary re-renders
  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        toast({
          title: "Updated cart",
          description: `Increased quantity of ${product.name}`,
        });
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Demonstrates useCallback for optimized function reference
  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast({
          title: "Removed from cart",
          description: `${item.name} has been removed from your cart`,
          variant: "destructive",
        });
      }
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  // Demonstrates useCallback for memoized function
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  }, []);

  // Demonstrates useMemo to optimize expensive calculations
  const cartTotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // Demonstrates useMemo for computed values
  const cartCount = useMemo(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
