'use client';

import { User, MenuIcon } from 'lucide-react';
// Assuming ThemeToggle is still in common, if it uses CSS variables, it will also adapt.
// If ThemeToggle itself uses direct Tailwind classes, you might need to adapt it similarly.
import { ThemeToggle } from '../common/ThemeToggle';


interface HeaderProps {
  title: string;
  userRole?: string;
  onMenuToggle: () => void;
}

export const Header = ({ title, userRole, onMenuToggle }: HeaderProps) => {
  return (
    <div className="
      bg-[var(--color-background-default)]
      shadow-sm
      border-b
      border-[var(--color-border-default)]
      px-6 py-4
      dark:bg-[var(--color-background-darker)]
      dark:border-[var(--color-border-default)]
    ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className="lg:hidden
              mr-8
              text-[var(--color-text-default)]
              hover:text-[var(--color-primary)]
            "
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-md
            lg:text-2xl font-bold
            text-[var(--color-text-default)]
          ">
            {title}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <div className="text-right">
            <p className="
              text-sm
              text-[var(--color-text-muted)]
            ">
              Welcome back
            </p>
            <p className="
              font-semibold
              text-[var(--color-text-default)]
              capitalize
            ">
              {userRole || 'User'}
            </p>
          </div>
          <div className="
            w-10 h-10
            bg-[var(--color-primary)]
            rounded-full
            flex items-center justify-center
          ">
            <User className="w-6 h-6 text-[var(--color-white)]" />
          </div>
        </div>
      </div>
    </div>
  );
};