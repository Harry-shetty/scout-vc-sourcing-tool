import React, { useState } from 'react';
import {
  Sparkles, RotateCcw, Clock, Link, AlertTriangle,
  Users, Zap, PenLine, Building2, Code2, RefreshCw
} from 'lucide-react';
import { ScoutButton } from '../scout/ScoutButton';
import { ScoutCard } from '../scout/ScoutCard';
import { SkeletonBlock, SkeletonLine, SkeletonCard } from '../scout/ScoutSkeleton';
import { ScoutBadge } from '../scout/ScoutBadge';
import { MOCK_ENRICH_RESULT } from '../../data/mock-data';
import type { EnrichStatus, Company } from '../../types';

interface EnrichTabProps {
  company: Company;
}

const SIGNAL_ICONS: Record<string, React.ReactNode> = {
  users: <Users size={14} />,
  zap: <Zap size={14} />,
  'pen-line': <PenLine size={14} />,
  'building-2': <Building2 size={14} />,
  'code-2': <Code2 size={14} />,
};

export function EnrichTab({ company }: EnrichTabProps) {
  const [status, setStatus] = useState<EnrichStatus>('idle');

  const handleEnrich = () => {
    setStatus('loading');
    setTimeout(() => setStatus('success'), 2800);
  };

  if (status === 'idle') return <PreEnrichState onEnrich={handleEnrich} />;
  if (status === 'loading') return <LoadingState />;
  if (status === 'success') return <ResultsState onReEnrich={() => setStatus('idle')} />;
  if (status === 'error') return <ErrorState onRetry={() => setStatus('idle')} />;
  return null;
}

function PreEnrichState({ onEnrich }: { onEnrich: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 gap-6">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#0E7490] flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <Sparkles size={28} className="text-white" />
      </div>
      <div className="text-center">
        <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>
          AI Intelligence Ready
        </h2>
        <p className="text-[14px] text-[#94A3B8] max-w-[360px] mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          Click Enrich to pull live structured intelligence from this company's website
        </p>
      </div>

      <button
        onClick={onEnrich}
        className="h-12 px-8 flex items-center gap-2.5 bg-gradient-to-br from-[#1E40AF] to-[#0E7490] border border-[#3B82F6] rounded-lg text-[#F1F5F9] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-150"
      >
        <Sparkles size={18} className="text-[#60A5FA]" />
        <span className="text-[15px] font-semibold" style={{ fontFamily: 'Syne, sans-serif' }}>
          Enrich This Company
        </span>
      </button>

      <p className="text-[12px] text-[#475569] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
        Sources and timestamp will be shown after enrichment
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col gap-5 p-8">
      <div className="flex items-center gap-3 h-10 px-4 bg-[#161B24] border border-[#1E2535] rounded-md w-fit">
        <div className="w-4 h-4 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin" />
        <span className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Analyzing website...</span>
      </div>
      <SkeletonCard />
      <SkeletonCard />
      <div className="bg-[#161B24] border border-[#1E2535] rounded-lg p-5 flex flex-col gap-3">
        <SkeletonLine size="sm" />
        <SkeletonLine size="md" />
        <SkeletonLine size="md" />
        <SkeletonLine size="sm" />
      </div>
      <SkeletonCard />
    </div>
  );
}

function ResultsState({ onReEnrich }: { onReEnrich: () => void }) {
  const result = MOCK_ENRICH_RESULT;

  return (
    <div className="flex flex-col gap-4 p-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <h4 className="text-[15px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>
          Enrichment Complete
        </h4>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
            {result.enrichedAt}
          </span>
          <ScoutButton variant="ghost" size="sm" iconLeft={<RefreshCw size={11} />} onClick={onReEnrich}>
            Re-enrich
          </ScoutButton>
        </div>
      </div>

      {/* CARD 1 — Summary */}
      <ScoutCard>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Summary
          </span>
          <Sparkles size={12} className="text-[#3B82F6]" />
        </div>
        <p className="text-[16px] text-[#F1F5F9] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
          {result.summary}
        </p>
      </ScoutCard>

      {/* CARD 2 — What They Do */}
      <ScoutCard>
        <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          What They Do
        </p>
        <div className="flex flex-col gap-2">
          {result.whatTheyDo.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-[14px] text-[#06B6D4] mt-0.5 flex-shrink-0" style={{ fontFamily: 'DM Mono, monospace' }}>→</span>
              <span className="text-[14px] text-[#F1F5F9] leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
            </div>
          ))}
        </div>
      </ScoutCard>

      {/* CARD 3 — Keywords */}
      <ScoutCard>
        <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          Keywords
        </p>
        <div className="flex flex-wrap gap-2">
          {result.keywords.map(kw => (
            <ScoutBadge key={kw} type="keyword" label={kw} />
          ))}
        </div>
      </ScoutCard>

      {/* CARD 4 — Derived Signals */}
      <ScoutCard>
        <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          Derived Signals
        </p>
        <div className="flex flex-col gap-3">
          {result.signals.map((signal, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: `${signal.color}20`, color: signal.color }}
              >
                {SIGNAL_ICONS[signal.icon] || <Zap size={14} />}
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[14px] font-medium text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {signal.label}
                </span>
                <span className="text-[12px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {signal.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScoutCard>

      {/* CARD 5 — Sources */}
      <ScoutCard>
        <p className="text-[11px] font-medium text-[#475569] uppercase tracking-[0.5px] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          Sources Scraped
        </p>
        <div className="flex flex-col gap-2">
          {result.sources.map((src, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Link size={12} className="text-[#475569] flex-shrink-0" />
                <span className="text-[12px] text-[#3B82F6]" style={{ fontFamily: 'DM Mono, monospace' }}>{src.url}</span>
              </div>
              <span className="text-[11px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>{src.scrapedAt}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-[#1E2535] mt-3 pt-3">
          <span className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Enrichment took {result.duration}s
          </span>
        </div>
      </ScoutCard>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="p-8">
      <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-lg p-6 flex flex-col gap-4">
        <AlertTriangle size={24} className="text-[#EF4444]" />
        <div>
          <h4 className="text-[15px] font-semibold text-[#EF4444] mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            Enrichment Failed
          </h4>
          <p className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Unable to fetch website content. The site may be unavailable or blocking automated requests.
          </p>
        </div>
        <ScoutButton variant="danger" size="md" onClick={onRetry}>
          Retry Enrichment
        </ScoutButton>
      </div>
    </div>
  );
}
