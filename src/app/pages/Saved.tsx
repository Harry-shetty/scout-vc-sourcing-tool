import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Bookmark, RotateCcw, MoreHorizontal, Trash2, Plus } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { ScoutButton } from '../components/scout/ScoutButton';
import { SectorBadge, StageBadge } from '../components/scout/ScoutBadge';
import { MOCK_SAVED_SEARCHES } from '../data/mock-data';
import type { SavedSearch } from '../types';

export function Saved() {
  const navigate = useNavigate();
  const [searches, setSearches] = useState<SavedSearch[]>(MOCK_SAVED_SEARCHES);

  const handleDelete = (id: string) => {
    setSearches(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Saved Searches" breadcrumb="Scout / Saved" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-5 pb-20 md:pb-6 max-w-3xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
              Saved Searches
            </h2>
          </div>

          {searches.length > 0 ? (
            <div className="flex flex-col gap-3">
              {searches.map(search => (
                <SavedSearchCard
                  key={search.id}
                  search={search}
                  onRun={() => navigate('/companies')}
                  onDelete={() => handleDelete(search.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 rounded-full bg-[#161B24] border border-[#1E2535] flex items-center justify-center">
                <Bookmark size={20} className="text-[#475569]" />
              </div>
              <div className="text-center">
                <p className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  No saved searches
                </p>
                <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Save your filters from the Companies page to reuse them
                </p>
              </div>
              <ScoutButton variant="secondary" onClick={() => navigate('/companies')}>
                Browse Companies
              </ScoutButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SavedSearchCard({ search, onRun, onDelete }: { search: SavedSearch; onRun: () => void; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const filterParts: string[] = [];
  if (search.filters.sector) filterParts.push(`Sector: ${search.filters.sector}`);
  if (search.filters.stage) filterParts.push(`Stage: ${search.filters.stage}`);
  if (search.filters.location) filterParts.push(search.filters.location);

  return (
    <div className="bg-[#161B24] border border-[#1E2535] rounded-lg px-5 py-4 md:py-5 lg:py-6 flex items-start gap-4 hover:border-[#3B82F6] hover:shadow-[0_0_15px_rgba(59,130,246,0.08)] transition-all">
      <Bookmark size={18} className="text-[#3B82F6] flex-shrink-0 mt-0.5" />

      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#F1F5F9] mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
          {search.name}
        </p>
        <p className="text-[12px] text-[#94A3B8] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
          {filterParts.length > 0 ? filterParts.join(' · ') : 'No filters applied'}
          <span className="text-[#475569] ml-1">
            · {search.resultCount} results
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 self-start mt-0.5">
        <ScoutButton
          variant="secondary"
          size="sm"
          iconLeft={<RotateCcw size={11} />}
          onClick={onRun}
        >
          Re-run
        </ScoutButton>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(p => !p)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#475569] hover:bg-[#1C2330] hover:text-[#94A3B8] transition-colors"
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-[#161B24] border border-[#1E2535] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] z-20 w-32 py-1">
              <button
                onClick={onDelete}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-[#F87171] hover:bg-[#1C2330] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
