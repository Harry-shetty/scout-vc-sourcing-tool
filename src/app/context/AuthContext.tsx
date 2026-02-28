import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, remember?: boolean) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS = [
  { id: '1', name: 'Alex Morgan', email: 'analyst@scout.vc', password: 'password123', role: 'Senior Analyst' },
  { id: '2', name: 'Jordan Chen', email: 'admin@scout.vc', password: 'admin123', role: 'Partner' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('scout_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('scout_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, remember = false): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 1200));
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const userData: User = { id: found.id, name: found.name, email: found.email, role: found.role };
    setUser(userData);
    if (remember) localStorage.setItem('scout_user', JSON.stringify(userData));
    else sessionStorage.setItem('scout_user', JSON.stringify(userData));
    return { success: true };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 1500));
    if (MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const userData: User = { id: Date.now().toString(), name, email, role: 'Analyst' };
    setUser(userData);
    localStorage.setItem('scout_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scout_user');
    sessionStorage.removeItem('scout_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
