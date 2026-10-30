# Interaction Specification

## Sources

- [wireframes](../../ideation/rough-mockups/wireframes.md)
- [user-flow](../../ideation/rough-mockups/user-flow.md)
- [stories](../user-stories/stories.md)
- [requirements](../requirements-analysis/requirements.md)

---

## TaskInput Component

| Field | Value |
|---|---|
| Component | TaskInput |
| Description | Single-line text input with adjacent Add button for creating new tasks |
| Category | input |

### States

| State | Description | Trigger |
|---|---|---|
| default | Empty placeholder text visible, button enabled | page load |
| focused | Blue/teal focus ring on input; cursor in field | Tab key / click |
| filled | User has typed text | keystroke |
| disabled | Not used in v1 | — |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| onAddTask | function | yes | — | Called with trimmed text string when task is submitted |
| placeholder | string | no | "Add a new task..." | Input placeholder text |

### Interaction Rules

- **Submit on Enter**: when the input is focused and the user presses Enter, and the trimmed value is non-empty, call `onAddTask` and clear the input.
- **Submit on Add click**: when the user clicks the Add button and the trimmed value is non-empty, call `onAddTask` and clear the input.
- **Empty-input guard**: if the trimmed value is empty on submit (Enter or Add click), do nothing — no feedback, no error message (Q1: A, FR1.6).
- **Whitespace-only guard**: `"   ".trim() === ""` — whitespace-only input is treated as empty.
- After a successful add, focus returns to the input field automatically.

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | Input and Add button on same row; input `flex: 1`, button fixed 72px |
| desktop (≥768px) | Same single-row layout within the 600px card |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | Implicit — `<input type="text">` inside `<form>` |
| Keyboard interaction | Enter submits; Tab moves to Add button |
| Label / aria-label | `<label for="task-input">Add a new task</label>` (visually hidden or above input) |
| Contrast ratio | WCAG AA — placeholder text `#9ca3af` on white (#ffffff): 2.85:1 (below AA for normal text; use `aria-placeholder` and real label) |
| Screen reader | Input announced as "Add a new task, edit text"; Add button announced as "Add, button" |
| Focus management | After successful add, focus remains on / returns to the input |

### Usage Example

```html
<form id="task-form" aria-label="Add a new task">
  <label for="task-input" class="sr-only">Add a new task</label>
  <input
    id="task-input"
    type="text"
    placeholder="Add a new task..."
    autocomplete="off"
    aria-label="New task text"
  />
  <button type="submit">Add</button>
</form>
```

---

## TaskList Component

| Field | Value |
|---|---|
| Component | TaskList |
| Description | Ordered list of task items; shows empty state when no tasks exist |
| Category | display |

### States

| State | Description | Trigger |
|---|---|---|
| empty | Empty-state message displayed | no tasks in state |
| populated | One or more task rows rendered | tasks exist |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| tasks | Task[] | yes | — | Array of task objects `{id, text, completed, createdAt}` |
| onToggle | function | yes | — | Called with task `id` to toggle completion |
| onDelete | function | yes | — | Called with task `id` to delete task |

### Interaction Rules

- Tasks are rendered in **creation order, oldest first** (ascending `createdAt`).
- When `tasks.length === 0`, render the empty-state paragraph; the `<ul>` is not rendered.
- When `tasks.length > 0`, render `<ul>` containing one `TaskItem` per task.

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | Full-width rows, no layout change needed |
| desktop (≥768px) | Same full-width rows within the 600px card |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | `<ul>` — semantic unordered list; screen reader announces count |
| Keyboard interaction | Tab moves between task rows; Enter/Space activates checkbox and delete button |
| Label / aria-label | `<ul aria-label="Task list">` |
| Screen reader | List item count announced; each item: "[task text], checkbox, Delete [task text], button" |

---

## TaskItem Component

| Field | Value |
|---|---|
| Component | TaskItem |
| Description | Single task row with checkbox, text, and delete button |
| Category | display |

### States

| State | Description | Trigger |
|---|---|---|
| incomplete | Checkbox unchecked; task text normal weight and colour | default |
| complete | Checkbox checked; task text struck through and 50% opacity | user toggles checkbox |
| delete-hover | Delete button turns red | cursor over delete button |

### Props / Inputs

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| id | string | yes | — | Unique task identifier |
| text | string | yes | — | Task description |
| completed | boolean | yes | false | Completion state |
| onToggle | function | yes | — | Called with `id` on checkbox change |
| onDelete | function | yes | — | Called with `id` on delete click |

### Interaction Rules

- **Toggle**: clicking the checkbox calls `onToggle(id)`, flipping `completed` in state.
- **Delete**: clicking the ✕ button calls `onDelete(id)`; task is immediately removed, no confirmation.
- **Keyboard toggle**: Space bar on focused checkbox toggles completion.
- **Keyboard delete**: Enter or Space on focused delete button removes the task.

### Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| mobile (<768px) | Checkbox and delete button touch targets padded to ≥44×44px |
| desktop (≥768px) | Standard row height 48px; touch-target padding applies regardless |

### Accessibility

| Requirement | Implementation |
|---|---|
| ARIA role | `<li>` contains `<input type="checkbox">` and `<button>` |
| Keyboard interaction | Tab → checkbox (Space to toggle) → Tab → delete button (Enter/Space to delete) |
| Label / aria-label | Checkbox: `aria-label="Mark [task text] as complete"` (or `aria-labelledby` pointing to task text element); Delete button: `aria-label="Delete [task text]"` |
| Contrast ratio | Normal task text `#1a1a1a` on `#ffffff`: 18.1:1 (passes AA); dimmed text `rgba(26,26,26,0.5)` on white: ~4.5:1 (passes AA for large text; borderline for normal — use `opacity: 0.6` minimum) |
| Screen reader | Checkbox announced as "Mark Buy groceries as complete, checkbox, unchecked"; delete as "Delete Buy groceries, button" |
| Focus management | After delete, focus moves to the next task row (or to the input if the list becomes empty) |

### Usage Example

```html
<li class="task-item">
  <input
    type="checkbox"
    id="task-cb-{id}"
    aria-label="Mark {text} as complete"
    checked="{completed}"
  />
  <label for="task-cb-{id}" class="{completed ? 'completed' : ''}">{text}</label>
  <button
    class="delete-btn"
    aria-label="Delete {text}"
  >&#x2715;</button>
</li>
```

---

## State Transitions Summary

| User Action | Before State | After State | Storage Change |
|---|---|---|---|
| Type text + press Enter / click Add | Input filled | Task appended to list; input cleared | Write to localStorage |
| Type nothing + press Enter / click Add | Input empty | No change | None |
| Click checkbox (incomplete task) | Task incomplete | Task complete (strikethrough + dim) | Write to localStorage |
| Click checkbox (complete task) | Task complete | Task incomplete (normal text) | Write to localStorage |
| Click delete button | Task in list | Task removed; empty state if last | Write to localStorage |
| Refresh / reopen browser | — | All saved tasks rendered | Read from localStorage |
| localStorage unavailable | — | In-memory fallback; tasks work this session | None persisted |

---

## Assumptions & Open Questions

- [assumption] Focus-after-delete moves to the next task or the input; exact focus management will be implemented in Code Generation. [stories]
- [assumption] No undo/redo in v1; deletion is permanent within the session. [requirements]
- [assumption] `opacity: 0.6` is used for dimmed completed text (rather than 0.5) to keep WCAG AA contrast. This is a refinement from Q5: B. [Q5: B]
