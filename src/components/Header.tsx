// components/Header.tsx
import React from 'react';
import Link from 'next/link';
import { BarChart3, ClipboardList, Home, Search, Store, User } from 'lucide-react';
import { Button } from './ui/Button';
import { MOCK_CUSTOMERS, MOCK_REGISTERS } from '@/lib/mocks'; // Adjusted import
import { ThemeToggle } from './common/ThemeToggle'; // Import the new ThemeToggle

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCustomer: string;
  setSelectedCustomer: (customerId: string) => void;
  selectedRegister: string;
  setSelectedRegister: (registerId: string) => void;
  setIsOrderHistoryModalOpen: (isOpen: boolean) => void;
  setIsDailySalesSummaryModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCustomer,
  setSelectedCustomer,
  selectedRegister,
  setSelectedRegister,
  setIsOrderHistoryModalOpen,
  setIsDailySalesSummaryModalOpen,
}) => {
  return (
    <header className="flex flex-col sm:flex-row items-center p-2 z-20 sticky top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-md">
      {/* Customer and Register Select */}
      <div className="flex gap-2 w-full sm:w-1/3 py-1 mb-2 sm:mb-0">
        <div className="relative flex-1">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="border p-2 pl-9 rounded-md w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
            <option value="" className="bg-white dark:bg-gray-700">Select Customer</option>
            {MOCK_CUSTOMERS.map(customer => (
              <option key={customer.id} value={customer.id} className="bg-white dark:bg-gray-700">{customer.name}</option>
            ))}
          </select>
        </div>
        <div className="relative flex-1">
          <Store size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <select
            value={selectedRegister}
            onChange={(e) => setSelectedRegister(e.target.value)}
            className="border p-2 pl-9 rounded-md w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          >
            <option value="" className="bg-white dark:bg-gray-700">Select Register</option>
            {MOCK_REGISTERS.map(register => (
              <option key={register.id} value={register.id} className="bg-white dark:bg-gray-700">{register.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar and Header Action Buttons */}
      <div className="flex gap-2 flex-1 w-full sm:w-2/3 ml-0 sm:ml-2 items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search for products..."
            className="border flex-1 rounded-md px-3 py-2 pl-9 w-full text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Button
          onClick={() => setIsDailySalesSummaryModalOpen(true)}
          className="flex items-center justify-center bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition-transform duration-200 active:scale-95 text-sm dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <BarChart3 size={20} className="mr-1" />
          <span className="hidden sm:inline bg-slate-300">Daily Sales</span>
        </Button>

        <Button
          onClick={() => setIsOrderHistoryModalOpen(true)}
          className="py-2 px-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 rounded-md shadow-sm"
          title="View past orders"
        >
          <ClipboardList size={18} /> <span className="hidden sm:inline">History</span>
        </Button>
        <Link href="/dashboard" className="py-2 px-3 text-sm sm:text-base bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-1 rounded-md shadow-sm"> <Home /> Dashboard</Link>
        <ThemeToggle /> {/* NEW: Theme Toggle Button */}
      </div>
    </header>
  );
};

export { Header };