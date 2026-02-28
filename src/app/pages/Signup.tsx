import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, ArrowRight, Check, AlertCircle, Building2, Users, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PERKS = [
  { icon: Building2, text: 'Access 250+ curated companies' },
  { icon: Users, text: 'Collaborate with your team' },
  { icon: Globe, text: 'Global deal flow & signals' },
];

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /\d/.test(password) },
  ];
  if (!password) return null;
  return (
    <div className="flex items-center gap-3 mt-2">
      {checks.map(({ label, ok }) => (
        <div key={label} className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${ok ? 'bg-[#10B981]' : 'bg-[#334155]'}`} />
          <span className={`text-[10px] transition-colors ${ok ? 'text-[#10B981]' : 'text-[#475569]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (!agreed) { setError('Please agree to the Terms of Service.'); return; }
    setLoading(true);
    const res = await signup(name, email, password);
    setLoading(false);
    if (res.success) navigate('/');
    else setError(res.error || 'Signup failed.');
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] flex flex-col lg:flex-row">
      {/* Left — Brand Panel */}
      <div className="relative lg:w-[48%] flex flex-col justify-between p-8 lg:p-14 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #080B10 0%, #0D1117 50%, #0A1020 100%)' }}>
        {/* Glow effects */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.35)]">
              <span className="text-[16px] font-black text-white" style={{ fontFamily: 'Syne, sans-serif' }}>S</span>
            </div>
            <span className="text-[22px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>Scout</span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 my-8 lg:my-0">
          <div className="inline-flex items-center gap-2 bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.2)] rounded-full px-3 py-1 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            <span className="text-[11px] font-medium text-[#3B82F6] uppercase tracking-[1px]" style={{ fontFamily: 'DM Mono, monospace' }}>Free 14-day Trial</span>
          </div>

          <h1 className="text-[36px] lg:text-[44px] font-black text-[#F1F5F9] leading-[1.1] mb-4" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-1px' }}>
            Start sourcing
            <br />
            <span style={{ background: 'linear-gradient(135deg, #3B82F6, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              like a pro.
            </span>
          </h1>
          <p className="text-[15px] text-[#64748B] leading-relaxed max-w-[400px]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Join 500+ analysts at top VC firms using Scout to discover the next big thing — before anyone else.
          </p>

          <div className="mt-8 flex flex-col gap-5">
            {PERKS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-lg bg-[rgba(59,130,246,0.08)] border border-[rgba(59,130,246,0.15)] flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#3B82F6]" />
                </div>
                <span className="text-[14px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Plan highlight */}
          <div className="mt-10 p-4 bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.12)] rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-semibold text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>Pro Plan — Free Trial</span>
              <span className="text-[12px] text-[#3B82F6] font-semibold" style={{ fontFamily: 'DM Mono, monospace' }}>$0 / 14 days</span>
            </div>
            <p className="text-[12px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>No credit card required. Cancel anytime.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Unlimited searches', 'AI enrichment', 'Team sharing', 'Export CSV'].map(f => (
                <span key={f} className="flex items-center gap-1 text-[11px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Check size={10} className="text-[#10B981]" /> {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <p className="text-[12px] text-[#334155]" style={{ fontFamily: 'Inter, sans-serif' }}>
            Backed by leading investors • SOC 2 Compliant • GDPR Ready
          </p>
        </div>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-14 bg-[#080A0E]">
        <div className="w-full max-w-[420px]">
          <div className="mb-7">
            <h2 className="text-[26px] font-bold text-[#F1F5F9] mb-1.5" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.4px' }}>
              Create your account
            </h2>
            <p className="text-[14px] text-[#64748B]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Get started with Scout in under 2 minutes
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-lg px-4 py-3 mb-5">
              <AlertCircle size={15} className="text-[#F87171] flex-shrink-0" />
              <p className="text-[13px] text-[#F87171]" style={{ fontFamily: 'Inter, sans-serif' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Alex Morgan"
                autoComplete="name"
                className="w-full h-11 bg-[#161B24] border border-[#1E2535] rounded-lg px-4 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Work email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="alex@vc.firm"
                autoComplete="email"
                className="w-full h-11 bg-[#161B24] border border-[#1E2535] rounded-lg px-4 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className="w-full h-11 bg-[#161B24] border border-[#1E2535] rounded-lg px-4 pr-11 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Confirm password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  className={`w-full h-11 bg-[#161B24] border rounded-lg px-4 pr-11 text-[14px] text-[#F1F5F9] placeholder-[#334155] outline-none transition-all ${
                    confirm && confirm !== password ? 'border-[#EF4444] focus:ring-1 focus:ring-[rgba(239,68,68,0.2)]' : 'border-[#1E2535] focus:border-[#3B82F6] focus:ring-1 focus:ring-[rgba(59,130,246,0.2)]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#475569] hover:text-[#94A3B8] transition-colors">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {confirm && confirm === password && (
                <p className="text-[11px] text-[#10B981] mt-1 flex items-center gap-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <Check size={10} /> Passwords match
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5 mt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={e => setAgreed(e.target.checked)}
                className="w-4 h-4 rounded border border-[#1E2535] bg-[#161B24] accent-[#3B82F6] cursor-pointer mt-0.5 flex-shrink-0"
              />
              <label htmlFor="terms" className="text-[12px] text-[#64748B] cursor-pointer select-none leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                I agree to the{' '}
                <span className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors cursor-pointer">Terms of Service</span>
                {' '}and{' '}
                <span className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors cursor-pointer">Privacy Policy</span>
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
                  <span>Creating account…</span>
                </>
              ) : (
                <>
                  <span>Create free account</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-[13px] text-[#475569] mt-5" style={{ fontFamily: 'Inter, sans-serif' }}>
            Already have an account?{' '}
            <Link to="/login" className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
