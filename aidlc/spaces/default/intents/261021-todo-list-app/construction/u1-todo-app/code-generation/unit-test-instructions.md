# Unit Test Instructions — u1-todo-app

## Test Framework

**Runner**: Vitest (dev-only; not served at runtime)  
**Environment**: jsdom (needed for localStorage and DOM APIs in tests)  
**Strategy**: Custom — 1 test per requirement, happy-path verification, test-after each capability

---

## Setup

```
npm install
```

This installs Vitest as a dev dependency. The app itself has no runtime npm dependencies.

---

## How to Run This Unit's Tests

Run all three test files together (unit-scoped — do not use bare `npm test` which may catch unrelated files):

```
npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js
```

Or run a single file while developing:

```
npx vitest run --reporter=verbose storage.test.js
npx vitest run --reporter=verbose tasks.test.js
npx vitest run --reporter=verbose ui.test.js
```

Watch mode during development:

```
npx vitest --reporter=verbose storage.test.js tasks.test.js ui.test.js
```

---

## Test Configuration

`vitest.config.js` at the project root:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
});
```

The jsdom environment provides `localStorage`, `document`, and `window` in tests without a real browser.

---

## Expected Test Coverage

| File | Tests | Requirements Covered |
|---|---|---|
| `storage.test.js` | 3 | FR3.1, FR3.2, FR3.3 (AC5.1.1–AC5.1.3) |
| `tasks.test.js` | 7 | FR1.1, FR1.6, FR1.3, FR1.4, FR1.5, FR1.2 (AC1.1.1–AC1.1.2, AC3.1.1–AC3.1.2, AC4.1.1, AC2.1.1) |
| `ui.test.js` | 6 | FR4.1, FR1.2, NFR2.1, FR1.5 empty-state, AC1.1.4, AC6.1.4 |
| **Total** | **~16** | All functional requirements |

No coverage floor is required (team.md: no coverage floor for this learning project). Run the tests and confirm they all pass.

---

## Mocking / Stubbing Guidance

**localStorage mocking** — Use Vitest's `beforeEach`/`afterEach` with `localStorage.clear()` between tests. Vitest's jsdom environment provides a real (in-memory) `localStorage` implementation. To test the fallback path, mock `localStorage.setItem` to throw a `SecurityError`:

```js
vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
  throw new DOMException('SecurityError');
});
```

**DOM testing** — Create minimal HTML fixtures in `beforeEach` using `document.body.innerHTML = '...'`. UILayer reads from and writes to the DOM, so set up the required elements before each test.

**Module isolation** — Import modules directly in test files using ES module syntax. Use `vi.mock()` to replace the storage module when testing TaskDomain in isolation:

```js
import { vi } from 'vitest';
// Mock storage dependency
const mockStorage = { load: vi.fn(() => []), save: vi.fn() };
```

---

## Test Data Management

No external fixtures or database seeds required. Tests create all their own data inline. Each test starts with a fresh state via `beforeEach(() => localStorage.clear())`.

---

## Notes

- Tests are written after each implementation step (test-after ordering, per team.md)
- Each test verifies the happy path for one requirement — no need to test every edge case exhaustively
- The integration smoke test (Step 9 of the plan) is manual: open `index.html` in a browser
