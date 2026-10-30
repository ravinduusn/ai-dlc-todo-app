# Security Design — u1-todo-app

## Sources

- [security-requirements](../nfr-requirements/security-requirements.md)
- [tech-stack-decisions](../nfr-requirements/tech-stack-decisions.md)
- [functional-spec](../functional-design/functional-spec.md)

---

## Overview

The Todo App has no authentication, no backend, and handles no sensitive data.
The security design focuses on two areas: safe DOM manipulation (preventing
accidental XSS via user-supplied task text) and coding discipline (no dynamic
code execution, correct event wiring).

---

## NFR2 — Input Handling and Output Encoding

### Design: textContent-only DOM writes

**Requirement**: NFR2.1 — no `innerHTML` with user input  
**Requirement**: NFR2.2 — input trimming

**Pattern**: When UILayer renders a `TaskItem`, it sets the task text using
`element.textContent = task.text`. This API treats the value as plain text;
the browser escapes any HTML entities automatically. The pattern applies to
every place task text appears in the DOM:
- The `<label>` or `<span>` displaying the task text
- The `aria-label` attribute on the delete button (`button.setAttribute('aria-label', 'Delete ' + task.text)` — this is an attribute write, not an HTML injection, and is safe)

**What is prohibited** (enforced in Code Generation):
- `element.innerHTML = task.text` or any template literal containing user text
- `document.write(...)` containing user text
- `insertAdjacentHTML(...)` containing user text

**Input trimming location**: `TaskDomain.addTask(text)` trims with
`text.trim()` before the empty-check. The raw untrimmed value is never stored;
the trimmed value is what goes into `task.text` and into the DOM.

---

## NFR3 — Browser Security Context

### Design: addEventListener-only event wiring

**Requirement**: NFR3.1 — no inline event handlers

**Pattern**: All event listeners are attached in `ui.js` via
`element.addEventListener(type, handler)`. The `index.html` file contains no
`on*` attributes. This is structurally enforced: `index.html` contains static
HTML only (no dynamic content); all wiring is in `ui.js`.

```
// Correct pattern (ui.js)
form.addEventListener('submit', handleAddTask);
taskList.addEventListener('click', handleTaskListClick); // event delegation

// Prohibited (index.html)
<button onclick="addTask()">   ← never
```

### Design: No dynamic code execution

**Requirement**: NFR3.2 — no `eval` or dynamic script execution

**Pattern**: The app uses no `eval()`, `new Function()`, `setTimeout(string)`,
or `setInterval(string)`. All functions are statically defined. This is verified
in Code Generation by the absence of these patterns in any `.js` file.

### Design: localStorage key discipline

**Requirement**: NFR3.3 — single key `"tasks"`

**Pattern**: StorageLayer is the only place that reads or writes localStorage.
It uses the single constant key `"tasks"`. There are no other `setItem` calls
anywhere in the codebase.

```js
// StorageLayer (pseudocode)
const STORAGE_KEY = 'tasks';
function save(tasks) { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
function load() { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
```

---

## Event Delegation

UILayer uses event delegation on the task list `<ul>` rather than attaching
individual listeners to each task item. This has a security benefit: the
listener is attached once to a static element (the list container), not to
dynamically created task elements. It eliminates the risk of orphaned listeners
or mis-wired handlers on dynamically inserted nodes.

```
taskList.addEventListener('click', (e) => {
  const checkbox = e.target.closest('input[type="checkbox"]');
  const deleteBtn = e.target.closest('button[data-task-id]');
  if (checkbox) handleToggle(checkbox.dataset.taskId);
  if (deleteBtn) handleDelete(deleteBtn.dataset.taskId);
});
```

Task IDs are passed via `data-task-id` attributes, not interpolated into
handler strings.

---

## Security Controls Summary

| Control | Where Applied | Verification |
|---|---|---|
| `textContent` for user-supplied DOM writes | `ui.js` — TaskItem render | Code review: no `innerHTML = userText` |
| Input trim + empty check | `tasks.js` — `addTask()` | Unit test: `addTask("   ")` creates no task |
| `addEventListener` only | `ui.js` | Code review: no `on*` attributes in `index.html` |
| No `eval` or dynamic execution | All `.js` files | Code review |
| Single `"tasks"` localStorage key | `storage.js` | Code review |
| Event delegation with `data-*` attributes | `ui.js` | Code review |

---

## Assumptions & Open Questions

None. No authentication or network security controls are needed for a
browser-local, single-user, no-backend app.
