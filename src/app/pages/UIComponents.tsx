import React, { useState } from 'react';
import { Sparkles, Download, Bookmark, Plus, Search, X, AlertCircle, CheckCircle, FolderOpen, Edit3, Building2 } from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { ScoutBadge } from '../components/scout/ScoutBadge';
import { ScoutButton } from '../components/scout/ScoutButton';
import { ScoutCard } from '../components/scout/ScoutCard';
import { ScoutSkeleton, SkeletonLine, SkeletonBlock } from '../components/scout/ScoutSkeleton';
import { ScoutAvatar, CompanyFavicon } from '../components/scout/ScoutAvatar';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function UIComponentsPage() {
  const [inputVal, setInputVal] = useState('');
  const [focusedInput, setFocusedInput] = useState('');

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="UI Components" breadcrumb="Scout / Design System / Components" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 pb-20 md:pb-10 flex flex-col gap-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-full mb-4">
              <span className="text-[11px] font-medium text-[#3B82F6] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>Design System</span>
            </div>
            <h1 className="text-[32px] font-bold text-[#F1F5F9] mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
              🧩 UI Components
            </h1>
            <p className="text-[16px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              All Scout interface primitives with all variant states documented.
            </p>
          </div>

          {/* Badges */}
          <Section title="Badges">
            <SubSection title="Sector Tags">
              <div className="flex flex-wrap gap-2">
                {(['sector-ai','sector-fintech','sector-climate','sector-healthtech','sector-devtools','sector-b2bsaas'] as const).map(type => (
                  <ScoutBadge key={type} type={type} label={type.replace('sector-', '').toUpperCase()} />
                ))}
              </div>
            </SubSection>
            <SubSection title="Stage Badges">
              <div className="flex flex-wrap gap-2">
                {(['stage-preseed','stage-seed','stage-seriesa','stage-seriesb'] as const).map(type => (
                  <ScoutBadge key={type} type={type} label={type.replace('stage-', '').replace('preseed', 'Pre-Seed').replace('seed', 'Seed').replace('seriesa', 'Series A').replace('seriesb', 'Series B')} />
                ))}
              </div>
            </SubSection>
            <SubSection title="Status Badges">
              <div className="flex flex-wrap gap-2">
                <ScoutBadge type="status-enriched" label="Enriched" />
                <ScoutBadge type="status-pending" label="Pending" />
                <ScoutBadge type="status-error" label="Error" />
                <ScoutBadge type="keyword" label="Keyword" />
                <ScoutBadge type="keyword" label="LLM" />
                <ScoutBadge type="keyword" label="API" />
              </div>
            </SubSection>
          </Section>

          {/* Buttons */}
          <Section title="Buttons">
            <SubSection title="Primary">
              <div className="flex flex-wrap items-center gap-3">
                <ScoutButton variant="primary" size="sm">Small</ScoutButton>
                <ScoutButton variant="primary" size="md" iconLeft={<Sparkles size={14} />}>Enrich</ScoutButton>
                <ScoutButton variant="primary" size="lg">Large Primary</ScoutButton>
                <ScoutButton variant="primary" loading>Loading</ScoutButton>
                <ScoutButton variant="primary" disabled>Disabled</ScoutButton>
              </div>
            </SubSection>
            <SubSection title="Secondary">
              <div className="flex flex-wrap items-center gap-3">
                <ScoutButton variant="secondary" size="sm" iconLeft={<Download size={12} />}>Export</ScoutButton>
                <ScoutButton variant="secondary" iconLeft={<Bookmark size={14} />}>Save to List</ScoutButton>
                <ScoutButton variant="secondary" size="lg">Secondary Large</ScoutButton>
              </div>
            </SubSection>
            <SubSection title="Ghost & Danger">
              <div className="flex flex-wrap items-center gap-3">
                <ScoutButton variant="ghost" size="sm">Ghost SM</ScoutButton>
                <ScoutButton variant="ghost">Ghost MD</ScoutButton>
                <ScoutButton variant="ghost" size="lg" iconLeft={<Search size={15} />}>Search</ScoutButton>
                <ScoutButton variant="danger" size="sm">Delete</ScoutButton>
                <ScoutButton variant="danger">Danger MD</ScoutButton>
              </div>
            </SubSection>
          </Section>

          {/* Inputs */}
          <Section title="Inputs">
            <div className="max-w-md flex flex-col gap-3">
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Default</p>
                <input
                  placeholder="Type something..."
                  className="w-full h-9 bg-[#161B24] border border-[#1E2535] rounded-md px-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Focus</p>
                <input
                  placeholder="Focused state..."
                  className="w-full h-9 bg-[#161B24] border border-[#3B82F6] rounded-md px-3 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none ring-1 ring-[rgba(59,130,246,0.15)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Error</p>
                <input
                  defaultValue="invalid@"
                  className="w-full h-9 bg-[#161B24] border border-[#EF4444] rounded-md px-3 text-[14px] text-[#F1F5F9] outline-none ring-1 ring-[rgba(239,68,68,0.15)]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Search Type</p>
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569]" />
                  <input
                    placeholder="Search companies..."
                    className="w-full h-9 bg-[#161B24] border border-[#1E2535] rounded-md pl-9 pr-8 text-[14px] text-[#F1F5F9] placeholder-[#475569] outline-none focus:border-[#3B82F6] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  <X size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569] cursor-pointer" />
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Disabled</p>
                <input
                  disabled
                  value="Disabled input"
                  className="w-full h-9 bg-[#0F1218] border border-[#1E2535] rounded-md px-3 text-[14px] text-[#475569] outline-none cursor-not-allowed"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>
          </Section>

          {/* Cards */}
          <Section title="Cards">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ScoutCard>
                <p className="text-[14px] font-medium text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Default Card</p>
                <p className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Standard card with subtle border and shadow.</p>
              </ScoutCard>
              <ScoutCard hover>
                <p className="text-[14px] font-medium text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Hover State</p>
                <p className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Blue border with glow shadow on hover.</p>
              </ScoutCard>
              <ScoutCard active>
                <p className="text-[14px] font-medium text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Active State</p>
                <p className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Cyan accent border for active selection.</p>
              </ScoutCard>
            </div>
          </Section>

          {/* Skeletons */}
          <Section title="Skeletons">
            <div className="max-w-md flex flex-col gap-4">
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Lines</p>
                <div className="flex flex-col gap-2">
                  <SkeletonLine size="sm" />
                  <SkeletonLine size="md" />
                  <SkeletonLine size="lg" />
                </div>
              </div>
              <div>
                <p className="text-[11px] text-[#475569] uppercase tracking-[0.5px] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Blocks</p>
                <div className="flex flex-col gap-2">
                  <SkeletonBlock size="sm" />
                  <SkeletonBlock size="md" />
                </div>
              </div>
            </div>
          </Section>

          {/* Avatars */}
          <Section title="Avatars & Favicons">
            <SubSection title="Avatars — Sizes">
              <div className="flex items-center gap-6">
                {([24, 32, 40] as const).map(size => (
                  <div key={size} className="flex flex-col items-center gap-2">
                    <ScoutAvatar name="Analyst" size={size} />
                    <span className="text-[11px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>{size}px</span>
                  </div>
                ))}
              </div>
            </SubSection>
            <SubSection title="Company Favicons">
              <div className="flex items-center gap-4">
                {['Acme AI', 'NeuralFlow', 'FinEdge', 'CarbonPath', 'MedIQ'].map(name => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <CompanyFavicon name={name} size={32} />
                    <span className="text-[10px] text-[#475569] truncate max-w-[50px] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{name}</span>
                  </div>
                ))}
              </div>
            </SubSection>
          </Section>

          {/* Empty States */}
          <Section title="Empty States">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Building2, title: 'No companies found', sub: 'Try adjusting your search filters to see results.', cta: 'Clear Filters' },
                { icon: Search, title: 'No results match', sub: 'No companies match your current query.', cta: 'Reset Search' },
                { icon: FolderOpen, title: 'No lists yet', sub: 'Create your first list to organize your pipeline.', cta: 'Create List' },
                { icon: Edit3, title: 'No notes added', sub: 'Add your analyst notes for this company.', cta: 'Add Note' },
                { icon: Sparkles, title: 'Ready to enrich', sub: 'Click Enrich to pull live AI intelligence.', cta: 'Enrich Now' },
                { icon: AlertCircle, title: 'Something went wrong', sub: 'An error occurred while loading data.', cta: 'Retry' },
              ].map(({ icon: Icon, title, sub, cta }) => (
                <div key={title} className="bg-[#161B24] border border-[#1E2535] rounded-lg p-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#0F1218] border border-[#1E2535] flex items-center justify-center">
                    <Icon size={20} className="text-[#475569]" />
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</p>
                    <p className="text-[13px] text-[#94A3B8] leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>{sub}</p>
                  </div>
                  <ScoutButton variant="secondary" size="sm">{cta}</ScoutButton>
                </div>
              ))}
            </div>
          </Section>

          {/* Tabs preview */}
          <Section title="Tabs">
            <div className="bg-[#161B24] border border-[#1E2535] rounded-lg overflow-hidden">
              {['Overview', 'Signals', 'Notes', 'Enrichment'].map((tab, i) => {
                const isActive = i === 0;
                return (
                  <span
                    key={tab}
                    className={`inline-flex h-10 items-center px-4 text-[14px] transition-colors border-b-2
                      ${isActive
                        ? 'text-[#F1F5F9] font-medium border-[#3B82F6]'
                        : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9]'
                      }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {tab}
                    {tab === 'Enrichment' && <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />}
                  </span>
                );
              })}
              <div className="w-full h-px bg-[#1E2535]" style={{ marginTop: -1 }} />
              <div className="p-4">
                <p className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Tab content renders here based on active tab selection.</p>
              </div>
            </div>
          </Section>

          {/* Tooltip */}
          <Section title="Tooltip">
            <div className="flex items-start gap-8">
              <div className="relative">
                <ScoutButton variant="ghost" size="sm">Hover for tooltip</ScoutButton>
                <div className="mt-2 relative">
                  <div className="bg-[#1C2330] border border-[#1E2535] rounded-md px-2.5 py-1.5 w-max shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                    <span className="text-[12px] text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>Tooltip content here</span>
                  </div>
                  <div className="absolute -top-1.5 left-4 w-3 h-1.5 overflow-hidden">
                    <div className="w-2 h-2 bg-[#1C2330] border-l border-t border-[#1E2535] transform rotate-45 ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
