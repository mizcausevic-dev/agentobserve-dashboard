/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, ReactNode } from 'react';
import { 
  Activity, 
  BarChart3, 
  LayoutDashboard, 
  Settings, 
  Terminal, 
  ShieldAlert, 
  Database,
  History,
  TrendingDown,
  Cpu,
  ChevronRight,
  Search,
  Bell
} from 'lucide-react';
import { cn } from './lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { MOCK_RUNS, MOCK_STATS, MOCK_COST_DATA, MOCK_SLA_DATA } from './mockData';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';


export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex flex-col h-screen bg-[#0B0E14] text-[#E0E0E0] font-sans overflow-hidden">
      {/* Header Navigation */}
      <nav className="h-14 border-b border-[#24292E] flex items-center justify-between px-6 bg-[#161B22] shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20">
            AO
          </div>
          <span className="font-mono font-bold tracking-tight text-lg flex items-center gap-2">
            mizcausevic-dev <span className="text-[#8B949E] font-normal">/</span> agentobserve
          </span>
          <span className="px-2 py-0.5 bg-[#21262D] border border-[#30363D] rounded text-[10px] text-blue-400 font-mono">v0.1.0-preview</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-[#8B949E]">
          <HeaderNavItem label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <HeaderNavItem label="Traces" active={activeTab === 'traces'} onClick={() => setActiveTab('traces')} />
          <HeaderNavItem label="Analytics" active={activeTab === 'fleet'} onClick={() => setActiveTab('fleet')} />
          <HeaderNavItem label="API Keys" active={activeTab === 'cost'} onClick={() => setActiveTab('cost')} />
          <div className="flex items-center gap-2 ml-2">
            <a
              href="https://github.com/mizcausevic-dev/agentobserve-dashboard#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-[#21262D] border border-[#30363D] rounded-full text-[10px] font-mono text-[#8B949E] hover:text-white hover:border-blue-500 transition-colors"
            >
              Docs
            </a>
            <a
              href="https://github.com/mizcausevic-dev/agentobserve"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 border border-blue-400/50 rounded-full text-[10px] font-mono text-white hover:bg-blue-500 transition-colors"
            >
              Source
            </a>
          </div>
        </div>
      </nav>

      {/* Sub-header Stats Bar */}
      <div className="h-12 border-b border-[#24292E] flex items-center gap-8 px-6 bg-[#0D1117] text-[11px] font-mono shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#8B949E]">Uptime:</span>
          <span className="text-green-400">99.98%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#8B949E]">Avg Latency:</span>
          <span className="text-yellow-500">142ms</span>
        </div>
        <div className="flex items-center gap-2 text-blue-400">
          <Activity size={14} />
          <span>Active Agents: 12</span>
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center gap-2 text-[#8B949E]">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-sans uppercase tracking-widest text-[9px] font-bold">System Live</span>
        </div>
      </div>

      {/* Preview banner */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-2 flex items-center justify-center gap-2 shrink-0">
        <span className="text-[10px] text-amber-300 font-mono uppercase tracking-widest font-bold">Preview Mode</span>
        <span className="text-[10px] text-[#8B949E]">·</span>
        <span className="text-[10px] text-[#8B949E]">Showcasing the agent observability UX. Live agent fleet ingestion lands in v0.2.</span>
      </div>

      {/* Main Workspace */}
      <div className="flex-grow flex overflow-hidden">
        {/* Left Rail: Trace List / Sidebar */}
        <aside className="w-80 border-r border-[#24292E] flex flex-col bg-[#0D1117]">
          <div className="p-3 border-b border-[#24292E]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
              <input 
                type="text" 
                placeholder="Filter traces..." 
                className="w-full bg-[#161B22] border border-[#30363D] rounded px-9 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            {MOCK_RUNS.map((run, i) => (
              <TraceListItem key={run.id} run={run} isActive={i === 0 && activeTab === 'dashboard'} />
            ))}
            <div className="p-4 text-center">
              <button className="text-[10px] font-bold text-[#8B949E] hover:text-white transition-colors uppercase tracking-widest">Load More</button>
            </div>
          </div>
        </aside>

        {/* Main View Area */}
        <main className="flex-grow flex flex-col bg-[#010409] overflow-y-auto custom-scrollbar relative">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex flex-col gap-6"
              >
                {/* Header for detail view */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight mb-1">Fleet Overview</h2>
                    <p className="text-xs text-[#8B949E] font-serif italic">Real-time operational status of all registered agent nodes</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-[#161B22] border border-[#30363D] rounded text-[10px] font-bold hover:bg-[#1f242b] transition-colors">7d History</button>
                    <button className="px-3 py-1 bg-blue-600 rounded text-[10px] font-bold text-white hover:bg-blue-700 transition-colors">Export Logs</button>
                  </div>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <CompactStatCard label="Active Agents" value={MOCK_STATS.activeAgents} icon={<Cpu size={16} className="text-blue-500" />} />
                  <CompactStatCard label="SLA Score" value={`${(MOCK_STATS.avgSla * 100).toFixed(1)}%`} status="optimal" />
                  <CompactStatCard label="Avg Latency" value="142ms" status="warning" />
                  <CompactStatCard label="Cloud Spend" value={`$${MOCK_STATS.totalSpent.toFixed(2)}`} icon={<Database size={16} className="text-purple-500" />} />
                </div>

                {/* Performance Chart area */}
                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg p-6">
                   <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B949E]">Performance Trends</h3>
                    <div className="flex items-center gap-4 text-[10px] font-mono">
                      <div className="flex items-center gap-1.5 text-blue-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>SLA SCORE</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-yellow-500/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                        <span>LATENCY</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[240px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={MOCK_SLA_DATA}>
                        <defs>
                          <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#24292E" vertical={false} />
                        <XAxis dataKey="time" stroke="#484f58" fontSize={9} axisLine={false} tickLine={false} dy={10} interval={5} />
                        <YAxis stroke="#484f58" fontSize={9} axisLine={false} tickLine={false} domain={[0, 100]} />
                        <Tooltip contentStyle={{ backgroundColor: '#161B22', border: '1px solid #30363D', borderRadius: '4px', fontSize: '11px', color: '#E0E0E0' }} />
                        <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorBlue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity Table (Highly Dense) */}
                <div className="bg-[#0D1117] border border-[#30363D] rounded-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-[#24292E] bg-[#161B22]/50 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B949E]">Recent Trace Activity</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="text-left text-[10px] font-mono uppercase text-[#8B949E] border-b border-[#24292E]">
                          <th className="py-3 px-4 font-bold">Trace ID</th>
                          <th className="py-3 px-4 font-bold">Agent</th>
                          <th className="py-3 px-4 font-bold">Status</th>
                          <th className="py-3 px-4 font-bold text-right">Cost</th>
                          <th className="py-3 px-4 font-bold text-right">Latency</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MOCK_RUNS.map((run) => (
                          <tr key={run.id} className="border-b border-[#24292E] hover:bg-[#161B22] transition-colors text-[11px] group cursor-pointer">
                            <td className="py-2.5 px-4 font-mono text-blue-400">#{run.id}</td>
                            <td className="py-2.5 px-4 font-medium">{run.agentName}</td>
                            <td className="py-2.5 px-4">
                              <span className={cn(
                                "px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider",
                                run.status === 'completed' ? "bg-green-500/10 text-green-400" :
                                run.status === 'anomaly' ? "bg-red-400/10 text-red-400" :
                                run.status === 'failed' ? "bg-gray-500/10 text-gray-400" : "bg-blue-400/10 text-blue-400"
                              )}>
                                {run.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-right font-mono opacity-60">${run.cost.toFixed(4)}</td>
                            <td className="py-2.5 px-4 text-right font-mono opacity-60">{run.latency}ms</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'traces' && (
              <motion.div
                key="traces"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                {/* Detail Header */}
                <div className="p-4 border-b border-[#24292E] bg-[#0D1117] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-blue-400">#tr_8k2m1</span>
                    <h2 className="text-sm font-bold">CustomerSupportAgent_Run</h2>
                    <span className="text-[10px] px-2 py-0.5 bg-[#21262D] rounded text-white font-mono">gpt-4o</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-green-400 font-bold uppercase border border-green-500/20 px-2 py-0.5 rounded">Success</span>
                    <span className="text-[10px] text-[#8B949E]">12:44:11 GMT-7</span>
                  </div>
                </div>

                <div className="flex-grow p-6 flex flex-col gap-6">
                   {/* Trace Flow Visualization */}
                  <div className="flex flex-col gap-4 bg-[#0D1117] border border-[#30363D] rounded-lg p-6 relative">
                    <div className="flex items-center gap-4 justify-center">
                      <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center font-bold text-blue-500 shadow-lg shadow-blue-500/10 bg-[#161B22]">1</div>
                      <div className="flex-grow max-w-[100px] h-px bg-gradient-to-r from-blue-500 to-[#30363D]"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-[#30363D] flex items-center justify-center font-bold text-[#8B949E] bg-[#161B22]">2</div>
                      <div className="flex-grow max-w-[100px] h-px bg-[#30363D]"></div>
                      <div className="w-10 h-10 rounded-full border-2 border-[#30363D] flex items-center justify-center font-bold text-[#8B949E] bg-[#161B22]">3</div>
                    </div>
                    <div className="grid grid-cols-3 text-[10px] font-mono text-[#8B949E] max-w-lg mx-auto w-full text-center">
                      <span className="uppercase tracking-widest font-bold text-blue-400">TRIGGER</span>
                      <span className="uppercase tracking-widest">TOOL_CALL</span>
                      <span className="uppercase tracking-widest">RESPONSE</span>
                    </div>
                    
                    {/* JSON Preview Area */}
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-[#8B949E] font-bold ml-1">System Prompt</label>
                        <div className="bg-[#010409] p-4 rounded font-mono text-[11px] text-blue-300/80 border border-[#24292E] h-48 overflow-hidden relative">
                          <code className="whitespace-pre">{`{
  "role": "system",
  "content": "You are a support agent for AgentObserve. Help users visualize their repo metrics and debugging logs efficiently."
}`}</code>
                          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#010409] to-transparent pointer-events-none"></div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[9px] uppercase tracking-[0.1em] text-green-400 font-bold ml-1 flex items-center gap-1">
                          <Terminal size={10} />
                          TOOL OUTPUT (search_db)
                        </label>
                        <div className="bg-[#010409] p-4 rounded font-mono text-[11px] text-green-300/80 border border-[#24292E] h-48 overflow-hidden">
                          <code className="whitespace-pre">{`{
  "status": "success",
  "rows": [
    {"id": 1, "name": "latency_peak", "val": 890},
    {"id": 2, "name": "token_drift", "val": 0.14}
  ],
  "execution_time": "42ms"
}`}</code>
                        </div>
                      </div>
                    </div>

                    {/* AI Insight Section */}
                    <AIInsightBox traceData={MOCK_RUNS[0]} />
                  </div>

                  {/* Metrics Cards Grid for detail view */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <DetailMetricCard label="Total Tokens" value="12,402" subValue="$0.0184 est." color="white" />
                    <DetailMetricCard label="Latency" value="2.4s" subValue="P95: 3.1s" color="yellow" />
                    <DetailMetricCard label="Tool Calls" value="08" subValue="100% successful" color="blue" />
                    <DetailMetricCard label="Eval Score" value="0.94" subValue="Accuracy Metric" color="green" />
                  </div>
                </div>

                {/* Console Log Area */}
                <div className="h-48 border-t border-[#24292E] bg-[#0D1117] flex flex-col font-mono">
                  <div className="px-4 h-9 flex items-center justify-between border-b border-[#24292E] text-[10px] text-[#8B949E] uppercase tracking-tighter bg-[#161B22]">
                    <div className="flex items-center gap-4">
                      <span className="font-bold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        Live Stream Logs
                      </span>
                      <span className="opacity-30">|</span>
                      <span>Filter: All</span>
                    </div>
                    <button className="hover:text-white transition-colors">Clear Console</button>
                  </div>
                  <div className="flex-grow p-4 text-[11px] overflow-y-auto custom-scrollbar flex flex-col gap-1.5">
                    <p><span className="text-[#8B949E]">[12:44:01]</span> <span className="text-blue-500 font-bold">INFO:</span> Initializing OpenAI client (model: gpt-4o)...</p>
                    <p><span className="text-[#8B949E]">[12:44:03]</span> <span className="text-purple-400 font-bold">TOOL:</span> Executing `search_documentation` with query="deployment guide"</p>
                    <p><span className="text-[#8B949E]">[12:44:04]</span> <span className="text-green-400 font-bold">DONE:</span> Tool returned 3 chunks (relevance score 0.89)</p>
                    <p><span className="text-[#8B949E]">[12:44:08]</span> <span className="text-blue-500 font-bold">INFO:</span> Streaming completion tokens (t/s: 64.2)</p>
                    <p><span className="text-[#8B949E]">[12:44:11]</span> <span className="text-white font-bold">SUCCESS:</span> Trace complete in 10.2s</p>
                    <p><span className="text-blue-500 animate-pulse">_</span></p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'dashboard' && activeTab !== 'traces' && (
               <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center flex-grow p-12 text-center"
              >
                <div className="w-16 h-16 bg-[#161B22] border border-[#30363D] rounded-full flex items-center justify-center mb-6">
                  <Activity className="text-[#2563eb]/30" size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2">View Implementation Pending</h3>
                <p className="text-sm text-[#8B949E] max-w-sm font-serif italic mb-8">This module will feature deep integration with {activeTab} analytics datasets in the next iteration.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="px-6 py-2 bg-blue-600 rounded text-xs font-bold text-white hover:bg-blue-700 transition-colors uppercase tracking-widest"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Right Context Bar */}
        <aside className="w-12 border-l border-[#24292E] bg-[#0D1117] flex flex-col items-center py-6 gap-6 shrink-0">
          <ContextIconButton icon={<ChevronRight size={18} />} />
          <ContextIconButton icon={<Activity size={18} />} />
          <ContextIconButton icon={<Terminal size={18} />} />
          <ContextIconButton icon={<Settings size={18} />} />
          <div className="mt-auto">
            <ContextIconButton icon={<ShieldAlert size={18} />} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function HeaderNavItem({ label, active, onClick }: { label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "h-14 flex items-center px-1 border-b-2 transition-all text-xs font-mono uppercase tracking-widest",
        active ? "border-blue-500 text-white font-bold" : "border-transparent text-[#8B949E] hover:text-white"
      )}
    >
      {label}
    </button>
  );
}

function buildAnalysisPrompt(traceData: any): string {
  return `You are an AI SRE and Agent Observability Expert.
Analyze the following agent run trace and provide a concise (3-4 sentence) strategic summary.
Identify any potential issues, cost inefficiencies, or reasoning gaps.

TRACE DATA:
${JSON.stringify(traceData, null, 2)}`;
}

function AIInsightBox({ traceData }: { traceData: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopyPrompt = async () => {
    const prompt = buildAnalysisPrompt(traceData);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Clipboard write failed:', err);
    }
  };

  return (
    <div className="mt-4 p-4 rounded-lg bg-blue-600/5 border border-blue-500/20 relative group overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity size={12} className="text-blue-400" />
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400">Smart Observability Node</span>
        </div>
        <button
          onClick={handleCopyPrompt}
          className="text-[10px] font-bold text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 transition-colors flex items-center gap-2"
        >
          <Cpu size={10} />
          {copied ? 'Copied — paste into your LLM' : 'Copy AI Analysis Prompt'}
        </button>
      </div>

      <div className="text-xs leading-relaxed text-[#8B949E] font-mono">
        <p className="mb-2 italic">
          Click the button to copy a structured analysis prompt for this trace. Paste into Claude, ChatGPT, or Gemini for a 3-4 sentence SRE-grade summary.
        </p>
        <p className="text-[#8B949E]/60">
          v0.2 will integrate this directly via a backend proxy — keeping API keys server-side. See roadmap.
        </p>
      </div>
    </div>
  );
}

const TraceListItem: React.FC<{ run: any, isActive?: boolean }> = ({ run, isActive }) => {
  return (
    <div className={cn(
      "p-4 flex flex-col gap-1.5 cursor-pointer border-b border-[#24292E] transition-all relative font-sans",
      isActive ? "bg-[#1C2128] border-l-4 border-l-blue-500 pl-3" : "hover:bg-[#161B22]"
    )}>
      <div className="flex justify-between items-center mb-1">
        <span className={cn("text-[10px] font-mono", isActive ? "text-blue-400 font-bold" : "text-[#8B949E]")}>#{run.id}</span>
        <span className="text-[9px] text-[#484f58] uppercase font-mono">{format(new Date(run.timestamp), 'HH:mm')}</span>
      </div>
      <span className={cn("text-[13px] font-bold tracking-tight", isActive ? "text-white" : "text-[#8B949E]/80 group-hover:text-white")}>{run.agentName}</span>
      <div className="flex gap-2 mt-1">
        <span className="text-[9px] px-1.5 py-0.5 bg-[#21262D] border border-[#30363D] rounded text-[#8B949E] font-mono">gpt-4o</span>
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-wider",
          run.status === 'completed' ? "text-green-400" : 
          run.status === 'anomaly' ? "text-red-400" : "text-blue-400"
        )}>
          {run.status}
        </span>
      </div>
    </div>
  );
};

function CompactStatCard({ label, value, icon, status }: { label: string, value: string | number, icon?: ReactNode, status?: 'optimal' | 'warning' | 'critical' }) {
  return (
    <div className="bg-[#161B22] border border-[#30363D] p-5 rounded-lg flex flex-col gap-2 hover:border-[#484f58] transition-colors relative group">
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-[#8B949E] uppercase tracking-[0.2em] font-bold">{label}</span>
        {icon || (
          <div className={cn(
            "w-2 h-2 rounded-full",
            status === 'optimal' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" :
            status === 'warning' ? "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "bg-red-500"
          )} />
        )}
      </div>
      <span className="text-2xl font-bold font-mono tracking-tighter text-white">{value}</span>
      {status === 'optimal' && <span className="text-[9px] text-green-500/60 font-mono tracking-widest">+12.4% vs last cycle</span>}
    </div>
  );
}

function DetailMetricCard({ label, value, subValue, color }: { label: string, value: string, subValue: string, color: string }) {
  const textColor = {
    yellow: 'text-yellow-500',
    blue: 'text-blue-400',
    green: 'text-green-400',
    white: 'text-white'
  }[color];

  return (
    <div className="bg-[#161B22] border border-[#30363D] p-4 rounded-lg flex flex-col gap-1 shadow-sm">
      <span className="text-[10px] text-[#8B949E] uppercase tracking-widest font-bold">{label}</span>
      <span className={cn("text-2xl font-bold font-mono", textColor)}>{value}</span>
      <span className="text-[10px] text-[#8B949E] font-mono italic">{subValue}</span>
    </div>
  );
}

function ContextIconButton({ icon }: { icon: ReactNode }) {
  return (
    <div className="w-8 h-8 rounded hover:bg-[#30363D] flex items-center justify-center cursor-pointer text-[#8B949E] hover:text-white transition-all">
      {icon}
    </div>
  );
}

function RepoItem({ label, folder, open, children }: { label: string, folder?: boolean, open?: boolean, children?: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 py-0.5 group cursor-pointer hover:bg-white/5 px-2 rounded -ml-2">
        <span className="opacity-20 text-[10px] w-4">
          {folder ? (open ? '▼' : '▶') : ' '}
        </span>
        <span className={cn(
          "tracking-tight",
          folder ? "text-white/60 font-medium" : "text-white/30"
        )}>
          {label}
        </span>
      </div>
      {children && (
        <div className="pl-6 border-l border-[#24292E] ml-1.5 mt-1 pb-1">
          {children}
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-all",
        active 
          ? "bg-blue-600/10 text-blue-500" 
          : "text-white/40 hover:text-white hover:bg-white/5"
      )}
    >
      <span className={cn("transition-colors", active ? "text-blue-500" : "text-inherit opacity-60")}>
        {icon}
      </span>
      <span className="font-mono tracking-tight">{label}</span>
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="ml-auto w-1 h-4 bg-blue-500 rounded-full"
        />
      )}
    </button>
  );
}

