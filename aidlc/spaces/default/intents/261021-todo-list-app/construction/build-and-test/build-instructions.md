# Build Instructions — Todo List App

## Sources

- [code-generation-plan](../u1-todo-app/code-generation/code-generation-plan.md)
- [code-summary](../u1-todo-app/code-generation/code-summary.md)

## Overview

This is a zero-dependency, browser-only web app written in plain ES Modules. There is no compile or bundle step. The only tooling is Vitest for testing, installed as a dev dependency.

## Prerequisites

- Node.js ≥ 18 (for Vitest and `npx`)
- npm ≥ 9

## Dependency Installation

```bash
npm install
```

This installs `vitest` (and its peer `@vitest/ui` if desired) from `package.json`. No other runtime dependencies exist.

## Environment Setup

No environment variables or config files are required. The app reads from and writes to `localStorage` in the browser. Tests run in a jsdom environment (configured via `vitest.config.js`).

## Build Commands

There is no build step. The app runs directly from source files in any modern browser:

```bash
# Open in default browser (Linux/macOS)
xdg-open index.html   # Linux
open index.html        # macOS
# On Windows: double-click index.html or use:
start index.html
```

## Build Verification

Verify the project structure is intact:

```bash
# All required files should be present
# index.html, styles.css, storage.js, tasks.js, ui.js
# storage.test.js, tasks.test.js, ui.test.js
# package.json, vitest.config.js
```

## Troubleshooting

- **`npx vitest` not found**: Run `npm install` first.
- **Tests fail with "Cannot use import statement"**: Ensure `package.json` has `"type": "module"`.
- **DOM errors in tests**: Ensure `vitest.config.js` has `environment: 'jsdom'`.
- **localStorage not defined in tests**: The jsdom environment provides it; verify `vitest.config.js` is loading correctly.
