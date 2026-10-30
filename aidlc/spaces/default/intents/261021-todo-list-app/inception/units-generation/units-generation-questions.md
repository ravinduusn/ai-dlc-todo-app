# Units Generation Questions

> Stage: units-generation | Scope: mvp | Depth: Standard
> Answering the way you chose earlier: I'll edit the file.

---

## Q1. [Architect] Unit granularity

The three components (UILayer, TaskDomain, StorageLayer) could map to units in
different ways. Which grouping fits how you want to build this?

A. Three units — one per component. Each unit is built and tested in
   isolation: storage first, then domain, then UI (or any valid order).
   Maximum separation; easiest to test each layer independently.
B. Two units — StorageLayer as Unit 1 (persistence infrastructure), then
   UILayer + TaskDomain as Unit 2 (the whole interactive app). Fewer build
   cycles; Unit 2 is the working app.
C. One unit — everything in a single build pass. Simplest delivery; the
   whole app is built in one shot. Makes sense given no team parallelism is
   needed.
X. Other (please specify)

[Answer]: C

---

## Q2. [Architect] Deployment model

The app is a single HTML page with no build step. What is the deployment
model for each unit?

A. Standalone files — each unit produces its own `.js` file; `index.html`
   imports them. Units are independent source files included in a single page.
B. Single bundle — all units compile into one file. Not applicable here
   (no build step per C3/C4).
C. Embedded — all code lives in `index.html` (inline `<script>`). No
   separate files.
X. Other (please specify)

[Answer]: A

---

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
