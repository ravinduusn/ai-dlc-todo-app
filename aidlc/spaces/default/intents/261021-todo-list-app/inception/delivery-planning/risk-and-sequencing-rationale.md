# Risk and Sequencing Rationale

## Sources

- [requirements](../requirements-analysis/requirements.md)
- [stories](../user-stories/stories.md)
- [unit-of-work](../units-generation/unit-of-work.md)
- [team-practices](../practices-discovery/team-practices.md)

---

## Sequencing Heuristic: Value-First (Single Bolt)

With one unit and one Bolt, topological order and economic order are identical — there is nothing to sequence. The intra-Bolt component order (StorageLayer → TaskDomain → UILayer) already reflects dependency: each layer needs the one below it.

The chosen framing is **value-first**: build the complete app in one pass, delivering all user value at once. This is appropriate because:
- The project has one user (the developer-learner) who values the complete working app over partial increments
- The total scope is small enough (5 files, ~6 user stories) to be completed in a single build pass
- There is no team to parallelize across

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Incomplete scope — one or more of the 6 user stories skipped or partially implemented | Medium | High | The Definition of Done in `bolt-plan.md` explicitly lists all 6 stories; the Construction gate requires all criteria met before approval |
| localStorage edge cases — quota exceeded, private browsing, SecurityError | Low | Low | StorageLayer handles all three cases with a transparent in-memory fallback (FR3.3, ADR-004) |
| WCAG 2.1 AA gaps — missing ARIA labels, keyboard trap, contrast failure | Low | Medium | Accessibility checklist in `refined-mockups/accessibility-checklist.md` provides 36 specific checks; 10 must-implement items are flagged |
| Test tooling setup — choosing and configuring a JS test runner takes time | Low | Low | Team practices say "to be determined in later inception stages"; Code Generation will select the runner (likely Vitest); one test per requirement is the ceiling |
| Browser compatibility regressions — app works in Chrome but not Safari/Firefox | Low | Low | NFR3.1 targets modern evergreen browsers only; no IE or legacy support; manual cross-browser check is part of the demo |

## Primary Risk: Scope Completeness (Q2: B)

The developer-learner identified scope completeness as the main concern. Mitigation built into the plan:

1. Every user story maps explicitly to one or more components in `unit-of-work-story-map.md`
2. The Bolt's Definition of Done includes a checkbox for each story
3. `traceability.json` in Units Generation confirms all 6 stories are covered with status `OK`
4. The Construction approval gate will not pass unless all DoD items are checked

## Intra-Bolt Build Order Rationale

| Step | Rationale |
|---|---|
| StorageLayer first | No dependencies; establishes persistence foundation; can be tested in isolation without DOM |
| TaskDomain second | Depends on StorageLayer; pure business logic; testable without DOM |
| UILayer third | Depends on TaskDomain; integrates all layers; produces visible working result |
| HTML + CSS last | Wires the modules together; applies design tokens; completes the integration |
| Tests after each file | Matches team testing posture (test-after, one per requirement, happy-path) |
