# Constraint Register

## Technical Constraints

| ID | Constraint | Type | Source | Impact |
|----|-----------|------|--------|--------|
| TC-1 | No backend server — app must run entirely client-side in the browser | Hard | [Q5: B] | Limits persistence to browser-native options (localStorage, IndexedDB); rules out user accounts and cross-device sync |
| TC-2 | No external integrations — fully self-contained | Hard | [Q1: A] | No third-party APIs, auth providers, or data services in v1 |
| TC-3 | Vanilla HTML, CSS, and JavaScript only — no frameworks or build tools | Chosen | [Q3: A] | Keeps setup minimal; limits access to component libraries and bundling |
| TC-4 | No cloud services or infrastructure | Hard | [Q6: A] | Deployment must use static hosting or filesystem; no managed DB, no serverless functions |

## Organisational Constraints

| ID | Constraint | Type | Source | Impact |
|----|-----------|------|--------|--------|
| OC-1 | No external stakeholders, deadline, or budget | Hard | [Q4: A] [Q5: A] | No external review gates, no timeline risk; full autonomy |

## Regulatory / Compliance Constraints

None. Personal learning project with no regulated data and no users beyond the developer. [Q2: A]

## Scope Constraints (v1 boundary)

| ID | Out-of-scope item | Source |
|----|-------------------|--------|
| SC-1 | User accounts and authentication | [intent-statement] |
| SC-2 | Collaboration / multi-user features | [intent-statement] |
| SC-3 | Due dates and reminders | [intent-statement] |

## Assumptions & Open Questions

None.
