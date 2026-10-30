# Bolt Plan

> A **Bolt** is one build pass through the Construction stages for a unit of work, ending in something that runs and can be verified. This plan has one Bolt for the single unit of work (U1: u1-todo-app).

## Sources

- [unit-of-work](../units-generation/unit-of-work.md)
- [unit-of-work-dependency](../units-generation/unit-of-work-dependency.md)
- [unit-of-work-story-map](../units-generation/unit-of-work-story-map.md)
- [components](../domain-design/components.md)
- [stories](../user-stories/stories.md)

---

## Bolt 1 — Todo App (U1: u1-todo-app)

**Unit of Work:** U1 (`u1-todo-app`)
**Walking skeleton:** No (team.md: Walking Skeleton: No)
**Bolt owner:** aidlc-developer-agent (AI, solo)

### Scope

All 6 user stories:

| Story | Capability |
|---|---|
| US1.1 | Add a task (text input + Enter/Add button) |
| US2.1 | View the task list (render, empty state, creation order) |
| US3.1 | Mark a task complete (checkbox toggle, strikethrough + dimmed) |
| US4.1 | Delete a task (✕ button, immediate, focus management) |
| US5 | Persist tasks across refresh (localStorage + in-memory fallback) |
| US6 | Responsive and accessible interface (WCAG 2.1 AA, keyboard nav, ARIA) |

### Intra-Bolt build sequence

The components are built in dependency order within this single Bolt:

1. **`storage.js`** — StorageLayer: localStorage detection, load/save, in-memory fallback (US5)
2. **`tasks.js`** — TaskDomain: task array, addTask/toggleTask/deleteTask/getTasks, validation (US1.1, US3.1, US4.1)
3. **`ui.js`** — UILayer: DOM rendering, event handlers, focus management (US2.1, US4.1, US6)
4. **`index.html` + `styles.css`** — HTML skeleton, design tokens, responsive layout (US2.1, US6)
5. **Tests** — one happy-path test per requirement, after each file (team testing posture)

### Definition of Done

This Bolt is complete when:
- [ ] All 6 user stories pass their acceptance criteria
- [ ] `storage.js`, `tasks.js`, `ui.js`, `index.html`, `styles.css` exist and are runnable in a browser
- [ ] All tasks persist across page refresh in a normal browser session
- [ ] In-memory fallback activates silently when localStorage is unavailable
- [ ] Empty-input submit does nothing (no task added, no error shown)
- [ ] Completed tasks show strikethrough + 60% opacity; toggling restores normal styling
- [ ] Delete removes the task immediately with no confirmation
- [ ] All interactive elements keyboard-navigable; ARIA labels on delete buttons
- [ ] Layout is responsive (≥768px centred card; <768px full-width, 44px touch targets)
- [ ] One test per requirement written and passing

### Confidence hypothesis

Shipping this Bolt will validate: the three-component decomposition (StorageLayer → TaskDomain → UILayer) produces a working, testable to-do app with correct persistence behaviour in a plain HTML/CSS/JS project with no framework or build step.

### Expected demo

Open `index.html` in a browser. Add tasks, mark some complete, delete one, refresh the page — tasks survive. Open in private mode — tasks work for the session but do not persist on refresh. Verify keyboard navigation (Tab through all elements) and check delete-button ARIA labels in DevTools.
