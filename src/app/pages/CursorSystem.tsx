import React from 'react';
import { Topbar } from '../components/layout/Topbar';

const CURSOR_STATES = [
  {
    state: 'STATE 1 — Default',
    desc: 'Standard navigation cursor across all idle UI surfaces.',
    dot: { size: 6, color: '#F1F5F9', glow: 'rgba(59,130,246,0.6)' },
    ring: { size: 32, color: 'rgba(59,130,246,0.5)', dash: false, label: null },
    fill: null,
  },
  {
    state: 'STATE 2 — Hover Default',
    desc: 'Hover over any interactive element (buttons, links, badges).',
    dot: { size: 10, color: '#3B82F6', glow: null },
    ring: { size: 48, color: '#60A5FA', dash: false, label: null },
    fill: 'rgba(59,130,246,0.06)',
  },
  {
    state: 'STATE 3 — Row Hover',
    desc: 'Hovering over a company table row — indicates clickable row.',
    dot: { size: 6, color: '#F1F5F9', glow: null },
    ring: { size: 56, color: '#06B6D4', dash: true, label: 'OPEN →' },
    fill: null,
  },
  {
    state: 'STATE 4 — Enrich Hover',
    desc: 'Hovering the Enrich button — conic gradient spin effect.',
    dot: { size: 8, color: '#60A5FA', glow: 'rgba(59,130,246,0.5)' },
    ring: { size: 56, color: '#3B82F6', dash: false, label: '✦ AI', conic: true },
    fill: 'rgba(59,130,246,0.1)',
  },
  {
    state: 'STATE 5 — Data Hover',
    desc: 'Hovering over selectable text / mono data values.',
    dot: { size: 2, color: '#94A3B8', glow: null, iBeam: true },
    ring: { size: 20, color: 'rgba(148,163,184,0.3)', dash: false, label: null },
    fill: null,
  },
  {
    state: 'STATE 6 — Click',
    desc: 'Mouse button down — instant shrink + ripple expand.',
    dot: { size: 6, color: '#F1F5F9', glow: null },
    ring: { size: 20, color: '#3B82F6', dash: false, label: null },
    fill: 'rgba(59,130,246,0.3)',
    ripple: true,
  },
  {
    state: 'STATE 7 — Drag',
    desc: 'During drag operations on list rows.',
    dot: { size: 0, color: '#F1F5F9', glow: null, move: true },
    ring: { size: 40, color: '#475569', dash: true, label: 'DRAG', square: true },
    fill: null,
  },
  {
    state: 'STATE 8 — Loading',
    desc: 'After clicking Enrich — spinning arc while AI processes.',
    dot: { size: 6, color: '#60A5FA', glow: 'rgba(59,130,246,0.4)', sparkle: true },
    ring: { size: 40, color: '#3B82F6', dash: false, label: null, spin: true },
    fill: null,
  },
  {
    state: 'STATE 9 — Sidebar',
    desc: 'Scaled down version for compact sidebar navigation.',
    dot: { size: 4, color: '#475569', glow: null },
    ring: { size: 24, color: 'rgba(71,85,105,0.4)', dash: false, label: null },
    fill: null,
  },
  {
    state: 'STATE 10 — Text Input',
    desc: 'Inside input fields — browser default I-beam cursor.',
    dot: null,
    ring: null,
    fill: null,
    browserDefault: true,
  },
];

export function CursorSystemPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Cursor System" breadcrumb="Scout / Design System / Cursors" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8 pb-20 md:pb-10 flex flex-col gap-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-full mb-4">
              <span className="text-[11px] font-medium text-[#3B82F6] uppercase tracking-[0.5px]" style={{ fontFamily: 'Inter, sans-serif' }}>Design System</span>
            </div>
            <h1 className="text-[32px] font-bold text-[#F1F5F9] mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
              🖱 Cursor System
            </h1>
            <p className="text-[16px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
              10 custom cursor states mapped to contextual interactions across Scout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {CURSOR_STATES.map((cursor) => (
              <div
                key={cursor.state}
                className="bg-[#161B24] border border-[#1E2535] rounded-lg p-5 flex flex-col gap-4"
              >
                {/* Cursor preview */}
                <div className="h-20 flex items-center justify-center relative">
                  {cursor.browserDefault ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-2 h-6 bg-[#94A3B8] rounded-full" />
                      <span className="text-[10px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>I-beam</span>
                    </div>
                  ) : (
                    <div className="relative flex items-center justify-center" style={{ width: 80, height: 80 }}>
                      {/* Fill */}
                      {cursor.fill && (
                        <div
                          className="absolute rounded-full"
                          style={{
                            width: cursor.ring?.size,
                            height: cursor.ring?.size,
                            background: cursor.fill,
                          }}
                        />
                      )}
                      {/* Ripple */}
                      {cursor.ripple && (
                        <div
                          className="absolute rounded-full border border-[rgba(59,130,246,0.3)]"
                          style={{ width: 72, height: 72 }}
                        />
                      )}
                      {/* Ring */}
                      {cursor.ring && !cursor.ring.square && (
                        <div
                          className="absolute rounded-full flex items-center justify-center"
                          style={{
                            width: cursor.ring.size,
                            height: cursor.ring.size,
                            border: `1.5px ${cursor.ring.dash ? 'dashed' : 'solid'} ${cursor.ring.conic ? '#3B82F6' : cursor.ring.color}`,
                            animation: cursor.ring.spin ? 'spin 0.8s linear infinite' : undefined,
                          }}
                        >
                          {cursor.ring.label && (
                            <span className="text-[9px] text-[#06B6D4]" style={{ fontFamily: 'DM Mono, monospace' }}>
                              {cursor.ring.label}
                            </span>
                          )}
                        </div>
                      )}
                      {/* Square ring (drag) */}
                      {cursor.ring?.square && (
                        <div
                          style={{
                            width: cursor.ring.size,
                            height: cursor.ring.size,
                            border: `1.5px dashed ${cursor.ring.color}`,
                            borderRadius: 6,
                          }}
                        />
                      )}
                      {/* Dot */}
                      {cursor.dot && !cursor.dot.iBeam && !cursor.dot.move && (
                        <div
                          className="absolute"
                          style={{
                            width: cursor.dot.size,
                            height: cursor.dot.size,
                            borderRadius: '50%',
                            background: cursor.dot.color,
                            boxShadow: cursor.dot.glow ? `0 0 6px ${cursor.dot.glow}` : undefined,
                          }}
                        />
                      )}
                      {/* I-beam dot */}
                      {cursor.dot?.iBeam && (
                        <div className="absolute" style={{ width: 2, height: 14, background: '#94A3B8', borderRadius: 1 }} />
                      )}
                      {/* Move arrows */}
                      {cursor.dot?.move && (
                        <div className="absolute text-[#F1F5F9] text-[14px]">✛</div>
                      )}
                      {/* Sparkle text */}
                      {cursor.dot?.sparkle && (
                        <div className="absolute text-[10px] text-[#60A5FA]">✦</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div>
                  <p className="text-[12px] font-medium text-[#3B82F6] mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>
                    {cursor.state}
                  </p>
                  <p className="text-[12px] text-[#94A3B8] leading-snug" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {cursor.desc}
                  </p>
                </div>

                {/* Specs */}
                {cursor.dot && !cursor.browserDefault && (
                  <div className="border-t border-[#1E2535] pt-3 flex flex-col gap-1">
                    {cursor.dot.size > 0 && (
                      <p className="text-[10px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        dot: {cursor.dot.size}px · {cursor.dot.color}
                      </p>
                    )}
                    {cursor.ring && (
                      <p className="text-[10px] text-[#475569]" style={{ fontFamily: 'DM Mono, monospace' }}>
                        ring: {cursor.ring.size}px{cursor.ring.dash ? ' · dashed' : ''}{cursor.ring.spin ? ' · spin 0.8s' : ''}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Component mapping */}
          <section>
            <h2 className="text-[24px] font-bold text-[#F1F5F9] mb-5" style={{ fontFamily: 'Syne, sans-serif' }}>Component Mapping</h2>
            <div className="bg-[#161B24] border border-[#1E2535] rounded-lg overflow-hidden">
              {[
                { component: 'CompanyTable Row', cursor: 'STATE 3 — Row Hover', color: '#06B6D4' },
                { component: 'EnrichButton', cursor: 'STATE 4 — Enrich Hover', color: '#3B82F6' },
                { component: 'Sidebar NavItem', cursor: 'STATE 9 — Sidebar', color: '#475569' },
                { component: 'Text Input / Textarea', cursor: 'STATE 10 — Text Input (browser)', color: '#94A3B8' },
                { component: 'Enrich Loading State', cursor: 'STATE 8 — Loading', color: '#3B82F6' },
                { component: 'List Row (drag)', cursor: 'STATE 7 — Drag', color: '#475569' },
                { component: 'Any Clickable Element', cursor: 'STATE 6 — Click (mousedown)', color: '#F59E0B' },
                { component: 'DM Mono data values', cursor: 'STATE 5 — Data Hover', color: '#94A3B8' },
                { component: 'Buttons, Cards, Links', cursor: 'STATE 2 — Hover Default', color: '#3B82F6' },
                { component: 'Idle / Background', cursor: 'STATE 1 — Default', color: '#F1F5F9' },
              ].map(({ component, cursor, color }, i) => (
                <div key={component} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-[#1E2535]' : ''}`}>
                  <span className="text-[13px] text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>{component}</span>
                  <span className="text-[12px]" style={{ fontFamily: 'DM Mono, monospace', color }}>{cursor}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
