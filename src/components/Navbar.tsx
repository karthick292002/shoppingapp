// Navigation Bar Component - Demonstrates component composition and routing
// Uses React Router's Link and useLocation hooks

import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Home, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { memo } from "react";

// Demonstrates React.memo to prevent unnecessary re-renders
const Navbar = memo(() => {
  const { cartCount } = useCart();
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
            ShopVerse
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>

          {isAdmin && (
            <Link to="/admin">
              <Button
                variant={isActive("/admin") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
          )}

          <Link to="/cart">
            <Button
              variant={isActive("/cart") ? "default" : "ghost"}
              size="sm"
              className="gap-2 relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Button>
          </Link>

          {isAuthenticated ? (
            <Button onClick={logout} variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          ) : (
            <Link to="/auth">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
