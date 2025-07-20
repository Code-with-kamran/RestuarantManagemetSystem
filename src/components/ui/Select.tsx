// components/ui/select.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <div className="relative">
      <select
        className={`flex h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card-background)] px-3 py-2 text-sm
                    ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-primary)]
                    disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8
                    ${className}`}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-muted-foreground)] pointer-events-none" />
    </div>
  );
};

export { Select };