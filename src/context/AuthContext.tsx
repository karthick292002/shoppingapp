// Authentication Context - Demonstrates Context API for user session management
// Mock authentication system for demo purposes

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface User {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const MOCK_USERS = [
  { id: 1, email: "admin@shopverse.com", password: "admin123", name: "Admin User", isAdmin: true },
  { id: 2, email: "user@shopverse.com", password: "user123", name: "John Doe", isAdmin: false },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Demonstrates useEffect for side effects - checking localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("shopverse_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("shopverse_user");
      }
    }
  }, []);

  // Demonstrates useCallback for memoized async function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("shopverse_user", JSON.stringify(userWithoutPassword));
      toast({
        title: "Welcome back!",
        description: `Logged in as ${foundUser.name}`,
      });
      return true;
    }

    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("shopverse_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  }, []);

  // Demonstrates useCallback for registration
  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if user already exists
    if (MOCK_USERS.some((u) => u.email === email)) {
      toast({
        title: "Registration failed",
        description: "User with this email already exists",
        variant: "destructive",
      });
      return false;
    }

    // Create new user (in real app, this would be an API call)
    const newUser = {
      id: MOCK_USERS.length + 1,
      email,
      name,
      isAdmin: false,
    };

    setUser(newUser);
    localStorage.setItem("shopverse_user", JSON.stringify(newUser));
    toast({
      title: "Registration successful",
      description: `Welcome to ShopVerse, ${name}!`,
    });
    return true;
  }, []);

  // Demonstrates useMemo for computed values
  const isAuthenticated = useMemo(() => user !== null, [user]);
  const isAdmin = useMemo(() => user?.isAdmin ?? false, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isAdmin,
      login,
      logout,
      register,
    }),
    [user, isAuthenticated, isAdmin, login, logout, register]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
