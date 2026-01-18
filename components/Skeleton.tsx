
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-dark-border rounded ${className}`} />
  );
};

export const HeroSkeleton: React.FC = () => (
  <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48 lg:pb-32 grid lg:grid-cols-2 gap-16">
    <div>
      <Skeleton className="h-8 w-48 mb-6 rounded-full" />
      <Skeleton className="h-16 w-full mb-6" />
      <Skeleton className="h-16 w-3/4 mb-6" />
      <Skeleton className="h-20 w-full mb-10" />
      <div className="flex gap-4">
        <Skeleton className="h-14 w-40 rounded-full" />
        <Skeleton className="h-14 w-40 rounded-full" />
      </div>
    </div>
    <div className="hidden lg:block">
      <Skeleton className="h-[500px] w-full rounded-2xl" />
    </div>
  </div>
);

export const ServiceSkeleton: React.FC = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="p-8 border dark:border-dark-border rounded-3xl">
        <Skeleton className="w-14 h-14 mb-6 rounded-2xl" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-20 w-full mb-6" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
);
