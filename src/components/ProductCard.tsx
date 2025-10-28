// Product Card Component - Demonstrates component props and event handling
// Uses React.memo for performance optimization

import { memo } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

// Demonstrates React.memo to prevent re-rendering when props haven't changed
const ProductCard = memo(({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group h-full overflow-hidden border-border hover:shadow-card-hover transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {product.stock < 10 && (
            <Badge className="absolute top-2 right-2 bg-warning text-warning-foreground">
              Low Stock
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 fill-warning text-warning" />
              <span className="font-medium">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews})</span>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">
              {product.stock} in stock
            </p>
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="gap-2"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
