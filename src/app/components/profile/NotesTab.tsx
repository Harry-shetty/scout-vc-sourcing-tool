import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface NotesTabProps {
  companyId: string;
}

export function NotesTab({ companyId }: NotesTabProps) {
  const storageKey = `notes-${companyId}`;
  const [notes, setNotes] = useState(() => localStorage.getItem(storageKey) ?? '');
  const [lastSaved, setLastSaved] = useState<string | null>(
    notes ? 'Mar 15, 2024 at 2:34 PM' : null
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!notes) return;
    setSaving(true);
    const t = setTimeout(() => {
      localStorage.setItem(storageKey, notes);
      setLastSaved(new Date().toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit',
      }));
      setSaving(false);
    }, 1200);
    return () => clearTimeout(t);
  }, [notes, storageKey]);

  return (
    <div className="p-6 md:p-8 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
          Internal Notes
        </h3>
        {saving && (
          <span className="text-[12px] text-[#475569] flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            <span className="w-3 h-3 border border-[#475569] border-t-transparent rounded-full animate-spin" />
            Saving...
          </span>
        )}
        {!saving && lastSaved && (
          <span className="text-[12px] text-[#475569] flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Check size={12} className="text-[#10B981]" />
            Auto-saved
          </span>
        )}
      </div>

      {/* Textarea */}
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Add your analyst notes here..."
        maxLength={2000}
        className="min-h-[200px] w-full bg-[#161B24] border border-[#1E2535] rounded-lg p-4 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none resize-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.15)] transition-colors leading-relaxed"
        style={{ fontFamily: 'Inter, sans-serif' }}
      />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {lastSaved ? `Last saved: ${lastSaved}` : 'Not yet saved'}
        </span>
        <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
          {notes.length} / 2000
        </span>
      </div>
    </div>
  );
}
