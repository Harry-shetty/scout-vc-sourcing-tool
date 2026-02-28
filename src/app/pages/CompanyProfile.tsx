import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft, Download, Bookmark, Globe, Calendar,
  Users, MapPin, Clock, Sparkles
} from 'lucide-react';
import { Topbar } from '../components/layout/Topbar';
import { SectorBadge, StageBadge } from '../components/scout/ScoutBadge';
import { ScoutButton } from '../components/scout/ScoutButton';
import { ScoutCard } from '../components/scout/ScoutCard';
import { CompanyFavicon } from '../components/scout/ScoutAvatar';
import { EnrichTab } from '../components/profile/EnrichTab';
import { SignalsTab } from '../components/profile/SignalsTab';
import { NotesTab } from '../components/profile/NotesTab';
import { SaveToListModal } from '../components/modals/SaveToListModal';
import { ExportModal } from '../components/modals/ExportModal';
import { MOCK_COMPANIES, MOCK_LISTS } from '../data/mock-data';

type TabId = 'overview' | 'signals' | 'notes' | 'enrich';

export function CompanyProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const company = MOCK_COMPANIES.find(c => c.id === id);

  if (!company) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <Topbar title="Company Not Found" />
        <div className="flex items-center justify-center flex-1">
          <div className="text-center">
            <p className="text-[#94A3B8] mb-4">Company not found</p>
            <ScoutButton onClick={() => navigate('/companies')}>← Back to Companies</ScoutButton>
          </div>
        </div>
      </div>
    );
  }

  const savedInLists = MOCK_LISTS.filter(l => l.companyIds.includes(company.id));

  const TABS: { id: TabId; label: string; dot?: boolean }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'signals', label: 'Signals' },
    { id: 'notes', label: 'Notes' },
    { id: 'enrich', label: 'Enrichment', dot: !company.enrichedAt },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title={company.name} breadcrumb={`Scout / Companies / ${company.name}`} />

      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-[#0F1218] border-b border-[#1E2535] px-6 py-5">
            {/* Row 1: back + actions */}
            <div className="flex items-center justify-between mb-4">
              <ScoutButton
                variant="ghost"
                size="sm"
                iconLeft={<ArrowLeft size={13} />}
                onClick={() => navigate('/companies')}
              >
                Companies
              </ScoutButton>
              <div className="flex items-center gap-2">
                <ScoutButton
                  variant="secondary"
                  size="sm"
                  iconLeft={<Download size={13} />}
                  onClick={() => setExportModalOpen(true)}
                >
                  Export
                </ScoutButton>
                <ScoutButton
                  variant="primary"
                  size="sm"
                  iconLeft={<Bookmark size={13} />}
                  onClick={() => setSaveModalOpen(true)}
                >
                  Save to List
                </ScoutButton>
              </div>
            </div>

            {/* Row 2: company identity */}
            <div className="flex items-start gap-4 mb-4">
              <CompanyFavicon name={company.name} size={40} />
              <div className="flex-1 min-w-0">
                <h1 className="text-[32px] font-bold text-[#F1F5F9] leading-tight" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
                  {company.name}
                </h1>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[#06B6D4] hover:underline"
                  style={{ fontFamily: 'DM Mono, monospace' }}
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <StageBadge stage={company.stage} />
                <SectorBadge sector={company.sector} />
              </div>
            </div>

            {/* Row 3: meta */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'FOUNDED', value: String(company.founded), icon: Calendar },
                { label: 'TEAM SIZE', value: company.teamSize, icon: Users },
                { label: 'LOCATION', value: company.location, icon: MapPin },
                { label: 'LAST ENRICHED', value: company.enrichedAt ?? 'Never', icon: Clock },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} className="text-[#475569]" />
                  <div>
                    <p className="text-[10px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {label}
                    </p>
                    <p className="text-[13px] text-[#F1F5F9]" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#1E2535] px-6 bg-[#0A0C10]">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative h-10 px-4 text-[14px] transition-all flex items-center gap-2
                  ${activeTab === tab.id
                    ? 'text-[#F1F5F9] font-medium border-b-2 border-[#3B82F6]'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }
                `}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {tab.label}
                {tab.dot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && <OverviewTabContent company={company} />}
          {activeTab === 'signals' && <SignalsTab />}
          {activeTab === 'notes' && <NotesTab companyId={company.id} />}
          {activeTab === 'enrich' && <EnrichTab company={company} />}
        </div>

        {/* Sidebar — desktop only */}
        <div className="hidden lg:flex w-72 flex-col border-l border-[#1E2535] bg-[#0F1218] p-6 gap-5 overflow-y-auto">
          {/* Actions */}
          <div>
            <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Actions
            </p>
            <div className="flex flex-col gap-2">
              <ScoutButton
                variant="primary"
                fullWidth
                iconLeft={<Bookmark size={14} />}
                onClick={() => setSaveModalOpen(true)}
              >
                Save to List
              </ScoutButton>
              <ScoutButton
                variant="secondary"
                fullWidth
                iconLeft={<Download size={14} />}
                onClick={() => setExportModalOpen(true)}
              >
                Export Profile
              </ScoutButton>
            </div>
          </div>

          {/* Saved to */}
          <div>
            <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              Saved To
            </p>
            {savedInLists.length > 0 ? (
              <div className="flex flex-col gap-1.5">
                {savedInLists.map(list => (
                  <div key={list.id} className="flex items-center gap-2 text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <Bookmark size={12} className="text-[#3B82F6]" />
                    {list.name}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Not saved to any list
              </p>
            )}
          </div>

          {/* Enrich shortcut */}
          <div>
            <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
              AI Intelligence
            </p>
            <button
              onClick={() => setActiveTab('enrich')}
              className="w-full h-10 flex items-center gap-2 px-3 bg-gradient-to-br from-[#1E40AF] to-[#0E7490] border border-[#3B82F6] rounded-lg text-[#F1F5F9] text-[13px] hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Sparkles size={14} className="text-[#60A5FA]" />
              {company.enrichedAt ? 'View Enrichment' : 'Enrich This Company'}
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SaveToListModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        companyId={company.id}
        companyName={company.name}
      />
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        company={company}
      />
    </div>
  );
}

function OverviewTabContent({ company }: { company: { description: string; sector: string; stage: string; teamSize: string; website: string; founded: number } }) {
  const DETAILS = [
    { label: 'Business Model', value: 'B2B SaaS' },
    { label: 'Revenue Stage', value: company.stage },
    { label: 'Key Markets', value: 'Enterprise, Mid-Market' },
    { label: 'Tech Stack', value: 'React, Python, AWS' },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* About */}
      <ScoutCard>
        <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          About
        </p>
        <p className="text-[14px] text-[#F1F5F9] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {company.description}
        </p>
      </ScoutCard>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-4">
        {DETAILS.map(({ label, value }) => (
          <div key={label} className="bg-[#161B24] border border-[#1E2535] rounded-lg p-4">
            <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
              {label}
            </p>
            <p className="text-[14px] text-[#F1F5F9]" style={{ fontFamily: 'DM Mono, monospace' }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
