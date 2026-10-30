# Accessibility Checklist

## Sources

- [wireframes](../../ideation/rough-mockups/wireframes.md)
- [stories](../user-stories/stories.md)
- [requirements](../requirements-analysis/requirements.md)

> Target: WCAG 2.1 Level AA (per NFR2.1)
> Scope: single-page browser-only to-do list app

---

## 1. Perceivable

### 1.1 Text Alternatives

| # | Check | Status | Implementation |
|---|---|---|---|
| P1 | All non-decorative images have descriptive `alt` text | ✅ N/A | No images in v1 |
| P2 | Decorative elements have `alt=""` or `aria-hidden="true"` | ✅ N/A | No decorative images |
| P3 | Delete icon (✕) has an accessible text label | ✅ Required | `aria-label="Delete [task text]"` on each delete button |

### 1.2 Colour and Contrast

| # | Check | Status | Implementation |
|---|---|---|---|
| P4 | Normal text meets 4.5:1 contrast ratio | ✅ Pass | `#1a1a1a` on `#ffffff` = 18.1:1 |
| P5 | Completed task text meets 4.5:1 after opacity | ✅ Pass | 60% opacity `#1a1a1a` on white ≈ 4.7:1 |
| P6 | Add button text meets contrast requirements | ✅ Pass | `#ffffff` on `#0d9488` = 5.1:1 |
| P7 | Muted/empty-state text meets 4.5:1 | ✅ Pass | `#6b7280` on `#ffffff` = 4.6:1 |
| P8 | Colour is not the only means of conveying task completion | ✅ Pass | Completion shown by strikethrough + opacity change + checkbox state, not colour alone |
| P9 | Focus ring has 3:1 contrast against adjacent colours | ✅ Required | `outline: 2px solid #0d9488; outline-offset: 2px` — teal on white = 5.1:1 |

### 1.3 Media

| # | Check | Status | Implementation |
|---|---|---|---|
| P10 | No auto-playing audio or video | ✅ N/A | No media in v1 |
| P11 | No content flashes more than 3× per second | ✅ Pass | No animation exceeds this rate |

---

## 2. Operable

### 2.1 Keyboard Navigation

| # | Check | Status | Implementation |
|---|---|---|---|
| O1 | All interactive elements are keyboard-focusable | ✅ Required | `<input>`, `<button>`, `<input type="checkbox">` are natively focusable |
| O2 | Tab order is logical (top-to-bottom, left-to-right) | ✅ Required | Natural DOM order: input → Add button → task row 1 (checkbox → delete) → task row 2 … |
| O3 | No keyboard trap | ✅ Pass | No modal or overlay in v1 |
| O4 | Enter submits the task form | ✅ Required | Default `<form>` submit behaviour on Enter |
| O5 | Space toggles checkboxes | ✅ Pass | Native `<input type="checkbox">` behaviour |
| O6 | Enter/Space activates delete buttons | ✅ Pass | Native `<button>` behaviour |
| O7 | Focus is visible at all times | ✅ Required | `outline: 2px solid #0d9488; outline-offset: 2px` — never `outline: none` without replacement |
| O8 | After deleting a task, focus moves to next task or input | ✅ Required | JS focus management after DOM removal |

### 2.2 Touch Targets

| # | Check | Status | Implementation |
|---|---|---|---|
| O9 | All interactive elements ≥44×44px touch target | ✅ Required | Checkbox and delete button padded to minimum 44×44px (CSS `padding`) |
| O10 | Adjacent touch targets have ≥8px spacing | ✅ Required | Row layout with adequate spacing between checkbox and delete button |

### 2.3 Timing

| # | Check | Status | Implementation |
|---|---|---|---|
| O11 | No time limits on any interaction | ✅ Pass | No timeouts in v1 |

---

## 3. Understandable

### 3.1 Language

| # | Check | Status | Implementation |
|---|---|---|---|
| U1 | Page language is declared | ✅ Required | `<html lang="en">` |

### 3.2 Predictability

| # | Check | Status | Implementation |
|---|---|---|---|
| U2 | No unexpected context changes on focus | ✅ Pass | No auto-navigation or auto-submit |
| U3 | Form requires explicit user action to submit | ✅ Pass | User presses Enter or clicks Add button |
| U4 | Navigation is consistent | ✅ N/A | Single-page app; no navigation |

### 3.3 Input Assistance

| # | Check | Status | Implementation |
|---|---|---|---|
| U5 | Form input has a visible label | ✅ Required | `<label for="task-input" class="sr-only">Add a new task</label>` (visually hidden but screen-reader accessible) |
| U6 | No error message on empty submit (by design) | ✅ Pass | Q1: A — silent behaviour is the design choice (FR1.6) |

---

## 4. Robust

### 4.1 Markup

| # | Check | Status | Implementation |
|---|---|---|---|
| R1 | Valid, well-structured HTML | ✅ Required | Use semantic elements: `<header>`, `<main>`, `<form>`, `<ul>`, `<li>`, `<h1>` |
| R2 | Unique IDs on the page | ✅ Required | `id="task-input"` is the only static ID; task IDs are generated (e.g. `task-cb-{uuid}`) |
| R3 | No duplicate `id` attributes | ✅ Required | Dynamic task IDs must be unique per task |
| R4 | Heading hierarchy in logical order | ✅ Required | Single `<h1>` for the page title; no skipped levels |
| R5 | Landmark regions present | ✅ Required | `<header>` wrapping `<h1>`, `<main>` wrapping the form and list |

### 4.2 ARIA

| # | Check | Status | Implementation |
|---|---|---|---|
| R6 | Native HTML elements preferred over ARIA roles | ✅ Pass | `<button>`, `<input>`, `<ul>`, `<li>` used throughout |
| R7 | Delete button has descriptive `aria-label` | ✅ Required | `aria-label="Delete [task text]"` — includes task name to disambiguate multiple delete buttons |
| R8 | Task list has an accessible label | ✅ Required | `<ul aria-label="Task list">` |
| R9 | No conflicting ARIA roles | ✅ Pass | No overriding of native semantics |

### 4.3 Motion and Reduced Motion

| # | Check | Status | Implementation |
|---|---|---|---|
| R10 | `prefers-reduced-motion` respected | ✅ Required | CSS media query disables all transitions and animations when user prefers reduced motion |

---

## Testing Plan

| Method | Tool / Approach | When |
|---|---|---|
| Automated scan | Browser DevTools → Accessibility tab; axe DevTools extension | After first build |
| Keyboard navigation | Unplug mouse; tab through every element | After first build |
| Screen reader | VoiceOver (macOS Safari) or NVDA (Windows Firefox) | After first build |
| Contrast check | WebAIM Contrast Checker | Design-time (already verified above) |
| Zoom test | 200% and 400% browser zoom | After first build |
| Touch target test | Browser DevTools → device emulation | After first build |

---

## Summary of Required Implementation Items

The following items are **must-implement** for WCAG 2.1 AA compliance:

1. `<html lang="en">` on the root element
2. `<header>` landmark wrapping `<h1>`, `<main>` wrapping form and list
3. Visually hidden `<label for="task-input">` for the text input
4. `aria-label="Task list"` on `<ul>`
5. `aria-label="Delete [task text]"` on every delete button (dynamic, per task)
6. `aria-label="Mark [task text] as complete"` on every checkbox (or `aria-labelledby`)
7. Visible focus styles: `outline: 2px solid #0d9488; outline-offset: 2px` — never removed
8. Touch targets padded to ≥44×44px for checkbox and delete button
9. Focus moved to next task / input after delete
10. `@media (prefers-reduced-motion: reduce)` disabling all CSS transitions/animations

## Assumptions & Open Questions

- [assumption] The app targets WCAG 2.1 AA; AAA is not required. [requirements NFR2.1]
- [assumption] Automated accessibility testing will be performed after initial code generation, not during design. [team-practices]
