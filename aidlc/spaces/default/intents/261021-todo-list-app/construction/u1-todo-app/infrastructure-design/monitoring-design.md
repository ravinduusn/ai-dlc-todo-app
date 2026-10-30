# Monitoring Design — u1-todo-app

## Sources

- [logical-components](../nfr-design/logical-components.md)
- [performance-design](../nfr-design/performance-design.md)

---

## Overview

This app has no server, no cloud infrastructure, and no observability platform.
There are no metrics endpoints, no log aggregation, and no alerting system.
Monitoring is limited to browser-native developer tools used during development
and manual verification.

---

## Metrics & KPIs

| Metric | Source | Threshold | Why it matters |
|---|---|---|---|
| Time-to-interactive | Chrome/Firefox DevTools Performance tab | Under 1 000 ms | NFR4.1 — page load target |
| Interaction latency (add/toggle/delete) | DevTools Performance tab | Under 16 ms | NFR4.2 — one render frame |
| localStorage read/write time | Manual `performance.now()` instrumentation in development | Under 10 ms | NFR4.3 — storage budget |

These are development-time metrics, not production dashboards. No metric collection infrastructure exists at runtime.

---

## Alerts

| Alert | Condition | Severity | Routes to |
|---|---|---|---|
| None | N/A | N/A | N/A |

No alerting system. Errors surface as browser console errors visible to the developer during local use.

---

## SLIs / SLOs

| SLI | SLO Target | Measurement Window |
|---|---|---|
| Page load time (local file) | Under 1 000 ms | Manual spot-check during development |
| Interaction latency | Under 16 ms per action | Manual spot-check during development |

No formal SLO tracking — this is a learning project with local-only use.

---

## Logs & Tracing

No log aggregation or distributed tracing. Runtime errors appear in the browser's Developer Tools console. There are no structured logs, no log forwarding, and no trace IDs.

Development-time debugging uses browser DevTools: Console (JavaScript errors), Network (N/A — no network calls), Performance (timing), Application (localStorage inspector).
