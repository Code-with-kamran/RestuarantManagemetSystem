// src/lib/constants.ts
import {
  
  BarChart3,
  Settings,
  Users,
  Package,
  
} from "lucide-react";

export const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", hasSubmenu: false },
  {
    icon: Users,
    label: "POS",
    hasSubmenu: false,
    // submenu: ["Users", "Roles", "Sales Commission Agents"],
  },
  {
    icon: Users,
    label: "Staff",
    
  },
  {
    icon: Users,
    label: "Reports",
    
  },
  {
    icon: Users,
    label: "Application-user",
    
  },
  {
    icon: Package,
    label: "Inventory",
    hasSubmenu: true,
    submenu: [
      "List-Products",
      "Add-Products",
    ],
  },
  // {
  //   icon: ShoppingCart,
  //   label: "Purchases",
  //   hasSubmenu: true,
  //   submenu: ["List Purchases", "Add Purchase", "Import Purchases"],
  // },
  // {
  //   icon: FileText,
  //   label: "Sell",
  //   hasSubmenu: true,
  //   submenu: ["List Sales", "Add Sale", "List Drafts", "List Quotations"],
  // },
  // {
  //   icon: RefreshCw,
  //   label: "Stock Transfers",
  //   hasSubmenu: true,
  //   submenu: ["List Stock Transfers", "Add Stock Transfer"],
  // },
  // {
  //   icon: Calculator,
  //   label: "Stock Adjustment",
  //   hasSubmenu: true,
  //   submenu: ["List Stock Adjustments", "Add Stock Adjustment"],
  // },
  // {
  //   icon: FileText,
  //   label: "Expenses",
  //   hasSubmenu: true,
  //   submenu: ["List Expenses", "Add Expense", "Expense Categories"],
  // },
  // {
  //   icon: BarChart3,
  //   label: "Reports",
  //   hasSubmenu: true,
  //   submenu: [
  //     "Profit / Loss Report",
  //     "Product Report",
  //     "Customer Group Report",
  //   ],
  // },
  // {
  //   icon: Bell,
  //   label: "Notification Templates",
  //   hasSubmenu: true,
  //   submenu: ["New Sale", "New Purchase"],
  // },
  {
    icon: Settings,
    label: "Settings",
    hasSubmenu: true,
    submenu: ["Business Settings", "Tax Rates", "Barcodes"],
  },
];
export const menuItems = [
  {
    id: 1,
    name: "French Vanilla Fantasy",
    price: 12.83,
    category: "Coffee",
    image: "☕",
  },
  {
    id: 2,
    name: "Almond Amore",
    price: 11.25,
    category: "Coffee",
    image: "☕",
  },
  // ... rest of the menu items
];


  export const MOCK_PRODUCTs = [
  {
    "id": "p1",
    "name": "Tikka Burger",
    "price": 250.0,
    "category": "BURGERS",
    "image": "https://placehold.co/100x100/A0D9B0/000000?text=Burger",
    "lastupdate":"2024-06-20"
  },
  {
    "id": "p2",
    "name": "Zinger Burger",
    "price": 300.0,
    "category": "BURGERS",
    "image": "https://placehold.co/100x100/FFD700/000000?text=Zinger"
  },
  {
    "id": "p3",
    "name": "Pizza (Small)",
    "price": 500.0,
    "category": "PIZZA",
    "image": "https://placehold.co/100x100/FFA07A/000000?text=Pizza"
  },
  {
    "id": "p4",
    "name": "Fries (Medium)",
    "price": 120.0,
    "category": "SIDES",
    "image": "https://placehold.co/100x100/DDA0DD/000000?text=Fries"
  },
  {
    "id": "p5",
    "name": "Coke (Can)",
    "price": 80.0,
    "category": "DRINKS",
    "image": "https://placehold.co/100x100/ADD8E6/000000?text=Coke"
  },
  {
    "id": "p6",
    "name": "Chicken Roll",
    "price": 180.0,
    "category": "ROLLS",
    "image": "https://placehold.co/100x100/87CEEB/000000?text=Roll"
  },
  {
    "id": "p7",
    "name": "Veggie Burger",
    "price": 220.0,
    "category": "BURGERS",
    "image": "https://placehold.co/100x100/90EE90/000000?text=Veggie"
  },
  {
    "id": "p8",
    "name": "Large Pizza",
    "price": 900.0,
    "category": "PIZZA",
    "image": "https://placehold.co/100x100/F0E68C/000000?text=LgPizza"
  },
  {
    "id": "p9",
    "name": "Onion Rings",
    "price": 150.0,
    "category": "SIDES",
    "image": "https://placehold.co/100x100/B0E0E6/000000?text=Rings"
  },
  {
    "id": "p10",
    "name": "Water Bottle",
    "price": 50.0,
    "category": "DRINKS",
    "image": "https://placehold.co/100x100/ADD8E6/000000?text=Water"
  }
]

