export type RunStatus = 'running' | 'completed' | 'failed' | 'anomaly';

export interface AgentRun {
  id: string;
  agentName: string;
  timestamp: string;
  status: RunStatus;
  latency: number; // ms
  cost: number; // USD
  tokens: number;
  slaScore: number; // 0-1
  trace: string;
}

export interface MetricPoint {
  time: string;
  value: number;
}

export interface FleetStats {
  activeAgents: number;
  totalRuns: number;
  avgSla: number;
  totalSpent: number;
  budgetRemaining: number;
}
