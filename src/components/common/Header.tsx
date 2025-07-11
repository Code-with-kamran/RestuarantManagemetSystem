'use client'
import { User, MenuIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  title: string;
  userRole?: string;
  onMenuToggle: () => void;
}

export const Header = ({ title, userRole, onMenuToggle }: HeaderProps) => {
  return (
    <div className="bg-background shadow-sm border-b border-border px-6 py-4 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onMenuToggle}
            className=" mr-8 text-foreground hover:text-primary"
          >
            <MenuIcon className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <p className="font-semibold text-foreground capitalize">{userRole || 'User'}</p>
          </div>
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};