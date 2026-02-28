import React from 'react';
import { Link, useLocation } from 'react-router';
import { LayoutDashboard, Building2, FolderOpen, Bookmark, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/companies', label: 'Companies', icon: Building2 },
  { path: '/lists', label: 'Lists', icon: FolderOpen },
  { path: '/saved', label: 'Saved', icon: Bookmark },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function MobileNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="h-16 bg-[#0F1218] border-t border-[#1E2535] flex items-center justify-around px-2 flex-shrink-0">
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
        const active = isActive(path);
        return (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <Icon size={20} className={active ? 'text-[#3B82F6]' : 'text-[#475569]'} />
            {active && (
              <span className="text-[10px] text-[#3B82F6]" style={{ fontFamily: 'Inter, sans-serif' }}>
                {label}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
