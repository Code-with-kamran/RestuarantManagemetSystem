// components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-card-background)] px-3 py-2 text-sm
                  ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium
                  placeholder:text-[var(--color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue-primary)]
                  disabled:cursor-not-allowed disabled:opacity-50
                  ${className}`}
      {...props}
    />
  );
};

export { Input };