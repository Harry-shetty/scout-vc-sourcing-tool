import React, { useState } from 'react';
import { X, Download } from 'lucide-react';
import { ScoutButton } from '../scout/ScoutButton';
import type { Company } from '../../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  company?: Company;
}

export function ExportModal({ isOpen, onClose, company }: ExportModalProps) {
  const [format, setFormat] = useState<'json' | 'csv'>('json');

  if (!isOpen) return null;

  const jsonPreview = company ? JSON.stringify({
    id: company.id,
    name: company.name,
    sector: company.sector,
    stage: company.stage,
    location: company.location,
    website: company.website,
    founded: company.founded,
    teamSize: company.teamSize,
  }, null, 2).slice(0, 200) + '\n...' : '';

  const csvPreview = company
    ? `id,name,sector,stage,location,website\n${company.id},${company.name},${company.sector},${company.stage},"${company.location}",${company.website}`
    : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#161B24] border border-[#1E2535] rounded-xl shadow-[0_24px_48px_rgba(0,0,0,0.6)] p-6 z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
            Export Profile
          </h3>
          <button onClick={onClose} className="p-1 rounded text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Format selector */}
        <div className="flex gap-3">
          {(['json', 'csv'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 h-16 flex flex-col items-center justify-center gap-1 rounded-lg border transition-all
                ${format === f
                  ? 'border-[#3B82F6] bg-[rgba(59,130,246,0.08)]'
                  : 'border-[#1E2535] hover:border-[#3B82F6] hover:bg-[#1C2330]'
                }`}
            >
              <span className="text-[13px] font-medium text-[#F1F5F9] uppercase" style={{ fontFamily: 'DM Mono, monospace' }}>
                {f}
              </span>
              <span className="text-[11px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {f === 'json' ? 'Structured data' : 'Spreadsheet'}
              </span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="bg-[#0A0C10] rounded-md p-3 overflow-hidden">
          <p className="text-[11px] text-[#475569] mb-2 uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>Preview</p>
          <pre className="text-[12px] text-[#94A3B8] overflow-hidden whitespace-pre-wrap" style={{ fontFamily: 'DM Mono, monospace' }}>
            {format === 'json' ? jsonPreview : csvPreview}
          </pre>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <ScoutButton variant="ghost" onClick={onClose} className="flex-1">
            Cancel
          </ScoutButton>
          <ScoutButton variant="primary" iconLeft={<Download size={14} />} className="flex-1">
            Export {format.toUpperCase()}
          </ScoutButton>
        </div>
      </div>
    </div>
  );
}
