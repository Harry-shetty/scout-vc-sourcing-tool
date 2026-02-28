import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TopbarProps {
  title: string;
  breadcrumb?: string;
  actions?: React.ReactNode;
}

export function Topbar({ title, breadcrumb, actions }: TopbarProps) {
  const parts = breadcrumb ? breadcrumb.split(' / ') : [];

  return (
    <div className="h-12 bg-[#0A0C10] border-b border-[#1E2535] flex items-center px-4 lg:px-6 flex-shrink-0 gap-2">
      {/* Breadcrumb */}
      {parts.length > 1 ? (
        <div className="flex items-center gap-1.5 min-w-0">
          {parts.map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight size={12} className="text-[#334155] flex-shrink-0" />}
              <span
                className={`text-[13px] truncate ${
                  i === parts.length - 1
                    ? 'text-[#94A3B8] font-medium'
                    : 'text-[#475569]'
                }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {part}
              </span>
            </React.Fragment>
          ))}
        </div>
      ) : (
        <h3
          className="text-[15px] font-semibold text-[#F1F5F9] truncate"
          style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.2px' }}
        >
          {title}
        </h3>
      )}

      {actions && (
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
