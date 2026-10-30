# Intent Capture & Framing — Questions

## Sources

- [desc] Initial description: "Build a simple to-do list web app"
- [scope] Workflow-selected scope: `mvp`.

---

## Q1. [Product Owner] What business problem does this to-do list web app solve?

What pain point or gap in daily productivity or task management is this app meant to address?

A. Help individuals track personal tasks and to-dos in one place
B. Help a team collaborate on shared tasks and assignments
C. Replace or supplement an existing tool that is lacking in some way
D. Provide a lightweight task manager for a specific workflow or context (e.g. learning, project work)
E. Not yet defined
X. Other (please specify)

[Answer]: A

---

## Q2. [Product Owner] Who is the primary user of this app?

Who will be using this to-do list app day-to-day?

A. Individual users managing personal tasks (single-user app)
B. Small team or household sharing tasks
C. A specific persona such as students, developers, or knowledge workers
D. Not yet defined — open to the most natural fit
X. Other (please specify)

[Answer]: A

---

## Q3. [Product Owner] What does success look like for this MVP?

What outcomes or metrics would make this first version a success?

A. Users can reliably add, complete, and delete tasks without losing data
B. The app is usable and functional on both desktop and mobile browsers
C. It launches and runs without errors for basic use
D. It demonstrates the core task loop (add → view → complete → delete) end-to-end
E. Not yet defined
X. Other (please specify)

[Answer]: A, D

---

## Q4. [Product Owner] What is the trigger for building this now?

Why is this being built at this point?

A. Learning project — exploring web development or a new tech stack
B. Personal productivity need — no existing tool fits the workflow
C. Portfolio project — demonstrating skills to potential employers or clients
D. Foundation for a larger product to be built on top of
E. Not yet defined
X. Other (please specify)

[Answer]: A

---

## Q5. [Product Owner] Who are the key stakeholders and what do they care about?

Who has a stake in the outcome of this project?

A. Just the developer / builder — personal project with no external stakeholders
B. Developer and a small group of users or testers giving feedback
C. Developer and a product owner or sponsor who cares about outcomes
D. Developer and a hiring audience (portfolio reviewers, interviewers)
E. Not yet defined
X. Other (please specify)

[Answer]: A

---

## Q6. [Product Owner] Who decides scope or priority for this MVP?

Who has final say on what is in or out of this first version?

A. The developer alone
B. The developer with input from early users or testers
C. A product owner or sponsor makes the final call
D. Not yet defined
X. Other (please specify)

[Answer]: A

---

## Q7. [Product Owner] Are there any communication or reporting requirements?

Does anyone need to be kept informed of progress?

A. No — solo project with no reporting cadence
B. Informal updates to a small group (collaborators or stakeholders)
C. Formal reporting to a sponsor or business owner
D. Not applicable
X. Other (please specify)

[Answer]: A

---

## Q8. [Product Owner] What should this first version intentionally leave out?

The scope selected is `mvp`. What features or capabilities should this version NOT include, to stay focused on the core?

A. No user accounts or authentication — tasks are local/session-only or a single shared list
B. No collaboration features — single-user only in v1
C. No categories, labels, or priority levels — just a flat task list
D. No due dates or reminders in v1
E. Something specific — please describe what is out of scope
X. Other (please specify)

[Answer]: A, B, D

## Assumptions & Open Questions

[Answer]: Store tasks locally in the browser (localStorage); keep the tech stack simple and lightweight for learning AI-DLC.



## Consolidated Summary Confirmation

- Business problem: Help individuals track personal tasks and to-dos in one place
- Primary user: Individual users managing personal tasks (single-user app)
- Success: Tasks reliably add/complete/delete without data loss; core loop (add → view → complete → delete) demonstrated end-to-end
- Trigger: Learning project — exploring web development or a new tech stack
- Stakeholders: Just the developer / builder — personal project with no external stakeholders
- Scope decisions: Developer alone decides scope and priority; no reporting cadence
- Out of scope for v1: No user accounts/authentication, no collaboration features, no due dates or reminders
- Assumption: Store tasks locally in the browser (localStorage); keep the tech stack simple and lightweight

Does this all look correct before I generate the artifact?

- Looks correct
- Request changes

[Answer]: Looks correct

## Assumption Confirmation

The following assumptions were carried into the artifacts:

1. Tasks will be stored locally in the browser (e.g. localStorage) to keep the tech stack simple and lightweight for learning. This has not been confirmed as a hard requirement; a backend could be added later.

A. Accept assumptions
B. Convert to follow-up questions

[Answer]: A. Accept assumptions
