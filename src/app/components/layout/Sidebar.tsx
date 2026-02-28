import React from 'react';
import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard, Building2, FolderOpen, Bookmark,
  Settings, Search, ChevronLeft, ChevronRight,
  Sparkles
} from 'lucide-react';
import { ScoutAvatar } from '../scout/ScoutAvatar';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onSearchOpen: () => void;
}

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/lists', label: 'Lists', icon: FolderOpen },
  { path: '/saved', label: 'Saved', icon: Bookmark },
];

const SHOWCASE_ITEMS = [
  { path: '/components', label: 'UI Components', icon: Sparkles },
];

export function Sidebar({ collapsed, onToggle, onSearchOpen }: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className="flex flex-col h-screen bg-[#0F1218] border-r border-[#1E2535] transition-all duration-200 flex-shrink-0 relative z-20"
      style={{ width: collapsed ? 64 : 240 }}
    >
      {/* Logo */}
      <div className="h-14 flex items-center border-b border-[#1E2535] px-4 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#06B6D4] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)]">
            <span className="text-[10px] font-bold text-[#0A0C10]" style={{ fontFamily: 'Syne, sans-serif' }}>S</span>
          </div>
          {!collapsed && (
            <span className="text-[16px] font-bold text-[#F1F5F9] truncate" style={{ fontFamily: 'Syne, sans-serif' }}>
              Scout
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="ml-auto p-1 rounded text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Collapsed toggle */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="mx-auto mt-2 p-1.5 rounded text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Search */}
      {!collapsed && (
        <div className="px-2 py-2 flex-shrink-0">
          <button
            onClick={onSearchOpen}
            className="w-full h-10 bg-[#161B24] border border-[#1E2535] rounded-md flex items-center gap-2 px-3 hover:border-[#3B82F6] transition-colors group"
          >
            <Search size={14} className="text-[#475569]" />
            <span className="text-[14px] text-[#475569] flex-1 text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
              Search...
            </span>
            <span className="text-[11px] text-[#475569] bg-[#1C2330] border border-[#1E2535] px-1.5 py-0.5 rounded" style={{ fontFamily: 'DM Mono, monospace' }}>
              ⌘K
            </span>
          </button>
        </div>
      )}

      {collapsed && (
        <button
          onClick={onSearchOpen}
          className="mx-2 mt-1 h-10 bg-[#161B24] border border-[#1E2535] rounded-md flex items-center justify-center hover:border-[#3B82F6] transition-colors"
        >
          <Search size={16} className="text-[#475569]" />
        </button>
      )}

      {/* Nav */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {!collapsed && (
          <p className="px-2 py-1 text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            Navigation
          </p>
        )}
        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              title={collapsed ? label : undefined}
              className={`
                h-10 flex items-center gap-3 px-3 rounded-md transition-all duration-100 group relative
                ${isActive(path)
                  ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9] border-l-2 border-[#3B82F6]'
                  : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                }
                ${collapsed ? 'justify-center px-0' : ''}
              `}
            >
              <Icon
                size={16}
                className={`flex-shrink-0 ${isActive(path) ? 'text-[#3B82F6]' : 'text-[#475569] group-hover:text-[#94A3B8]'}`}
              />
              {!collapsed && (
                <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Showcase section */}
        <div className="mt-4">
          {!collapsed && (
            <p className="px-2 py-1 text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
              Design System
            </p>
          )}
          <nav className="flex flex-col gap-0.5">
            {SHOWCASE_ITEMS.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                title={collapsed ? label : undefined}
                className={`
                  h-10 flex items-center gap-3 px-3 rounded-md transition-all duration-100 group relative
                  ${isActive(path)
                    ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9] border-l-2 border-[#3B82F6]'
                    : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                  }
                  ${collapsed ? 'justify-center px-0' : ''}
                `}
              >
                <Icon
                  size={16}
                  className={`flex-shrink-0 ${isActive(path) ? 'text-[#3B82F6]' : 'text-[#475569] group-hover:text-[#94A3B8]'}`}
                />
                {!collapsed && (
                  <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {label}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#1E2535] p-2 flex-shrink-0">
        <Link
          to="/settings"
          className={`h-10 flex items-center gap-3 px-3 rounded-md text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9] transition-colors ${collapsed ? 'justify-center px-0' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={16} className="text-[#475569] flex-shrink-0" />
          {!collapsed && <span className="text-[14px]" style={{ fontFamily: 'Inter, sans-serif' }}>Settings</span>}
        </Link>

        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2 mt-1">
            <ScoutAvatar name="Analyst" size={32} />
            <div className="min-w-0">
              <p className="text-[13px] text-[#F1F5F9] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>Analyst</p>
              <p className="text-[11px] text-[#475569] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>analyst@scout.vc</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center mt-1">
            <ScoutAvatar name="Analyst" size={32} />
          </div>
        )}
      </div>
    </aside>
  );
}
