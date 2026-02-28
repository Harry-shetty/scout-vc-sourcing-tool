import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function ScoutSkeleton({ width = '100%', height = 14, className = '' }: SkeletonProps) {
  return (
    <div
      className={`rounded animate-pulse ${className}`}
      style={{
        width,
        height,
        background: 'linear-gradient(90deg, #161B24 0%, #1C2330 50%, #161B24 100%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s ease infinite',
      }}
    />
  );
}

export function SkeletonLine({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 12, md: 14, lg: 16 };
  const widths = { sm: 200, md: 300, lg: '100%' };
  return <ScoutSkeleton height={heights[size]} width={widths[size]} />;
}

export function SkeletonBlock({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const heights = { sm: 60, md: 100, lg: 160 };
  return <ScoutSkeleton height={heights[size]} width="100%" className="rounded-lg" />;
}

export function SkeletonCard() {
  return (
    <div className="bg-[#161B24] border border-[#1E2535] rounded-lg p-5 flex flex-col gap-4">
      <SkeletonLine size="sm" />
      <SkeletonBlock size="md" />
    </div>
  );
}
