# Discovered Rules

> Rules for a greenfield to-do list web app (MVP scope). The person affirmed
> minimal practices at interview and did not add any custom hard constraints.
> The rules below are guardrail-derived essentials that apply when the project
> has those boundaries (e.g., when integration boundaries or secrets exist).
> Only rules the human explicitly affirms are promoted to `memory/project.md`.

## Mandated

- ALWAYS validate and sanitize all inputs at system boundaries — applies when the project has external input boundaries (construction phase guardrail)
- ALWAYS include error handling at integration boundaries — errors must be surfaced to the caller or logged, never silently swallowed (construction phase guardrail)

## Forbidden

- NEVER hardcode credentials, API keys, or secrets in source code — use environment variables or a secrets manager when the project involves any credentials (construction phase guardrail)
