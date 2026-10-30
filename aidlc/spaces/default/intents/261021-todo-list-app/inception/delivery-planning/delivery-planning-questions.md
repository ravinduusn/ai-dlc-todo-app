# Delivery Planning Questions

> Stage: delivery-planning | Scope: mvp | Depth: Standard
> Answering the way you chose earlier: I'll edit the file.

---

## Q1. [Delivery] Bolt sequencing approach

There is one Unit of Work (U1: u1-todo-app). With a single unit, the Bolt
sequence is determined by the intra-unit implementation order agreed in
Units Generation (StorageLayer → TaskDomain → UILayer). Which framing fits
how you want to think about completion?

A. One Bolt — build the whole app end-to-end (all three components) as one
   build pass. Done when the app runs, all stories pass, and tests are green.
B. Three incremental Bolts within the single unit — Bolt 1: StorageLayer +
   TaskDomain (core logic and persistence), Bolt 2: UILayer (rendering and
   events), Bolt 3: styling and accessibility polish. Each Bolt produces a
   working state.
X. Other (please specify)

[Answer]: A

---

## Q2. [Delivery] Risk priority

The main uncertainty in this project is:

A. Technical — plain HTML/CSS/JS with no framework; some browser quirks and
   localStorage edge cases need attention.
B. Scope — making sure all 6 user stories (add, view, complete, delete,
   persist, responsive/a11y) are implemented fully, not just partially.
C. Both equally.
X. Other (please specify)

[Answer]: B

---

## Q3. [Delivery] External dependencies

Are there any external blockers that could hold up the build — access to a
specific browser, a device for mobile testing, a tool you need to install?

A. None — everything needed is available now.
B. One or more — describe below.
X. Other (please specify)

[Answer]: A

---

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
