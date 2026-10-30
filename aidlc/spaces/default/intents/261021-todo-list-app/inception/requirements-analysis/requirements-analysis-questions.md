# Requirements Analysis Questions

> These questions fill gaps in the requirements for a simple to-do list web app.
> The scope document already covers the core capabilities (add, view, complete,
> delete, localStorage persistence, basic visual design). These questions focus
> on details needed to write testable requirements.

## Q1. [Product] Technology stack

What tech stack do you want to use for this to-do list web app?

- A. Plain HTML/CSS/JavaScript — no framework or build step. Simplest option for a learning project.
- B. TypeScript with a bundler (e.g., Vite) — type safety with minimal setup.
- C. React (or similar framework) — component-based architecture, more to learn.
- X. Other (please specify)

[Answer]: A

## Q2. [Product] Task data model

What information should each task store? The scope document defines add/complete/delete but doesn't specify the task structure.

- A. Just text and completion status (done/not done) — minimal, matches the scope.
- B. Text, completion status, and a creation timestamp — useful for sorting without adding UI complexity.
- C. Text, completion status, creation timestamp, and a unique ID — needed for stable rendering and delete operations.
- X. Other (please specify)

[Answer]: C

## Q3. [Product] Browser support

Which browsers should the app support?

- A. Modern evergreen browsers only (latest Chrome, Firefox, Safari, Edge) — no IE or legacy support needed.
- B. Any browser that supports localStorage and ES6+ — broadest practical support.
- X. Other (please specify)

[Answer]: A

## Q4. [Product] Input validation behaviour

What should happen when a user tries to add an empty task (blank input)?

- A. Do nothing — no task is added, no error message. Simplest behaviour.
- B. Show an inline error message (e.g., "Please enter a task") and keep focus on the input field.
- C. Disable the Add button when the input is empty — prevents the attempt rather than reacting to it.
- X. Other (please specify)

[Answer]: A

## Q5. [Quality] Non-functional requirements

Are there any specific non-functional requirements beyond "works in a modern browser"? The scope document mentions basic visual design and localStorage persistence but no explicit NFRs.

- A. None beyond what's in scope — the app should just work reliably for a single user. No performance, scalability, or security targets needed for a learning project.
- B. Responsive design — the app should be usable on both desktop and mobile screens (the rough mockups already show a mobile layout).
- C. Accessibility — the app should meet basic WCAG 2.1 AA (keyboard navigation, screen reader support, ARIA labels) as sketched in the wireframes.
- X. Other (please specify)

[Answer]: B, C

## Q6. [Product] Task limit and storage

Should there be a limit on the number of tasks a user can add? localStorage has a ~5MB limit per origin.

- A. No explicit limit — rely on localStorage's natural ceiling. A learning project won't hit it.
- B. Set a reasonable soft limit (e.g., 1000 tasks) and show a message if the user exceeds it.
- X. Other (please specify)

[Answer]: A

## Q7. [Product] Data loss and error handling

What should happen if localStorage is unavailable (e.g., private browsing mode, storage quota exceeded)?

- A. Silently fall back to in-memory storage — tasks work during the session but won't persist on refresh. No error message.
- B. Show a warning message to the user that tasks won't persist, but let them use the app anyway.
- X. Other (please specify)

[Answer]: A

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
