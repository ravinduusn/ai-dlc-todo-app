# Integration Test Instructions — Todo List App

## Sources

- [code-generation-plan](../u1-todo-app/code-generation/code-generation-plan.md)
- [unit-test-instructions](../u1-todo-app/code-generation/unit-test-instructions.md)

## Overview

The app's integration boundary is the interaction between UILayer, TaskDomain, and StorageLayer. All three modules are loaded together in a jsdom environment. The unit tests already exercise each module in isolation; the integration checks below verify the end-to-end flow through the full module chain.

## Framework

The same Vitest + jsdom setup used for unit tests covers integration-level scenarios. No additional tooling is required.

## How to Run

Integration-level behaviour is validated through the existing test suite, which already imports the full module chain via `vi.mock`. To run all tests together:

```bash
npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js
```

## Key Boundary Tests Covered

The following cross-unit interactions are exercised by the existing test suite:

| Interaction | Test File | Scenario |
|---|---|---|
| UILayer → TaskDomain → StorageLayer | `ui.test.js` | Add task via form submit → task persists in storage |
| StorageLayer → TaskDomain on load | `storage.test.js` | `save()` + `load()` round-trip |
| TaskDomain empty-task guard → UILayer | `ui.test.js` | Empty-state renders after last task deleted |
| In-memory fallback (StorageLayer) | `storage.test.js` | localStorage throws → tasks still work |

## Manual Browser Integration Smoke Test

The automated test suite does not exercise a real browser. Run this manual check to validate the complete integrated experience:

1. Open `index.html` in a browser (Chrome, Firefox, Safari, or Edge).
2. Add 3 tasks: verify each appears at the bottom of the list.
3. Mark one complete: verify strikethrough styling.
4. Toggle it back: verify strikethrough removed.
5. Delete a task: verify it disappears; verify focus moves.
6. Refresh the page: verify tasks persist (loaded from localStorage).
7. Open in a private/incognito window: add tasks, verify they work but do not persist after closing.

## Limitations

- No automated E2E browser driver (Playwright, Cypress) is configured. This is consistent with the team's minimal testing stance for a learning project.
- The manual smoke test above covers the integration scenarios that automated jsdom tests cannot reach (real localStorage persistence across page loads, actual browser rendering).
