# 🎨 Refined Mockups

## Sources

- [wireframes](../../ideation/rough-mockups/wireframes.md)
- [user-flow](../../ideation/rough-mockups/user-flow.md)
- [stories](../user-stories/stories.md)
- [requirements](../requirements-analysis/requirements.md)
- [team-practices](../practices-discovery/team-practices.md)

## Design Decisions (from Q&A)

| Decision | Choice | Rationale |
|---|---|---|
| Empty-input feedback | Silent (no feedback) | FR1.6 explicitly says no error message; keeps implementation minimal |
| Colour palette | Neutral/minimal | White background, near-black text (#1a1a1a), teal accent (#0d9488) |
| Mobile Add-button | Beside input (same row) | Compact form; consistent layout across breakpoints |
| Delete button | ✕ icon, always visible | Maximum discoverability; no hover-dependency for mobile users |
| Completed task | Strikethrough + 50% opacity dimming | Visually de-emphasises done items without removing them |
| Typography | System font stack (`system-ui, sans-serif`) | Zero external requests; instant render; matches OS reading font |

---

## Screen 1: Main View — Populated (Desktop ≥768px)

```
+----------------------------------------------------------+
|  To-Do List                                              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+  |
|  | [Add a new task...                  ] [  Add  ]   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  | [ ] Buy groceries                            [ x ] |  |
|  +----------------------------------------------------+  |
|  | [x] ~~Read a book~~                          [ x ] |  |  <- strikethrough + dimmed
|  +----------------------------------------------------+  |
|  | [ ] Call the dentist                         [ x ] |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

<!-- Text fallback: Single-page layout. Header "To-Do List" (h1) at top. Below: a form with a text input on the left and an "Add" button on the right, both on the same row. Below the form: an unordered list of task rows. Each row has a checkbox on the left, task text in the middle (strikethrough + dimmed for completed tasks), and a ✕ delete icon button on the right. -->

### Layout Specification

| Element | CSS rule / value |
|---|---|
| Page max-width | 600px, centred with `margin: 0 auto` |
| Page padding | 24px horizontal, 32px top |
| Background | `#ffffff` |
| Body text | `#1a1a1a` |
| Accent (Add button, focus ring) | `#0d9488` (teal) |
| Font | `system-ui, -apple-system, sans-serif` |
| Base font size | 16px |
| Line height | 1.5 |

### Form Row

| Element | Specification |
|---|---|
| Input | `flex: 1`, height 44px, border `1px solid #d1d5db`, border-radius 6px, padding `0 12px`, font-size 16px |
| Add button | width 80px, height 44px, background `#0d9488`, text `#ffffff`, border-radius 6px, font-weight 600 |
| Gap between input and button | 8px |
| Add button hover | background `#0f766e` |
| Add button focus | `outline: 2px solid #0d9488; outline-offset: 2px` |

### Task Row

| Element | Specification |
|---|---|
| Row padding | `12px 0` |
| Row border | `1px solid #e5e7eb` bottom border |
| Checkbox | `<input type="checkbox">`, 20×20px, accent-color `#0d9488` |
| Task text | `flex: 1`, margin-left 12px, font-size 16px |
| Completed text | `text-decoration: line-through; opacity: 0.5` |
| Delete button | 32×32px, background transparent, border none, color `#6b7280`, cursor pointer |
| Delete button content | ✕ (×) character or inline SVG trash icon |
| Delete button hover | color `#dc2626` (red) |
| Delete button aria-label | `aria-label="Delete [task text]"` |

---

## Screen 2: Main View — Empty State

```
+----------------------------------------------------------+
|  To-Do List                                              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+  |
|  | [Add a new task...                  ] [  Add  ]   |  |
|  +----------------------------------------------------+  |
|                                                          |
|       No tasks yet. Add one above.                       |
|                                                          |
+----------------------------------------------------------+
```

<!-- Text fallback: Same header and form as the populated view. Below the form, centred paragraph reads "No tasks yet. Add one above." No task list is shown. -->

### Empty State Specification

| Element | Specification |
|---|---|
| Message element | `<p>` with class `empty-state` |
| Text | "No tasks yet. Add one above." |
| Colour | `#6b7280` (muted grey) |
| Text alignment | `text-align: center` |
| Margin top | 32px |
| Font size | 16px |

---

## Screen 3: All Tasks Completed State

```
+----------------------------------------------------------+
|  To-Do List                                              |
+----------------------------------------------------------+
|                                                          |
|  +----------------------------------------------------+  |
|  | [Add a new task...                  ] [  Add  ]   |  |
|  +----------------------------------------------------+  |
|                                                          |
|  +----------------------------------------------------+  |
|  | [x] ~~Buy groceries~~                        [ x ] |  |  <- strikethrough + dimmed
|  +----------------------------------------------------+  |
|  | [x] ~~Read a book~~                          [ x ] |  |
|  +----------------------------------------------------+  |
|                                                          |
+----------------------------------------------------------+
```

<!-- Text fallback: All task rows show checked checkboxes and strikethrough + dimmed text. No additional UI controls in v1. -->

---

## Screen 4: Mobile Layout (<768px)

```
+--------------------------------+
|  To-Do List                    |
+--------------------------------+
| [Add a new task...   ] [ Add ] |  <- same row, input shrinks, button fixed width
+--------------------------------+
| [ ] Buy groceries        [ x ] |
+--------------------------------+
| [x] ~~Read a book~~      [ x ] |
+--------------------------------+
| [ ] Call the dentist     [ x ] |
+--------------------------------+
```

<!-- Text fallback: Narrow single-column layout. Title h1 at top. Input and Add button on the same row; input takes remaining space, button is fixed 72px wide. Task rows are full-width, same structure as desktop. All touch targets (checkbox, delete button) are ≥44×44px. -->

### Mobile Adaptations

| Element | Mobile rule |
|---|---|
| Page padding | 16px horizontal |
| Input | Shrinks to fill remaining row space |
| Add button | Fixed 72px wide, 44px tall |
| Checkbox touch target | Minimum 44×44px click area (use padding) |
| Delete button touch target | Minimum 44×44px click area |

---

## Assumptions & Open Questions

- [assumption] Accent colour `#0d9488` (Tailwind teal-600 equivalent) was chosen for good contrast and a clean neutral aesthetic. [Q2: A]
- [assumption] The ✕ delete icon is a plain Unicode × character or simple inline SVG; no icon library is needed. [Q4: A]
- [assumption] Empty-input submit produces no visual feedback — the input simply clears any attempted action silently. [Q1: A]
- [assumption] No confirmation dialog before delete. Deletion is immediate, per FR1.5 and team practices.
