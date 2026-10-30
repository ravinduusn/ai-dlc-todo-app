# CI Configuration — Todo List App

## Sources

- [build-and-test-summary](../build-and-test/build-and-test-summary.md)
- [test-results](../build-and-test/test-results.md)
- [code-summary](../u1-todo-app/code-generation/code-summary.md)

## Overview

No CI pipeline file is configured. This is a local-only learning project with no remote repository. The CI obligations from the Testing Contract (running tests before merge) are met by running the commands below manually before any commit.

## CI Tool

None. All checks run locally.

## Repository

No remote repository is configured. The project runs from local files only.

## Run Commands

These commands constitute the full "CI" for this project. Run them before committing:

### Install dependencies

```bash
npm install
```

### Run all tests

```bash
npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js
```

**Expected result**: 3 test files, 16 tests, all passing, exit code 0.

### Open the app (manual smoke test)

On Windows:
```
start index.html
```

On macOS/Linux:
```
open index.html
```

Verify: add a task, toggle it, delete it, refresh — tasks persist.

## When a Remote Repository Is Added

If this project is later pushed to GitHub, GitLab, or another host, a CI pipeline file can be added at that point. A minimal GitHub Actions workflow for this project would look like:

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npx vitest run --reporter=verbose storage.test.js tasks.test.js ui.test.js
```

No secrets, no deployment steps, and no external services are required.
