# Requirements

## Sources

- Initial description: Build a simple to-do list web app
- [intent-statement](../../ideation/intent-capture/intent-statement.md)
- [scope-document](../../ideation/scope-definition/scope-document.md)
- [team-practices](../practices-discovery/team-practices.md)

## Intent Analysis

The user wants to build a simple to-do list web app for personal use and
learning. The core value is a working end-to-end task loop — add, view,
complete, delete — that persists across browser refreshes using localStorage.
No backend, no accounts, no collaboration. The app runs locally in a modern
browser and serves as a learning vehicle for web development. [Q1: A]
[intent-statement] [scope-document]

## Functional Requirements

### FR1: Task Management

- **FR1.1**: The app shall allow the user to add a new task by typing text
  into an input field and pressing Enter or clicking an Add button. [scope-document]
- **FR1.2**: The app shall display all tasks in a list below the input field,
  ordered by creation time (newest first or oldest first). [scope-document] [Q2: C]
- **FR1.3**: The app shall allow the user to mark a task as complete by
  clicking a checkbox next to the task. Completed tasks display with
  strikethrough text. [scope-document]
- **FR1.4**: The app shall allow the user to toggle a completed task back to
  incomplete by clicking its checkbox again. [scope-document]
- **FR1.5**: The app shall allow the user to delete a task by clicking a
  delete button next to the task. Deletion is immediate with no confirmation
  step. [scope-document]
- **FR1.6**: The app shall not add a task when the input field is empty. No
  error message is shown. [Q4: A]

### FR2: Task Data Model

- **FR2.1**: Each task shall store the following fields: [Q2: C]
  - `id` — a unique identifier (string)
  - `text` — the task description (string, non-empty)
  - `completed` — completion status (boolean, default `false`)
  - `createdAt` — creation timestamp (ISO-8601 string)

### FR3: Persistence

- **FR3.1**: The app shall persist all tasks to localStorage on every add,
  complete, uncomplete, and delete action. [scope-document]
- **FR3.2**: The app shall load all tasks from localStorage on page load and
  render them in the list. [scope-document]
- **FR3.3**: The app shall fall back to in-memory storage if localStorage is
  unavailable (e.g., private browsing mode, quota exceeded). Tasks will work
  during the session but will not persist on refresh. No error message is
  shown to the user. [Q7: A]
- **FR3.4**: There is no explicit limit on the number of tasks. The app
  relies on localStorage's natural storage ceiling (~5MB per origin). [Q6: A]

### FR4: User Interface

- **FR4.1**: The app shall display an empty state message ("No tasks yet. Add
  one above.") when no tasks exist. [scope-document]
- **FR4.2**: The app shall display all tasks completed state (all items
  checked with strikethrough text) with no additional UI controls in v1.
  [scope-document]
- **FR4.3**: The UI shall consist of a single page with a header, task input
  form, and task list. [scope-document]

## Non-Functional Requirements

### NFR1: Responsive Design

- **NFR1.1**: The app shall be usable on both desktop (≥768px) and mobile
  (<768px) screens. The layout adapts to full-width single column on mobile.
  Touch targets shall be at least 44×44px. [Q5: B] [scope-document]

### NFR2: Accessibility

- **NFR2.1**: The app shall meet basic WCAG 2.1 AA requirements: [Q5: C]
  - Keyboard navigation: all interactive elements (input, checkboxes, delete
    buttons) are focusable with Tab and operable with Enter/Space.
  - Screen reader support: semantic HTML elements (`<h1>`, `<ul>`, `<li>`,
    `<form>`, `<button>`), ARIA labels on delete buttons
    (`aria-label="Delete [task name]"`).
  - Heading hierarchy: a single `<h1>` for the page title.
  - Landmark regions: `<header>`, `<main>`.

### NFR3: Browser Compatibility

- **NFR3.1**: The app shall support modern evergreen browsers only (latest
  Chrome, Firefox, Safari, Edge). No IE or legacy browser support required.
  [Q3: A]

### NFR4: Performance

- **NFR4.1**: The app shall load and render within 1 second on a modern
  browser with a typical task list (fewer than 100 items). No specific
  performance target beyond this for a learning project. [scope-document]

## Constraints

- **C1**: No backend or server — the app is browser-only, using localStorage
  for persistence. [intent-statement] [scope-document]
- **C2**: No user accounts or authentication — single-user, local-only.
  [intent-statement] [scope-document]
- **C3**: No build step or framework — plain HTML/CSS/JavaScript. [Q1: A]
- **C4**: No external dependencies or CDNs — the app runs from local files.
  [Q1: A]
- **C5**: No linter or formatter configured — minimal code style. [team-practices]

## Assumptions & Open Questions

- [assumption] Tasks are ordered by creation time. The sort order (newest first
  vs oldest first) is not explicitly confirmed; the wireframes show tasks in
  entry order (oldest first). [scope-document]
- [assumption] Whitespace-only input (spaces only) is treated the same as
  empty input — no task is added. [Q4: A]
- [assumption] The app uses a neutral colour palette (white background, dark
  text, accent for Add button) as assumed in the rough mockups. No specific
  brand guidelines exist. [scope-document]
- [assumption] localStorage is available in the user's browser. If it is not,
  the app silently falls back to in-memory storage without warning. [Q7: A]

## Out of Scope

- Filter tasks (active / completed) — not required for core value; adds UI
  complexity. [scope-document]
- Edit an existing task's text — useful but not essential for v1. [scope-document]
- Clear all completed tasks at once — convenience feature; delete one-by-one
  covers the need. [scope-document]
- Count of remaining tasks — informational enhancement. [scope-document]
- User accounts / authentication — explicitly excluded. [intent-statement]
- Collaboration / multi-user — explicitly excluded. [intent-statement]
- Due dates and reminders — explicitly excluded. [intent-statement]
- Deployment or hosting — the app runs locally. [team-practices]
- Undo or confirmation for delete — deletion is immediate in v1. [scope-document]
