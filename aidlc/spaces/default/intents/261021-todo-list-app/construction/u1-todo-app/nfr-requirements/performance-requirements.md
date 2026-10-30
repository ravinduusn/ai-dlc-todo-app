# Performance Requirements — u1-todo-app

## Sources

- [functional-spec](../functional-design/functional-spec.md)
- [requirements](../../../inception/requirements-analysis/requirements.md)

---

## Overview

This unit is a browser-only single-page application. There is no server, no
network round-trip for data, and no backend processing. All performance
characteristics are governed by the browser's rendering engine, the JavaScript
execution environment, and the localStorage API.

---

## NFR4 — Rendering Performance

### NFR4.1: Initial Page Load

**Requirement**: The app shall load and render within 1 second on a modern
browser with a typical task list (fewer than 100 items).

**Source**: NFR4.1 in `requirements.md`

**Target**: Time-to-interactive ≤ 1 000 ms on a modern evergreen browser
(Chrome, Firefox, Safari, Edge) with a task list of 0–100 items, measured from
navigation start to the point where all tasks are visible and interactive.

**Conditions**:
- File delivery from local filesystem (no network latency)
- No build step, no bundler, no minification required
- Baseline hardware: any modern desktop or laptop (post-2018)

**Implementation guidance**:
- `index.html` loads `styles.css` in `<head>` (blocks render, but file is small)
- `storage.js`, `tasks.js`, `ui.js` loaded via `<script type="module">` or deferred `<script>` tags at end of `<body>`
- `DOMContentLoaded` handler initialises the app; no lazy-load or dynamic import needed at this scale

**Verification**: Open `index.html` with DevTools Performance tab; record from
reload; confirm Time-to-Interactive < 1 000 ms with 50 pre-seeded tasks in
localStorage.

---

### NFR4.2: Interaction Responsiveness

**Requirement**: Every user action (add, toggle, delete) shall produce a visible
result within one animation frame (~16 ms at 60 fps).

**Source**: derived from NFR4.1 and functional-spec.md interaction workflows

**Target**: Interaction latency ≤ 16 ms from event fire to DOM update (one
render frame).

**Conditions**: Task list of 0–100 items; synchronous full re-render strategy
(clear and rebuild `<ul>` innerHTML on every mutation).

**Implementation guidance**:
- Full re-render on every mutation is acceptable at ≤100 tasks; no virtual DOM or diff required
- All TaskDomain operations are O(n) over the task array; n ≤ 100 makes this negligible
- StorageLayer.save() is synchronous; localStorage write latency is typically <5 ms for arrays of this size

**Verification**: Add/toggle/delete a task with DevTools Performance tab; confirm
each action completes within a single frame.

---

### NFR4.3: localStorage Read/Write Budget

**Requirement**: localStorage operations shall not introduce perceptible delay.

**Source**: FR3.1–FR3.4 (persistence on every mutation)

**Target**: StorageLayer.save() and StorageLayer.load() complete in ≤ 10 ms
for a task array of up to 100 items.

**Conditions**: Each Task object is ~100–150 bytes serialised; 100 tasks ≈ 15 KB
JSON — well within localStorage's typical write performance budget.

**Verification**: Instrument StorageLayer with `performance.now()` in development;
confirm save/load durations are < 10 ms.

---

## Assumptions & Open Questions

None. All performance targets are drawn directly from NFR4.1 and the
browser-local execution model. No server-side performance targets apply.
