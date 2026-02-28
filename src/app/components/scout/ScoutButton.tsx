import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ScoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'bg-gradient-to-br from-[#1E40AF] to-[#1E3A5F] border border-[#3B82F6] text-[#F1F5F9] hover:bg-[#2563EB] hover:border-[#60A5FA] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] disabled:bg-[#0F1218] disabled:border-[#1E2535] disabled:text-[#475569] disabled:opacity-50',
  secondary: 'bg-[#161B24] border border-[#1E2535] text-[#F1F5F9] hover:bg-[#1C2330] hover:border-[#3B82F6]',
  ghost: 'bg-transparent border-transparent text-[#94A3B8] hover:bg-[#161B24] hover:text-[#F1F5F9]',
  danger: 'bg-[#2D0A0A] border border-[#EF4444] text-[#F87171] hover:bg-[#3D0A0A] hover:border-[#F87171]',
};

const SIZE_STYLES: Record<Size, string> = {
  sm: 'h-7 px-3 text-[12px] gap-1.5 rounded-md',
  md: 'h-9 px-4 text-[14px] gap-2 rounded-md',
  lg: 'h-11 px-5 text-[15px] gap-2.5 rounded-lg',
};

export function ScoutButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  children,
  disabled,
  className = '',
  ...props
}: ScoutButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-medium transition-all duration-150
        cursor-pointer select-none whitespace-nowrap
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={{ fontFamily: 'Inter, sans-serif' }}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={size === 'sm' ? 12 : 14} className="animate-spin text-[#3B82F6]" />
          <span className="text-[#94A3B8]">Processing...</span>
        </>
      ) : (
        <>
          {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
          {children}
          {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
