# Logical Components — u1-todo-app

## Sources

- [performance-design](./performance-design.md)
- [security-design](./security-design.md)
- [tech-stack-decisions](../nfr-requirements/tech-stack-decisions.md)
- [functional-spec](../functional-design/functional-spec.md)

---

## Overview

This file maps NFR design decisions to the logical component boundaries
established in Domain Design. It shows where each performance and security
pattern applies, what each component's failure domain is, and what shared
resources exist.

---

## Component Inventory

| Component | File | Kind | Failure Domain | Blast Radius |
|---|---|---|---|---|
| StorageLayer | `storage.js` | Persistence | localStorage API (browser-controlled) | Single user, single session |
| TaskDomain | `tasks.js` | Business logic | In-memory JS heap | Single page load |
| UILayer | `ui.js` | Presentation | DOM + event system | Single page view |
| Entry point | `index.html` | Integration | None (static HTML) | Full app |
| Styles | `styles.css` | Presentation | None (static CSS) | Visual layout only |

---

## NFR Pattern Application

### Performance patterns

| Pattern | Component | Notes |
|---|---|---|
| Deferred module loading (type="module") | `index.html` to all JS | Default ES module deferral; no explicit defer needed |
| Synchronous full re-render | UILayer (`ui.js`) | Acceptable at 100 tasks; clears and rebuilds the task list |
| Synchronous localStorage write | StorageLayer (`storage.js`) | Under 5 ms for under 15 KB; no async needed |
| In-memory fallback | StorageLayer (`storage.js`) | Activated at init; transparent to callers |

### Security patterns

| Pattern | Component | Notes |
|---|---|---|
| textContent DOM writes | UILayer (`ui.js`) | All task text rendered as plain text; no innerHTML with user data |
| Input trimming | TaskDomain (`tasks.js`) | text.trim() before empty check |
| Event delegation | UILayer (`ui.js`) | Single listener on the task list; task IDs via data-* attributes |
| addEventListener only | UILayer (`ui.js`) | No inline handlers in index.html |
| Single "tasks" key | StorageLayer (`storage.js`) | Only StorageLayer reads/writes localStorage |
| No eval | All .js files | Static code only |

---

## Failure Domain Analysis

### StorageLayer failure

**Failure**: localStorage throws SecurityError or QuotaExceededError
**Detection**: try/catch in StorageLayer.init()
**Blast radius**: Persistence only. The app continues to function in-memory for the session.
**Recovery**: Automatic — in-memory fallback activates at init; no user action required.

### TaskDomain failure

**Failure**: JavaScript error during addTask/toggleTask/deleteTask
**Detection**: Unhandled exception propagates to UILayer event handler
**Blast radius**: Single user action fails; task list may be inconsistent.
**Recovery**: Page refresh restores the last saved state from localStorage.

### UILayer failure

**Failure**: DOM mutation error
**Detection**: Browser console error; UI does not update
**Blast radius**: Visual update fails; underlying state may be correct.
**Recovery**: Page refresh rebuilds the DOM from current state.

---

## Shared Resources

| Resource | Shared By | Access Pattern | Isolation |
|---|---|---|---|
| localStorage["tasks"] | StorageLayer (read/write) | Synchronous key-value | Same-origin only; no cross-tab coordination needed (single-user) |
| In-memory task array | TaskDomain (authoritative), UILayer (read via getTasks()) | Synchronous in-process | Single JS thread; no concurrency issues |
| DOM task list element | UILayer (write), event handlers (read data-*) | Synchronous | Single JS thread |

---

## Component Isolation Strategy

This app runs in a single browser thread. The isolation strategy is **interface
isolation**: each component exposes a narrow API and has no back-channel access
to another component's internals.

- StorageLayer: exposes only `init()`, `load()`, `save(tasks)`
- TaskDomain: exposes only `addTask(text)`, `toggleTask(id)`, `deleteTask(id)`, `getTasks()`
- UILayer: exposes nothing — it is the entry point, wired via event handlers

A bug in UILayer can only affect the system through TaskDomain's public API.
A bug in TaskDomain can only affect StorageLayer through `load()` and `save()`.
This constrains the blast radius of any single-component defect.
