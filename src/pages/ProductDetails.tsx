// Product Details Page - Demonstrates useParams hook and detailed product view
// Shows how to fetch and display individual product information

import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Package, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductDetails = () => {
  // Demonstrates useParams to get URL parameters
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Find product by ID
  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Product Not Found</h2>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          <Link to="/">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-warning text-warning"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-5xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Package className="h-5 w-5 text-primary" />
                <span>
                  <strong>{product.stock}</strong> units in stock
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>2-year warranty included</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                size="lg"
                className="w-full gap-2 text-lg h-14"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              
              {product.stock > 0 && product.stock < 10 && (
                <p className="text-sm text-warning text-center">
                  ⚠️ Only {product.stock} left in stock - order soon!
                </p>
              )}
            </div>

            {/* Additional Info */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Product Highlights</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Premium quality materials</li>
                  <li>✓ Latest technology</li>
                  <li>✓ Exceptional performance</li>
                  <li>✓ 30-day money-back guarantee</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
