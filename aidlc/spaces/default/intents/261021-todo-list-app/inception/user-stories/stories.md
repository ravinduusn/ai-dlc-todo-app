# User Stories

> One story per core action, per the person's choice (Q2: A). Tasks are
> displayed in entry order (oldest first), per Q3: A.

## US1.1: Add a Task

As a solo developer-learner, I want to add a new task by typing text and
pressing Enter or clicking Add, so that I can quickly capture things I need
to do.

**Priority**: Must Have

**Traces to**: FR1.1, FR1.6, FR2.1

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC1.1.1**: Given the task input field is empty, when the user presses Enter
  or clicks Add, then no task is added and no error message is shown.
- **AC1.1.2**: Given the input field contains text, when the user presses
  Enter, then a new task is appended to the bottom of the list with that text,
  `completed` set to `false`, a unique `id`, and a `createdAt` timestamp.
- **AC1.1.3**: Given the input field contains text, when the user clicks the
  Add button, then a new task is appended to the bottom of the list with that
  text, `completed` set to `false`, a unique `id`, and a `createdAt` timestamp.
- **AC1.1.4**: Given a task was just added, when the user checks the list,
  then the input field is cleared and ready for the next entry.

## US2.1: View the Task List

As a solo developer-learner, I want to see all my tasks in a list, so that I
can review what needs to be done at a glance.

**Priority**: Must Have

**Traces to**: FR1.2, FR2.1, FR4.1, FR4.2, FR4.3

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC2.1.1**: Given the app is open with tasks in storage, when the page
  loads, then all tasks are displayed in a list ordered by creation time
  (oldest first).
- **AC2.1.2**: Given no tasks exist, when the list is rendered, then an empty
  state message "No tasks yet. Add one above." is displayed.
- **AC2.1.3**: Given all tasks are marked complete, when the list is rendered,
  then all task items show strikethrough text with no additional UI controls.
- **AC2.1.4**: Given the page is loaded, when the user inspects the structure,
  then the UI consists of a single page with a header (`<h1>`), task input
  form, and task list (`<ul>`).

## US3.1: Mark a Task Complete

As a solo developer-learner, I want to mark tasks as complete and toggle them
back, so that I can track my progress on each item.

**Priority**: Must Have

**Traces to**: FR1.3, FR1.4

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC3.1.1**: Given a task is incomplete, when the user clicks its checkbox,
  then the task's `completed` field is set to `true` and the task text shows
  strikethrough.
- **AC3.1.2**: Given a task is complete, when the user clicks its checkbox
  again, then the task's `completed` field is set to `false` and the
  strikethrough is removed.

## US4.1: Delete a Task

As a solo developer-learner, I want to delete a task, so that I can remove
items I no longer need.

**Priority**: Must Have

**Traces to**: FR1.5

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC4.1.1**: Given a task exists in the list, when the user clicks its
  delete button, then the task is immediately removed from the list with no
  confirmation step.
- **AC4.1.2**: Given the deleted task was the last remaining task, when the
  list updates, then the empty state message is displayed.

## US5: Persist Tasks Across Refresh

As a solo developer-learner, I want my tasks to persist when I refresh or
reopen the browser, so that I don't lose my task list.

**Priority**: Must Have

**Traces to**: FR3.1, FR3.2, FR3.3, FR3.4

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC5.1.1**: Given the user adds, completes, uncompletes, or deletes a
  task, when the action completes, then the full task list is saved to
  localStorage.
- **AC5.1.2**: Given tasks are saved in localStorage, when the page is loaded
  or refreshed, then all saved tasks are loaded and rendered in the list.
- **AC5.1.3**: Given localStorage is unavailable (e.g., private browsing,
  quota exceeded), when the user performs any task action, then the app
  silently falls back to in-memory storage — tasks work during the session
  but are not persisted on refresh, with no error message shown.

## US6: Responsive and Accessible Interface

As a solo developer-learner, I want the app to work on both desktop and
mobile and be keyboard-navigable, so that I can use it comfortably on any
device and with assistive technology.

**Priority**: Must Have

**Traces to**: NFR1.1, NFR2.1, NFR3.1

**INVEST**: Independent · Negotiable · Valuable · Estimable · Small · Testable

### Acceptance Criteria

- **AC6.1.1**: Given the viewport is ≥768px (desktop), when the app renders,
  then the layout uses a centered card with the input and Add button side by
  side.
- **AC6.1.2**: Given the viewport is <768px (mobile), when the app renders,
  then the layout adapts to full-width single column with touch targets at
  least 44×44px.
- **AC6.1.3**: Given the user navigates by keyboard, when the user presses
  Tab, then all interactive elements (input, checkboxes, delete buttons) are
  focusable and operable with Enter/Space.
- **AC6.1.4**: Given a screen reader is active, when the user navigates the
  page, then semantic HTML landmarks (`<header>`, `<main>`) and ARIA labels
  on delete buttons (`aria-label="Delete [task name]"`) are present.

## Story Dependencies

- US1 (Add) has no dependencies — it can be built first.
- US2 (View) depends on US1 — you need tasks to display them.
- US3 (Complete) depends on US2 — you need to see tasks to toggle them.
- US4 (Delete) depends on US2 — you need to see tasks to delete them.
- US5 (Persist) depends on US1 — persistence stores tasks created by US1.
- US6 (Responsive/Accessible) applies across all stories — it is a
  cross-cutting concern layered on top of the functional stories.

## Assumptions & Open Questions

- [assumption] Tasks are displayed in entry order (oldest first), matching the
  wireframes. [Q3: A]
- [assumption] Whitespace-only input is treated as empty — no task is added.
  [requirements.md assumption]
- [assumption] The app uses a neutral colour palette (white background, dark
  text, accent for Add button). [requirements.md assumption]
