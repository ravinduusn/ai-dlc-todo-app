# Tech Stack Decisions — u1-todo-app

## Sources

- [functional-spec](../functional-design/functional-spec.md)
- [requirements](../../../inception/requirements-analysis/requirements.md)

---

## Overview

Technology choices for the Todo App are tightly constrained by the project's
requirements: no build step, no framework, no external dependencies, plain
HTML/CSS/JavaScript only (C3, C4). The decisions here confirm those constraints
and resolve the few remaining open choices (test runner, id generation strategy,
module loading).

---

## Decision 1 — Language and Runtime

| | |
|---|---|
| **Choice** | Vanilla JavaScript (ES2020+), no TypeScript |
| **Rationale** | Constraints C3/C4 exclude any build step; TypeScript requires compilation. ES2020 is supported by all target evergreen browsers (Chrome, Firefox, Safari, Edge latest). No npm, no bundler, no transpiler. |
| **Alternatives rejected** | TypeScript — requires tsc compilation step (violates C3). A framework (React, Vue, Svelte) — requires npm and a build step (violates C3/C4). |

---

## Decision 2 — Module System

| | |
|---|---|
| **Choice** | Native ES modules (`<script type="module">`) |
| **Rationale** | Allows import/export between `storage.js`, `tasks.js`, and `ui.js` without a bundler. Supported natively in all target evergreen browsers. Modules are deferred by default, eliminating the need for a `defer` attribute. |
| **Alternatives rejected** | Script globals (no module boundary; pollutes window namespace). A bundler (Webpack, Vite, Rollup) — violates C3/C4. |

---

## Decision 3 — CSS Approach

| | |
|---|---|
| **Choice** | Plain CSS in a single `styles.css` file with CSS custom properties (variables) for the design system tokens |
| **Rationale** | No build step required. CSS custom properties allow the design tokens from `design-system-mapping.md` (teal #0d9488 accent, system-ui font stack, white background) to be defined once and reused. Flexbox handles the responsive layout without a grid framework. |
| **Alternatives rejected** | CSS preprocessors (Sass, PostCSS) — require a build step (violates C3). Tailwind — requires a build step. |

---

## Decision 4 — Task ID Generation

| | |
|---|---|
| **Choice** | `crypto.randomUUID()` with a `Date.now().toString()` fallback |
| **Rationale** | `crypto.randomUUID()` produces a collision-resistant UUID v4 and is available in all target evergreen browsers (Chrome 92+, Firefox 95+, Safari 15.4+, Edge 92+). The fallback handles the rare case where `crypto.randomUUID` is absent. Uniqueness is sufficient for a single-user, single-device app. |
| **Alternatives rejected** | Sequential integer counter — requires persistence of a counter; resets on localStorage clear. External UUID library — violates C4. |

---

## Decision 5 — Test Runner

| | |
|---|---|
| **Choice** | Vitest (dev-only; not included in the served app) |
| **Rationale** | Team practices deferred test tooling to this stage. Vitest has native ES module support with zero configuration for plain JS, is fast and actively maintained, and does not require TypeScript. It is a development-only dependency installed via `npm install --save-dev vitest` and never imported by the app itself, so the served `index.html` has no external runtime dependency (C4 satisfied at runtime). |
| **Alternatives rejected** | Jest — requires Babel or extra configuration for native ES modules. Mocha+Chai — more setup for the same result. |
| **Setup** | A minimal `package.json` with `"type": "module"`, `"scripts": { "test": "vitest" }`, and `"devDependencies": { "vitest": "^3.0.0" }`. The app's HTML/CSS/JS remain self-contained and loadable without npm. |

---

## Decision 6 — Design Tokens

| | |
|---|---|
| **Choice** | CSS custom properties in `:root` in `styles.css` |
| **Rationale** | Maps the design system tokens into CSS variables referenced throughout the stylesheet. No runtime JavaScript dependency. |
| **Key tokens** | `--color-accent: #0d9488`, `--color-bg: #ffffff`, `--color-text: #1a1a1a`, `--font-family: system-ui, -apple-system, sans-serif`, `--border-radius: 6px` |

---

## Summary

| Category | Choice |
|---|---|
| Language | Vanilla JavaScript (ES2020+) |
| Module system | Native ES modules (type="module") |
| CSS | Plain CSS + custom properties |
| Task ID generation | crypto.randomUUID() with Date.now() fallback |
| Test runner | Vitest (dev-only; not served at runtime) |
| Design tokens | CSS custom properties in styles.css |
| Build step | None |
| External runtime dependencies | None |
