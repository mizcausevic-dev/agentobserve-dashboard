# AgentObserve Dashboard

> Operator console for AI agent fleets — runs, traces, cost budgets, regression detection, SLA scoring, and incident routing. The Datadog-shaped layer between agent platforms and SRE/SecOps teams.

[![CI](https://github.com/mizcausevic-dev/agentobserve-dashboard/actions/workflows/ci.yml/badge.svg)](https://github.com/mizcausevic-dev/agentobserve-dashboard/actions/workflows/ci.yml)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-3B82F6.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Live demo](https://img.shields.io/badge/demo-observe.kineticgain.com-3B82F6.svg)](https://observe.kineticgain.com)
[![React](https://img.shields.io/badge/React-19-3B82F6.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3B82F6.svg)](https://www.typescriptlang.org/)

The visual surface for the [`agentobserve`](https://github.com/mizcausevic-dev/agentobserve) fleet operations engine. Real-time-shaped UX showing what enterprise agent observability looks like — run-by-run latency, token cost, SLA adherence, anomaly flagging, trace timelines, and AI-assisted root-cause prompts.

> **Why this matters**: production AI agents fail in ways traditional APM tools don't catch — infinite reasoning loops, hallucinated tool calls, drifting costs across model versions, silent SLA degradation. Datadog and New Relic don't speak agent. AgentObserve does.

---

## Live demo

[**observe.kineticgain.com**](https://observe.kineticgain.com) — interactive preview of the operator console.

---

## What you see

| Surface | What it shows |
|---|---|
| **Dashboard** | Active agent count, total runs, average SLA, total spend vs budget. The 30-second fleet health summary. |
| **Trace List (sidebar)** | Recent runs with status pills (running / completed / anomaly / failed), latency, and cost per call. |
| **Trace Detail** | Per-run breakdown: latency, tokens, SLA score, cost, the actual reasoning trace. |
| **Smart Observability Node** | One-click structured prompt for AI-assisted root-cause analysis. Copies the prompt to clipboard for paste into Claude / Gemini / ChatGPT. v0.2 wires this directly via backend proxy. |
| **Cost & SLA charts** | 24-hour rolling timeseries on spend and SLA adherence. |

---

## Why this exists

Modern AI products ship agents fast. Most of them have **zero observability** — they trust the LLM, hope the cost stays low, and don't notice the SLA cliff until the customer complains. This dashboard is what agent observability looks like in production: a single-page operator surface that:

- **Platform engineers can dock to a wall** in their fleet ops war room
- **CTOs can read** to confirm spend is in budget
- **Compliance reviewers** can use as evidence the agents are being monitored
- **Hiring managers** review in 30 seconds during a portfolio scan

---

## A note on the AI feature (Phase 1 design)

The "Smart Observability Node" panel showcases a working LLM-assisted analysis UX **without exposing API keys to the browser**. Instead of calling Gemini/Claude/OpenAI from the client (which would embed your key in the JS bundle), the panel:

1. Builds a domain-specific structured analysis prompt for the selected trace
2. Copies that prompt to your clipboard
3. You paste into your LLM of choice — Claude, Gemini, ChatGPT — and get the answer

This is honest, secure, and keeps the dashboard buildable without backend infrastructure. **Phase 2** wires the same flow through a backend proxy (Cloudflare Workers / Vercel Functions) so the analysis happens inline.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Styling | Tailwind 4 (CSS variable theme) |
| Charts | Recharts |
| Animations | Motion |
| Icons | Lucide React |
| Date utilities | date-fns |
| Fonts | IBM Plex Sans / Mono / Serif |
| Theme | GitHub-style dark + blue accents — the SRE/observability semiotic (blue = monitoring, green = healthy, amber = warn, red = anomaly) |

---

## Quick start

```bash
git clone https://github.com/mizcausevic-dev/agentobserve-dashboard.git
cd agentobserve-dashboard
npm install
npm run dev
```

Open http://localhost:3000.

### Build for production

```bash
npm run build      # tsc + vite build → dist/
npm run preview    # serve dist/ locally to test
```

---

## Roadmap

### v0.1 — *Shipped*
- [x] Operator console UX (Dashboard / Traces / Analytics / API Keys tabs)
- [x] Trace list with status pills and SLA scoring
- [x] Trace detail panel with latency, cost, tokens, reasoning trace
- [x] Smart Observability Node — copy-prompt pattern for AI-assisted analysis
- [x] 24-hour cost and SLA charts
- [x] AGPL-3.0 license + CI matrix on Node 20 / 22

### v0.2 — *Next*
- [ ] **Live agent fleet ingestion** — webhook endpoint or polling against OpenTelemetry / OpenLLMetry
- [ ] Backend proxy (Cloudflare Workers) for inline AI analysis (replaces clipboard pattern)
- [ ] Persistent run history (KV-backed)
- [ ] Real-time anomaly detection on cost / latency / SLA spikes

### v0.3 — *Product*
- [ ] Multi-agent fleet view (compare N agent versions side-by-side)
- [ ] Webhook / Slack / PagerDuty alerts on regression or budget breach
- [ ] Trace replay UI for incident postmortems
- [ ] Exportable PDF SLA reports

### v1.0 — *Commercial*
- [ ] SaaS tiers (Free per-fleet / Pro / Team)
- [ ] Enterprise feature: org-wide agent inventory + SOC 2 evidence collection
- [ ] White-label / on-prem deploys

---

## Companion repository

This dashboard is the visual surface for [`agentobserve`](https://github.com/mizcausevic-dev/agentobserve) — the actual TypeScript implementation of the fleet ops engine. The two are deliberately split:

- **`agentobserve`** = the engine (run collectors, SLA scorers, anomaly detectors, OpenTelemetry adapters)
- **`agentobserve-dashboard`** = the UX (this repo)

Run them together for a complete fleet ops experience, or run the dashboard standalone to showcase the UX.

---

## License

**AGPL-3.0-only**. See [LICENSE](LICENSE).

The AGPL means: you can fork, modify, and self-host this — but if you run a modified version as a service, you must publish your source. This protects the project's monetization runway while keeping it genuinely open-source for platform teams.

For commercial licensing inquiries (closed-source forks, white-label deployments, on-prem with proprietary modifications), contact: **miz@kineticgain.com**

---

## Author

**Miz Causevic** — Director of Web Engineering · Platform Architecture
[mizcausevic-dev.github.io](https://mizcausevic-dev.github.io/) · [github.com/mizcausevic-dev](https://github.com/mizcausevic-dev) · [gv.kineticgain.com](https://gv.kineticgain.com) · [mcp.kineticgain.com](https://mcp.kineticgain.com) · [rag.kineticgain.com](https://rag.kineticgain.com)

---

**Connect:** [LinkedIn](https://www.linkedin.com/in/mirzacausevic/) · [Kinetic Gain](https://kineticgain.com) · [Medium](https://medium.com/@mizcausevic/) · [Skills](https://mizcausevic.com/skills/)
