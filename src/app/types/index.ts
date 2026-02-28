export type Sector = 'AI' | 'Fintech' | 'Climate' | 'HealthTech' | 'DevTools' | 'B2B SaaS';
export type Stage = 'Pre-Seed' | 'Seed' | 'Series A' | 'Series B';
export type EnrichStatus = 'idle' | 'loading' | 'success' | 'cached' | 'error';

export interface Company {
  id: string;
  name: string;
  sector: Sector;
  stage: Stage;
  location: string;
  website: string;
  description: string;
  founded: number;
  teamSize: string;
  enrichedAt?: string;
  favicon?: string;
}

export interface Signal {
  label: string;
  reason: string;
  icon: string;
  color: string;
}

export interface EnrichResult {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  signals: Signal[];
  sources: { url: string; scrapedAt: string }[];
  enrichedAt: string;
  cached: boolean;
  duration: number;
}

export interface TimelineSignal {
  type: 'website' | 'hire' | 'product' | 'funding' | 'blog';
  label: string;
  source: string;
  date: string;
}

export interface List {
  id: string;
  name: string;
  companyIds: string[];
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: {
    query: string;
    sector: string;
    stage: string;
    location: string;
  };
  createdAt: string;
  resultCount: number;
}
