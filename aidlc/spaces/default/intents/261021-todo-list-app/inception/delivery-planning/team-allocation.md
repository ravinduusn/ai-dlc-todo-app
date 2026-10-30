# Team Allocation

## Sources

- [unit-of-work](../units-generation/unit-of-work.md)
- [team-practices](../practices-discovery/team-practices.md)

---

## Overview

This is a solo learning project (MVP scope). Team Formation (stage 1.5) was skipped for this scope. All Bolts are executed by the AI developer agent.

| Bolt | Unit | Owner | Notes |
|---|---|---|---|
| Bolt 1 | U1 (u1-todo-app) | aidlc-developer-agent | Solo AI build pass; no mob, no parallel team |

## Roles

| Role | Agent / Person | Responsibilities |
|---|---|---|
| Developer | aidlc-developer-agent | Implements all components (StorageLayer, TaskDomain, UILayer), writes tests, produces all deliverables |
| Reviewer | You (the developer-learner) | Approves each Construction checkpoint gate |

## Way of Working

Per `team.md`: direct commits to `main`, no branching strategy. Construction worktrees branch from `main` and squash-merge back as one commit per Bolt.

## Notes

- No mob or pair programming — solo AI execution
- No sprint cadence — single Bolt completes the whole app
- Approval gates remain human-controlled at each Construction stage
