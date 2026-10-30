# Evidence

## Run Type

Lead-only run. Collaborators are off for MVP scope (no support agent
contributions). The pipeline-deploy lead drafted all artifacts, conducted the
interview, and integrated the confirmed answers. No contribution files from
aidlc-quality-agent, aidlc-developer-agent, or aidlc-devsecops-agent were
produced.

## Sources Inspected

### org.md (framework defaults)
- **File**: `aidlc/spaces/default/memory/org.md`
- **Sections read**: Way of Working, Walking Skeleton, Testing Posture, Deployment, Code Style
- **Used as**: suggested defaults for a greenfield project with no affirmed team practices; every section was overridden by the person's interview answers

### aidlc-state.md (project context)
- **File**: `aidlc/spaces/default/intents/261021-todo-list-app/aidlc-state.md`
- **Key fields**: Project Type = Greenfield, Scope = mvp, Depth = Standard, Test Strategy = Standard
- **Construction Checkpoints**: enabled, unit-major iteration, serial execution
- **Guard Policy**: off (from scope mvp)
- **Sensors**: on
- **Learnings**: off
- **Summary Confirmation**: on
- **Plan Approval**: on
- **Collaborators**: off (from scope mvp)

### scope-document.md (scope decisions)
- **File**: `aidlc/spaces/default/intents/261021-todo-list-app/ideation/scope-definition/scope-document.md`
- **Key details**: single-user, browser-only task manager; localStorage persistence; no backend, no accounts, no external integrations; three-step build sequence (CRUD → persistence → visual design)

### scope-grid.json (compiled scope configuration)
- **File**: `.kiro/tools/data/scope-grid.json`
- **Key detail**: MVP scope stage set — Operation phase entirely skipped (no deployment-pipeline, environment-provisioning, deployment-execution, observability, or incident-response stages)

### practices-discovery-questions.md (interview)
- **File**: `aidlc/spaces/default/intents/261021-todo-list-app/inception/practices-discovery/practices-discovery-questions.md`
- **Status**: All five questions answered and confirmed by the person

## Interview Decisions

### Q1. Branching strategy — Answer: C
**Decision**: No branching strategy; commit directly to `main`.
**Rationale**: Personal learning project with no team coordination needed.
**Effect on team-practices.md**: Way of Working section states direct commits to `main`; no feature branches or merge ceremonies.

### Q2. Walking skeleton — Answer: B
**Decision**: No; build each capability in the planned sequence without a separate skeleton step.
**Rationale**: The three-step build sequence (CRUD → persistence → design) already provides a natural progression; a walking skeleton would add ceremony without value at this project's stage.
**Effect on team-practices.md**: Walking Skeleton section states "No" with the planned-sequence approach.

### Q3. Testing methodology — Answer: D
**Decision**: Minimal — one test per requirement with a happy-path check; no coverage floor.
**Rationale**: Lighter option for a learning project; full coverage requirements would add overhead without learning value.
**Effect on team-practices.md**: Testing Posture section uses `custom` methodology with explicit evidence and ordering; no coverage floor; tooling deferred to later stages.

### Q4. Deployment — Answer: C
**Decision**: No deployment; run locally. No hosting or deployment pipeline.
**Rationale**: Learning project; no need for hosting or automated deployment.
**Effect on team-practices.md**: Deployment section states "No deployment" and notes the MVP scope skips all Operation phase stages.

### Q5. Code style — Answer: B
**Decision**: Minimal — no linter or formatter; keep it simple.
**Rationale**: A linter/formatter adds setup overhead without learning value at this stage.
**Effect on team-practices.md**: Code Style section states "Minimal" with language-idiomatic naming only (camelCase for JS/TS).

## Discovered Rules Assessment

The person chose minimal practices across all five areas and did not add any
custom hard constraints during the interview. The rules in
`discovered-rules.md` are guardrail-derived essentials from the Construction
phase guardrails, kept because they apply when the project has those
boundaries (external inputs, integration boundaries, credentials). They are
scoped with qualifying language noting when they apply, since this is a
browser-only localStorage app with no backend and no external integrations —
some of these boundaries may not exist yet.

## Greenfield Assumptions

1. **No prior team practices exist.** The `team.md` and `project.md` memory files are empty templates (all sections contain only HTML-comment placeholders). All practice suggestions in the draft were drawn from org.md defaults and overridden by the person's interview answers.

2. **No reverse-engineering artifacts.** This is a greenfield project; the reverse-engineering stage is skipped. No code structure, technology stack, dependency inventory, or architecture artifacts exist to inform practices.

3. **No collaborators run.** The MVP scope sets `Collaborators: off`, so this is a lead-only run. No support agent contribution files (quality, developer, devsecops) were produced in Step 3.

4. **Tech stack unknown.** The workspace detection found no languages, frameworks, or build system. The tech stack will be determined in later inception stages. Code style and test tooling suggestions are therefore generic (likely JS/TS given "web app" and "localStorage" in the scope document).

5. **Operation phase skipped.** The MVP scope skips all Operation phase stages. The Deployment section in team-practices.md is drafted for completeness (it matches a memory/team.md heading) but has no corresponding pipeline stages to execute.

6. **Guard Policy off.** The MVP scope sets Guard Policy to off. This affects how review and approval gates behave during Construction but does not change the practices themselves.
