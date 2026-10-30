# Functional Specification — u1-todo-app

## Sources

- [unit-of-work](../../../inception/units-generation/unit-of-work.md)
- [unit-of-work-story-map](../../../inception/units-generation/unit-of-work-story-map.md)
- [stories](../../../inception/user-stories/stories.md)
- [requirements](../../../inception/requirements-analysis/requirements.md)
- [components](../../../inception/domain-design/components.md)

---

## Overview

This specification covers the complete functional behaviour of the Todo App
(U1: u1-todo-app) — a single-page, browser-only web application built from
three JavaScript modules and a root HTML file. It describes interaction
workflows, task lifecycle state transitions, data flows, and screen transitions
for all six user stories (US1.1, US2.1, US3.1, US4.1, US5, US6).

---

## Interaction Workflows

### Workflow 1 — Add a Task (US1.1)

**Actor**: User  
**Trigger**: User types text in the input field and presses Enter or clicks the Add button

**Happy path**:
1. User types non-empty text into the task input field (`<input>` with placeholder)
2. User presses Enter (keydown `Enter`) or clicks the Add button
3. UILayer calls `TaskDomain.addTask(text)` with the raw input value
4. TaskDomain trims whitespace; if trimmed value is empty, the call is a no-op (returns without change) — workflow ends here
5. TaskDomain generates a unique `id` (`crypto.randomUUID()` or `Date.now().toString()`) and a `createdAt` ISO-8601 timestamp
6. TaskDomain appends the new `Task` object to the in-memory array (insertion order; oldest first)
7. TaskDomain calls `StorageLayer.save(tasks)` — serialises and persists
8. TaskDomain returns the updated task array to UILayer
9. UILayer clears the input field and re-renders the task list
10. The new task appears at the bottom of the list with its text, an unchecked checkbox, and a delete button

**Empty-input path** (AC1.1.1):
- Steps 1–4 above; trimmed value is empty → no task created, no error shown, input retains whatever the user typed (whitespace)

**Post-condition**: task list contains the new task; localStorage holds the updated array; input field is cleared

---

### Workflow 2 — View the Task List (US2.1)

**Actor**: Browser (triggered on page load)  
**Trigger**: `DOMContentLoaded` event

**Happy path**:
1. UILayer fires on `DOMContentLoaded`
2. UILayer calls `TaskDomain.getTasks()`
3. TaskDomain calls `StorageLayer.load()` → StorageLayer reads `localStorage["tasks"]`, deserialises, returns array (or empty array if not set)
4. TaskDomain sets in-memory array from storage result and returns it
5. UILayer renders the task list:
   - If array is empty → renders empty-state message "No tasks yet. Add one above."
   - If array is non-empty → renders `<ul>` with one `<li>` per task, ordered by `createdAt` (oldest first)
6. Each task item renders: checkbox (checked if `completed`), task text (strikethrough + 60% opacity if `completed`), delete button (`aria-label="Delete [task text]"`)

**Post-condition**: task list shows all stored tasks; empty state shown when none exist

---

### Workflow 3 — Mark a Task Complete / Toggle (US3.1)

**Actor**: User  
**Trigger**: User clicks a task's checkbox

**Toggle to complete** (AC3.1.1):
1. User clicks checkbox of a task whose `completed` is `false`
2. UILayer calls `TaskDomain.toggleTask(id)`
3. TaskDomain finds the task by `id`, sets `completed = true`
4. TaskDomain calls `StorageLayer.save(tasks)`
5. UILayer re-renders the list; the task now shows strikethrough text and 60% opacity; checkbox is checked

**Toggle back to incomplete** (AC3.1.2):
1. User clicks checkbox of a task whose `completed` is `true`
2. UILayer calls `TaskDomain.toggleTask(id)`
3. TaskDomain finds the task by `id`, sets `completed = false`
4. TaskDomain calls `StorageLayer.save(tasks)`
5. UILayer re-renders; strikethrough and opacity are removed; checkbox is unchecked

---

### Workflow 4 — Delete a Task (US4.1)

**Actor**: User  
**Trigger**: User clicks a task's delete button

**Happy path** (AC4.1.1):
1. User clicks the delete button (`aria-label="Delete [task text]"`) on a task
2. UILayer calls `TaskDomain.deleteTask(id)`
3. TaskDomain removes the task with matching `id` from the in-memory array
4. TaskDomain calls `StorageLayer.save(tasks)`
5. UILayer re-renders the list
6. If the list is now empty → renders empty-state message
7. UILayer moves keyboard focus: to the next task item if one exists; otherwise back to the task input field

**Post-condition**: task is removed from list and from localStorage; focus is managed

---

### Workflow 5 — Persist Tasks (US5)

**Actor**: System (triggered on every mutation)  
**Trigger**: Any call to `addTask`, `toggleTask`, or `deleteTask`

**Persistence path** (AC5.1.1, AC5.1.2):
1. TaskDomain completes its state mutation
2. TaskDomain calls `StorageLayer.save(tasks)`
3. StorageLayer detects localStorage is available (detected at init via test write)
4. StorageLayer serialises task array to JSON string and writes to `localStorage["tasks"]`

**Fallback path** (AC5.1.3):
1. StorageLayer.init() tries `localStorage.setItem("__test", "1")` in a try/catch
2. If a `SecurityError`, `QuotaExceededError`, or any exception is thrown, StorageLayer marks itself as `inMemory = true`
3. All subsequent `save()` calls update an in-memory array only; `load()` returns that array
4. Caller (TaskDomain) sees no difference — the interface is identical
5. No error message is shown to the user

**Page load** (AC5.1.2):
1. On `DOMContentLoaded`, UILayer triggers the View workflow (Workflow 2)
2. StorageLayer.load() reads localStorage["tasks"] (or returns in-memory array if fallback)
3. Parses JSON; returns array (empty array if key absent or parse fails)

---

### Workflow 6 — Responsive and Accessible Interface (US6)

**Not a triggered workflow** — this is a set of cross-cutting rendering rules
applied by UILayer on every render pass.

**Desktop layout** (≥768px, AC6.1.1):
- Input and Add button appear side by side on the same row
- Task list is centered in a card with `max-width: 640px` and horizontal padding

**Mobile layout** (<768px, AC6.1.2):
- Input and Add button stack to full-width single column
- All touch targets (checkbox, delete button, Add button) are at least 44×44px

**Keyboard navigation** (AC6.1.3):
- All interactive elements (input, checkboxes, delete buttons, Add button) are in natural tab order
- Checkbox toggle: operable with Space
- Delete button: operable with Enter or Space
- After task deletion, focus moves to the next item in the list, or to the input field if the list is empty

**Screen reader support** (AC6.1.4):
- Page uses `<header>` and `<main>` landmark elements
- Single `<h1>` for the page title ("My Tasks" or equivalent)
- Task list rendered as `<ul>` with `<li>` children
- Delete buttons carry `aria-label="Delete [task text]"` (dynamically set per task)
- Checkboxes are native `<input type="checkbox">` elements associated with the task text via `<label>`

---

## Task Lifecycle — State Machine

```
           +-------------+
           |   (none)    |
           +------+------+
                  | addTask(text) [text not empty]
                  v
           +-------------+
           |  Incomplete |  <---+
           +------+------+      |
                  |             |
    toggleTask(id)|             | toggleTask(id)
                  v             |
           +-------------+      |
           |  Complete   +------+
           +------+------+
                  |
   deleteTask(id) | (from either state)
                  v
           +-------------+
           |  (removed)  |
           +-------------+
```

<!-- Text fallback: Task lifecycle has three visible states: none (before creation), Incomplete, and Complete. addTask transitions from none to Incomplete. toggleTask transitions between Incomplete and Complete in both directions. deleteTask removes the task from either state. -->

**State transitions summary**:

| Current State | Action | Next State | Side effect |
|---|---|---|---|
| — | `addTask(text)` [text non-empty] | Incomplete | Appended to array; StorageLayer.save() |
| — | `addTask(text)` [text empty/whitespace] | — | No-op; no state change |
| Incomplete | `toggleTask(id)` | Complete | `completed = true`; StorageLayer.save() |
| Complete | `toggleTask(id)` | Incomplete | `completed = false`; StorageLayer.save() |
| Incomplete or Complete | `deleteTask(id)` | (removed) | Removed from array; StorageLayer.save(); focus managed |

---

## Data Flow Summary

```
User action
    |
    v
UILayer (DOM event handler)
    |
    | calls method (addTask / toggleTask / deleteTask / getTasks)
    v
TaskDomain (in-memory array + validation)
    |
    | calls save(tasks) or load()
    v
StorageLayer (localStorage or in-memory fallback)
```

<!-- Text fallback: Linear data flow from User to UILayer to TaskDomain to StorageLayer. No reverse or cross calls. -->

---

## Assumptions & Open Questions

None. All design decisions resolved from upstream artifacts.
