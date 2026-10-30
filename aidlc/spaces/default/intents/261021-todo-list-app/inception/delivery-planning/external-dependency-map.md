# External Dependency Map

## Sources

- [team-practices](../practices-discovery/team-practices.md)
- [requirements](../requirements-analysis/requirements.md)

---

## Overview

This project is fully AI-contained and browser-only (no backend, no external APIs, no deployment pipeline). No external dependencies block any Bolt.

| Dependency | Owner | Lead Time | Blocks | Contingency |
|---|---|---|---|---|
| — | — | — | — | — |

No external dependencies identified (Q3: A — everything needed is available now).

## Notes

- The only "external" component is the browser's `localStorage` API, which is a standard browser feature with 100% availability on modern evergreen browsers (NFR3.1). The app handles its unavailability transparently (FR3.3, StorageLayer in-memory fallback).
- No CDN, no npm registry, no external fonts — all assets are local (C4: no external dependencies).
- No deployment target — the app runs from local files (team.md: Deployment: No deployment).
