// Cart Item Component - Demonstrates controlled components and state updates
// Uses React.memo for optimization

import { memo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

// Demonstrates React.memo to avoid re-rendering all cart items when one changes
const CartItem = memo(({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{item.category}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2 border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecrement}
                  disabled={item.quantity <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-12 text-center font-medium">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleIncrement}
                  disabled={item.quantity >= item.stock}
                  className="h-8 w-8"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-primary">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

CartItem.displayName = "CartItem";

export default CartItem;
