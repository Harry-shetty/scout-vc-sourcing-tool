import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  LayoutDashboard, Building2, FolderOpen, Bookmark,
  Settings, Search, Bell, ChevronDown, LogOut,
  Sparkles, Menu, X, User, Database, MousePointer2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ScoutAvatar } from '../scout/ScoutAvatar';

interface TopNavProps {
  onSearchOpen: () => void;
}

const MAIN_NAV = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/lists', label: 'Lists', icon: FolderOpen },
  { path: '/saved', label: 'Saved', icon: Bookmark },
];

const MORE_NAV = [
  { path: '/components', label: 'UI Components', icon: Sparkles },
  { path: '/cursors', label: 'Cursor System', icon: MousePointer2 },
  { path: '/data-models', label: 'Data Models', icon: Database },
];

export function TopNav({ onSearchOpen }: TopNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isMoreActive = MORE_NAV.some(item => isActive(item.path));

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="h-14 bg-[#0F1218] border-b border-[#1E2535] flex items-center px-4 lg:px-6 flex-shrink-0 relative z-40">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 mr-6">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-[0_0_14px_rgba(6,182,212,0.35)]">
            <span className="text-[11px] font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>S</span>
          </div>
          <span className="text-[16px] font-bold text-[#F1F5F9] hidden sm:block" style={{ fontFamily: 'Syne, sans-serif' }}>Scout</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
          {MAIN_NAV.map(({ path, label, icon: Icon }) => {
            const active = isActive(path);
            return (
              <Link
                key={path}
                to={path}
                className={`h-8 px-3.5 flex items-center gap-2 rounded-md text-[13px] transition-all duration-100 font-medium ${active
                  ? 'bg-[rgba(59,130,246,0.12)] text-[#F1F5F9] border border-[rgba(59,130,246,0.25)]'
                  : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#1C2330]'
                  }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Icon size={14} className={active ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                {label}
              </Link>
            );
          })}

          {/* More dropdown */}
          <div className="relative" ref={moreMenuRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`h-8 px-3.5 flex items-center gap-1.5 rounded-md text-[13px] transition-all duration-100 font-medium ${isMoreActive
                ? 'bg-[rgba(59,130,246,0.12)] text-[#F1F5F9] border border-[rgba(59,130,246,0.25)]'
                : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#1C2330]'
                }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Design System
              <ChevronDown size={12} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-48 bg-[#161B24] border border-[#1E2535] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden z-50">
                {MORE_NAV.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMoreOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-[13px] transition-colors ${isActive(path)
                      ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9]'
                      : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                      }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Icon size={13} className={isActive(path) ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <button
            onClick={onSearchOpen}
            className="hidden sm:flex h-8 items-center gap-2 px-3 bg-[#161B24] border border-[#1E2535] rounded-md text-[13px] text-[#475569] hover:border-[#3B82F6] hover:text-[#94A3B8] transition-all group"
          >
            <Search size={13} />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>Search</span>
            <span className="text-[10px] bg-[#0F1218] border border-[#1E2535] px-1 py-0.5 rounded group-hover:border-[#3B82F6] transition-colors" style={{ fontFamily: 'DM Mono, monospace' }}>⌘K</span>
          </button>

          {/* Search icon mobile */}
          <button
            onClick={onSearchOpen}
            className="sm:hidden w-8 h-8 flex items-center justify-center rounded-md text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors"
          >
            <Search size={16} />
          </button>

          {/* Notifications */}
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors relative">
            <Bell size={15} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#3B82F6] ring-2 ring-[#0F1218]" />
          </button>

          {/* Settings (desktop) */}
          <Link
            to="/settings"
            className={`hidden lg:flex w-8 h-8 items-center justify-center rounded-md transition-colors ${isActive('/settings') ? 'text-[#3B82F6] bg-[rgba(59,130,246,0.1)]' : 'text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330]'
              }`}
          >
            <Settings size={15} />
          </Link>

          <div className="w-px h-5 bg-[#1E2535] mx-1 hidden sm:block" />

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 h-8 px-2 rounded-md hover:bg-[#1C2330] transition-colors"
            >
              <ScoutAvatar name={user?.name || 'User'} size={24} />
              <span className="text-[13px] text-[#94A3B8] hidden md:block max-w-[100px] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <ChevronDown size={12} className={`text-[#475569] transition-transform hidden md:block ${userMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {userMenuOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-56 bg-[#161B24] border border-[#1E2535] rounded-lg shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden z-50">
                {/* User info */}
                <div className="px-3 py-3 border-b border-[#1E2535]">
                  <p className="text-[13px] font-semibold text-[#F1F5F9] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{user?.name}</p>
                  <p className="text-[11px] text-[#475569] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{user?.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-full px-2 py-0.5">
                    <span className="text-[10px] text-[#3B82F6]" style={{ fontFamily: 'DM Mono, monospace' }}>{user?.role}</span>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <User size={13} className="text-[#475569]" />
                    Profile & Settings
                  </Link>
                </div>

                <div className="border-t border-[#1E2535] py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-[#F87171] hover:bg-[rgba(239,68,68,0.08)] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <LogOut size={13} />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-md text-[#475569] hover:text-[#94A3B8] hover:bg-[#1C2330] transition-colors ml-1"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile slide-down nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0F1218] border-b border-[#1E2535] z-30">
          <nav className="px-4 py-3 flex flex-col gap-0.5">
            <p className="text-[10px] font-medium text-[#334155] uppercase tracking-[0.8px] px-2 py-1 mb-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>
              Navigation
            </p>
            {MAIN_NAV.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`h-10 flex items-center gap-3 px-3 rounded-md text-[14px] transition-colors ${active
                    ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9] border-l-2 border-[#3B82F6]'
                    : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Icon size={16} className={active ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                  {label}
                </Link>
              );
            })}

            <p className="text-[10px] font-medium text-[#334155] uppercase tracking-[0.8px] px-2 py-1 mt-2 mb-0.5" style={{ fontFamily: 'DM Mono, monospace' }}>
              Design System
            </p>
            {MORE_NAV.map(({ path, label, icon: Icon }) => {
              const active = isActive(path);
              return (
                <Link
                  key={path}
                  to={path}
                  className={`h-10 flex items-center gap-3 px-3 rounded-md text-[14px] transition-colors ${active
                    ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9] border-l-2 border-[#3B82F6]'
                    : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                    }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <Icon size={16} className={active ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                  {label}
                </Link>
              );
            })}

            <div className="border-t border-[#1E2535] mt-2 pt-2">
              <Link
                to="/settings"
                className={`h-10 flex items-center gap-3 px-3 rounded-md text-[14px] transition-colors ${isActive('/settings') ? 'bg-[rgba(59,130,246,0.1)] text-[#F1F5F9]' : 'text-[#94A3B8] hover:bg-[#1C2330] hover:text-[#F1F5F9]'
                  }`}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Settings size={16} className={isActive('/settings') ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full h-10 flex items-center gap-3 px-3 rounded-md text-[14px] text-[#F87171] hover:bg-[rgba(239,68,68,0.06)] transition-colors mt-0.5"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
