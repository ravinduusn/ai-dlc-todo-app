# Scope Definition & Prioritization — Questions

## Sources

- [desc] Initial description: "Build a simple to-do list web app"
- [scope] Workflow-selected scope: `mvp`.
- [intent-statement] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/intent-capture/intent-statement.md`
- [feasibility-assessment] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/feasibility/feasibility-assessment.md`
- [constraint-register] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/feasibility/constraint-register.md`

---

## Q1. [Product Owner] What is the minimum viable scope that delivers value?

The core task loop (add → view → complete → delete) is the confirmed foundation. What does the very first working version need to include beyond that core loop?

A. Just the core loop — add, view, complete, and delete tasks; nothing else
B. Core loop plus task persistence (tasks survive a page refresh via localStorage)
C. Core loop, persistence, and a basic visual design (readable, usable UI)
D. Core loop, persistence, visual design, and at least one additional feature (please specify)
E. Not yet defined
X. Other (please specify)

[Answer]: C

---

## Q2. [Product Owner] What capabilities are must-have vs. nice-to-have for v1?

Which of the following features are essential for this MVP, and which would be good to have but not required?

Mark all that apply as either Must Have (M) or Nice to Have (N):

- Add a new task
- View all tasks in a list
- Mark a task as complete
- Delete a task
- Persist tasks across page refresh (localStorage)
- Filter tasks (e.g. show only active or completed)
- Edit an existing task's text
- Clear all completed tasks at once
- Count of remaining tasks

A. Only the core four (add, view, complete, delete) are must-have; everything else is nice-to-have
B. Core four plus persistence are must-have; rest are nice-to-have
C. Core four, persistence, and filter/edit are all must-have
D. All listed items are must-have
E. Custom prioritisation — please describe which are M and which are N
X. Other (please specify)

[Answer]: B

---

## Q3. [Product Owner] What is the sequencing preference for building capabilities?

In what order should the capabilities be built?

A. Core functionality first (add/view/complete/delete), then persistence, then UI polish
B. Walking skeleton first — a minimal end-to-end slice that works in the browser, then expand
C. Highest user value first — whatever the user would notice most if missing
D. Risk-first — tackle the hardest or most uncertain piece first
E. No preference — build in any sensible order
X. Other (please specify)

[Answer]: A

---

## Q4. [Product Owner] Are there hard deadlines tied to specific capabilities?

Does any feature or milestone need to be ready by a specific date?

A. No deadlines — personal learning project, no time pressure
B. A soft target exists (please specify)
C. A hard deadline exists (please specify)
X. Other (please specify)

[Answer]: A

---

## Q5. [Product Owner] What are the dependencies between the main capabilities?

Which capabilities must be built before others can work? (For example, you cannot mark a task complete before you can add one.)

A. Linear dependency: add → view → complete/delete → persistence → extras
B. Parallel: core CRUD can be built together, persistence and UI polish are independent follow-ons
C. Not yet defined
X. Other (please specify)

[Answer]: A

## Assumptions & Open Questions

[Answer]: Keep v1 focused on the core four actions + localStorage persistence + clean basic UI. Filter/edit/clear-completed are nice-to-have extras.



## Consolidated Summary Confirmation

- Minimum viable scope: Core loop (add/view/complete/delete) + localStorage persistence + basic visual design
- Must-have capabilities: Add task, view tasks, mark complete, delete task, persist across refresh (localStorage)
- Nice-to-have (not in v1): Filter tasks, edit task text, clear all completed, remaining task count
- Build sequence: Core functionality first → persistence → UI polish
- Deadlines: None — personal learning project
- Dependencies: Linear — add → view → complete/delete → persistence → extras
- Assumption: v1 stays focused on core five (CRUD + localStorage); filter/edit/clear are future extras

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
