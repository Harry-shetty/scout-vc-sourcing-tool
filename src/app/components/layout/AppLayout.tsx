import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { TopNav } from './TopNav';
import { CommandPalette } from '../modals/CommandPalette';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export function AppLayout() {
  const [cmdOpen, setCmdOpen] = useState(false);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-screen bg-[#0A0C10] overflow-hidden">
        {/* Top Navigation */}
        <TopNav onSearchOpen={() => setCmdOpen(true)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Outlet context={{ setCmdOpen }} />
        </div>

        {/* Command Palette */}
        <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
      </div>
    </ProtectedRoute>
  );
}
