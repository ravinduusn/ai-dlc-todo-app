# Domain Design Questions

> Stage: domain-design | Scope: mvp | Depth: Standard
> Answering the way you chose earlier: I'll edit the file.

---

## Q1. [Architect] Component granularity

The app is a plain HTML/CSS/JS browser-only app (no build step, no framework,
per C3/C4). Given that, what is the right level of component granularity?

A. One component — everything in a single JS file (or a small set of files
   with no formal boundaries). Simple, matches the project's "learning" goal.
B. Two components — a UI layer (rendering and event handling) and a Storage
   layer (localStorage read/write). Clear separation of concerns; each part
   can be tested independently.
C. Three components — UI layer, a Task domain layer (business logic: add,
   toggle, delete, validate), and a Storage layer. Each layer has a distinct
   responsibility and change rate.
X. Other (please specify)

[Answer]: C

---

## Q2. [Architect] Task data ownership

The `Task` entity (`id`, `text`, `completed`, `createdAt`) needs a single
owning component. Which component owns it?

A. UI layer — the task array lives in the UI and is passed to storage for
   persistence.
B. Task domain layer — if we have one; the domain layer owns the task array
   and all mutations.
C. Storage layer — the storage layer owns all data and the UI just reads from
   it.
X. Other (please specify)

[Answer]: B

---

## Q3. [Architect] Input validation placement

FR1.6 says empty/whitespace input must not create a task. Where does this
validation rule live?

A. In the UI event handler — the form submit handler checks before calling
   any other logic.
B. In the Task domain layer — validation is the domain layer's responsibility;
   the UI just passes raw input.
C. Duplicated — checked in both UI (for UX) and domain (for correctness).
X. Other (please specify)

[Answer]: B

---

## Q4. [Architect] localStorage error handling

FR3.3 says the app falls back to in-memory storage when localStorage is
unavailable. Where does this logic live?

A. In the Storage layer — the storage layer handles the try/catch and
   transparently provides either localStorage or an in-memory array.
B. In the UI event handlers — each event handler tries localStorage directly
   and falls back.
C. Initialised at app startup — the app detects availability once on load
   and sets a flag; all subsequent storage calls check the flag.
X. Other (please specify)

[Answer]: A

---

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
