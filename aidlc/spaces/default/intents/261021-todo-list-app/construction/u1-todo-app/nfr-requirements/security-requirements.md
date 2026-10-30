# Security Requirements — u1-todo-app

## Sources

- [functional-spec](../functional-design/functional-spec.md)
- [requirements](../../../inception/requirements-analysis/requirements.md)

---

## Overview

The Todo App is a single-user, browser-only application with no backend, no
authentication, no network calls, and no sensitive data. The attack surface is
minimal. Security requirements focus on safe coding practices and browser
security fundamentals rather than enterprise threat modelling.

---

## Threat Model Summary

| Asset | Threat | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| Task text in localStorage | XSS reads data from same origin | Low (no dynamic script injection) | Low (task text is personal, not sensitive) | No `innerHTML` with user content; use `textContent` |
| Task text in DOM | Stored XSS via task text rendered as HTML | Low (no raw HTML insertion) | Low | Always use `textContent`; never `innerHTML` with user data |
| localStorage key | Another tab from same origin reads tasks | N/A (same-origin, same user, by design) | None | No mitigation needed; this is expected behaviour |
| Input field | Script injection via task text | Low (browser escapes `<script>` in `textContent`) | Low | Use `textContent` for all user-supplied content |

---

## NFR2 — Input Handling and Output Encoding

### NFR2.1: No Raw HTML Rendering of User Input

**Requirement**: Task text entered by the user shall never be inserted into the
DOM via `innerHTML` or `outerHTML`. It shall be inserted exclusively via
`textContent` or equivalent safe DOM APIs.

**Source**: WCAG 2.1 AA accessibility requirements (NFR2.1) and construction
phase guardrail (ALWAYS validate and sanitize all inputs at system boundaries)

**Rationale**: Using `innerHTML` with user-supplied text would allow a
maliciously crafted task name (e.g., `<img src=x onerror=alert(1)>`) to execute
script. `textContent` treats the value as plain text and the browser escapes it
automatically.

**Verification**: Code review in Code Generation — confirm no `innerHTML =
userText` pattern exists in `ui.js`.

---

### NFR2.2: Input Trimming and Validation

**Requirement**: Task text shall be trimmed of leading and trailing whitespace
before processing. Whitespace-only input shall be rejected silently (no task
created).

**Source**: FR1.6; construction phase guardrail (ALWAYS validate and sanitize
all inputs at system boundaries)

**Verification**: Unit test for `addTask("")`, `addTask("   ")` — confirm no
task is created.

---

## NFR3 — Browser Security Context

### NFR3.1: No Inline Event Handlers

**Requirement**: Event listeners shall be attached via `addEventListener` in
JavaScript, not via inline HTML attributes (`onclick`, `onchange`, etc.).

**Source**: NFR2.1 accessibility and security best practice

**Rationale**: Inline handlers bypass Content Security Policy headers if they
are ever added, and they mix concerns. `addEventListener` is the correct
pattern for vanilla JS apps.

**Verification**: Code review — confirm `index.html` contains no `on*=`
attributes; all event wiring is in `ui.js`.

---

### NFR3.2: No Eval or Dynamic Script Execution

**Requirement**: The app shall not use `eval()`, `Function()` constructor,
`setTimeout(string)`, or any other dynamic code execution with user-supplied
content.

**Source**: Construction phase guardrail; browser security best practice

**Verification**: Code review — confirm no `eval`, `new Function`, or
`setTimeout` with a string argument appears in any `.js` file.

---

### NFR3.3: localStorage Key Scoping

**Requirement**: The app shall use the key `"tasks"` for its localStorage entry.
No other application data shall be written to localStorage.

**Source**: FR3.1–FR3.4; StorageLayer design in `components.md`

**Rationale**: Explicit key naming prevents accidental collision if the user
runs another app on the same origin in the future.

**Verification**: Code review — confirm StorageLayer uses only the key
`"tasks"`; no other `setItem` calls exist.

---

## Compliance

No regulatory compliance requirements apply (C2: no user accounts; single user;
no sensitive or personally identifiable information stored beyond task text
chosen by the user themselves).

---

## Assumptions & Open Questions

None. The app stores no credentials, no PII, and no sensitive data. The
threat surface is limited to the browser's same-origin sandbox.
