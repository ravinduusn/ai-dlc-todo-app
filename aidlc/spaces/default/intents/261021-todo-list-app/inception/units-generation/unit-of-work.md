# Unit of Work

## Sources

- [components](../domain-design/components.md)
- [decisions](../domain-design/decisions.md)
- [requirements](../requirements-analysis/requirements.md)
- [stories](../user-stories/stories.md)

---

## Unit Summary

| Unit ID | Directory | Name | Kind | Complexity | Deployment Model |
|---|---|---|---|---|---|
| U1 | u1-todo-app | Todo App | ui | M | Standalone `.js` files imported by `index.html` |

---

## U1 — Todo App (`u1-todo-app`)

**Kind:** `ui`

**Description:**
The complete to-do list web application — a single-page, browser-only app built
from three JavaScript modules (`storage.js`, `tasks.js`, `ui.js`) and a root
`index.html`. All three domain-design components (StorageLayer, TaskDomain,
UILayer) are implemented and integrated in this single unit.

**Responsibilities:**
- Implement `StorageLayer`: localStorage detection, load/save with in-memory fallback (FR3.1–FR3.4)
- Implement `TaskDomain`: in-memory task array, addTask/toggleTask/deleteTask/getTasks, empty-input validation (FR1.1–FR1.6, FR2.1, FR3.x)
- Implement `UILayer`: DOM rendering, event listeners, re-render loop, focus management, responsive layout, WCAG 2.1 AA accessibility (FR4.1–FR4.3, NFR1.1–NFR3.1)
- Wire all three modules together in `index.html`
- Apply the design system (design tokens, typography, component styles) from the refined mockups

**Scope (user stories covered):** US1.1, US2.1, US3.1, US4.1, US5, US6

**Complexity:** M — moderate; all three layers in one pass, but each is well-understood and the total codebase is small

**Implementation Notes:**
- File structure: `index.html`, `storage.js`, `tasks.js`, `ui.js`, `styles.css`
- No build step, no framework, no external dependencies (C3/C4)
- `storage.js` is implemented first (no dependencies), then `tasks.js` (depends on storage), then `ui.js` (depends on tasks)
- Tests are written after each file is implemented, one test per requirement (happy-path), per team testing posture
- Accessibility requirements (WCAG 2.1 AA checklist from refined mockups) apply to `ui.js` and `index.html`

**Constraints:**
- Plain HTML/CSS/JS only — no npm, no bundler, no framework (C3/C4)
- `system-ui` font stack, teal `#0d9488` accent, white background (design-system-mapping.md)
- No hardcoded credentials or secrets (construction guardrail)
- All inputs validated/sanitized at system boundaries (construction guardrail)
