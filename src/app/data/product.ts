// data/products.ts
import { Product } from '@/context/CartContext';

export const PRODUCTS: Product[] = [
  { id: '1', name: 'Tikka Burger', price: 250, category: 'Burgers', image: 'https://placehold.co/100x100?text=Burger' },
  { id: '2', name: 'Zinger Combo', price: 450, category: 'Fast Food', image: 'https://placehold.co/100x100?text=Zinger' },
  { id: '3', name: 'Pepsi 1.5L', price: 120, category: 'Drinks', image: 'https://placehold.co/100x100?text=Pepsi' },
  { id: '4', name: 'Chicken Pizza', price: 800, category: 'Pizza', image: 'https://placehold.co/100x100?text=Pizza' },
  { id: '5', name: 'French Fries', price: 150, category: 'Sides', image: 'https://placehold.co/100x100?text=Fries' },
  { id: '6', name: 'Veggie Burger', price: 200, category: 'Burgers', image: 'https://placehold.co/100x100?text=Veggie' },
];
