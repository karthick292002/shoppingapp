// Cart Page - Demonstrates cart management and useMemo for calculations
// Shows shopping cart items with update/remove functionality

import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { useMemo } from "react";

const Cart = () => {
  const { items, cartTotal, clearCart } = useCart();

  // Demonstrates useMemo to calculate shipping and tax
  const calculations = useMemo(() => {
    const subtotal = cartTotal;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }, [cartTotal]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 mx-auto rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
            <Button variant="ghost" onClick={clearCart} className="text-destructive">
              Clear Cart
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">Order Summary</h2>
                  
                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">
                        ${calculations.subtotal.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {calculations.shipping === 0 ? (
                          <span className="text-success">Free</span>
                        ) : (
                          `$${calculations.shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium">
                        ${calculations.tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {calculations.subtotal < 50 && (
                    <div className="bg-muted p-3 rounded-lg text-sm">
                      <p className="text-center">
                        Add ${(50 - calculations.subtotal).toFixed(2)} more for{" "}
                        <strong>free shipping</strong>! 🎉
                      </p>
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl text-primary">
                      ${calculations.total.toFixed(2)}
                    </span>
                  </div>

                  <Link to="/checkout">
                    <Button size="lg" className="w-full gap-2">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
