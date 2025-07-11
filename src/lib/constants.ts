import {
  Home,
  ShoppingCart,
  BarChart3,
  Settings,
  Users,
  Package,
  Clock,
  ChevronDown,
  Upload,
  X,
  FileText,
  RefreshCw,
  Calculator,
  Bell,
  HelpCircle,
  Info,
} from "lucide-react";

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

export const sidebarMenuItems = [
  { icon: Home, label: "Dashboard", page: "dashboard" },
  { icon: ShoppingCart, label: "POS System", page: "pos" },
  { icon: BarChart3, label: "Analytics", page: "analytics" },
  { icon: Users, label: "Staff Management", page: "staff" },
  { icon: Package, label: "Add Inventory", page: "additem" },
  { icon: Package, label: "List Inventory", page: "listitem" },
  { icon: Clock, label: "Orders", page: "orders" },
  { icon: Settings, label: "Settings", page: "settings" },
];

export const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", hasSubmenu: false },
  {
    icon: Users,
    label: "POS",
    hasSubmenu: false,
    // submenu: ["Users", "Roles", "Sales Commission Agents"],
  },
  // {
  //   icon: Users,
  //   label: "Contacts",
  //   hasSubmenu: true,
  //   submenu: ["Suppliers", "Customers"],
  // },
  {
    icon: Package,
    label: "Inventory",
    hasSubmenu: true,
    submenu: [
      "List Products",
      "Add Products",
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
