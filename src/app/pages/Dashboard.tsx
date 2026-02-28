import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Building2, Sparkles, FolderOpen, Bookmark, TrendingUp, Plus, Search } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { ScoutCard } from '../components/scout/ScoutCard';
import { SectorBadge, StageBadge } from '../components/scout/ScoutBadge';
import { CompanyFavicon } from '../components/scout/ScoutAvatar';
import { MOCK_COMPANIES } from '../data/mock-data';
import { useAuth } from '../context/AuthContext';

/** Animates a number from 0 → target over `duration` ms using ease-out quintic. */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out quintic — fast start, ultra-smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 5);
      setCount(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return count;
}

/** Individual stat card with count-up animation. */
function StatCard({ label, value, icon: Icon, color, trend, bg }: {
  label: string; value: string; icon: React.ElementType;
  color: string; trend: string; bg: string;
}) {
  const target = parseInt(value, 10);
  const animated = useCountUp(target);
  return (
    <div className="bg-[#161B24] border border-[#1E2535] rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
          {label}
        </span>
        <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: bg }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-[28px] font-bold" style={{ fontFamily: 'DM Mono, monospace', color }}>
          {animated}
        </span>
        <span className="text-[12px] text-[#10B981] flex items-center gap-0.5 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
          <TrendingUp size={11} />
          {trend}
        </span>
      </div>
    </div>
  );
}

const STATS = [
  { label: 'Total Companies', value: '247', icon: Building2, color: '#3B82F6', trend: '+12%', bg: 'rgba(59,130,246,0.1)' },
  { label: 'Enriched', value: '89', icon: Sparkles, color: '#06B6D4', trend: '+8%', bg: 'rgba(6,182,212,0.1)' },
  { label: 'Lists Created', value: '12', icon: FolderOpen, color: '#8B5CF6', trend: '+3%', bg: 'rgba(139,92,246,0.1)' },
  { label: 'Saved Searches', value: '8', icon: Bookmark, color: '#F59E0B', trend: '+2%', bg: 'rgba(245,158,11,0.1)' },
];

const QUICK_ACTIONS = [
  {
    title: 'Discover Companies',
    desc: 'Browse and filter all 247 companies in the pipeline',
    icon: Building2,
    color: '#3B82F6',
    path: '/companies',
  },
  {
    title: 'Create List',
    desc: 'Organize companies into custom curated lists',
    icon: FolderOpen,
    color: '#8B5CF6',
    path: '/lists',
  },
  {
    title: 'Saved Searches',
    desc: 'Run your saved filters with one click',
    icon: Search,
    color: '#06B6D4',
    path: '/saved',
  },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const recentCompanies = MOCK_COMPANIES.filter(c => c.enrichedAt).slice(0, 5);
  const firstName = user?.name?.split(' ')[0] || 'Analyst';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Dashboard" breadcrumb="Scout / Dashboard" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 pb-6">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
              {greeting}, {firstName} 👋
            </h2>
            <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Here's your sourcing overview
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          {/* Recent companies + Quick actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent companies */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Recent Companies
                </h3>
                <button
                  onClick={() => navigate('/companies')}
                  className="text-[13px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  View all →
                </button>
              </div>
              <div className="bg-[#161B24] border border-[#1E2535] rounded-lg overflow-hidden">
                {recentCompanies.map((company, i) => (
                  <button
                    key={company.id}
                    onClick={() => navigate(`/companies/${company.id}`)}
                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1C2330] transition-colors text-left ${i < recentCompanies.length - 1 ? 'border-b border-[#141920]' : ''}`}
                  >
                    <CompanyFavicon name={company.name} size={32} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium text-[#F1F5F9] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {company.name}
                      </p>
                      <p className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {company.location}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <SectorBadge sector={company.sector} />
                      <StageBadge stage={company.stage} />
                    </div>
                    <span className="text-[11px] text-[#475569] hidden sm:block" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {company.enrichedAt}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col gap-3">
              <h3 className="text-[18px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
                Quick Actions
              </h3>
              {QUICK_ACTIONS.map(({ title, desc, icon: Icon, color, path }) => (
                <ScoutCard
                  key={path}
                  onClick={() => navigate(path)}
                  className="cursor-pointer hover:border-[#3B82F6] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: `${color}15` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-[#F1F5F9] mb-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {title}
                      </p>
                      <p className="text-[12px] text-[#94A3B8] leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </ScoutCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}