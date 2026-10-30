# Refined Mockups Questions

> Stage: refined-mockups | Scope: mvp | Depth: Standard
> Answering the way you chose earlier: I'll edit the file.

---

## Q1. [Designer] Empty-input error feedback

The user-flow from rough mockups shows a shake animation / inline message
("Please enter a task") when the user submits an empty input. The
requirements say no task is added and no error message is shown (FR1.6).
Which behaviour do you want?

A. Silent — no feedback at all (just nothing happens). Keep FR1.6 as written.
B. Visual-only — the input briefly shakes or pulses (CSS animation) with no
   text message.
C. Inline message — a short text appears below the input ("Please enter a
   task.") and disappears when the user starts typing.
X. Other (please specify)

[Answer]: A

---

## Q2. [Designer] Colour palette and visual style

The rough mockups assumed a neutral palette (white background, dark text,
accent colour on the Add button). Do you want to stay with that, or give it
more personality?

A. Neutral / minimal — white background, near-black text, a single accent
   colour (e.g. blue or teal) on the Add button. Clean and plain.
B. Warm — off-white or cream background, warm dark text, a warm accent
   (amber, coral, or terracotta).
C. Dark mode — dark background with light text and a bright accent. App
   renders in dark mode by default.
D. Your choice — describe the palette you have in mind.
X. Other (please specify)

[Answer]: A

---

## Q3. [Designer] Add-button placement on mobile

The rough mockup shows two options for mobile: Add button beside the input
(same row) or below it (stacked). At narrow widths (<768px), which do you
prefer?

A. Beside the input — button and input on the same row, button shrinks if
   needed. Compact, one-row form.
B. Below the input — input spans full width, Add button below it full-width.
   Easier to tap on small screens.
X. Other (please specify)

[Answer]: A

---

## Q4. [Designer] Delete button style

Each task row needs a delete button. What visual style?

A. Icon only — a small trash/×/✕ icon on the right of each row, revealed
   always.
B. Icon only, revealed on hover/focus — the icon appears only when the row
   is hovered or focused (desktop-friendly; always visible on mobile).
C. Text label — a small "Delete" text link on the right.
X. Other (please specify)

[Answer]: A

---

## Q5. [Designer] Completed task visual treatment

FR1.3 says completed tasks show strikethrough text. Any additional styling?

A. Strikethrough only — task text is struck through, checkbox checked, no
   other change.
B. Strikethrough + dimmed text — text is struck through AND slightly faded
   (e.g. 50% opacity) to visually de-emphasise completed items.
C. Strikethrough + dimmed + move to bottom — completed tasks drift to the
   bottom of the list (but remain in place per the requirements; this would
   conflict with FR1.2 ordering). Mention if you want to revisit.
X. Other (please specify)

[Answer]: B

---

## Q6. [Designer] Typography and spacing scale

For a plain HTML/CSS/JS project with no framework, which approach for fonts
and spacing?

A. System font stack — use the browser's default system fonts
   (`system-ui, sans-serif`). Zero extra requests, instant render.
B. Google Font — load one font (e.g. Inter or Roboto) from Google Fonts.
   Adds a small external request.
C. Self-hosted font — bundle a web font with the project files.
X. Other (please specify)

[Answer]: A

---

## Consolidated Summary Confirmation

- Looks correct
- Request changes

[Answer]: Looks correct
