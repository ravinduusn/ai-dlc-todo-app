# Scope Document

## In Scope — v1

The following capabilities are confirmed as Must Have for the first version of the to-do list web app. [Q2: B] [intent-statement] [feasibility-assessment]

| Capability | Priority | Notes |
|-----------|---------|-------|
| Add a new task | Must Have | Core loop — the entry point for all other actions |
| View all tasks in a list | Must Have | Core loop — displays the task list to the user |
| Mark a task as complete | Must Have | Core loop — toggles completion state |
| Delete a task | Must Have | Core loop — removes a task from the list |
| Persist tasks across page refresh (localStorage) | Must Have | Tasks survive browser refresh; no backend required [constraint-register TC-1] |
| Basic visual design | Must Have | Readable, usable UI — not polished, but functional [Q1: C] |

## Out of Scope — v1

The following capabilities are Nice to Have and are explicitly deferred to future versions. [Q2: B] [intent-statement]

| Capability | Reason for deferral |
|-----------|---------------------|
| Filter tasks (active / completed) | Not required for core value; adds UI complexity |
| Edit an existing task's text | Useful but not essential for v1 learning goal |
| Clear all completed tasks at once | Convenience feature; delete one-by-one covers the need |
| Count of remaining tasks | Informational enhancement; not a core action |
| User accounts / authentication | Explicitly excluded [intent-statement] [constraint-register SC-1] |
| Collaboration / multi-user | Explicitly excluded [intent-statement] [constraint-register SC-2] |
| Due dates and reminders | Explicitly excluded [intent-statement] [constraint-register SC-3] |

## Scope Boundary Summary

This is a single-user, browser-only task manager. It stores tasks in localStorage and requires no backend, no accounts, and no external integrations. The value delivered by v1 is a working end-to-end task loop that persists across page refreshes, presented in a clean, usable interface. [Q1: C] [Q2: B] [constraint-register TC-1, TC-2]

## Build Sequence

Capabilities will be built in this order: [Q3: A] [Q5: A]

1. Core CRUD — add, view, mark complete, delete (no persistence yet — tasks live in memory)
2. localStorage persistence — tasks survive page refresh
3. Basic visual design — CSS polish to make the UI clean and usable

## Timeline & Constraints

No deadlines. Personal learning project; build at own pace. [Q4: A] [constraint-register OC-1]

## Assumptions & Open Questions

- [assumption] Filter, edit, and clear-completed are treated as v2+ features. If these are needed in v1, scope must be revisited. [Q2: B]
