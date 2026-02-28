import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { ArrowLeft, Download, Search, MapPin, Trash2 } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { ScoutButton } from '../components/scout/ScoutButton';
import { SectorBadge, StageBadge } from '../components/scout/ScoutBadge';
import { CompanyFavicon } from '../components/scout/ScoutAvatar';
import { MOCK_LISTS, MOCK_COMPANIES } from '../data/mock-data';

export function ListDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const list = MOCK_LISTS.find(l => l.id === id);
  if (!list) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Topbar title="List Not Found" />
        <div className="flex items-center justify-center flex-1">
          <ScoutButton onClick={() => navigate('/lists')}>← Back to Lists</ScoutButton>
        </div>
      </div>
    );
  }

  const companies = list.companyIds
    .map(cid => MOCK_COMPANIES.find(c => c.id === cid))
    .filter(Boolean)
    .filter(c => !query || c!.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title={list.name} breadcrumb={`Scout / Lists / ${list.name}`} />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-5 pb-20 md:pb-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <ScoutButton
              variant="ghost"
              size="sm"
              iconLeft={<ArrowLeft size={13} />}
              onClick={() => navigate('/lists')}
            >
              Lists
            </ScoutButton>
            <div className="flex-1" />
            <span className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'DM Mono, monospace' }}>
              {list.companyIds.length} companies
            </span>
            <ScoutButton variant="secondary" size="sm" iconLeft={<Download size={13} />}>
              Export CSV
            </ScoutButton>
          </div>

          <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>
            {list.name}
          </h2>

          {/* Search within list */}
          <div className="relative mb-4">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search within list..."
              className="w-full h-9 bg-[#161B24] border border-[#1E2535] rounded-md pl-9 pr-4 text-[13px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          {/* Company list */}
          <div className="bg-[#0A0C10] border border-[#1E2535] rounded-lg overflow-hidden">
            {companies.length > 0 ? companies.map((company, i) => (
              <div
                key={company!.id}
                className={`flex items-center gap-3 px-4 h-11 hover:bg-[#1C2330] transition-colors group ${i < companies.length - 1 ? 'border-b border-[#141920]' : ''}`}
              >
                <CompanyFavicon name={company!.name} size={20} />
                <Link
                  to={`/companies/${company!.id}`}
                  className="text-[14px] text-[#F1F5F9] hover:text-[#3B82F6] hover:underline transition-colors flex-1"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {company!.name}
                </Link>
                <SectorBadge sector={company!.sector} />
                <div className="hidden sm:flex items-center gap-1.5">
                  <MapPin size={10} className="text-[#475569]" />
                  <span className="text-[12px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {company!.location}
                  </span>
                </div>
                <button className="w-7 h-7 flex items-center justify-center rounded text-[#475569] opacity-0 group-hover:opacity-100 hover:text-[#F87171] hover:bg-[rgba(239,68,68,0.1)] transition-all">
                  <Trash2 size={13} />
                </button>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {query ? 'No companies match your search' : 'This list is empty'}
                </p>
                {!query && (
                  <ScoutButton variant="secondary" size="sm" onClick={() => navigate('/companies')}>
                    Browse Companies
                  </ScoutButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
