# Practices Discovery Questions

> These questions confirm how your team works across five areas. Since this is
> a new project, each question shows a suggested default from the framework's
> org-level rules — feel free to accept it, change it, or write your own
> answer.

## Q1. [Delivery] Branching and merging strategy

How do you want to handle branches and merges for this project?

- A. Trunk-based development — short-lived branches off `main`, squash-merged back as one commit per piece of work. Keeps history linear and simple. (Recommended for a solo learning project)
- B. GitHub Flow — feature branches with pull requests, merged into `main` after review.
- C. No branching strategy — commit directly to `main`; this is a personal project with no team coordination needed.
- X. Other (please specify)

[Answer]: C

## Q2. [Delivery] Build a thin end-to-end slice first?

Build a thin end-to-end slice first? A walking skeleton is a minimal version that runs the whole way through, built first to prove the pieces connect before the real features go in. For this project, that would mean getting a basic add-task → save-to-localStorage → reload-and-see-it flow working before adding completion toggles, delete, or visual design.

- A. Yes — build the skeleton first (add a task, save to localStorage, reload and see it), then add the rest.
- B. No — build each capability in the planned sequence (core CRUD → persistence → design) without a separate skeleton step.
- C. Let the scope's default decide — the framework will treat the first build unit as the skeleton automatically.
- X. Other (please specify)

[Answer]: B

## Q3. [Quality] Testing methodology

How do you want to write tests for this project?

- A. Test-after — write the code first, then write tests for what you built. (Framework default for MVP)
- B. TDD — write tests first, then implement until they pass.
- C. BDD — write behaviour scenarios (Given/When/Then) that drive both tests and implementation.
- D. Minimal — one test per requirement with a happy-path check; no coverage floor. (Lighter option for a learning project)
- X. Other (please specify)

[Answer]: D

## Q4. [Release] Deployment approach

This is a browser-only app with no backend. How do you want to handle deployment?

- A. Deploy on merge — the built static files go to a hosting target (e.g., GitHub Pages, Netlify) automatically on every merge to `main`. (Framework default)
- B. Manual deploy only — you'll deploy by hand when you're ready; no automated pipeline needed.
- C. No deployment — this is a learning project; just run it locally. No hosting or deployment pipeline.
- X. Other (please specify)

[Answer]: C

## Q5. [Developer] Code style and tooling

Do you want to set up any code style rules for this project?

- A. Defer to defaults — use whatever the tech stack's standard linter/formatter provides (e.g., Prettier for JS/TS). No extra rules. (Framework default)
- B. Minimal — no linter or formatter; keep it simple for a learning project.
- C. Strict — set up linter, formatter, and naming conventions from the start, and enforce in CI.
- X. Other (please specify)

[Answer]: B

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
