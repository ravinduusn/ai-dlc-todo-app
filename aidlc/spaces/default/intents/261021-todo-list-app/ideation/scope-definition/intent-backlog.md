# Intent Backlog

This backlog lists the proto-Units of work for the to-do list web app MVP, prioritized by MoSCoW and sequenced by dependency order. [Q2: B] [Q3: A] [Q5: A]

## Must Have — v1

| ID | Capability | Value delivered | Depends on | Source |
|----|-----------|----------------|-----------|--------|
| IB-1 | Core task CRUD — add, view, complete, delete | Delivers the fundamental task loop; nothing else is useful without it | None | [Q2: B] [intent-statement] |
| IB-2 | localStorage persistence | Tasks survive page refresh; makes the app genuinely usable for daily use | IB-1 | [Q2: B] [constraint-register TC-1] |
| IB-3 | Basic visual design (CSS) | Makes the app readable and usable; part of the minimum viable scope | IB-1 | [Q1: C] |

## Nice to Have — v2+

| ID | Capability | Value delivered | Depends on | Source |
|----|-----------|----------------|-----------|--------|
| IB-4 | Filter tasks (active / completed view) | Helps the user focus on what remains; not needed for core loop | IB-1, IB-2 | [Q2: B] |
| IB-5 | Edit an existing task's text | Corrects mistakes without deleting and re-adding | IB-1 | [Q2: B] |
| IB-6 | Clear all completed tasks at once | Convenience — one action instead of many deletes | IB-1 | [Q2: B] |
| IB-7 | Count of remaining active tasks | Lightweight progress indicator | IB-1 | [Q2: B] |

## Explicitly Out of Scope

| Capability | Source |
|-----------|--------|
| User accounts / authentication | [intent-statement] [constraint-register SC-1] |
| Collaboration / multi-user features | [intent-statement] [constraint-register SC-2] |
| Due dates and reminders | [intent-statement] [constraint-register SC-3] |

## Prioritization Rationale

IB-1 through IB-3 form the complete v1 delivery. IB-1 (core CRUD) is the foundation; nothing else is meaningful without it. IB-2 (persistence) is what makes the app reliable enough to use — without it, every page refresh clears all work. IB-3 (basic UI) was confirmed as part of the minimum viable scope by the product owner. [Q1: C] [Q2: B]

IB-4 through IB-7 add value but do not change the core experience; they are good candidates for a second iteration once v1 is validated.

## Assumptions & Open Questions

- [assumption] IB-1 through IB-3 represent the complete v1 scope. If any nice-to-have item is reclassified as must-have, the scope document must be updated. [Q2: B]
