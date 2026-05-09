import { AgentRun, FleetStats, MetricPoint } from './types';
import { subHours, format } from 'date-fns';

export const MOCK_RUNS: AgentRun[] = [
  {
    id: 'r-1029',
    agentName: 'Customer Support Bot',
    timestamp: new Date().toISOString(),
    status: 'running',
    latency: 1200,
    cost: 0.045,
    tokens: 450,
    slaScore: 0.98,
    trace: 'Analyzing user request -> Fetching order DB -> Generating response'
  },
  {
    id: 'r-1028',
    agentName: 'Data Extraction Agent',
    timestamp: subHours(new Date(), 1).toISOString(),
    status: 'completed',
    latency: 5400,
    cost: 0.12,
    tokens: 1200,
    slaScore: 0.95,
    trace: 'Scraping target URL -> Extracting product names -> Formatting JSON'
  },
  {
    id: 'r-1027',
    agentName: 'Code Refactor Tool',
    timestamp: subHours(new Date(), 2).toISOString(),
    status: 'anomaly',
    latency: 15400,
    cost: 0.85,
    tokens: 8500,
    slaScore: 0.42,
    trace: 'Reading file -> Infinite loop detected in dependency check -> Aborting'
  },
  {
    id: 'r-1026',
    agentName: 'Image Tagging Bot',
    timestamp: subHours(new Date(), 3).toISOString(),
    status: 'failed',
    latency: 450,
    cost: 0.01,
    tokens: 100,
    slaScore: 0,
    trace: 'Loading image -> API 401 Unauthorized'
  },
];

export const MOCK_STATS: FleetStats = {
  activeAgents: 12,
  totalRuns: 1450,
  avgSla: 0.92,
  totalSpent: 45.20,
  budgetRemaining: 54.80,
};

export const MOCK_COST_DATA: MetricPoint[] = Array.from({ length: 24 }).map((_, i) => ({
  time: format(subHours(new Date(), 24 - i), 'HH:mm'),
  value: Math.random() * 5 + 2,
}));

export const MOCK_SLA_DATA: MetricPoint[] = Array.from({ length: 24 }).map((_, i) => ({
  time: format(subHours(new Date(), 24 - i), 'HH:mm'),
  value: 80 + Math.random() * 20,
}));
