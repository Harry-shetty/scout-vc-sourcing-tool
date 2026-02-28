import React from 'react';
import type { Sector, Stage } from '../../types';

type BadgeType =
  | 'sector-ai' | 'sector-fintech' | 'sector-climate' | 'sector-healthtech' | 'sector-devtools' | 'sector-b2bsaas'
  | 'stage-preseed' | 'stage-seed' | 'stage-seriesa' | 'stage-seriesb'
  | 'status-enriched' | 'status-pending' | 'status-error'
  | 'keyword';

interface ScoutBadgeProps {
  type?: BadgeType;
  label?: string;
  className?: string;
}

const BADGE_STYLES: Record<BadgeType, string> = {
  'sector-ai':        'bg-[#1E1B4B] text-[#A78BFA] border border-[#4338CA]',
  'sector-fintech':   'bg-[#0C1A2E] text-[#38BDF8] border border-[#0369A1]',
  'sector-climate':   'bg-[#052E16] text-[#4ADE80] border border-[#166534]',
  'sector-healthtech':'bg-[#1A0A2E] text-[#C084FC] border border-[#7E22CE]',
  'sector-devtools':  'bg-[#1A2E05] text-[#86EFAC] border border-[#15803D]',
  'sector-b2bsaas':   'bg-[#1A1A2E] text-[#818CF8] border border-[#4F46E5]',
  'stage-preseed':    'bg-[#1C1007] text-[#FB923C] border border-[#C2410C]',
  'stage-seed':       'bg-[#1C1407] text-[#FCD34D] border border-[#B45309]',
  'stage-seriesa':    'bg-[#0A1628] text-[#60A5FA] border border-[#1D4ED8]',
  'stage-seriesb':    'bg-[#0D1F0D] text-[#4ADE80] border border-[#15803D]',
  'status-enriched':  'bg-[#052E16] text-[#4ADE80] border border-[#166534]',
  'status-pending':   'bg-[#1C1407] text-[#FCD34D] border border-[#B45309]',
  'status-error':     'bg-[#2D0A0A] text-[#F87171] border border-[#B91C1C]',
  'keyword':          'bg-[#161B24] text-[#94A3B8] border border-[#1E2535]',
};

export function sectorToBadgeType(sector: Sector): BadgeType {
  const map: Record<Sector, BadgeType> = {
    'AI': 'sector-ai',
    'Fintech': 'sector-fintech',
    'Climate': 'sector-climate',
    'HealthTech': 'sector-healthtech',
    'DevTools': 'sector-devtools',
    'B2B SaaS': 'sector-b2bsaas',
  };
  return map[sector] || 'keyword';
}

export function stageToBadgeType(stage: Stage): BadgeType {
  const map: Record<Stage, BadgeType> = {
    'Pre-Seed': 'stage-preseed',
    'Seed': 'stage-seed',
    'Series A': 'stage-seriesa',
    'Series B': 'stage-seriesb',
  };
  return map[stage] || 'keyword';
}

export function ScoutBadge({ type = 'keyword', label, className = '' }: ScoutBadgeProps) {
  return (
    <span
      className={`inline-flex items-center h-[22px] px-2 rounded-sm text-[11px] font-medium tracking-[0.3px] whitespace-nowrap ${BADGE_STYLES[type]} ${className}`}
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {label}
    </span>
  );
}

export function SectorBadge({ sector }: { sector: Sector }) {
  return <ScoutBadge type={sectorToBadgeType(sector)} label={sector} />;
}

export function StageBadge({ stage }: { stage: Stage }) {
  return <ScoutBadge type={stageToBadgeType(stage)} label={stage} />;
}
