// components/ui/skeleton.tsx
import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
  );
};

export { Skeleton };