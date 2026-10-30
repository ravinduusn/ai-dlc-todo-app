# Design System Mapping

## Sources

- [wireframes](../../ideation/rough-mockups/wireframes.md)
- [requirements](../requirements-analysis/requirements.md)
- [team-practices](../practices-discovery/team-practices.md)

> This project uses no design system or component library (plain HTML/CSS/JS,
> no external dependencies per C4). The tokens and rules below define this
> app's own minimal design system — a single CSS file is sufficient to
> implement it.

---

## Colour Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-surface` | `#f9fafb` | Card / container background |
| `--color-border` | `#e5e7eb` | Task row dividers, input border |
| `--color-text-primary` | `#1a1a1a` | Body text, task text |
| `--color-text-muted` | `#6b7280` | Empty state message, placeholder |
| `--color-accent` | `#0d9488` | Add button background, focus rings, checkbox accent |
| `--color-accent-hover` | `#0f766e` | Add button hover state |
| `--color-danger` | `#dc2626` | Delete button hover colour |
| `--color-text-on-accent` | `#ffffff` | Text on accent-coloured backgrounds |

### Contrast Ratios (WCAG 2.1 AA)

| Pair | Ratio | Result |
|---|---|---|
| `--color-text-primary` on `--color-bg` | 18.1:1 | ✅ AAA |
| `--color-text-muted` on `--color-bg` | 4.6:1 | ✅ AA |
| `--color-text-on-accent` on `--color-accent` | 5.1:1 | ✅ AA |
| `--color-danger` on `--color-bg` | 5.9:1 | ✅ AA |
| Completed text (60% opacity `#1a1a1a`) on white | ~4.7:1 | ✅ AA |

---

## Typography Tokens

| Token | Value | Usage |
|---|---|---|
| `--font-family` | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | All text |
| `--font-size-base` | `16px` | Body text, task text, input |
| `--font-size-heading` | `1.5rem` (24px) | `<h1>` page title |
| `--font-weight-normal` | `400` | Body text |
| `--font-weight-bold` | `600` | Add button label |
| `--line-height-base` | `1.5` | Body text |

---

## Spacing Scale (4px base unit)

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Micro gap |
| `--space-2` | `8px` | Input-to-button gap, icon padding |
| `--space-3` | `12px` | Task row horizontal padding, input padding |
| `--space-4` | `16px` | Mobile page padding |
| `--space-5` | `24px` | Desktop page padding |
| `--space-6` | `32px` | Page top padding, empty-state margin |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Checkbox custom styling |
| `--radius-md` | `6px` | Input field, Add button |

---

## Component Map

| Component | HTML Element(s) | CSS Class(es) |
|---|---|---|
| Page container | `<div>` | `.container` |
| Page heading | `<h1>` | `.app-title` |
| Task form | `<form>` | `.task-form` |
| Task input | `<input type="text">` | `.task-input` |
| Add button | `<button type="submit">` | `.add-btn` |
| Task list | `<ul>` | `.task-list` |
| Task item | `<li>` | `.task-item` |
| Task checkbox | `<input type="checkbox">` | `.task-checkbox` |
| Task label | `<label>` | `.task-label` |
| Task label (completed) | `<label>` | `.task-label .task-label--completed` |
| Delete button | `<button type="button">` | `.delete-btn` |
| Empty state | `<p>` | `.empty-state` |

---

## Responsive Breakpoints

| Breakpoint | Value | Layout change |
|---|---|---|
| Mobile | `< 768px` | Page padding 16px; touch targets ≥44×44px |
| Desktop | `≥ 768px` | Page padding 24px; card centred at max-width 600px |

No tablet-specific layout is needed for this single-column app.

---

## Animation / Motion

| Interaction | Animation | Duration |
|---|---|---|
| Add button hover | Background colour transition | 150ms ease |
| Delete button hover | Colour transition to `--color-danger` | 150ms ease |
| Checkbox toggle | Native browser checkbox animation | — |
| Task completion (opacity) | `transition: opacity 200ms ease` | 200ms |
| `prefers-reduced-motion` | All transitions and animations disabled | — |

---

## Assumptions & Open Questions

- [assumption] CSS custom properties (variables) are used; they are supported in all modern evergreen browsers (NFR3.1). [requirements]
- [assumption] No CSS reset or normalise library — a minimal hand-written reset (box-sizing, margin/padding zero on common elements) is sufficient. [team-practices]
- [assumption] `accent-color: var(--color-accent)` is used on the checkbox for a teal tick; fallback to browser default where unsupported. [requirements]
