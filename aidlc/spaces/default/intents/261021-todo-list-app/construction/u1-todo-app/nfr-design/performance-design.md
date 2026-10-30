# Performance Design — u1-todo-app

## Sources

- [performance-requirements](../nfr-requirements/performance-requirements.md)
- [tech-stack-decisions](../nfr-requirements/tech-stack-decisions.md)
- [functional-spec](../functional-design/functional-spec.md)

---

## Overview

The Todo App has no server, no network calls, and no database. All performance
optimisation applies to the browser rendering pipeline and the localStorage I/O
path. The design is deliberately minimal: the constraints (no build step, no
framework) rule out most complex caching or async patterns.

---

## NFR4.1 — Initial Load Strategy

**Target**: Time-to-interactive ≤ 1 000 ms (NFR4.1)

**Design**:

1. **Script loading order** — `styles.css` is in `<head>` (render-blocking is
   acceptable; the file is small, < 5 KB). All JS modules (`storage.js`,
   `tasks.js`, `ui.js`) are loaded via `<script type="module">` at the end of
   `<body>`. ES modules are deferred by default, so they do not block the
   initial HTML parse.

2. **No lazy loading needed** — At < 5 files totalling < 20 KB, there is no
   benefit to dynamic `import()` or code splitting. All modules load
   synchronously on first access.

3. **Inline critical styles** — The above-the-fold content (header + input
   form) should be visually complete before the task list is hydrated. Keeping
   `styles.css` in `<head>` ensures the layout renders before the JS runs.

4. **DOMContentLoaded initialisation** — `ui.js` attaches its initialisation
   to `DOMContentLoaded`, not `load`. This fires after HTML is parsed but
   before images or subresources complete, giving the fastest possible
   interactive point.

**Budget breakdown** (local file, no network):
| Phase | Budget |
|---|---|
| HTML parse + CSS parse | < 10 ms |
| JS module load + parse | < 50 ms |
| StorageLayer.load() (localStorage read) | < 10 ms |
| Initial DOM render (≤ 100 tasks) | < 100 ms |
| Total | **< 170 ms** (well within 1 000 ms) |

---

## NFR4.2 — Interaction Latency Strategy

**Target**: Every add/toggle/delete produces a visible DOM update within one
render frame (~16 ms at 60 fps) (NFR4.2)

**Design**:

1. **Synchronous full re-render** — On every mutation, UILayer clears the task
   list's `innerHTML` and rebuilds it from the current array. This is O(n)
   where n ≤ 100. At that scale, a full rebuild takes < 1 ms — far inside the
   16 ms frame budget.

2. **No batching or debouncing needed** — Each user action produces exactly one
   mutation; there are no rapid-fire updates that would require debouncing.

3. **StorageLayer.save() is synchronous** — localStorage writes are
   synchronous in all evergreen browsers. A 15 KB write completes in < 5 ms.
   This is acceptable; if the app grew beyond 100 tasks, async storage (e.g.,
   IndexedDB) would be considered, but it is out of scope here.

4. **Focus management is synchronous** — After deletion, UILayer reads the next
   focusable element before the re-render, then calls `.focus()` after it. This
   happens in the same event loop tick — no `setTimeout(0)` needed.

---

## NFR4.3 — localStorage Budget

**Target**: save/load ≤ 10 ms for ≤ 100 tasks (NFR4.3)

**Design**:

- At 100 tasks × ~150 bytes/task = ~15 KB JSON. `JSON.stringify` and
  `JSON.parse` of 15 KB is < 1 ms in V8/SpiderMonkey/JavaScriptCore.
- `localStorage.setItem` write for 15 KB is typically < 5 ms.
- No serialisation optimisation is needed at this scale.
- If localStorage becomes unavailable mid-session (quota exceeded during use),
  StorageLayer silently switches to in-memory mode — the save call becomes a
  no-op assignment to the in-memory array, with no latency impact.

---

## Assumptions & Open Questions

None. Performance budget is achievable with no special techniques.
