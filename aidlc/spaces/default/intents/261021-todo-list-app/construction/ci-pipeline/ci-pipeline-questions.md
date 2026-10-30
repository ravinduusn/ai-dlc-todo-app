# CI Pipeline Questions

AI-DLC writes this file when it needs your answers to configure the CI pipeline.
Fill in your answers after each `[Answer]:` tag and let me know in chat when you're done,
or just tell me in chat and I'll fill them in for you.

## Q1: What CI tool would you like to use?

Options:
- A. GitHub Actions
- B. GitLab CI
- C. CodePipeline + CodeBuild (AWS)
- D. Jenkins
- E. None / skip CI — document the commands only, no pipeline file needed
- X. Other (please specify)

[Answer]: E

## Q2: Where is your repository hosted?

Options:
- A. GitHub
- B. GitLab
- C. Bitbucket
- D. No remote repository yet
- X. Other (please specify)

[Answer]: D

## Q3: What quality gates should block a merge?

Options:
- A. Tests must pass (all 16 Vitest tests green)
- B. Tests must pass + no build errors
- C. Tests must pass + no build errors + lint (if added later)
- D. No blocking gates — just run and report
- X. Other (please specify)

[Answer]: A

## Q4: Should the pipeline run on push to main, pull requests, or both?

Options:
- A. On push to main only
- B. On pull requests only
- C. On both push to main and pull requests
- D. Not applicable — no remote repository / no pipeline file

[Answer]: D

## Consolidated Summary Confirmation

- CI tool: None / skip — document the run commands only, no pipeline file needed
- Repository host: No remote repository yet
- Quality gates: Tests must pass (all 16 Vitest tests green)
- Pipeline trigger: Not applicable — no remote repository / no pipeline file

- Looks correct
- Request changes

[Answer]: Looks correct
