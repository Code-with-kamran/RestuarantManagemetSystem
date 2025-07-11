export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  total: string;
  timestamp: string;
  status: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface SidebarMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  page: string;
}

export interface HeaderProps {
  title: string;
  onMenuToggle: () => void;
}