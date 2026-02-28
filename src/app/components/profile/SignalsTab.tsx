import React from 'react';
import { Globe, Users, Package, DollarSign, BookOpen } from 'lucide-react';
import { MOCK_TIMELINE_SIGNALS } from '../../data/mock-data';
import type { TimelineSignal } from '../../types';

const TYPE_CONFIG: Record<TimelineSignal['type'], { color: string; icon: React.ReactNode; source: string }> = {
  website: { color: '#3B82F6', icon: <Globe size={12} />, source: 'Website' },
  hire:    { color: '#10B981', icon: <Users size={12} />, source: 'LinkedIn' },
  product: { color: '#06B6D4', icon: <Package size={12} />, source: 'Product' },
  funding: { color: '#F59E0B', icon: <DollarSign size={12} />, source: 'News' },
  blog:    { color: '#8B5CF6', icon: <BookOpen size={12} />, source: 'Blog' },
};

export function SignalsTab() {
  return (
    <div className="p-6 md:p-8">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#1E2535]" />

        <div className="flex flex-col gap-0">
          {MOCK_TIMELINE_SIGNALS.map((signal, i) => {
            const cfg = TYPE_CONFIG[signal.type];
            return (
              <div key={i} className="flex items-start gap-4 pb-6 relative">
                {/* Dot */}
                <div
                  className="w-[10px] h-[10px] rounded-full flex-shrink-0 mt-1 relative z-10 ml-[11px]"
                  style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}60` }}
                />
                {/* Content */}
                <div className="flex-1 flex items-start justify-between gap-4 ml-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-medium text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {signal.label}
                    </span>
                    <span
                      className="inline-flex items-center h-[22px] px-2 rounded-sm text-[11px] font-medium bg-[#161B24] text-[#94A3B8] border border-[#1E2535]"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {signal.source}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#475569] flex-shrink-0 mt-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {signal.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
