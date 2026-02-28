import React, { useState, useEffect, useRef } from 'react';
import { Search, Building2, FolderOpen, Bookmark, LayoutDashboard, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { MOCK_COMPANIES } from '../../data/mock-data';
import { SectorBadge } from '../scout/ScoutBadge';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') setSelectedIdx(p => p + 1);
      if (e.key === 'ArrowUp') setSelectedIdx(p => Math.max(0, p - 1));
      if (e.key === 'Enter') {
        const matched = filteredCompanies[selectedIdx];
        if (matched) {
          navigate(`/companies/${matched.id}`);
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, selectedIdx]);

  const filteredCompanies = query
    ? MOCK_COMPANIES.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.sector.toLowerCase().includes(query.toLowerCase()) ||
        c.location.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : MOCK_COMPANIES.slice(0, 5);

  const QUICK_ACTIONS = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'All Companies', icon: Building2, path: '/companies' },
    { label: 'My Lists', icon: FolderOpen, path: '/lists' },
    { label: 'Saved Searches', icon: Bookmark, path: '/saved' },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-2xl bg-[#161B24] border border-[#3B82F6] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6),0_0_20px_rgba(59,130,246,0.15)] overflow-hidden z-10">
        {/* Search input */}
        <div className="h-14 flex items-center gap-3 px-5 border-b border-[#1E2535]">
          <Search size={20} className="text-[#3B82F6] flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
            placeholder="Search everything..."
            className="flex-1 bg-transparent outline-none text-[18px] font-semibold text-[#F1F5F9] placeholder-[#475569]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          />
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-[11px] text-[#475569] bg-[#1C2330] border border-[#1E2535] px-2 py-0.5 rounded"
            style={{ fontFamily: 'DM Mono, monospace' }}
          >
            ESC
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto">
          {/* Quick actions */}
          {!query && (
            <div>
              <p className="px-5 py-2 text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Quick Actions
              </p>
              {QUICK_ACTIONS.map(({ label, icon: Icon, path }) => (
                <button
                  key={path}
                  onClick={() => { navigate(path); onClose(); }}
                  className="w-full h-10 flex items-center gap-3 px-5 hover:bg-[#1C2330] transition-colors group"
                >
                  <Icon size={16} className="text-[#475569] group-hover:text-[#3B82F6]" />
                  <span className="text-[14px] text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Companies */}
          <div>
            <p className="px-5 py-2 text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {query ? 'Results' : 'Recent Companies'}
            </p>
            {filteredCompanies.map((company, idx) => (
              <button
                key={company.id}
                onClick={() => { navigate(`/companies/${company.id}`); onClose(); }}
                className={`w-full h-10 flex items-center gap-3 px-5 transition-colors group ${idx === selectedIdx ? 'bg-[#1C2330]' : 'hover:bg-[#1C2330]'}`}
              >
                <Building2 size={16} className={`flex-shrink-0 ${idx === selectedIdx ? 'text-[#3B82F6]' : 'text-[#475569] group-hover:text-[#3B82F6]'}`} />
                <span className="text-[14px] text-[#F1F5F9] flex-1 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {company.name}
                </span>
                <div className="flex items-center gap-2">
                  <SectorBadge sector={company.sector} />
                  <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {company.location}
                  </span>
                </div>
              </button>
            ))}
            {query && filteredCompanies.length === 0 && (
              <div className="px-5 py-6 text-center">
                <p className="text-[14px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  No results for "{query}"
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="h-9 border-t border-[#1E2535] flex items-center gap-4 px-5">
          {[
            { key: '↑↓', action: 'navigate' },
            { key: '↵', action: 'select' },
            { key: 'esc', action: 'close' },
          ].map(({ key, action }) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="text-[11px] text-[#475569] bg-[#1C2330] border border-[#1E2535] px-1.5 py-0.5 rounded" style={{ fontFamily: 'DM Mono, monospace' }}>
                {key}
              </span>
              <span className="text-[11px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                {action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
