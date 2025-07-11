'use client'
import React, { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

 export const ThemeContext = createContext<ThemeContextType | undefined >(undefined);
interface Order {
  id: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: string;
  timestamp: string;
  status: string;
}
interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  lastUpdated: string;
}
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      items: [
        { id: 1, name: 'French Vanilla Fantasy', price: 12.83, quantity: 2 },
        { id: 2, name: 'Almond Amore', price: 11.25, quantity: 1 }
      ],
      total: '36.91',
      timestamp: new Date().toLocaleString(),
      status: 'Completed'
    },
  ])
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme , orders, setOrders}}>
      <div className={`theme-${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};