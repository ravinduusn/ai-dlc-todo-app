# Wireframes

## Screen 1: Main View (Single Page)

This is the only screen in v1. It contains all task interactions: adding, viewing, completing, and deleting tasks. [Q1: A] [scope-document]

### Desktop Layout (≥ 768px)

```
+--------------------------------------------------+
|          To-Do List                              |  <- <header> / <h1>
+--------------------------------------------------+
|                                                  |
|  +--------------------------------------------+ |
|  | [Add a new task...          ] [ Add ]       | |  <- <form> / <input type="text"> / <button>
|  +--------------------------------------------+ |
|                                                  |
|  +--------------------------------------------+ |
|  | [ ] Buy groceries                   [x]    | |  <- <ul> / <li> / <input type="checkbox"> / <button aria-label="Delete">
|  +--------------------------------------------+ |
|  | [x] Read a book                     [x]    | |  <- completed task (strikethrough text)
|  +--------------------------------------------+ |
|  | [ ] Call the dentist                [x]    | |
|  +--------------------------------------------+ |
|                                                  |
+--------------------------------------------------+
```

<!-- Text fallback: Single-column page. Header at top with app title. Below it, a form with a text input and Add button side by side. Below that, an unordered list of task rows. Each row has a checkbox on the left, task text in the middle (strikethrough when complete), and a delete button on the right. -->

**Accessibility note:** `<h1>` is the page title. Landmark regions: `<header>`, `<main>`, `<footer>` (if added). Primary keyboard entry point: the task input field. Checkbox and delete button are focusable with Tab; Enter/Space activates them. [Q6: C]

### Mobile Layout (< 768px)

Same structure as desktop; layout adapts to full-width single column. Add button sits below or beside the input field depending on available width. Touch targets are at least 44×44px. [Q5: B]

```
+------------------------+
| To-Do List             |  <- <h1>
+------------------------+
| [Add a new task...   ] |
| [       Add          ] |  <- stacked on narrow screens
+------------------------+
| [ ] Buy groceries  [x] |
+------------------------+
| [x] Read a book    [x] |
+------------------------+
| [ ] Call dentist   [x] |
+------------------------+
```

<!-- Text fallback: Narrow single-column layout. Title at top. Input field full-width, Add button below it. Task list below with full-width rows. Each row: checkbox left, text center, delete button right. -->

## States

### Empty State

```
+--------------------------------------------------+
|          To-Do List                              |
+--------------------------------------------------+
|  +--------------------------------------------+ |
|  | [Add a new task...          ] [ Add ]       | |
|  +--------------------------------------------+ |
|                                                  |
|         No tasks yet. Add one above.             |  <- <p> with helpful empty state message
|                                                  |
+--------------------------------------------------+
```

<!-- Text fallback: Same layout as main view but with no task rows. A centred paragraph below the input reads "No tasks yet. Add one above." -->

### All Tasks Completed State

```
+--------------------------------------------------+
|          To-Do List                              |
+--------------------------------------------------+
|  +--------------------------------------------+ |
|  | [Add a new task...          ] [ Add ]       | |
|  +--------------------------------------------+ |
|                                                  |
|  +--------------------------------------------+ |
|  | [x] Buy groceries                   [x]    | |  <- all items strikethrough
|  +--------------------------------------------+ |
|  | [x] Read a book                     [x]    | |
|  +--------------------------------------------+ |
|                                                  |
+--------------------------------------------------+
```

<!-- Text fallback: All tasks in list show checked checkboxes and strikethrough text. No filter or clear button in v1. -->

## Component Summary

| Component | Element | Notes | Source |
|-----------|---------|-------|--------|
| Page title | `<h1>` | Visible heading, landmark anchor | [Q3: A] [Q6: C] |
| Task input | `<input type="text">` | Placeholder text; focusable; Enter submits | [Q2: C] [Q3: A] |
| Add button | `<button>` | Submits the form; keyboard-accessible | [Q2: C] |
| Task list | `<ul>` with `<li>` items | Semantic list; screen reader announces count | [Q2: C] [Q6: C] |
| Complete toggle | `<input type="checkbox">` | Labelled with task text; ARIA label if needed | [Q2: C] [Q6: C] |
| Delete button | `<button aria-label="Delete [task name]">` | Per-task; accessible label includes task name | [Q2: C] [Q6: C] |
| Empty state | `<p>` | Shown when task list is empty | [scope-document] |

## Assumptions & Open Questions

- [assumption] Layout uses a centered card (max-width ~600px) on desktop for readability; adapts to full-width on mobile. No specific colour palette confirmed — a neutral palette (white background, dark text, accent for Add button) is assumed. [Q4: A]
- [assumption] No count of remaining tasks in v1 (deferred per scope-document). [scope-document]
