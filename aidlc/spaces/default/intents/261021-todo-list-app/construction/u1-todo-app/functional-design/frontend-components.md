# Frontend Components — u1-todo-app

## Sources

- [unit-of-work](../../../inception/units-generation/unit-of-work.md)
- [stories](../../../inception/user-stories/stories.md)
- [requirements](../../../inception/requirements-analysis/requirements.md)
- [components](../../../inception/domain-design/components.md)

---

## Overview

The Todo App is a single-page UI with no framework. The component hierarchy
described here maps to plain HTML structure and vanilla JavaScript modules.
There are no reusable component instances or a component framework — the
"components" here are logical UI regions each owned by `ui.js`.

---

## Component Hierarchy

```
App (index.html root)
+-- Header
|   +-- AppTitle (<h1>)
+-- Main
    +-- TaskForm
    |   +-- TaskInput (<input type="text">)
    |   +-- AddButton (<button>)
    +-- TaskList (<ul>)
        +-- EmptyState (conditional <p>)
        +-- TaskItem (<li>) [0..n]
            +-- TaskCheckbox (<input type="checkbox">)
            +-- TaskLabel (<label> or <span>)
            +-- DeleteButton (<button aria-label="Delete [task text]">)
```

<!-- Text fallback: Single-page hierarchy: App root contains Header (with AppTitle h1) and Main. Main contains TaskForm (with TaskInput and AddButton) and TaskList (which contains either EmptyState or zero-or-more TaskItem elements, each with TaskCheckbox, TaskLabel, and DeleteButton). -->

---

## Component Specifications

### App (root)

- **Element**: `<body>` or a top-level `<div id="app">`
- **State**: none (layout container only)
- **Responsibilities**: Mounts `<header>` and `<main>`; no logic

---

### Header

- **Element**: `<header>`
- **State**: none
- **Contents**: Single `<h1>` with the app title (e.g., "My Tasks")
- **Responsibilities**: Provides the `header` landmark region; heading hierarchy anchor

---

### TaskForm

- **Element**: `<form>` (prevents default submit to avoid page reload)
- **State**: controlled by DOM (input value read on submit)
- **Responsibilities**:
  - Captures `submit` event (Enter key or button click)
  - Reads current input value
  - Calls `TaskDomain.addTask(value)`
  - Clears input on success

**Props/Inputs**:
- none (reads DOM directly)

**Events handled**:
- `form submit` → `addTask(inputValue)` → re-render

---

### TaskInput

- **Element**: `<input type="text">`
- **Attributes**: `placeholder="Add a new task…"`, `autocomplete="off"`
- **State**: uncontrolled (DOM-native value)
- **Responsibilities**: Receives text; participates in tab order
- **Accessibility**: Labelled via visible placeholder and/or `<label for="…">`

---

### AddButton

- **Element**: `<button type="submit">`
- **State**: none
- **Responsibilities**: Triggers form submit; within `<form>` so Enter also triggers it
- **Accessibility**: Descriptive text content "Add"; in natural tab order
- **Size**: ≥44×44px touch target (mobile)

---

### TaskList

- **Element**: `<ul>`
- **State**: derived from `TaskDomain.getTasks()` on every render
- **Responsibilities**:
  - If task array is empty → renders `EmptyState`
  - If array is non-empty → renders one `TaskItem` per task in insertion order (oldest first)
- **Re-render strategy**: Full re-render on every mutation (clear `innerHTML`, rebuild from array)

---

### EmptyState

- **Element**: `<p>` or `<li class="empty-state">`
- **State**: none (rendered conditionally by TaskList)
- **Content**: "No tasks yet. Add one above."
- **Visibility**: shown only when task array is empty

---

### TaskItem

- **Element**: `<li>`
- **State**: per-task `{ id, text, completed }`
- **Responsibilities**:
  - Renders checkbox, label/text, delete button
  - Applies completed styling (strikethrough + 60% opacity) when `completed === true`
- **Accessibility**: `<li>` participates in `<ul>` list semantics

**Props**:
| Prop | Type | Description |
|---|---|---|
| `id` | string | Unique task identifier |
| `text` | string | Task description text |
| `completed` | boolean | Whether task is done |

---

### TaskCheckbox

- **Element**: `<input type="checkbox">`
- **State**: `checked` reflects `task.completed`
- **Responsibilities**:
  - Fires `change` event → calls `TaskDomain.toggleTask(id)` → re-render
- **Accessibility**: Associated with task text via `<label>` (wrapping or `for`/`id` pair)
- **Keyboard**: operable with Space

---

### TaskLabel

- **Element**: `<label>` or `<span>` inside `<label>`
- **State**: text content = `task.text`; `text-decoration: line-through` + `opacity: 0.6` when `task.completed`
- **Responsibilities**: Displays task text; clicking it also toggles checkbox (if wrapped in `<label>`)

---

### DeleteButton

- **Element**: `<button type="button">`
- **Attributes**: `aria-label="Delete [task.text]"` (dynamic, set per task)
- **State**: none
- **Responsibilities**:
  - Fires `click` event → calls `TaskDomain.deleteTask(id)` → re-render
  - Focus management: after deletion, moves focus to the next `TaskItem` or to `TaskInput` if list is empty
- **Accessibility**: ARIA label names the specific task being deleted
- **Keyboard**: operable with Enter or Space
- **Size**: ≥44×44px touch target (mobile)

---

## Interaction Flows

### Add task flow

```
User types in TaskInput → presses Enter or clicks AddButton
  → TaskForm.submit event fires
  → read TaskInput.value
  → call TaskDomain.addTask(value)
  → if value empty: no-op, keep focus in input
  → else: task added → TaskList.rerender() → TaskInput.value = ""
```

### Toggle complete flow

```
User clicks TaskCheckbox
  → change event fires
  → call TaskDomain.toggleTask(taskId)
  → task.completed flipped
  → TaskList.rerender()
  → TaskItem styling updated (strikethrough on/off)
```

### Delete task flow

```
User clicks DeleteButton
  → click event fires
  → record next focusable element (next TaskItem or TaskInput)
  → call TaskDomain.deleteTask(taskId)
  → TaskList.rerender()
  → move focus to recorded target
  → if list empty: EmptyState shown, focus to TaskInput
```

### Page load flow

```
DOMContentLoaded fires
  → call TaskDomain.getTasks()  [hydrates from StorageLayer]
  → TaskList.rerender()
  → if tasks: render list; else: render EmptyState
```

---

## Form Validation Rules

| Rule | Trigger | Behaviour |
|---|---|---|
| Empty input | Submit with empty or whitespace-only value | No task created; no error shown; input retains value (or is whitespace) |
| Non-empty input | Submit with at least one non-whitespace character | Task created and appended |

No client-side validation UI (no red borders, no error messages) — empty submit is silently ignored per FR1.6.

---

## Responsive Breakpoints

| Viewport | Layout | Notes |
|---|---|---|
| ≥768px (desktop) | Centered card, `max-width: 640px`; TaskInput and AddButton on same row | |
| <768px (mobile) | Full-width, single-column stack | Touch targets ≥44×44px |

---

## API Integration Points

This unit is self-contained with no network calls. The only "integration" is with the browser's `localStorage` API, handled entirely inside `StorageLayer`.
