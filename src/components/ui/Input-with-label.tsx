// components/ui/input-with-label.tsx
import React from 'react';

interface InputWithLabelProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, id, icon, className, ...props }) => {
  return (
    <div className="relative flex-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 sr-only">{label}</label>
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">{icon}</div>}
      <input
        id={id}
        className={`w-full p-2 border border-gray-300 rounded-lg text-lg text-center font-bold focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  );
};

export { InputWithLabel };