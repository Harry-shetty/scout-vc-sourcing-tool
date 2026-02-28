import React, { useState } from 'react';
import { Topbar } from '../components/layout/Topbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import {
  User, Bell, Shield, CreditCard, Users, Palette,
  LogOut, Check, ChevronRight, Globe, Key
} from 'lucide-react';
import { ScoutAvatar } from '../components/scout/ScoutAvatar';

type Tab = 'profile' | 'notifications' | 'security' | 'billing' | 'team' | 'appearance';

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'appearance', label: 'Appearance', icon: Palette },
];

function SettingRow({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-4 border-b border-[#1E2535] last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-medium text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</p>
        {description && <p className="text-[12px] text-[#475569] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-5.5 rounded-full transition-colors ${checked ? 'bg-[#3B82F6]' : 'bg-[#1E2535]'}`}
      style={{ height: 22, minWidth: 40 }}
    >
      <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
        style={{ width: 18, height: 18, transform: checked ? 'translateX(20px)' : 'translateX(2px)' }} />
    </button>
  );
}

export function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);

  // Profile state
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [bio, setBio] = useState('Senior analyst focused on B2B SaaS and AI infrastructure deals.');

  // Notification state
  const [notifs, setNotifs] = useState({
    newCompanies: true,
    enrichComplete: true,
    weeklyDigest: false,
    teamActivity: true,
    productUpdates: false,
  });

  // Appearance
  const [accentColor, setAccentColor] = useState('#3B82F6');
  const ACCENTS = ['#3B82F6', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Topbar title="Settings" breadcrumb="Scout / Settings" />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 pb-20 lg:pb-8">
          <div className="mb-6">
            <h2 className="text-[22px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif', letterSpacing: '-0.3px' }}>Settings</h2>
            <p className="text-[13px] text-[#475569]" style={{ fontFamily: 'Inter, sans-serif' }}>Manage your account preferences and team settings.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tab sidebar */}
            <div className="lg:w-52 flex-shrink-0">
              <nav className="flex lg:flex-col gap-0.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-all whitespace-nowrap flex-shrink-0 lg:w-full ${
                      activeTab === id
                        ? 'bg-[rgba(59,130,246,0.12)] text-[#F1F5F9] border border-[rgba(59,130,246,0.2)]'
                        : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#161B24]'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <Icon size={14} className={activeTab === id ? 'text-[#3B82F6]' : 'text-[#475569]'} />
                    {label}
                  </button>
                ))}
                <div className="hidden lg:block mt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] text-[#F87171] hover:bg-[rgba(239,68,68,0.08)] transition-colors"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </nav>
            </div>

            {/* Content panel */}
            <div className="flex-1 min-w-0">
              <div className="bg-[#161B24] border border-[#1E2535] rounded-xl overflow-hidden">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Profile</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Update your personal information</p>

                    {/* Avatar section */}
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#1E2535]">
                      <ScoutAvatar name={name} size={60} />
                      <div>
                        <p className="text-[14px] font-medium text-[#F1F5F9] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{name}</p>
                        <p className="text-[12px] text-[#475569] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>{email}</p>
                        <button className="text-[12px] text-[#3B82F6] hover:text-[#60A5FA] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Change avatar →
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Full name</label>
                          <input value={name} onChange={e => setName(e.target.value)}
                            className="w-full h-10 bg-[#0F1218] border border-[#1E2535] rounded-lg px-3 text-[13px] text-[#F1F5F9] outline-none focus:border-[#3B82F6] transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }} />
                        </div>
                        <div>
                          <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Role / Title</label>
                          <input value={role} onChange={e => setRole(e.target.value)}
                            className="w-full h-10 bg-[#0F1218] border border-[#1E2535] rounded-lg px-3 text-[13px] text-[#F1F5F9] outline-none focus:border-[#3B82F6] transition-colors"
                            style={{ fontFamily: 'Inter, sans-serif' }} />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Email address</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email"
                          className="w-full h-10 bg-[#0F1218] border border-[#1E2535] rounded-lg px-3 text-[13px] text-[#F1F5F9] outline-none focus:border-[#3B82F6] transition-colors"
                          style={{ fontFamily: 'Inter, sans-serif' }} />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-[#94A3B8] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>Bio</label>
                        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                          className="w-full bg-[#0F1218] border border-[#1E2535] rounded-lg px-3 py-2 text-[13px] text-[#F1F5F9] outline-none focus:border-[#3B82F6] transition-colors resize-none"
                          style={{ fontFamily: 'Inter, sans-serif' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Notifications</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Control which updates you receive</p>

                    <SettingRow label="New companies added" description="Get notified when new companies are added to the pipeline">
                      <Toggle checked={notifs.newCompanies} onChange={v => setNotifs(p => ({ ...p, newCompanies: v }))} />
                    </SettingRow>
                    <SettingRow label="Enrichment complete" description="Alert when AI enrichment finishes for a company">
                      <Toggle checked={notifs.enrichComplete} onChange={v => setNotifs(p => ({ ...p, enrichComplete: v }))} />
                    </SettingRow>
                    <SettingRow label="Weekly digest" description="Summary of deal flow activity every Monday">
                      <Toggle checked={notifs.weeklyDigest} onChange={v => setNotifs(p => ({ ...p, weeklyDigest: v }))} />
                    </SettingRow>
                    <SettingRow label="Team activity" description="When teammates add notes or update companies">
                      <Toggle checked={notifs.teamActivity} onChange={v => setNotifs(p => ({ ...p, teamActivity: v }))} />
                    </SettingRow>
                    <SettingRow label="Product updates" description="New features and platform announcements">
                      <Toggle checked={notifs.productUpdates} onChange={v => setNotifs(p => ({ ...p, productUpdates: v }))} />
                    </SettingRow>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Security</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Manage your account security</p>

                    <SettingRow label="Password" description="Last changed 30 days ago">
                      <button className="h-8 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[12px] text-[#94A3B8] hover:border-[#3B82F6] hover:text-[#F1F5F9] transition-colors flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Key size={12} /> Change password
                      </button>
                    </SettingRow>
                    <SettingRow label="Two-factor authentication" description="Add an extra layer of security">
                      <button className="h-8 px-3 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-md text-[12px] text-[#3B82F6] hover:bg-[rgba(59,130,246,0.15)] transition-colors flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Shield size={12} /> Enable 2FA
                      </button>
                    </SettingRow>
                    <SettingRow label="Active sessions" description="Manage devices where you're signed in">
                      <button className="h-8 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[12px] text-[#94A3B8] hover:border-[#3B82F6] hover:text-[#F1F5F9] transition-colors flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <Globe size={12} /> View sessions
                      </button>
                    </SettingRow>

                    <div className="mt-6 p-4 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.15)] rounded-lg">
                      <p className="text-[13px] font-medium text-[#F87171] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Danger Zone</p>
                      <p className="text-[12px] text-[#475569] mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Permanently delete your account and all data</p>
                      <button className="h-8 px-4 bg-transparent border border-[rgba(239,68,68,0.3)] rounded-md text-[12px] text-[#F87171] hover:bg-[rgba(239,68,68,0.08)] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Delete account
                      </button>
                    </div>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Billing</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Manage your subscription and billing</p>

                    {/* Current plan */}
                    <div className="p-4 bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.2)] rounded-xl mb-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[11px] text-[#3B82F6] font-medium uppercase tracking-[0.8px] mb-1" style={{ fontFamily: 'DM Mono, monospace' }}>Current Plan</p>
                          <p className="text-[18px] font-bold text-[#F1F5F9]" style={{ fontFamily: 'Syne, sans-serif' }}>Pro Plan</p>
                          <p className="text-[12px] text-[#64748B] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>$299 / month · Renews Apr 1, 2026</p>
                        </div>
                        <span className="px-2.5 py-1 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] rounded-full text-[11px] text-[#10B981] font-medium flex-shrink-0" style={{ fontFamily: 'DM Mono, monospace' }}>
                          Active
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                        {['Unlimited companies', 'AI enrichment', 'Team of 5', 'CSV export', 'Priority support', 'API access'].map(f => (
                          <div key={f} className="flex items-center gap-1.5">
                            <Check size={11} className="text-[#10B981] flex-shrink-0" />
                            <span className="text-[11px] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <SettingRow label="Payment method" description="Visa ending in 4242 · Expires 12/27">
                      <button className="h-8 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[12px] text-[#94A3B8] hover:border-[#3B82F6] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Update
                      </button>
                    </SettingRow>
                    <SettingRow label="Billing email" description="Invoices are sent to {email}">
                      <button className="h-8 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[12px] text-[#94A3B8] hover:border-[#3B82F6] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Change
                      </button>
                    </SettingRow>
                    <SettingRow label="Invoices" description="Download past invoices">
                      <button className="h-8 px-3 bg-[#0F1218] border border-[#1E2535] rounded-md text-[12px] text-[#94A3B8] hover:border-[#3B82F6] transition-colors flex items-center gap-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        View all <ChevronRight size={12} />
                      </button>
                    </SettingRow>
                  </div>
                )}

                {/* Team Tab */}
                {activeTab === 'team' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Team</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Manage your team members and permissions</p>

                    <div className="flex flex-col gap-2 mb-5">
                      {[
                        { name: 'Alex Morgan', email: 'alex@vc.firm', role: 'Partner', status: 'active' },
                        { name: 'Jordan Chen', email: 'jordan@vc.firm', role: 'Senior Analyst', status: 'active' },
                        { name: 'Sam Rivera', email: 'sam@vc.firm', role: 'Analyst', status: 'active' },
                        { name: 'Casey Wu', email: 'casey@vc.firm', role: 'Analyst', status: 'pending' },
                      ].map((member) => (
                        <div key={member.email} className="flex items-center gap-3 px-3 py-2.5 bg-[#0F1218] border border-[#1E2535] rounded-lg">
                          <ScoutAvatar name={member.name} size={34} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-medium text-[#F1F5F9]" style={{ fontFamily: 'Inter, sans-serif' }}>{member.name}</p>
                            <p className="text-[11px] text-[#475569] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{member.email}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${member.status === 'pending' ? 'text-[#F59E0B] bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.2)]' : 'text-[#10B981] bg-[rgba(16,185,129,0.08)] border-[rgba(16,185,129,0.2)]'}`} style={{ fontFamily: 'DM Mono, monospace' }}>
                              {member.status}
                            </span>
                            <span className="text-[11px] text-[#475569] hidden sm:block" style={{ fontFamily: 'Inter, sans-serif' }}>{member.role}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="h-9 px-4 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-lg text-[13px] text-[#3B82F6] hover:bg-[rgba(59,130,246,0.15)] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                      + Invite team member
                    </button>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === 'appearance' && (
                  <div className="p-5 lg:p-6">
                    <h3 className="text-[16px] font-semibold text-[#F1F5F9] mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Appearance</h3>
                    <p className="text-[12px] text-[#475569] mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Customize how Scout looks for you</p>

                    <SettingRow label="Theme" description="Scout uses a premium dark theme by default">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-[#0A0C10] border-2 border-[#3B82F6] flex items-center justify-center">
                          <Check size={12} className="text-[#3B82F6]" />
                        </div>
                        <div className="w-8 h-8 rounded-md bg-[#F8FAFC] border border-[#1E2535] opacity-40" />
                      </div>
                    </SettingRow>

                    <SettingRow label="Accent color" description="Choose your UI accent color">
                      <div className="flex items-center gap-2">
                        {ACCENTS.map(color => (
                          <button
                            key={color}
                            onClick={() => setAccentColor(color)}
                            className="w-6 h-6 rounded-full border-2 transition-all"
                            style={{
                              background: color,
                              borderColor: accentColor === color ? 'white' : 'transparent',
                              boxShadow: accentColor === color ? `0 0 8px ${color}60` : 'none',
                            }}
                          />
                        ))}
                      </div>
                    </SettingRow>

                    <SettingRow label="Compact mode" description="Reduce spacing for denser information display">
                      <Toggle checked={false} onChange={() => {}} />
                    </SettingRow>
                    <SettingRow label="Reduce motion" description="Minimize animations and transitions">
                      <Toggle checked={false} onChange={() => {}} />
                    </SettingRow>
                  </div>
                )}

                {/* Save button */}
                <div className="px-5 lg:px-6 py-4 bg-[#0F1218] border-t border-[#1E2535] flex items-center justify-between gap-3">
                  <p className="text-[12px] text-[#334155]" style={{ fontFamily: 'Inter, sans-serif' }}>Changes are saved to your account</p>
                  <button
                    onClick={handleSave}
                    className="h-9 px-5 rounded-lg text-[13px] font-medium text-white flex items-center gap-2 transition-all"
                    style={{
                      background: saved ? '#10B981' : 'linear-gradient(135deg, #1D4ED8, #2563EB)',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {saved ? <><Check size={14} /> Saved!</> : 'Save changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
