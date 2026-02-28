import React from 'react';

interface ScoutCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export function ScoutCard({ children, className = '', hover = false, active = false, onClick }: ScoutCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#161B24] border rounded-lg p-5 transition-all duration-150
        shadow-[0_1px_3px_rgba(0,0,0,0.4),0_0_0_1px_#1E2535]
        ${active
          ? 'border-[#06B6D4]'
          : hover
            ? 'border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.15)]'
            : 'border-[#1E2535]'
        }
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
