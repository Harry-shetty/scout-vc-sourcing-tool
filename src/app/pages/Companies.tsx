import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { CompanyTable } from '../components/companies/CompanyTable';
import { MOCK_COMPANIES } from '../data/mock-data';
import type { Sector, Stage, Company } from '../types';

const SECTORS: Sector[] = ['AI', 'Fintech', 'Climate', 'HealthTech', 'DevTools', 'B2B SaaS'];
const STAGES: Stage[] = ['Pre-Seed', 'Seed', 'Series A', 'Series B'];
const PER_PAGE = 10;

export function Companies() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('');
  const [stage, setStage] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const [enrichingId, setEnrichingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return MOCK_COMPANIES.filter(c => {
      const q = query.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.sector.toLowerCase().includes(q) && !c.location.toLowerCase().includes(q)) return false;
      if (sector && c.sector !== sector) return false;
      if (stage && c.stage !== stage) return false;
      if (location && !c.location.toLowerCase().includes(location.toLowerCase())) return false;
      return true;
    });
  }, [query, sector, stage, location]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleEnrich = (company: Company) => {
    setEnrichingId(company.id);
    setTimeout(() => setEnrichingId(null), 2500);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Companies" breadcrumb="Scout / Companies" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-5 pb-6">
          {/* Page header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <h2 className="text-[24px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
                Companies
              </h2>
              <span className="text-[12px] font-medium text-[#94A3B8] bg-[#161B24] border border-[#1E2535] px-2.5 py-0.5 rounded-full" style={{ fontFamily: 'DM Mono, monospace' }}>
                {filtered.length}
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search companies, sectors, locations..."
              className="w-full h-10 bg-[#161B24] border border-[#1E2535] rounded-md pl-9 pr-4 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.15)] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <FilterSelect
              value={sector}
              onChange={v => { setSector(v); setPage(1); }}
              options={SECTORS}
              placeholder="All Sectors"
            />
            <FilterSelect
              value={stage}
              onChange={v => { setStage(v); setPage(1); }}
              options={STAGES}
              placeholder="All Stages"
            />
            <input
              value={location}
              onChange={e => { setLocation(e.target.value); setPage(1); }}
              placeholder="Any location"
              className="h-9 px-3 bg-[#161B24] border border-[#1E2535] rounded-md text-[13px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] transition-colors w-[140px]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            {(sector || stage || location) && (
              <button
                onClick={() => { setSector(''); setStage(''); setLocation(''); setPage(1); }}
                className="h-9 px-3 flex items-center gap-1.5 text-[13px] text-[#475569] hover:text-[#94A3B8] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <X size={12} />
                Clear filters
              </button>
            )}
            <div className="ml-auto">
              <span className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'DM Mono, monospace' }}>
                Showing {paginated.length} of {filtered.length} companies
              </span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-[#0A0C10] border border-[#1E2535] rounded-lg overflow-hidden mb-4">
            {paginated.length > 0 ? (
              <CompanyTable companies={paginated} onEnrich={handleEnrich} />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="w-14 h-14 rounded-full bg-[#161B24] border border-[#1E2535] flex items-center justify-center">
                  <Search size={20} className="text-[#475569]" />
                </div>
                <div className="text-center">
                  <p className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                    No results match
                  </p>
                  <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="h-8 px-3 text-[13px] text-[#94A3B8] hover:bg-[#161B24] disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors border border-transparent hover:border-[#1E2535]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 text-[13px] rounded-md transition-colors ${p === page ? 'bg-gradient-to-br from-[#1E40AF] to-[#1E3A5F] border border-[#3B82F6] text-[#F1F5F9]' : 'text-[#94A3B8] hover:bg-[#161B24]'}`}
                    style={{ fontFamily: 'DM Mono, monospace' }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="h-8 px-3 text-[13px] text-[#94A3B8] hover:bg-[#161B24] disabled:opacity-40 disabled:cursor-not-allowed rounded-md transition-colors border border-transparent hover:border-[#1E2535]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="h-9 pl-3 pr-8 bg-[#161B24] border border-[#1E2535] rounded-md text-[13px] outline-none focus:border-[#3B82F6] transition-colors appearance-none cursor-pointer"
        style={{
          fontFamily: 'Inter, sans-serif',
          color: value ? '#F1F5F9' : '#475569',
        }}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
    </div>
  );
}