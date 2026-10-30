# CI/CD Pipeline — u1-todo-app

## Sources

- [tech-stack-decisions](../nfr-requirements/tech-stack-decisions.md)
- [logical-components](../nfr-design/logical-components.md)

---

## Overview

There is no CI/CD pipeline and no deployment for this project. team.md states
"No deployment. This is a learning project; we run it locally." The MVP scope
skips all Operation phase stages.

The closest equivalent to a pipeline is the local development workflow:

---

## Local Development Workflow

| Stage | Command | Gate |
|---|---|---|
| Install dev dependencies | `npm install` (first time only) | package.json present |
| Run tests | `npm test` (runs Vitest) | All tests pass |
| Open app | Open `index.html` in browser | Visual smoke test |

No build step, no linting step (team.md: no linter configured), no deployment step.

---

## Rollback

Not applicable — there is no deployment target. To revert a change, use `git checkout` or `git revert` on the local repository.

---

## Secrets Management

Not applicable — no secrets, credentials, or API keys (C1: no backend; C2: no accounts). No environment variables, no secrets manager.

---

## Environment Promotion

Not applicable — single environment (local developer machine). No dev/staging/prod progression.
