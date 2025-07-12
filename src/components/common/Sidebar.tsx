'use client'
import { X, Coffee, LogOut, ChevronDown } from 'lucide-react';
import { sidebarMenuItems } from '@/lib/constants';
import Link from 'next/link';
import { useState } from 'react';
import { sidebarItems } from '@/lib/constants';



interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>('dashboard')
   const handleSidebarItemClick = (label: string) => {
    // If the clicked item is already active, deactivate it (close submenu)
    // Otherwise, set the clicked item as active
    setActiveSidebarItem(prevActiveItem => (prevActiveItem === label ? null : label));
  };
  return (
    <>
    

      <div className={`fixed inset-y-0 left-0 z-50  bg-gray-900 transform w-1/4 max-w-100 ${isOpen ? 'translate-x-0' : '-translate-x-full '} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-primary mr-3" />
            <span className="text-white font-bold">Restaurant POS</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      <nav className="mt-6">
        
          {sidebarItems.map((item, index) => (
            <div key={index} className="px-4">
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                  activeSidebarItem === item.label ? 'bg-blue-50 text-blue-600' : 'text-white hover:bg-gray-600'
                }`}
                onClick={() => handleSidebarItemClick(item.label)} // Add onClick handler
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  
                  {item.hasSubmenu ? <span className="text-sm font-medium">{item.label}</span>:<Link href={`/${item.label.toLowerCase()}`} className="text-sm font-medium">{item.label}</Link> }
                </div>
                {item.hasSubmenu && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeSidebarItem === item.label ? 'rotate-180' : ''}`} />
                )}
              </div>

              {/* Conditionally render submenu based on activeSidebarItem state */}
              {activeSidebarItem === item.label && item.submenu && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <div key={subIndex} className={`px-3 py-1 text-sm cursor-pointer rounded ${
                      subItem === 'Add Product' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-white'
                    }`}>
                     <Link href={`/${subItem.toLowerCase().replace(/\s/g, "")}`}> {subItem} </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        </div>
    </>
  );
};