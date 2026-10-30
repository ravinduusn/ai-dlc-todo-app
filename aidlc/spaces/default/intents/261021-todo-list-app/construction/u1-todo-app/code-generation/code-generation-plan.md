# Code Generation Plan — u1-todo-app

## Summary
- Builds: A complete browser-only to-do list app — `storage.js`, `tasks.js`, `ui.js`, `index.html`, `styles.css`, and their Vitest test suite
- Touches: `storage.js`, `tasks.js`, `ui.js`, `index.html`, `styles.css`, `storage.test.js`, `tasks.test.js`, `ui.test.js`, `package.json`, `vitest.config.js`
- Tests: ~14 requirement-driven happy-path tests (1 per requirement across StorageLayer, TaskDomain, UILayer), using Vitest

---

## Testing Contract

```json
{
  "version": 1,
  "methodology": "custom",
  "source": "team",
  "ordering": "Write one test per requirement after implementing each capability, focusing on happy-path verification.",
  "scope": "mvp",
  "test_strategy": "standard",
  "project_type": "greenfield",
  "applicable_notes": [
    {
      "layer": "org",
      "text": "We treat tests as a first-class deliverable in every Bolt. The specific\nmethodology (TDD, BDD, ATDD, or classic test-after) is affirmed at\npractices-discovery and recorded in `team.md` under this heading with explicit\n`Methodology` and `Ordering` fields; Code Generation resolves those fields\nindependently from coverage, tooling, and scope notes.\n\nWhen no posture has been affirmed, our default per scope is:\n- **Methodology**: test-after\n- **Ordering**: implement each applicable testable layer, then write and run\n  that layer's tests.\n- `mvp`, `enterprise`, `feature`, `infra`, `classic` add an 80% line-coverage\n  floor and CI execution before merge.\n- `bugfix`, `security-patch` add a targeted regression for the specific\n  bug/vulnerability and require the existing suite to remain green.\n- `express` uses the Minimal strategy: requirement-driven unit tests (one per\n  requirement, with a happy-path floor per component); existing tests remain\n  green.\n- `poc`, `refactor`, `workshop` add no extra new-test floor and require the\n  existing suite to remain green.\n\nThe active `Test Strategy` still applies in every scope and determines test\nvolume/types. Scope floors are additive; they never reduce or replace the\nselected strategy.\n\nBuild and Test verifies defined coverage floors and affirmed quality targets;\nthey may not be weakened to make a step pass.\n\nAffirm a stricter posture in `team.md` if the team commits to one."
    },
    {
      "layer": "team",
      "text": "We use a minimal testing approach for this learning project.\n\n- **Methodology**: custom\n- **Methodology evidence**: Person chose minimal testing at interview — one\n  test per requirement with a happy-path check, no coverage floor. Lighter\n  option for a learning project.\n- **Ordering**: Write one test per requirement after implementing each\n  capability, focusing on happy-path verification.\n- **Coverage**: No coverage floor. The person explicitly chose minimal\n  testing with no coverage requirement.\n- **Tooling**: To be determined based on the chosen tech stack (likely a\n  JS/TS test runner such as Vitest or Jest, selected during later inception\n  stages)."
    }
  ],
  "obligations": {
    "strategy": "standard",
    "strategy_volume": [
      "Five to eight tests per component.",
      "Unit tests plus integration tests for key boundaries.",
      "Add E2E, performance, or security tests when requirements demand them."
    ],
    "scope_floor": [
      "Meet an 80% line-coverage floor.",
      "Run the selected tests in CI before merge."
    ],
    "combination_rule": "Apply every selected-strategy obligation and every scope-floor obligation; neither replaces the other, and a targeted scope regression may add the narrowest necessary test type beyond the strategy default."
  },
  "plan_profile": {
    "methodology": "custom",
    "runner_step": "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
    "runner_ready_before_first_test": true,
    "testable_layers": [
      "Data model / database behavior",
      "Repository / data access",
      "Business logic",
      "API / endpoint",
      "Frontend behavior"
    ],
    "steps": [
      "Project structure and production configuration skeleton.",
      "Bootstrap the minimal test runner/configuration and record the exact unit-scoped command.",
      "Custom ordering - Write one test per requirement after implementing each capability, focusing on happy-path verification.",
      "Implementation and tests - preserve that exact ordering; do not convert it to layer-local TDD.",
      "Environment/build configuration.",
      "Documentation and traceability."
    ]
  },
  "input_sha256": "sha256:6cb49b672df1e721063f420db460eddd048e358c5ead88a4e92047514a1262a8",
  "contract_sha256": "sha256:ae3f28c8fda693db46ceae47d4c67141c8f697fc386fbd8bacfeb0f8a035c73a"
}
```

---

## Plan Steps

### Step 1 — Project structure skeleton
- [x] Create workspace root directory structure: `index.html`, `styles.css`, `storage.js`, `tasks.js`, `ui.js`
- [x] Create `package.json` with `"type": "module"`, `"scripts": { "test": "vitest run --reporter=verbose" }`, and `"devDependencies": { "vitest": "^3.0.0" }`
- **Stories**: all (project scaffold is a prerequisite for all)

### Step 2 — Bootstrap test runner
- [x] Run `npm install` to install Vitest
- [x] Create `vitest.config.js` with `export default { test: { environment: 'jsdom' } }` (jsdom needed for localStorage and DOM tests)
- [x] Verify the test command runs: `npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js`
- **Stories**: prerequisite for all test steps

### Step 3 — Implement `storage.js` (StorageLayer) — US5
- [x] Implement `StorageLayer` class with:
  - `constructor()`: detects localStorage availability via try/catch test write; sets `this.inMemory` flag and `this.memoryStore = []`
  - `load()`: returns parsed `localStorage["tasks"]` or `this.memoryStore` if in-memory mode
  - `save(tasks)`: serialises and writes to `localStorage["tasks"]`, or assigns to `this.memoryStore`
- [x] Export as default: `export default new StorageLayer()`
- [x] Use `crypto.randomUUID()` fallback `Date.now().toString()` for any ID needs (none in StorageLayer itself)
- **Stories**: US5 (FR3.1–FR3.4, AC5.1.1–AC5.1.3)

### Step 4 — Write `storage.test.js` — US5 tests
- [x] Test: `load()` returns empty array when localStorage is empty (AC5.1.2)
- [x] Test: `save(tasks)` then `load()` returns same tasks (AC5.1.1)
- [x] Test: in-memory fallback — mock localStorage to throw SecurityError; `save()` and `load()` still work (AC5.1.3)
- [x] Run: `npx vitest run --reporter=verbose storage.test.js`
- **Stories**: US5

### Step 5 — Implement `tasks.js` (TaskDomain) — US1.1, US3.1, US4.1
- [x] Implement `TaskDomain` class with:
  - `constructor(storage)`: initialises `this.tasks = storage.load()`
  - `addTask(text)`: trims text; returns early if empty; creates `{ id, text: trimmed, completed: false, createdAt: ISO-8601 }` using `crypto.randomUUID()` or `Date.now().toString()`; appends to `this.tasks`; calls `this.storage.save(this.tasks)`
  - `toggleTask(id)`: finds task by id; flips `completed`; saves
  - `deleteTask(id)`: removes task by id from array; saves
  - `getTasks()`: returns `[...this.tasks]` (insertion order)
- [x] Export as default: `export default new TaskDomain(storage)`
- **Stories**: US1.1 (FR1.1, FR1.6, FR2.1), US3.1 (FR1.3, FR1.4), US4.1 (FR1.5)

### Step 6 — Write `tasks.test.js` — US1.1, US3.1, US4.1 tests
- [x] Test: `addTask("Buy milk")` adds a task with correct fields and `completed: false` (AC1.1.2)
- [x] Test: `addTask("")` adds no task (AC1.1.1)
- [x] Test: `addTask("   ")` adds no task — whitespace-only input (AC1.1.1)
- [x] Test: `toggleTask(id)` sets `completed = true` on an incomplete task (AC3.1.1)
- [x] Test: `toggleTask(id)` sets `completed = false` on a complete task (AC3.1.2)
- [x] Test: `deleteTask(id)` removes the task from the list (AC4.1.1)
- [x] Test: `getTasks()` returns tasks in insertion order — oldest first (AC2.1.1)
- [x] Run: `npx vitest run --reporter=verbose tasks.test.js`
- **Stories**: US1.1, US3.1, US4.1

### Step 7 — Implement `ui.js` (UILayer) — US2.1, US4.1 focus, US6
- [x] Implement UILayer initialisation on `DOMContentLoaded`:
  - Get DOM references: `form`, `input` (task text field), `taskList` (`<ul>`)
  - Call `taskDomain.getTasks()` and render the full list
- [x] Implement `renderTaskList(tasks)`:
  - If empty: show empty-state message "No tasks yet. Add one above."
  - Else: clear `taskList.innerHTML = ''`; for each task append `<li>` with checkbox (`input[type=checkbox]`, `checked` if completed), label (task text via `textContent`), delete button (`aria-label="Delete " + task.text`); apply strikethrough + opacity-60 style when completed
  - Use `data-task-id` attribute on checkbox and delete button for event delegation
- [x] Implement form `submit` event handler: read and trim `input.value`; call `taskDomain.addTask(text)`; clear input; re-render
- [x] Implement event delegation on `taskList` for `click`:
  - Checkbox: call `taskDomain.toggleTask(id)`; re-render
  - Delete button: record next focusable element; call `taskDomain.deleteTask(id)`; re-render; move focus
- [x] Implement `styles.css`:
  - CSS custom properties in `:root`: `--color-accent: #0d9488`, `--color-bg: #ffffff`, `--color-text: #1a1a1a`, `--font-family: system-ui, -apple-system, sans-serif`, `--border-radius: 6px`
  - Desktop layout (≥768px): centered card `max-width: 640px`; form row with input and button side by side
  - Mobile layout (<768px): full-width single column; touch targets ≥44px
  - Completed task: `text-decoration: line-through; opacity: 0.6`
- [x] Implement `index.html`:
  - `<head>`: `<link rel="stylesheet" href="styles.css">`, `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`
  - `<header>`: `<h1>My Tasks</h1>`
  - `<main>`: `<form>` with `<input type="text" placeholder="Add a new task…">` and `<button type="submit">Add</button>`; `<ul id="task-list"></ul>`
  - `<script type="module" src="ui.js">` at end of `<body>`
  - No `on*` event attributes
  - Landmark regions: `<header>`, `<main>`
- **Stories**: US2.1 (FR1.2, FR4.1–FR4.3, AC2.1.1–AC2.1.4), US4.1 focus (AC4.1.2), US6 (NFR1.1, NFR2.1, NFR3.1, AC6.1.1–AC6.1.4)

### Step 8 — Write `ui.test.js` — US2.1, US6 tests
- [x] Test: task list renders empty-state message when tasks array is empty (AC2.1.2)
- [x] Test: task list renders all tasks in insertion order (AC2.1.1)
- [x] Test: completed task has strikethrough styling applied (AC2.1.3)
- [x] Test: empty-state shown after last task is deleted (AC4.1.2)
- [x] Test: `aria-label` on delete button equals "Delete " + task text (AC6.1.4)
- [x] Test: input is cleared after adding a task (AC1.1.4)
- [x] Run: `npx vitest run --reporter=verbose ui.test.js`
- **Stories**: US2.1, US4.1, US6

### Step 9 — Integration smoke test and traceability
- [x] Open `index.html` in a browser: add tasks, toggle, delete, refresh — verify persistence
- [x] Open in private mode: verify in-memory fallback (tasks work but don't persist on refresh)
- [x] Run full test suite: `npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js`
- [x] Write `code-summary.md` and `traceability.json`
- **Stories**: all

---

## Story-to-Step Traceability

| Story | Acceptance Criteria | Plan Steps |
|---|---|---|
| US1.1 Add a Task | AC1.1.1–AC1.1.4 | Steps 5, 6, 7, 8 |
| US2.1 View Task List | AC2.1.1–AC2.1.4 | Steps 7, 8 |
| US3.1 Mark Complete | AC3.1.1–AC3.1.2 | Steps 5, 6, 7 |
| US4.1 Delete a Task | AC4.1.1–AC4.1.2 | Steps 5, 6, 7, 8 |
| US5 Persist Tasks | AC5.1.1–AC5.1.3 | Steps 3, 4 |
| US6 Responsive/Accessible | AC6.1.1–AC6.1.4 | Steps 7, 8 |
