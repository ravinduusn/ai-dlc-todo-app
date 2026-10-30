# Architecture Decision Records

## Sources

- [requirements](../requirements-analysis/requirements.md)
- [stories](../user-stories/stories.md)
- [team-practices](../practices-discovery/team-practices.md)

---

## ADR-001: Three-Component Decomposition (UILayer / TaskDomain / StorageLayer)

**Status:** Accepted
**Date:** 2026-10-21

### Context

The app is a browser-only, plain HTML/CSS/JS to-do list (no build step, no
framework, per C3/C4). The requirements include business rules (empty-input
guard, insertion-order sort), a persistence strategy with a fallback (FR3.3),
and a testable separation between concerns. With only one user and no backend,
the deployment topology is trivially a single HTML page. The design question is
how to decompose the JavaScript into components with clear boundaries and
independent change rates.

Two approaches are viable:
- Two components (UI + Storage)
- Three components (UI + Domain + Storage)

A single-component design (all logic in one file) was also considered.

### Decision

We will use **three components**: UILayer, TaskDomain, and StorageLayer.
- **UILayer** owns all DOM interaction and rendering.
- **TaskDomain** owns the task array, all business rules, and delegates persistence.
- **StorageLayer** owns the persistence strategy and abstracts the localStorage / in-memory fallback.

### Consequences

**Positive:**
- Each component has a single, nameable responsibility and a distinct change rate.
- Validation and business rules in TaskDomain can be unit-tested without a DOM or localStorage.
- The localStorage fallback is encapsulated in StorageLayer; neither UILayer nor TaskDomain need to know about it.
- The component map is a direct guide for Code Generation (three JS modules).

**Negative:**
- Slightly more code than a single-file approach for a project this small.
- UILayer must call TaskDomain for every mutation rather than mutating a local array directly.

**Neutral:**
- For a learning project, the added structure has educational value (separation of concerns, testability).

### Alternatives Rejected

**Alternative A: Two components (UI + Storage)**
- UILayer would own both event handling AND all business logic (validation, id generation, sort order).
- Rejected because validation and state mutation coupled to DOM code is harder to test and reason about independently.

**Alternative B: Single component (everything together)**
- Simplest possible approach; all logic in one or two files with no formal boundaries.
- Rejected because it makes the business rules inseparable from rendering code, which is the primary learning anti-pattern this project wants to avoid.

---

## ADR-002: Task Entity Owned by TaskDomain

**Status:** Accepted
**Date:** 2026-10-21

### Context

The `Task` entity (`id`, `text`, `completed`, `createdAt`) is the only domain
entity in the app. It needs a single owning component. Three options exist:
UILayer (it is displayed there), TaskDomain (it is mutated there), or
StorageLayer (it is persisted there).

### Decision

**TaskDomain** owns the Task entity. The in-memory task array lives in
TaskDomain, and all mutations (add, toggle, delete) go through TaskDomain methods.

### Consequences

**Positive:**
- The entity's lifecycle (creation, mutation, deletion) is managed in one place.
- TaskDomain enforces invariants (non-empty text, unique id) at the boundary where entities are created.
- UILayer receives Task objects from TaskDomain but never mutates them directly.

**Negative:**
- UILayer cannot shortcut to the task array; every read goes through `getTasks()`.

**Neutral:**
- StorageLayer serialises and deserialises plain Task-shaped objects (JSON) but does not own the Task type definition.

### Alternatives Rejected

**Alternative: StorageLayer owns Task**
- Would couple the entity definition to the persistence layer; business rules would need to live in StorageLayer or leak into UILayer.
- Rejected: persistence is an infrastructure concern; the domain entity definition belongs in the domain layer.

---

## ADR-003: Validation in TaskDomain, Not UILayer

**Status:** Accepted
**Date:** 2026-10-21

### Context

FR1.6 requires that empty or whitespace-only input does not create a task.
The validation could live in the UILayer form submit handler or in
TaskDomain's `addTask` method.

### Decision

**Validation lives in TaskDomain.** The UILayer passes raw input text to
`TaskDomain.addTask(text)`; TaskDomain trims and checks for emptiness and
silently returns without creating a task if the input is invalid.

### Consequences

**Positive:**
- Business rules are co-located with the entity they protect.
- `addTask` can be unit-tested with empty input without needing a DOM.
- If the UI is ever replaced or extended, the validation rule is not duplicated.

**Negative:**
- The UILayer gets no explicit return signal from `addTask` on empty input (the
  gate is silent per FR1.6 / Q1:A from refined-mockups). This is acceptable
  because the design decision is "no feedback".

**Neutral:**
- UILayer could additionally check for empty input to avoid a pointless function call, but this is an optimisation detail for Code Generation, not a domain design decision.

### Alternatives Rejected

**Alternative: Validation in UILayer**
- Ties the business rule to DOM event handling code.
- Rejected: if a programmatic path to `addTask` ever exists (tests, automation), the rule would be bypassed.

---

## ADR-004: StorageLayer Manages localStorage Fallback Transparently

**Status:** Accepted
**Date:** 2026-10-21

### Context

FR3.3 requires the app to fall back to in-memory storage when localStorage is
unavailable (private browsing, quota exceeded, SecurityError). The fallback
logic could live in each UILayer event handler, at app startup as a flag, or
inside StorageLayer.

### Decision

**StorageLayer manages the fallback transparently.** On initialisation,
StorageLayer attempts a test write to localStorage inside a try/catch. If it
fails, StorageLayer switches to an in-memory array for the session. All callers
(TaskDomain) use the same `load()` / `save()` interface regardless of which
backend is active.

### Consequences

**Positive:**
- The fallback is an infrastructure concern; keeping it in StorageLayer means
  neither TaskDomain nor UILayer need to know it exists.
- The detection happens once (not on every read/write), which is efficient.
- StorageLayer can be replaced or mocked in tests without changing callers.

**Negative:**
- If localStorage becomes unavailable mid-session (quota exceeded after initial
  check), StorageLayer would still try to use it and silently fail or need an
  additional try/catch on every save. This is an acceptable risk for v1.

**Neutral:**
- The in-memory fallback means tasks are lost on refresh when localStorage is
  unavailable — this is the documented behaviour (FR3.3).

### Alternatives Rejected

**Alternative: Detect at startup, set a flag read by UILayer handlers**
- Scatters the fallback concern across UILayer event handlers.
- Rejected: each handler would need to branch on the flag, duplicating the routing logic.

**Alternative: Each event handler tries localStorage directly**
- Same duplication problem, plus it makes the try/catch visible in every handler.
- Rejected: more code, harder to test, higher chance of inconsistency between handlers.
