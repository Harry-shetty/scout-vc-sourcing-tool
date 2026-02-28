import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FolderOpen, Plus, MoreHorizontal, Trash2, X } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { ScoutButton } from '../components/scout/ScoutButton';
import { ScoutCard } from '../components/scout/ScoutCard';
import { CompanyFavicon } from '../components/scout/ScoutAvatar';
import { MOCK_LISTS, MOCK_COMPANIES } from '../data/mock-data';
import type { List } from '../types';

export function Lists() {
  const navigate = useNavigate();
  const [lists, setLists] = useState<List[]>(MOCK_LISTS);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    if (!newName.trim()) return;
    const newList: List = {
      id: `l${Date.now()}`,
      name: newName,
      companyIds: [],
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setLists(prev => [newList, ...prev]);
    setNewName('');
    setShowCreate(false);
  };

  const handleDelete = (id: string) => {
    setLists(prev => prev.filter(l => l.id !== id));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="My Lists" breadcrumb="Scout / Lists" />
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 py-5 pb-20 md:pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
              My Lists
            </h2>
            <ScoutButton
              variant="primary"
              iconLeft={<Plus size={14} />}
              onClick={() => setShowCreate(true)}
            >
              New List
            </ScoutButton>
          </div>

          {/* Create form */}
          {showCreate && (
            <div className="mb-6 bg-[#161B24] border border-[#3B82F6] rounded-lg p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h4 className="text-[15px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Create New List
                </h4>
                <button onClick={() => setShowCreate(false)} className="p-1 text-[#475569] hover:text-[#94A3B8]">
                  <X size={14} />
                </button>
              </div>
              <input
                autoFocus
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCreate()}
                placeholder="List name..."
                className="h-9 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <div className="flex gap-2">
                <ScoutButton variant="primary" onClick={handleCreate}>
                  Create List
                </ScoutButton>
                <ScoutButton variant="ghost" onClick={() => setShowCreate(false)}>
                  Cancel
                </ScoutButton>
              </div>
            </div>
          )}

          {/* Lists grid */}
          {lists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {lists.map(list => (
                <ListCard
                  key={list.id}
                  list={list}
                  onOpen={() => navigate(`/lists/${list.id}`)}
                  onDelete={() => handleDelete(list.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-14 h-14 rounded-full bg-[#161B24] border border-[#1E2535] flex items-center justify-center">
                <FolderOpen size={20} className="text-[#475569]" />
              </div>
              <div className="text-center">
                <p className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  No lists yet
                </p>
                <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Create a list to organize your pipeline
                </p>
              </div>
              <ScoutButton variant="primary" iconLeft={<Plus size={14} />} onClick={() => setShowCreate(true)}>
                Create First List
              </ScoutButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListCard({ list, onOpen, onDelete }: { list: List; onOpen: () => void; onDelete: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const companies = list.companyIds.map(id => MOCK_COMPANIES.find(c => c.id === id)).filter(Boolean);
  const isEmpty = companies.length === 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMenuOpen(false); }}
      className={`
        bg-[#161B24] rounded-lg p-5 flex flex-col gap-3 cursor-pointer transition-all duration-150
        ${isEmpty ? 'border border-dashed border-[#1E2535]' : `border ${hovered ? 'border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-[#1E2535]'}`}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <FolderOpen size={18} className="text-[#3B82F6] flex-shrink-0" />
        <span className="text-[15px] font-semibold text-[#F1F5F9] flex-1 truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
          {list.name}
        </span>
        <div className="relative">
          <button
            onClick={e => { e.stopPropagation(); setMenuOpen(p => !p); }}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[#475569] hover:bg-[#1C2330] hover:text-[#94A3B8] transition-colors"
          >
            <MoreHorizontal size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 bg-[#161B24] border border-[#1E2535] rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.5)] z-20 w-36 py-1">
              <button
                onClick={e => { e.stopPropagation(); onDelete(); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-[#F87171] hover:bg-[#1C2330] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Trash2 size={12} />
                Delete list
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'DM Mono, monospace' }}>
          {isEmpty ? 'Empty list' : `${companies.length} companies`}
        </span>
        <span className="text-[#475569] text-[13px]">·</span>
        <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Created {list.createdAt}
        </span>
      </div>

      {/* Company favicons */}
      {!isEmpty && (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {companies.slice(0, 3).map((c, i) => (
              <div key={c!.id} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: 3 - i, position: 'relative' }}>
                <CompanyFavicon name={c!.name} size={22} />
              </div>
            ))}
            {companies.length > 3 && (
              <span className="ml-1 text-[11px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                +{companies.length - 3}
              </span>
            )}
          </div>
          <button
            onClick={onOpen}
            className="text-[13px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            View List →
          </button>
        </div>
      )}
      {isEmpty && (
        <button
          onClick={onOpen}
          className="text-[13px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors text-left"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Open list →
        </button>
      )}
    </div>
  );
}
