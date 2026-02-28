import React, { useState } from 'react';
import { X, FolderOpen, Plus, Check } from 'lucide-react';
import { MOCK_LISTS } from '../../data/mock-data';
import { ScoutButton } from '../scout/ScoutButton';

interface SaveToListModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyId: string;
  companyName: string;
}

export function SaveToListModal({ isOpen, onClose, companyId, companyName }: SaveToListModalProps) {
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [newListName, setNewListName] = useState('');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (listId: string) => {
    setSelectedListIds(prev =>
      prev.includes(listId) ? prev.filter(id => id !== listId) : [...prev, listId]
    );
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#161B24] border border-[#1E2535] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-6 z-10 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Save to List
          </h3>
          <button onClick={onClose} className="p-1 rounded text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors">
            <X size={16} />
          </button>
        </div>

        <p className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
          Adding <span className="text-[#F1F5F9]">{companyName}</span> to your lists
        </p>

        {/* Existing lists */}
        <div className="flex flex-col gap-1">
          <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Lists
          </p>
          {MOCK_LISTS.map(list => {
            const isChecked = selectedListIds.includes(list.id);
            const alreadyIn = list.companyIds.includes(companyId);
            return (
              <button
                key={list.id}
                onClick={() => !alreadyIn && handleToggle(list.id)}
                className={`
                  h-10 flex items-center gap-3 px-3 rounded-md transition-colors
                  ${isChecked ? 'bg-[rgba(59,130,246,0.08)]' : 'hover:bg-[#1C2330]'}
                  ${alreadyIn ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? 'bg-[#3B82F6] border-[#3B82F6]' : 'border-[#1E2535]'}`}>
                  {(isChecked || alreadyIn) && <Check size={10} className="text-white" />}
                </div>
                <FolderOpen size={16} className="text-[#3B82F6] flex-shrink-0" />
                <span className="text-[14px] text-[#F1F5F9] flex-1 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {list.name}
                </span>
                <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                  {alreadyIn ? 'Already saved' : `${list.companyIds.length}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[#1E2535]" />
          <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>or</span>
          <div className="flex-1 h-px bg-[#1E2535]" />
        </div>

        {/* Create new */}
        <div className="flex flex-col gap-3">
          <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Create New List
          </p>
          <input
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            placeholder="New list name..."
            className="h-9 bg-[#0F1218] border border-[#1E2535] rounded-md px-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.15)] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          />
          <ScoutButton
            variant="primary"
            fullWidth
            iconLeft={saved ? <Check size={14} /> : <Plus size={14} />}
            onClick={handleSave}
          >
            {saved ? 'Saved!' : 'Create & Save'}
          </ScoutButton>
        </div>
      </div>
    </div>
  );
}
