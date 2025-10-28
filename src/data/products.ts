// Mock product data for the e-commerce store
// Demonstrates data structure for React state management

import laptopImg from "@/assets/products/laptop-1.jpg";
import headphonesImg from "@/assets/products/headphones-1.jpg";
import phoneImg from "@/assets/products/phone-1.jpg";
import keyboardImg from "@/assets/products/keyboard-1.jpg";
import watchImg from "@/assets/products/watch-1.jpg";
import mouseImg from "@/assets/products/mouse-1.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium Laptop Pro",
    description: "High-performance laptop with 16GB RAM, 512GB SSD, and stunning 4K display. Perfect for professionals and content creators.",
    price: 1299.99,
    image: laptopImg,
    category: "Laptops",
    stock: 15,
    rating: 4.8,
    reviews: 342,
  },
  {
    id: 2,
    name: "Wireless Headphones Elite",
    description: "Premium noise-cancelling headphones with 30-hour battery life and exceptional audio quality.",
    price: 299.99,
    image: headphonesImg,
    category: "Audio",
    stock: 48,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 3,
    name: "Smartphone X Pro",
    description: "Latest flagship smartphone with 5G connectivity, triple camera system, and all-day battery life.",
    price: 899.99,
    image: phoneImg,
    category: "Phones",
    stock: 32,
    rating: 4.9,
    reviews: 521,
  },
  {
    id: 4,
    name: "RGB Mechanical Keyboard",
    description: "Professional gaming keyboard with customizable RGB lighting and mechanical switches for precision typing.",
    price: 159.99,
    image: keyboardImg,
    category: "Accessories",
    stock: 67,
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 5,
    name: "Fitness Smartwatch",
    description: "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life.",
    price: 249.99,
    image: watchImg,
    category: "Wearables",
    stock: 41,
    rating: 4.5,
    reviews: 167,
  },
  {
    id: 6,
    name: "Wireless Gaming Mouse",
    description: "Ergonomic wireless mouse with customizable DPI settings and RGB lighting for gaming enthusiasts.",
    price: 79.99,
    image: mouseImg,
    category: "Accessories",
    stock: 95,
    rating: 4.7,
    reviews: 412,
  },
];
