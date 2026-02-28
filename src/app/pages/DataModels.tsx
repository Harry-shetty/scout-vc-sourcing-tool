import React from 'react';
import { Topbar } from '../components/layout/Topbar';

interface FieldDef {
  name: string;
  type: string;
  optional?: boolean;
}

interface SchemaBox {
  typeName: string;
  color?: string;
  fields: FieldDef[];
}

const SCHEMAS: SchemaBox[] = [
  {
    typeName: 'Company',
    color: '#3B82F6',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'sector', type: 'string' },
      { name: 'stage', type: "'Pre-Seed' | 'Seed' | 'Series A' | 'Series B'" },
      { name: 'location', type: 'string' },
      { name: 'website', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'founded', type: 'number' },
      { name: 'teamSize', type: 'string' },
      { name: 'enrichedAt', type: 'string', optional: true },
    ],
  },
  {
    typeName: 'EnrichResult',
    color: '#06B6D4',
    fields: [
      { name: 'summary', type: 'string' },
      { name: 'whatTheyDo', type: 'string[]' },
      { name: 'keywords', type: 'string[]' },
      { name: 'signals', type: 'Signal[]' },
      { name: 'sources', type: '{ url: string; scrapedAt: string }[]' },
      { name: 'enrichedAt', type: 'string' },
      { name: 'cached', type: 'boolean' },
      { name: 'duration', type: 'number' },
    ],
  },
  {
    typeName: 'Signal',
    color: '#8B5CF6',
    fields: [
      { name: 'label', type: 'string' },
      { name: 'reason', type: 'string' },
      { name: 'icon', type: 'string' },
      { name: 'color', type: 'string' },
    ],
  },
  {
    typeName: 'List',
    color: '#10B981',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'companyIds', type: 'string[]' },
      { name: 'createdAt', type: 'string' },
    ],
  },
  {
    typeName: 'SavedSearch',
    color: '#F59E0B',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'filters', type: '{ query: string; sector: string; stage: string; location: string }' },
      { name: 'createdAt', type: 'string' },
      { name: 'resultCount', type: 'number' },
    ],
  },
];

const RELATIONSHIPS = [
  { from: 'Company', to: 'List', via: 'List.companyIds[]', type: 'Many-to-Many', color: '#10B981' },
  { from: 'Company', to: 'EnrichResult', via: 'company.id → enrichedAt', type: '1:1', color: '#06B6D4' },
  { from: 'EnrichResult', to: 'Signal', via: 'enrichResult.signals[]', type: '1:Many', color: '#8B5CF6' },
];

function SchemaCard({ schema }: { schema: SchemaBox }) {
  return (
    <div className="bg-[#161B24] border border-[#1E2535] rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#1E2535] flex items-center gap-2">
        <span
          className="text-[14px] font-semibold"
          style={{ fontFamily: 'Syne, sans-serif', color: schema.color ?? '#3B82F6' }}
        >
          {schema.typeName}
        </span>
        <span className="text-[11px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
          interface
        </span>
      </div>
      {/* Fields */}
      <div className="divide-y divide-[#1E2535]">
        {schema.fields.map(field => (
          <div key={field.name} className="flex items-start px-4 py-2 gap-3">
            <span className="text-[13px] text-[#F1F5F9] w-28 flex-shrink-0" style={{ fontFamily: 'DM Mono, monospace' }}>
              {field.name}{field.optional ? '?' : ''}
            </span>
            <span className="text-[12px] text-[#94A3B8] break-all" style={{ fontFamily: 'DM Mono, monospace' }}>
              {field.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataModelsPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Data Models" breadcrumb="Scout / Design System / Data Models" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 pb-20 md:pb-10 flex flex-col gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-full mb-4">
              <span className="text-[11px] font-medium text-[#3B82F6] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>Design System</span>
            </div>
            <h1 className="text-[32px] font-bold text-[#F1F5F9] mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
              📊 Data Models
            </h1>
            <p className="text-[16px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              TypeScript interfaces for all Scout data entities and their relationships.
            </p>
          </div>

          {/* Schema grid */}
          <section>
            <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>TypeScript Interfaces</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {SCHEMAS.map(schema => (
                <SchemaCard key={schema.typeName} schema={schema} />
              ))}
            </div>
          </section>

          {/* Relationships */}
          <section>
            <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Relationships</h2>
            <div className="flex flex-col gap-3">
              {RELATIONSHIPS.map(rel => (
                <div
                  key={`${rel.from}-${rel.to}`}
                  className="flex items-center gap-4 bg-[#161B24] border border-[#1E2535] rounded-lg px-5 py-4"
                >
                  <span className="text-[14px] font-medium" style={{ fontFamily: 'DM Mono, monospace', color: rel.color }}>
                    {rel.from}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    <div className="flex-1 h-px border-t border-dashed border-[#1E2535]" />
                    <span className="text-[11px] text-[#475569] px-2 py-0.5 bg-[#0F1218] border border-[#1E2535] rounded" style={{ fontFamily: 'DM Mono, monospace' }}>
                      {rel.type}
                    </span>
                    <div className="flex-1 h-px border-t border-dashed border-[#1E2535]" />
                  </div>
                  <span className="text-[14px] font-medium" style={{ fontFamily: 'DM Mono, monospace', color: rel.color }}>
                    {rel.to}
                  </span>
                  <span className="text-[11px] text-[#475569] ml-2 hidden sm:block" style={{ fontFamily: 'Inter, sans-serif' }}>
                    via {rel.via}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Dev annotations */}
          <section>
            <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Dev Handoff Annotations</h2>
            <div className="flex flex-col gap-4">
              {[
                {
                  title: 'CompanyTableRow.tsx',
                  items: [
                    '📁 FILE: CompanyTableRow.tsx',
                    '🎨 STYLES: h-[52px] border-b border-[#141920] hover:bg-[#1C2330] hover:border-l-2 hover:border-l-blue-500',
                    '📦 PROPS: { company: Company, onEnrich: () => void, onSelect: (id: string) => void }',
                    '💾 STATE: isHovered, isSelected',
                  ],
                },
                {
                  title: 'EnrichTab.tsx',
                  items: [
                    '📁 FILE: EnrichTab.tsx',
                    '🎨 STYLES: flex flex-col gap-4 p-8',
                    '📦 PROPS: { companyId: string, websiteUrl: string }',
                    '💾 STATE: enrichStatus, enrichResult, isLoading, error',
                    '🔌 API: POST /api/enrich { url, companyName }',
                    '💿 STORAGE: enrich-cache-{companyId}',
                  ],
                },
                {
                  title: 'NotesTab.tsx',
                  items: [
                    '📁 FILE: NotesTab.tsx',
                    '📦 PROPS: { companyId: string }',
                    '💾 STATE: notes, lastSaved',
                    '💿 STORAGE: notes-{companyId}',
                  ],
                },
                {
                  title: 'SaveToListModal.tsx',
                  items: [
                    '📁 FILE: SaveToListModal.tsx',
                    '📦 PROPS: { companyId: string, isOpen: boolean, onClose: () => void }',
                    '💿 STORAGE: saved-lists',
                  ],
                },
              ].map(({ title, items }) => (
                <div key={title} className="bg-[#161B24] border border-[#1E2535] rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#1E2535] bg-[#0F1218]">
                    <span className="text-[13px] font-medium text-[#3B82F6]" style={{ fontFamily: 'DM Mono, monospace' }}>{title}</span>
                  </div>
                  <div className="px-4 py-3 flex flex-col gap-1.5">
                    {items.map((item, i) => (
                      <p key={i} className="text-[12px] text-[#94A3B8]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
