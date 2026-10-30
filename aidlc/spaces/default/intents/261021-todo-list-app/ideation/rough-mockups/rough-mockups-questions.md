# Rough Mockups & Concept Visualization — Questions

## Sources

- [desc] Initial description: "Build a simple to-do list web app"
- [scope] Workflow-selected scope: `mvp`.
- [intent-statement] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/intent-capture/intent-statement.md`
- [scope-document] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/scope-definition/scope-document.md`
- [intent-backlog] `aidlc/spaces/default/intents/261021-todo-list-app/ideation/scope-definition/intent-backlog.md`

---

## Q1. [Designer] What are the primary screens or views the app needs?

This is a single-page to-do list app. What distinct views or states does the user need to see?

A. One single view — the task list with input field and all tasks visible at once
B. Two views — a task list view and a separate "completed" or "done" view
C. A main task list view plus a lightweight settings or about page
D. Not yet defined
X. Other (please specify)

[Answer]: A

---

## Q2. [Designer] What is the core happy path user flow?

From opening the app to completing a task, what steps does the user take?

A. Open app → see task list → type task → press enter/button → task appears in list → click to complete → click to delete
B. Open app → add task via input → task list updates → toggle complete via checkbox → remove via delete button
C. Same as B but tasks persist automatically, so the list is already populated on return visits
D. Not yet defined
X. Other (please specify)

[Answer]: C

---

## Q3. [Designer] What is the preferred information hierarchy for the main view?

How should the page be structured? What appears at the top, middle, and bottom?

A. Header (app title) → Input field (add task) → Task list (all tasks) — simple top-to-bottom
B. Input field at top → Task list below → Footer with count or actions
C. Task list is the hero, with the input field anchored at the bottom
D. No strong preference — design for the cleanest experience
X. Other (please specify)

[Answer]: A

---

## Q4. [Designer] Are there existing brand guidelines, design systems, or UI patterns to follow?

Should the design follow any existing visual style, colour scheme, or component library?

A. No — greenfield, no existing design system or brand guidelines
B. Follow a well-known design system (e.g. Material Design, Apple HIG) as a loose reference
C. Match an existing app or reference design (please specify)
D. Use a specific CSS framework or utility library (e.g. Tailwind, Bootstrap)
X. Other (please specify)

[Answer]: A

---

## Q5. [Designer] What device and form factors must be supported?

Where will users access this app?

A. Desktop browser only
B. Both desktop and mobile browsers (responsive design)
C. Mobile browser first, desktop secondary
D. Not yet defined
X. Other (please specify)

[Answer]: B

---

## Q6. [Designer] Are there specific accessibility requirements?

What level of accessibility is expected for v1?

A. No formal accessibility requirements — keep it reasonable but nothing specific
B. WCAG 2.1 AA — full compliance required
C. Keyboard navigability and basic screen reader support (landmark regions, ARIA labels)
D. Not yet defined
X. Other (please specify)

[Answer]: C

## Assumptions & Open Questions

[Answer]: Clean, minimal centered card layout with semantic HTML and basic keyboard/ARIA accessibility.



## Consolidated Summary Confirmation

- Views: One single view — task list with input field and all tasks visible at once
- Happy path: Open app → add task via input → list updates → toggle complete via checkbox → remove via delete button; tasks persist automatically on return visits
- Information hierarchy: Header (app title) → Input field (add task) → Task list — simple top-to-bottom
- Design system: Greenfield — no existing brand guidelines or design system
- Device support: Both desktop and mobile browsers (responsive design)
- Accessibility: Keyboard navigability and basic screen reader support (landmark regions, ARIA labels)
- Assumption: Clean, minimal centered card layout with semantic HTML and basic keyboard/ARIA accessibility

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct
