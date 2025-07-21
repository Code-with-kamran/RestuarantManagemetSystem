// components/Sidebar.tsx
'use client';

import { X, Coffee, LogOut, ChevronDown } from 'lucide-react';
import { sidebarItems } from '@/lib/constant';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ currentPage, onPageChange, isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const [activeSidebarItem, setActiveSidebarItem] = useState<string | null>('dashboard');

  const handleSidebarItemClick = (label: string) => {
    
    setActiveSidebarItem(prevActiveItem => (prevActiveItem === label ? null : label));
    router.push(`/${label.toLowerCase().replace(/\s/g, '-')}`)
    
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-50 transform  w-xl 
        bg-[var(--color-card-background)] text-[var(--sidebar-text)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full '}
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:w-64
        shadow-lg border-r border-[var(--color-border)]
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-[var(--sidebar-header-bg)]">
          <div className="flex items-center">
            <Coffee className="w-8 h-8 text-[var(--sidebar-icon-color)] mr-3" /> {/* Unified icon color */}
            <span className="text-[var(--sidebar-text)] font-bold text-md  ">Restaurant POS</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[var(--sidebar-inactive-item-text)] hover:text-[var(--sidebar-text)]"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          {sidebarItems.map((item, index) => (
            <div key={index} className="px-4 ">
              <div
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer
                ${activeSidebarItem === item.label
                    ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' // Unified active classes
                    : 'text-[var(--sidebar-inactive-item-text)] hover:bg-[var(--sidebar-inactive-item-hover-bg)] hover:text-[var(--sidebar-text)]'
                }
                transition-colors duration-200`}
                onClick={() => handleSidebarItemClick(item.label)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  {item.hasSubmenu ? (
                    <span className="text-sm font-medium">{item.label}</span>
                  ) : (
                    <Link
                      href={`/${item.label.toLowerCase().replace(/\s/g, '-')}`}
                      className="text-sm font-medium w-full  "
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
                {item.hasSubmenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200
                    ${activeSidebarItem === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </div>

              {activeSidebarItem === item.label && item.submenu && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={`/${subItem.toLowerCase().replace(/\s/g, '-')}`}
                      className={`block px-3 py-1 text-sm cursor-pointer rounded
                      ${subItem.toLowerCase().replace(/\s/g, '-') === currentPage
                          ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' // Unified active classes
                          : 'text-[var(--sidebar-inactive-item-text)] hover:bg-[var(--sidebar-inactive-item-hover-bg)] hover:text-[var(--sidebar-text)]'
                      }
                      transition-colors duration-200`}
                      onClick={() => {
                        onPageChange(subItem.toLowerCase().replace(/\s/g, '-'));
                        if (window.innerWidth < 1024) onClose();
                      }}
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Theme Toggle + Logout */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-[var(--sidebar-border)] space-y-2">
         
          <Link
            href="/"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-[var(--sidebar-inactive-item-text)] hover:bg-[var(--sidebar-inactive-item-hover-bg)] hover:text-[var(--sidebar-text)] transition-colors duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </Link>
        </div>
      </div>
    </>
  );
};