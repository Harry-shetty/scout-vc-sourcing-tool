import type { Company, List, SavedSearch, EnrichResult, TimelineSignal } from '../types';

export const MOCK_COMPANIES: Company[] = [
  { id: '1', name: 'Acme AI', sector: 'AI', stage: 'Series A', location: 'San Francisco, CA', website: 'acme.ai', description: 'Developer-first platform using LLMs to automate enterprise workflows.', founded: 2021, teamSize: '12–50', enrichedAt: '2h ago' },
  { id: '2', name: 'NeuralFlow', sector: 'AI', stage: 'Seed', location: 'New York, NY', website: 'neuralflow.io', description: 'Autonomous AI agents for business process automation.', founded: 2022, teamSize: '1–10' },
  { id: '3', name: 'FinEdge', sector: 'Fintech', stage: 'Series B', location: 'London, UK', website: 'finedge.com', description: 'Next-gen payment infrastructure for embedded finance.', founded: 2019, teamSize: '50–200', enrichedAt: 'Mar 12' },
  { id: '4', name: 'CarbonPath', sector: 'Climate', stage: 'Pre-Seed', location: 'Berlin, DE', website: 'carbonpath.io', description: 'Carbon credit verification using satellite imagery and AI.', founded: 2023, teamSize: '1–10' },
  { id: '5', name: 'MedIQ', sector: 'HealthTech', stage: 'Seed', location: 'Boston, MA', website: 'mediq.health', description: 'Clinical decision support powered by medical-grade LLMs.', founded: 2022, teamSize: '10–50', enrichedAt: 'Mar 10' },
  { id: '6', name: 'DevStack', sector: 'DevTools', stage: 'Series A', location: 'Austin, TX', website: 'devstack.dev', description: 'AI-powered code review and security scanning platform.', founded: 2021, teamSize: '12–50', enrichedAt: '5h ago' },
  { id: '7', name: 'VaultFi', sector: 'Fintech', stage: 'Seed', location: 'Miami, FL', website: 'vaultfi.com', description: 'Crypto treasury management for enterprise finance teams.', founded: 2022, teamSize: '1–10' },
  { id: '8', name: 'GreenGrid', sector: 'Climate', stage: 'Series A', location: 'Amsterdam, NL', website: 'greengrid.io', description: 'Smart grid optimization using renewable energy forecasting.', founded: 2020, teamSize: '12–50', enrichedAt: 'Mar 8' },
  { id: '9', name: 'PharmaAI', sector: 'HealthTech', stage: 'Series B', location: 'Cambridge, MA', website: 'pharmaai.bio', description: 'Drug discovery acceleration via generative molecular AI.', founded: 2019, teamSize: '50–200', enrichedAt: 'Mar 5' },
  { id: '10', name: 'BuildKit', sector: 'DevTools', stage: 'Pre-Seed', location: 'Seattle, WA', website: 'buildkit.dev', description: 'Universal CI/CD pipeline with AI-driven test optimization.', founded: 2023, teamSize: '1–10' },
  { id: '11', name: 'FlowSaaS', sector: 'B2B SaaS', stage: 'Seed', location: 'Chicago, IL', website: 'flowsaas.com', description: 'Revenue operations automation for mid-market B2B companies.', founded: 2022, teamSize: '10–50', enrichedAt: '1d ago' },
  { id: '12', name: 'Cognify', sector: 'AI', stage: 'Series A', location: 'Toronto, CA', website: 'cognify.ai', description: 'Real-time AI inference infrastructure at the edge.', founded: 2021, teamSize: '12–50', enrichedAt: 'Mar 14' },
  { id: '13', name: 'TerraFund', sector: 'Climate', stage: 'Seed', location: 'San Francisco, CA', website: 'terrafund.earth', description: 'Climate-focused alternative lending for green projects.', founded: 2022, teamSize: '1–10' },
  { id: '14', name: 'HealthLink', sector: 'HealthTech', stage: 'Pre-Seed', location: 'Austin, TX', website: 'healthlink.care', description: 'Interoperable health data exchange platform for clinics.', founded: 2023, teamSize: '1–10' },
  { id: '15', name: 'Promptly', sector: 'B2B SaaS', stage: 'Series A', location: 'New York, NY', website: 'promptly.app', description: 'No-code AI workflow builder for non-technical teams.', founded: 2021, teamSize: '12–50', enrichedAt: '3h ago' },
  { id: '16', name: 'DataForge', sector: 'DevTools', stage: 'Seed', location: 'San Francisco, CA', website: 'dataforge.io', description: 'Synthetic data generation for ML model training.', founded: 2022, teamSize: '10–50', enrichedAt: 'Mar 11' },
  { id: '17', name: 'LoanIQ', sector: 'Fintech', stage: 'Series A', location: 'Chicago, IL', website: 'loaniq.finance', description: 'AI-native credit underwriting for community banks.', founded: 2020, teamSize: '12–50' },
  { id: '18', name: 'SolarSync', sector: 'Climate', stage: 'Series B', location: 'Phoenix, AZ', website: 'solarsync.energy', description: 'Peer-to-peer solar energy trading marketplace.', founded: 2019, teamSize: '50–200', enrichedAt: 'Mar 7' },
  { id: '19', name: 'GenomeAI', sector: 'HealthTech', stage: 'Seed', location: 'Boston, MA', website: 'genome.ai', description: 'Personalized oncology treatment recommendations via genomics AI.', founded: 2022, teamSize: '1–10' },
  { id: '20', name: 'PipelineOS', sector: 'B2B SaaS', stage: 'Pre-Seed', location: 'London, UK', website: 'pipelineos.io', description: 'Sales pipeline orchestration with AI-powered forecasting.', founded: 2023, teamSize: '1–10' },
  { id: '21', name: 'VectorDB', sector: 'AI', stage: 'Series A', location: 'San Francisco, CA', website: 'vectordb.io', description: 'High-performance vector database for production AI applications.', founded: 2021, teamSize: '12–50', enrichedAt: '6h ago' },
  { id: '22', name: 'ClearPay', sector: 'Fintech', stage: 'Pre-Seed', location: 'New York, NY', website: 'clearpay.io', description: 'Instant B2B payment settlement via stablecoin rails.', founded: 2023, teamSize: '1–10' },
  { id: '23', name: 'EcoToken', sector: 'Climate', stage: 'Seed', location: 'Zurich, CH', website: 'ecotoken.finance', description: 'Tokenized biodiversity credits on a public blockchain.', founded: 2022, teamSize: '1–10' },
  { id: '24', name: 'ClinOps', sector: 'HealthTech', stage: 'Series A', location: 'San Diego, CA', website: 'clinops.health', description: 'Clinical trial operations software with AI patient matching.', founded: 2020, teamSize: '12–50', enrichedAt: 'Mar 13' },
  { id: '25', name: 'StackPilot', sector: 'DevTools', stage: 'Series B', location: 'Berlin, DE', website: 'stackpilot.dev', description: 'AI co-pilot for infrastructure provisioning and cloud ops.', founded: 2019, teamSize: '50–200', enrichedAt: 'Mar 6' },
];

export const MOCK_ENRICH_RESULT: EnrichResult = {
  summary: 'Acme AI is a developer-first platform that uses large language models to automate enterprise workflows. They focus on enabling engineering teams to build AI-powered automations without managing model infrastructure.',
  whatTheyDo: [
    'Provides an API-first platform for connecting LLMs to internal business systems',
    'Automates repetitive back-office workflows using AI agents',
    'Offers pre-built integrations with 50+ enterprise tools (Salesforce, Slack, Notion)',
    'Enables non-technical teams to deploy AI workflows via no-code builder',
    'Supports multi-model orchestration with fallback and routing logic',
  ],
  keywords: ['AI', 'LLM', 'Developer Tools', 'SaaS', 'B2B', 'API', 'Automation', 'Enterprise', 'Workflows'],
  signals: [
    { label: 'Actively Hiring', reason: 'Careers page with 8 open roles detected across engineering and sales', icon: 'users', color: '#10B981' },
    { label: 'Product Momentum', reason: 'Changelog page updated 18 days ago with 3 new features', icon: 'zap', color: '#3B82F6' },
    { label: 'Content Marketing', reason: 'Active blog with 4 posts published in the last 30 days', icon: 'pen-line', color: '#F59E0B' },
    { label: 'Enterprise Focus', reason: 'Pricing page shows enterprise tier with SOC 2 compliance mention', icon: 'building-2', color: '#8B5CF6' },
    { label: 'Developer Community', reason: 'Public GitHub org with 3 active repos and 1.2k combined stars', icon: 'code-2', color: '#06B6D4' },
  ],
  sources: [
    { url: 'https://acme.ai/', scrapedAt: '2 hours ago' },
    { url: 'https://acme.ai/blog', scrapedAt: '2 hours ago' },
    { url: 'https://acme.ai/careers', scrapedAt: '2 hours ago' },
    { url: 'https://acme.ai/pricing', scrapedAt: '2 hours ago' },
    { url: 'https://acme.ai/changelog', scrapedAt: '2 hours ago' },
  ],
  enrichedAt: 'Mar 15, 2024 · 2:34 PM',
  cached: false,
  duration: 3.2,
};

export const MOCK_TIMELINE_SIGNALS: TimelineSignal[] = [
  { type: 'funding', label: 'Funding signal detected', source: 'Crunchbase', date: '2 days ago' },
  { type: 'hire', label: 'New VP of Engineering posted on LinkedIn', source: 'LinkedIn', date: '5 days ago' },
  { type: 'product', label: 'Product v2.0 launched on ProductHunt', source: 'ProductHunt', date: '1 week ago' },
  { type: 'website', label: 'Website major redesign deployed', source: 'Website', date: '2 weeks ago' },
  { type: 'blog', label: 'Blog post: "How We Scaled to 1000 Customers"', source: 'Blog', date: '3 weeks ago' },
  { type: 'hire', label: '3 new ML engineer roles opened', source: 'Greenhouse', date: '1 month ago' },
  { type: 'product', label: 'API v3 documentation published', source: 'Docs', date: '5 weeks ago' },
];

export const MOCK_LISTS: List[] = [
  { id: 'l1', name: 'Top AI Startups', companyIds: ['1', '2', '12', '21'], createdAt: 'Mar 10, 2024' },
  { id: 'l2', name: 'Series A Pipeline', companyIds: ['1', '6', '12', '15', '17', '21', '24'], createdAt: 'Mar 8, 2024' },
  { id: 'l3', name: 'Climate Portfolio', companyIds: ['4', '8', '13', '18', '23'], createdAt: 'Mar 5, 2024' },
  { id: 'l4', name: 'UK/EU Companies', companyIds: ['3', '20', '25'], createdAt: 'Mar 1, 2024' },
];

export const MOCK_SAVED_SEARCHES: SavedSearch[] = [
  { id: 's1', name: 'AI Seed Stage NYC', filters: { query: '', sector: 'AI', stage: 'Seed', location: 'New York' }, createdAt: 'Mar 12, 2024', resultCount: 14 },
  { id: 's2', name: 'Climate Series A+', filters: { query: '', sector: 'Climate', stage: 'Series A', location: '' }, createdAt: 'Mar 9, 2024', resultCount: 8 },
  { id: 's3', name: 'DevTools SF Bay Area', filters: { query: '', sector: 'DevTools', stage: '', location: 'San Francisco' }, createdAt: 'Mar 7, 2024', resultCount: 11 },
  { id: 's4', name: 'HealthTech Boston Pre-Seed', filters: { query: '', sector: 'HealthTech', stage: 'Pre-Seed', location: 'Boston' }, createdAt: 'Mar 3, 2024', resultCount: 5 },
];
