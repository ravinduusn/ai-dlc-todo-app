# Unit of Work — Story Map

## Sources

- [stories](../user-stories/stories.md)
- [components](../domain-design/components.md)

---

## Story-to-Unit Mapping

| Story ID | Unit ID | Directory | Primary Component(s) | Notes |
|---|---|---|---|---|
| US1.1 | U1 | u1-todo-app | TaskDomain, UILayer | addTask, form submit handler, input clear |
| US2.1 | U1 | u1-todo-app | UILayer, TaskDomain, StorageLayer | Task list renderer, getTasks, load on startup, empty state |
| US3.1 | U1 | u1-todo-app | TaskDomain, UILayer | toggleTask, checkbox handler, strikethrough + dimming |
| US4.1 | U1 | u1-todo-app | TaskDomain, UILayer | deleteTask, delete button handler, focus management, empty state |
| US5 | U1 | u1-todo-app | StorageLayer, TaskDomain | load/save on every mutation, in-memory fallback |
| US6 | U1 | u1-todo-app | UILayer | Responsive layout, WCAG 2.1 AA, keyboard nav, ARIA labels |

---

## Cross-Cutting Concerns

| Concern | Applies To | Unit |
|---|---|---|
| WCAG 2.1 AA accessibility | All interactive elements (input, checkboxes, delete buttons) | U1 |
| Responsive layout (≥768px / <768px) | All screens | U1 |
| localStorage persistence | All task mutations | U1 |
| In-memory fallback | All task mutations when localStorage unavailable | U1 |

---

## Implementation Sequence Within U1

The recommended intra-unit build order (not a DAG constraint — Delivery Planning owns sequencing):

1. `storage.js` — StorageLayer (no dependencies; implements US5 persistence)
2. `tasks.js` — TaskDomain (depends on StorageLayer; implements US1.1, US3.1, US4.1)
3. `ui.js` — UILayer (depends on TaskDomain; implements US2.1, US4.1 focus, US6)
4. `index.html` + `styles.css` — wires everything; implements responsive layout and design tokens
5. Tests — one per requirement, happy-path, after each file

---

## Coverage Verification

All 6 user stories (US1.1, US2.1, US3.1, US4.1, US5, US6) assigned to U1. ✅
All acceptance criteria are traceable through U1's component responsibilities. ✅
