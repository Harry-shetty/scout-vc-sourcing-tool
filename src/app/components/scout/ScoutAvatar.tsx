import React from 'react';

interface ScoutAvatarProps {
  name?: string;
  size?: 24 | 32 | 40;
  className?: string;
}

export function ScoutAvatar({ name = 'A', size = 32, className = '' }: ScoutAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const fontSize = size <= 24 ? 10 : size <= 32 ? 12 : 14;

  return (
    <div
      className={`rounded-full bg-[#161B24] border border-[#1E2535] flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="text-[#94A3B8] select-none"
        style={{ fontFamily: 'DM Mono, monospace', fontSize }}
      >
        {initials}
      </span>
    </div>
  );
}

export function CompanyFavicon({ name, size = 20 }: { name: string; size?: number }) {
  const letter = name[0].toUpperCase();
  const hue = (name.charCodeAt(0) * 47) % 360;
  return (
    <div
      className="rounded-full border border-[#1E2535] flex items-center justify-center flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: `hsl(${hue}, 60%, 15%)`,
      }}
    >
      <span
        className="text-[#94A3B8] select-none"
        style={{ fontFamily: 'DM Mono, monospace', fontSize: size * 0.5 }}
      >
        {letter}
      </span>
    </div>
  );
}
