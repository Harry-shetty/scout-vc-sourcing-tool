import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowRight, Zap, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon: Zap, text: 'AI-powered company enrichment in seconds' },
  { icon: TrendingUp, text: 'Track 247+ companies across all sectors' },
  { icon: Shield, text: 'Enterprise-grade security & compliance' },
];

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    const res = await login(email, password, remember);
    setLoading(false);
    if (res.success) navigate('/');
    else setError(res.error || 'Login failed.');
  };

  const handleDemo = async () => {
    setEmail('analyst@scout.vc');
    setPassword('password123');
    setError('');
    setLoading(true);
    const res = await login('analyst@scout.vc', 'password123', true);
    setLoading(false);
    if (res.success) navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] flex flex-col lg:flex-row">
      {/* Left — Brand Panel */}
      <div className="relative lg:w-[52%] flex flex-col justify-between p-8 lg:p-14 overflow-hidden bg-[#0A0C10]"
        style={{ background: 'linear-gradient(135deg, #0A0C10 0%, #0D1117 60%, #0F1824 100%)' }}>
        {/* Glow effects */}
        <div className="absolute top-[-120px] left-[-120px] w-[500px] h-[500px] rounded-full opacity-[0.07] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
              <span className="text-[16px] font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>S</span>
            </div>
            <span className="text-[22px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>Scout</span>
          </div>
        </div>

        {/* Hero text */}
        <div className="relative z-10 my-8 lg:my-0">
          <div className="inline-flex items-center gap-2 bg-[rgba(6,182,212,0.08)] border border-[rgba(6,182,212,0.2)] rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
            <span className="text-[11px] font-medium text-[#06B6D4] uppercase tracking-[1px]" style={{ fontFamily: 'DM Mono, monospace' }}>Premium VC Intelligence</span>
          </div>

          <h1 className="text-[36px] lg:text-[48px] font-black text-[#F1F5F9] leading-[1.1] mb-4" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-1px' }}>
            Source smarter.
            <br />
            <span style={{ background: 'linear-gradient(135deg, #06B6D4, #3B82F6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Close faster.
            </span>
          </h1>
          <p className="text-[16px] text-[#64748B] leading-relaxed max-w-[440px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            The AI-powered sourcing platform built for modern venture capital teams. Discover, enrich, and track portfolio companies at scale.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-[#3B82F6]" />
                </div>
                <span className="text-[13px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social proof */}
        <div className="relative z-10 hidden lg:block">
          <div className="flex items-center gap-3">
            {['A', 'M', 'J', 'R'].map((l, i) => (
              <div key={l} className="w-8 h-8 rounded-full border-2 border-[#0A0C10] flex items-center justify-center text-[12px] font-semibold text-white"
                style={{ background: ['#3B82F6','#06B6D4','#8B5CF6','#10B981'][i], marginLeft: i > 0 ? -12 : 0 }}>
                {l}
              </div>
            ))}
            <div className="ml-2">
              <p className="text-[13px] font-medium text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>Trusted by 500+ analysts</p>
              <p className="text-[11px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>across top-tier VC firms globally</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 bg-[#080A0E]">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-[#F1F5F9] mb-2" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.5px' }}>
              Welcome back
            </h2>
            <p className="text-[14px] text-[#64748B]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Sign in to your Scout account to continue
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={15} className="text-[#F87171] flex-shrink-0" />
              <p className="text-[13px] text-[#F87171]" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="analyst@scout.vc"
                autoComplete="email"
                className="w-full h-11 bg-[#161B24] border border-[#1E2535] rounded-lg px-4 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-medium text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Password
                </label>
                <button type="button" className="text-[12px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className="w-full h-11 bg-[#161B24] border border-[#1E2535] rounded-lg px-4 pr-11 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border border-[#1E2535] bg-[#161B24] accent-[#3B82F6] cursor-pointer"
              />
              <label htmlFor="remember" className="text-[13px] text-[#64748B] cursor-pointer select-none" style={{ fontFamily: 'Inter, sans-serif' }}>
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg flex items-center justify-center gap-2 font-semibold text-[14px] text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-1"
              style={{
                background: loading ? '#1E3A5F' : 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                boxShadow: loading ? 'none' : '0 0 20px rgba(59,130,246,0.3)',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#1E2535]" />
            <span className="text-[12px] text-[#334155]" style={{ fontFamily: 'Inter, sans-serif' }}>or</span>
            <div className="flex-1 h-px bg-[#1E2535]" />
          </div>

          {/* Demo login */}
          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full h-11 rounded-lg border border-[#1E2535] bg-[#161B24] hover:bg-[#1C2330] hover:border-[#2D3748] flex items-center justify-center gap-2 text-[14px] text-[#94A3B8] hover:text-[#F1F5F9] transition-all disabled:opacity-60 mb-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="text-[#06B6D4]">⚡</span>
            Try Demo Account
          </button>

          <p className="text-center text-[13px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors">
              Create one free →
            </Link>
          </p>

          <div className="mt-8 pt-6 border-t border-[#1E2535]">
            <p className="text-[11px] text-[#334155] text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
              Demo: <span className="font-mono text-[#475569]">analyst@scout.vc</span> / <span className="font-mono text-[#475569]">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
