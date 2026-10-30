# RAID Log

## Risks

| ID | Risk | Likelihood | Impact | Status | Mitigation | Source |
|----|------|-----------|--------|--------|------------|--------|
| R-1 | localStorage data cleared by user or browser settings, losing all tasks | Low | Low | Open | Acceptable for learning project; could add export feature in a future version | [Q5: B] [Q6: A] |
| R-2 | Scope creep adds features beyond the flat task list (e.g. categories, due dates) | Medium | Low | Open | Enforce v1 boundary defined in intent-statement; defer extras to future versions | [intent-statement] |
| R-3 | localStorage quota exceeded for very large task lists | Very Low | Very Low | Open | ~5MB quota is far beyond any realistic personal task list size | [Q5: B] |

## Assumptions

| ID | Assumption | Owner | Validation | Source |
|----|-----------|-------|-----------|--------|
| A-1 | Tasks will be persisted in browser localStorage | Developer | Confirmed as the intended approach | [Q5: B] [Q6: A] |
| A-2 | App will be used in a modern browser with Web Storage API support | Developer | Not explicitly confirmed; assumed given the stack choice | [Q3: A] |
| A-3 | No backend will be needed for v1 | Developer | Confirmed by integration and cloud answers | [Q1: A] [Q6: A] |

## Issues

None identified. No blockers exist at this stage. [Q4: A] [Q5: A]

## Dependencies

| ID | Dependency | Type | Status | Source |
|----|-----------|------|--------|--------|
| D-1 | Browser Web Storage API (localStorage) | Runtime | Available in all modern browsers; no installation required | [Q5: B] |

## Assumptions & Open Questions

None.
