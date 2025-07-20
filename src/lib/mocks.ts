// lib/mocks.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  lastupdate?:string
}

export interface CartItem extends Product {
  quantity: number;
  total: number;
}

export interface Transaction {
  id: string;
  date: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
}

export interface Register {
  id: string;
  name: string;
}

export const MOCK_PRODUCT: Product[] = [
  {
    id: "p1", name: "Tikka Burger", price: 250.0, category: "BURGERS", image: "https://placehold.co/100x100/A0D9B0/000000?text=Burger",
    description: "A classic juicy chicken patty seasoned with rich tikka spices, served in a soft bun with fresh lettuce and sauce.",
  },
  {
    id: "p2", name: "Zinger Burger", price: 300.0, category: "BURGERS", image: "https://placehold.co/100x100/FFD700/000000?text=Zinger",
    description: "Crispy, succulent chicken fillet with a zesty coating, topped with crunchy lettuce and special zinger sauce.",
  },
  {
    id: "p3", name: "Pizza (Small)", price: 500.0, category: "PIZZA", image: "https://placehold.co/100x100/FFA07A/000000?text=Pizza",
    description: "Delicious small pizza with a crispy crust, melted mozzarella, and your choice of classic toppings. Perfect for a quick bite!",
  },
  {
    id: "p4", name: "Fries (Medium)", price: 120.0, category: "SIDES", image: "https://placehold.co/100x100/DDA0DD/000000?text=Fries",
    description: "Golden, crispy medium-sized fries, lightly salted and perfect for dipping. A classic side for any meal.",
  },
  {
    id: "p5", name: "Coke (Can)", price: 80.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Coke",
    description: "Refreshingly cold can of Coca-Cola, the perfect beverage to complement your meal.",
  },
  {
    id: "p6", name: "Chicken Roll", price: 180.0, category: "ROLLS", image: "https://placehold.co/100x100/87CEEB/000000?text=Roll",
    description: "Tender chicken pieces marinated in flavorful spices, wrapped in a warm, soft paratha with fresh salad and chutney.",
  },
  {
    id: "p7", name: "Veggie Burger", price: 220.0, category: "BURGERS", image: "https://placehold.co/100x100/90EE90/000000?text=Veggie",
    description: "A wholesome and flavorful vegetarian patty, nestled in a soft bun with crisp vegetables and a tangy sauce. A healthy delight!",
  },
  {
    id: "p8", name: "Large Pizza", price: 900.0, category: "PIZZA", image: "https://placehold.co/100x100/F0E68C/000000?text=LgPizza",
    description: "Our signature large pizza, generously topped with premium ingredients and baked to perfection. Ideal for sharing!",
  },
  {
    id: "p9", name: "Onion Rings", price: 150.0, category: "SIDES", image: "https://placehold.co/100x100/B0E0E6/000000?text=Rings",
    description: "Crispy, golden-brown onion rings, a perfect crunchy side or snack for any occasion.",
  },
  {
    id: "p10", name: "Water Bottle", price: 50.0, category: "DRINKS", image: "https://placehold.co/100x100/ADD8E6/000000?text=Water",
    description: "Pure, refreshing bottled water, essential for staying hydrated with your meal.",
  },
  {
    id: "p11", name: "Club Sandwich", price: 350.0, category: "SANDWICHES", image: "https://placehold.co/100x100/FFD700/000000?text=Sandwich",
    description: "A hearty triple-layered sandwich with grilled chicken, fresh veggies, and a special sauce, toasted to perfection.",
  },
  {
    id: "p12", name: "Pasta", price: 400.0, category: "MAIN COURSE", image: "https://placehold.co/100x100/FFA07A/000000?text=Pasta",
    description: "Creamy and rich pasta dish, tossed with your choice of savory sauce and fresh ingredients. A delightful Italian classic.",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "T001",
    date: "2024-07-15 14:30",
    total: 770.00,
    items: [{ name: "Tikka Burger", quantity: 2, price: 250 }, { name: "Fries (Medium)", quantity: 1, price: 120 }, { name: "Coke (Can)", quantity: 2, price: 80 }],
    paymentMethod: "Cash",
  },
  {
    id: "T002",
    date: "2024-07-15 11:00",
    total: 540.00,
    items: [{ name: "Zinger Burger", quantity: 1, price: 300 }, { name: "Water Bottle", quantity: 1, price: 50 }, { name: "Onion Rings", quantity: 1, price: 150 }],
    paymentMethod: "Debit Card",
  },
  {
    id: "T003",
    date: "2024-07-14 18:45",
    total: 900.00,
    items: [{ name: "Large Pizza", quantity: 1, price: 900 }],
    paymentMethod: "Cash",
  },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: "C001", name: "Walk-in Customer" },
  { id: "C002", name: "John Doe" },
  { id: "C003", name: "Jane Smith" },
];

export const MOCK_REGISTERS: Register[] = [
  { id: "R001", name: "Main Counter" },
  { id: "R002", name: "Drive-Thru" },
  { id: "R003", name: "Online Orders" },
];

export const CATEGORIES = Array.from(new Set(MOCK_PRODUCT.map((p) => p.category)));