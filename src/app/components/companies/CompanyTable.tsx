import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  MapPin, Sparkles, MoreHorizontal, ChevronsUpDown, ChevronUp, ChevronDown
} from 'lucide-react';
import { SectorBadge, StageBadge } from '../scout/ScoutBadge';
import { CompanyFavicon } from '../scout/ScoutAvatar';
import type { Company } from '../../types';

type SortKey = 'name' | 'sector' | 'stage' | 'location' | 'enrichedAt';
type SortDir = 'asc' | 'desc' | null;

interface CompanyTableProps {
  companies: Company[];
  onEnrich?: (company: Company) => void;
}

export function CompanyTable({ companies, onEnrich }: CompanyTableProps) {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc');
      if (sortDir === 'desc') setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const sorted = [...companies].sort((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const av = a[sortKey] ?? '';
    const bv = b[sortKey] ?? '';
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown size={12} className="text-[#475569]" />;
    if (sortDir === 'asc') return <ChevronUp size={12} className="text-[#3B82F6]" />;
    return <ChevronDown size={12} className="text-[#3B82F6]" />;
  };

  const HeaderCell = ({ col, label, width }: { col: SortKey; label: string; width?: string }) => (
    <button
      onClick={() => handleSort(col)}
      className="flex items-center gap-1.5 text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] hover:text-[#94A3B8] transition-colors"
      style={{ fontFamily: 'Inter, sans-serif', width }}
    >
      {label}
      <SortIcon col={col} />
    </button>
  );

  return (
    <div className="w-full">
      {/* Header */}
      <div className="h-9 bg-[#0F1218] border-b border-[#1E2535] flex items-center px-4 gap-4">
        <div className="flex-1 min-w-[200px]">
          <HeaderCell col="name" label="Company" />
        </div>
        <div className="w-[120px]">
          <HeaderCell col="sector" label="Sector" />
        </div>
        <div className="w-[100px]">
          <HeaderCell col="stage" label="Stage" />
        </div>
        <div className="w-[140px] hidden lg:flex">
          <HeaderCell col="location" label="Location" />
        </div>
        <div className="w-[120px] hidden xl:flex">
          <HeaderCell col="enrichedAt" label="Last Enriched" />
        </div>
        <div className="w-[100px] text-right">
          <span className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Actions
          </span>
        </div>
      </div>

      {/* Rows */}
      {sorted.map(company => {
        const isHovered = hoveredId === company.id;
        return (
          <div
            key={company.id}
            onMouseEnter={() => setHoveredId(company.id)}
            onMouseLeave={() => setHoveredId(null)}
            className={`
              h-[52px] flex items-center px-4 gap-4 border-b border-[#141920] transition-all duration-100 relative
              ${isHovered ? 'bg-[#1C2330]' : 'bg-transparent'}
            `}
            style={isHovered ? { borderLeft: '2px solid #3B82F6', paddingLeft: 14 } : {}}
          >
            {/* Company */}
            <div className="flex-1 min-w-[200px] flex items-center gap-2.5">
              <CompanyFavicon name={company.name} size={20} />
              <button
                onClick={() => navigate(`/companies/${company.id}`)}
                className="text-[14px] font-medium text-[#F1F5F9] hover:text-[#3B82F6] hover:underline transition-colors truncate"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {company.name}
              </button>
            </div>

            {/* Sector */}
            <div className="w-[120px]">
              <SectorBadge sector={company.sector} />
            </div>

            {/* Stage */}
            <div className="w-[100px]">
              <StageBadge stage={company.stage} />
            </div>

            {/* Location */}
            <div className="w-[140px] hidden lg:flex items-center gap-1.5">
              <MapPin size={11} className="text-[#475569] flex-shrink-0" />
              <span className="text-[13px] text-[#94A3B8] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                {company.location}
              </span>
            </div>

            {/* Last Enriched */}
            <div className="w-[120px] hidden xl:block">
              <span
                className="text-[12px] text-[#475569]"
                style={{ fontFamily: 'DM Mono, monospace' }}
              >
                {company.enrichedAt ?? '—'}
              </span>
            </div>

            {/* Actions */}
            <div className="w-[100px] flex items-center justify-end gap-1">
              <button
                onClick={() => onEnrich?.(company)}
                className={`
                  h-7 px-2.5 flex items-center gap-1.5 rounded-md text-[12px] transition-all
                  ${isHovered
                    ? 'bg-gradient-to-br from-[#1E40AF] to-[#1E3A5F] border border-[#3B82F6] text-[#F1F5F9]'
                    : 'bg-transparent text-[#475569] hover:text-[#94A3B8]'
                  }
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Sparkles size={11} />
                <span>Enrich</span>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-md text-[#475569] hover:bg-[#1C2330] hover:text-[#94A3B8] transition-colors">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
