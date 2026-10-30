# Quality Gates — Todo List App

## Sources

- [build-and-test-summary](../build-and-test/build-and-test-summary.md)
- [test-results](../build-and-test/test-results.md)

## Overview

One quality gate applies before any commit or merge: all 16 Vitest tests must pass.

## Gate: Tests Must Pass

| Property | Value |
|---|---|
| Gate ID | QG-1 |
| Trigger | Before any commit to main |
| Command | `npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js` |
| Pass condition | Exit code 0, 16/16 tests pass |
| Fail condition | Any test fails or exit code ≠ 0 |
| Blocking | Yes — do not commit if this gate fails |

## Out of Scope

The following gates are not configured for this learning project:

| Gate | Reason |
|---|---|
| Lint | No linter configured (team.md: minimal code style, no linter) |
| Build | No build step — plain ES Modules, no compilation |
| Coverage floor | No coverage floor (team.md: no coverage requirement) |
| Automated deployment | No remote repository or hosting |
| Security scan | No secrets, no backend, no user data transmitted |

## Future Gates (when a remote repo is added)

If this project moves to GitHub or similar:
- The GitHub Actions workflow in `ci-config.md` enforces QG-1 on every push and pull request.
- Additional gates (lint, coverage floor) can be added to that workflow at any time.
