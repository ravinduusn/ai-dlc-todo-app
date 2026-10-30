# Team Practices

> Affirmed practices for a greenfield to-do list web app (MVP scope), confirmed
> at interview on 2026-10-21. These reflect the person's actual choices, not
> framework defaults.

## Way of Working

No branching strategy. We commit directly to `main`. This is a personal
learning project with no team coordination needed, so the overhead of feature
branches and merge ceremonies adds no value. Construction worktrees branch
from `main` and merge back to `main` as a single commit per Bolt; no
long-lived branches are used.

## Walking Skeleton

No. We will build each capability in the planned sequence (core CRUD →
persistence → design) without a separate skeleton step. The three-step build
sequence from the scope document already provides a natural progression; a
thin end-to-end slice would add ceremony without learning value at this
project's maturity stage.

## Testing Posture

We use a minimal testing approach for this learning project.

- **Methodology**: custom
- **Methodology evidence**: Person chose minimal testing at interview — one
  test per requirement with a happy-path check, no coverage floor. Lighter
  option for a learning project.
- **Ordering**: Write one test per requirement after implementing each
  capability, focusing on happy-path verification.
- **Coverage**: No coverage floor. The person explicitly chose minimal
  testing with no coverage requirement.
- **Tooling**: To be determined based on the chosen tech stack (likely a
  JS/TS test runner such as Vitest or Jest, selected during later inception
  stages).

## Deployment

No deployment. This is a learning project; we run it locally. No hosting or
deployment pipeline is configured. The MVP scope skips all Operation phase
stages, so no deployment-pipeline or deployment-execution stages will run.

## Code Style

Minimal. No linter or formatter is configured; we keep it simple for a
learning project. Naming conventions follow language-idiomatic style
(camelCase for JS/TS). No project-wide style rules beyond that.
