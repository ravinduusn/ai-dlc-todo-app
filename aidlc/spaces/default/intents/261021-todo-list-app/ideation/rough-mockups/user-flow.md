# User Flow

## Primary Happy Path: Add and Complete a Task

This is the core flow for a returning user who already has tasks stored in localStorage. [Q2: C] [scope-document]

```
[Open app in browser]
        |
        v
[Tasks load from localStorage]
        |
        +---> [No tasks stored] --> [Empty state: "No tasks yet. Add one above."]
        |
        v
[Main view: task list displayed]
        |
        v
[User types task in input field]
        |
        v
[User presses Enter or clicks "Add"]
        |
        v
[Task appended to list]
[localStorage updated]
        |
        v
[User clicks checkbox to mark task complete]
        |
        v
[Task text shows strikethrough]
[localStorage updated]
        |
        v
[User clicks delete button on a task]
        |
        v
[Task removed from list]
[localStorage updated]
        |
        v
[All tasks deleted] --> [Empty state displayed]
```

<!-- Text fallback: Linear flow from top to bottom. User opens app, tasks load from storage (or empty state shown). User adds a task via input, marks it complete via checkbox, then deletes it via delete button. Each action updates localStorage. When all tasks are removed, empty state is displayed again. -->

## First-Time User Flow

A user opening the app for the first time with no stored tasks. [Q2: C]

```
[Open app for the first time]
        |
        v
[localStorage empty → no tasks]
        |
        v
[Empty state displayed: "No tasks yet. Add one above."]
        |
        v
[User types a task and presses Enter]
        |
        v
[Task appears in list]
[Saved to localStorage]
```

<!-- Text fallback: User opens app, sees empty state message, types first task, presses Enter. Task appears in the list and is saved to localStorage. -->

## Error / Edge Case Flows

### Empty Input Submitted

```
[User clicks Add with empty input field]
        |
        v
[No task added]
[Input field shakes or shows inline message: "Please enter a task"]
[Focus remains on input field]
```

<!-- Text fallback: User submits empty form. No task is created. Inline error or visual cue shown. Input retains focus. -->

### Page Refreshed / Reopened

```
[User refreshes browser or reopens tab]
        |
        v
[localStorage read on page load]
        |
        v
[All previously saved tasks re-rendered in list]
```

<!-- Text fallback: On page load, localStorage is read and all saved tasks are rendered. No data is lost on refresh. -->

## Flow Summary Table

| Step | User action | System response | Storage change | Source |
|------|------------|----------------|---------------|--------|
| 1 | Open app | Load tasks from localStorage (or show empty state) | Read | [Q2: C] [intent-backlog IB-2] |
| 2 | Type task + press Enter / click Add | Append task to list | Write | [Q2: C] [intent-backlog IB-1] |
| 3 | Click checkbox | Toggle complete state; strikethrough text | Write | [Q2: C] [intent-backlog IB-1] |
| 4 | Click delete | Remove task from list | Write | [Q2: C] [intent-backlog IB-1] |
| 5 | All tasks deleted | Show empty state | No change | [scope-document] |
| 6 | Submit empty input | Show inline error; do not add task | No change | [scope-document] |

## Assumptions & Open Questions

- [assumption] Inline validation on empty submit (step 6) is considered part of good practice for v1. It is not explicitly scoped but is a minimal-effort improvement. [scope-document]
- [assumption] There is no undo or confirmation step before delete in v1. Deletion is immediate. [scope-document]
