---
name: modern-ui-design
description: >
  Design guidelines for building modern, clean web UIs — especially developer-facing tools,
  dashboards, documentation sites, package registries, and data-heavy interfaces.
  Use this skill whenever the user asks you to build or redesign a frontend component, page layout,
  or interface. Trigger even for vague requests like "make it look nicer", "modernize the UI",
  "clean up the design", or "make this feel more like Linear / GitHub / Vercel". Also trigger for
  any task that produces HTML, CSS, React, or similar frontend output where design quality matters.
---

# Modern UI Design Guidelines

This skill captures design principles distilled from studying the visual evolution of modern
developer-facing interfaces (package registries, dashboards, docs sites, SaaS tools). Apply all
rules by default. Override only when the user explicitly requests otherwise.

For component-specific patterns, read the relevant section in `references/components.md`.
For color and typography tokens, read `references/tokens.md`.

---

## Core Philosophy

1. **Neutral by default, color by exception.** White or light-gray base surfaces everywhere.
   Color is reserved for semantic signals (status, state, severity) — not decoration or brand.
2. **Information architecture before aesthetics.** Structure the content hierarchy first; visual
   polish follows. A well-organized page with minimal styling beats a heavily styled mess.
3. **Reduce, then reduce again.** If a UI element doesn't communicate new information, remove it.
   Decorative borders, background fills, and gradient headers are almost always noise.
4. **Match the user's mental model.** Developer tooling should feel like tools the user already
   knows (GitHub, npm, VS Code). Familiarity reduces cognitive load.

---

## 1. Information Architecture

### Use tabs or sections to layer content density
- Don't dump everything onto one scrollable page.
- Group content by user intent: overview → details → advanced.
- Show summary info on the first screen; let users drill in on demand.
- Good tab labels are **nouns**, not verbs: "Overview", "Dependencies", "Testing" — not "View overview".

### Keep the primary action above the fold
- The thing the user is most likely to do (install a package, copy a command, create a resource)
  should be visible without scrolling.
- One primary action per page/screen. Secondary actions go in menus or lower sections.

### Establish clear visual hierarchy with three levels
1. **Page title** — largest, most prominent element, identifies what this page is about.
2. **Section labels / badges** — medium weight, secondary color, communicate state or category.
3. **Body / metadata** — small, muted, supporting detail.

Never use more than three distinct font sizes per screen.

---

## 2. Color

### Rules
- **One neutral base** (white `#ffffff` or near-white `#f9fafb`/`#f5f5f4`) for all content surfaces.
- **One accent color** maximum for interactive elements (links, focus rings, primary buttons).
  Default to blue (`#2563eb` or similar). Never use green, purple, or brand colors for interactivity
  unless the design system explicitly calls for it.
- **Color encodes meaning, not sequence.** Don't rainbow-assign colors to items in a list.
  Use color only when it signals state: green = success/passing, amber = warning/degraded,
  red = error/failing, blue = informational, gray = neutral/unknown.
- **Large areas must be neutral.** Never use a brand color as a full-width header background.
  If a header is needed, use white or a very light gray (`#f8fafc`). A colored top bar is a
  2010s pattern.

### Status color palette (semantic only)
| State      | Background         | Text / Border      |
|------------|--------------------|--------------------|
| Success    | `#f0fdf4` (green-50) | `#15803d` (green-700) |
| Warning    | `#fffbeb` (amber-50) | `#b45309` (amber-700) |
| Error      | `#fef2f2` (red-50)   | `#b91c1c` (red-700)   |
| Info       | `#eff6ff` (blue-50)  | `#1d4ed8` (blue-700)  |
| Neutral    | `#f9fafb` (gray-50)  | `#374151` (gray-700)  |

Always pair background + text from the same semantic color family. Never put gray text on a
colored background.

---

## 3. Typography

### Scale
Use a maximum of **three font sizes** per view:

| Role        | Size  | Weight | Color            |
|-------------|-------|--------|------------------|
| Page title  | 22–24px | 500–600 | Primary text     |
| Section / label | 13–15px | 500 | Primary text |
| Body / meta | 12–14px | 400 | Secondary (muted) text |

- Never use font-weight 700+ in UI (reserved for marketing copy, not interfaces).
- Never use font-size below 12px — illegible at normal viewing distance and on Retina displays.
- Use `font-weight: 500` for emphasis, not bold. It reads as confident without being heavy.

### Text hierarchy in practice
```
opencc 1.3.1        ← 22px / 500 / primary
[Latest ✓]          ← 12px badge / success colors
published 19d ago   ← 13px / 400 / muted
```
Three items, three visual weights — the eye knows exactly where to go.

### Sentence case everywhere
- Page titles, section headers, button labels, tab names, badge text: all sentence case.
- Never Title Case a UI label. Never ALL CAPS (except abbreviations like "API", "URL").

---

## 4. Spacing and Layout

- **Whitespace is structure.** Use generous padding to group related items, not visual borders.
- **8px grid**: all spacing values should be multiples of 8 (8, 16, 24, 32, 48).
  Exception: internal component padding may use 4px or 6px increments.
- **Content max-width**: main content column capped at 800–960px. Don't stretch to full viewport.
- **Sidebar max-width**: 240–280px. Use for metadata, not navigation.
- Don't use a sidebar at all if the metadata can be embedded in the content column.

### Card vs. flat layout
- Use **flat layout** (no card wrapper) for primary content on a page.
- Use **cards** (white bg + subtle border) for secondary, embedded, or grouped objects
  (a dependency list, a code snippet, a search result).
- Never put a card inside a card. Nesting adds visual weight with no informational gain.

---

## 5. Badges and Status Indicators

Badges are the primary tool for communicating state. Use them liberally for version numbers,
build status, compatibility, and categorization.

### Badge anatomy
```
[Latest ✓]   ← icon optional, text short (1–3 words), rounded pill
[Apache 2.0] ← no icon needed, neutral or blue
[9,736 ★]    ← stats badge, neutral
```

### Rules
- Pills (fully rounded, `border-radius: 9999px`) for status and category.
- Rectangular with small radius (`border-radius: 4–6px`) for code-adjacent labels (version numbers,
  language tags).
- Font size: 11–12px. Never larger — a badge that competes with body text is too big.
- Always use semantic colors (see Section 2) — never arbitrary colors per badge.
- Max 3–4 badges visible at once without a "show more" control.

---

## 6. Code Blocks

Developers read code. Make it easy.

- **Background**: light gray (`#f8fafc` or `#f4f4f5`). Never white — code on white has no
  affordance. Never a brand color.
- **Border**: a single subtle stroke (`1px solid #e5e7eb`) is fine, but optional if the
  background already creates contrast.
- **Syntax highlighting**: always. Minimum:
  - Keywords / property names → blue (`#2563eb` or similar)
  - String values → amber/orange (`#d97706` or similar)
  - Comments → gray / muted
- **Copy button**: required. Top-right corner of the code block, 16×16px icon, appears on hover
  (don't clutter the static view).
- **Font**: monospace, 13–14px, line-height 1.6.
- Never wrap a code block in additional decorative containers. The code block IS the container.

---

## 7. Lists and Tables

### Dependency / item lists
- Each row: item name (left), version/status (right), optional status icon (far right).
- Status icon color matches semantic meaning: ✓ green for compatible, ⚠ amber for upgrade available.
- Rows separated by a single `1px` hairline (`border-bottom: 1px solid #f3f4f6`).
- No zebra striping — it adds visual noise with no navigational benefit.
- Row hover: light background tint (`#f9fafb`), never a strong color.

### Tables
- `border-collapse: collapse`, no outer border, only inner horizontal dividers.
- Thead: slightly bolder text (`font-weight: 500`), same background as body (no colored header row).
- Keep columns to 4–6 maximum before considering pagination or filtering.

---

## 8. Navigation

### Top navigation
- Minimal: logo / wordmark left, 3–5 links right, optional search.
- Background: white or very light gray. Never a brand color background.
- No mega-menus. If you need one, the IA is broken.
- Height: 56–64px. Anything taller eats prime screen real estate.

### In-page tabs (secondary navigation)
- Underline-style tabs, not pill/button tabs, for switching between views of the same resource.
- Active tab: colored underline matching the accent color, same weight text as inactive.
- Don't show more than 6 tabs — consider grouping or a "more" menu.

---

## 9. Interactivity and Feedback

- **Loading states**: skeleton loaders (gray placeholder shapes) for content areas; spinner for
  short async operations (<500ms expected). Never block the whole UI — load inline.
- **Empty states**: friendly illustration or icon + 1-line explanation + one action button.
  Empty state text should say what the user can do, not just what isn't there.
- **Error states**: red semantic color, specific message (not "something went wrong"), recovery action.
- **Hover states**: subtle background tint on interactive rows/cards. Don't use `cursor: pointer`
  on non-interactive elements.
- **Focus rings**: visible, 2–3px, same accent color. Never remove outlines without replacing them.

---

## 10. Anti-Patterns to Avoid

These are common mistakes that make UIs look dated or cluttered:

| Anti-pattern | Why it's bad | Better alternative |
|---|---|---|
| Full-width colored header bar | Brand-over-function; dates to 2012 | White/gray nav with small logo |
| Rainbow color assignment | Color loses semantic value | Gray + 1–2 semantic colors |
| Gradients on UI surfaces | Visual noise; hard to read text over | Flat solid fills |
| Cards inside cards | Visual weight without meaning | Flat list with dividers |
| Bolding mid-sentence | Scatters attention | Restructure the sentence |
| ALL CAPS section titles | Aggressive; hard to read | Sentence case |
| Long horizontal scrolling table | User loses row context | Limit columns or use filters |
| Skeleton content > 3 seconds | Frustrates users | Show partial data or a timeout message |
| Icon + label + badge all competing | Too much per row | Pick two: icon OR label, plus badge |
| `font-weight: 700` in body copy | Too heavy; marketing-speak | Use 500 for emphasis |

---

## Quick Reference

When starting a new interface, answer these questions in order:

1. **What does the user need to do first?** → That's the primary action. Put it above the fold.
2. **What content groups exist?** → Those are your tabs or sections.
3. **What states can each item be in?** → Those drive your badge/color choices.
4. **What's the secondary/supporting info?** → Mute it, move it right or below.
5. **What can I remove entirely?** → Remove it.

For detailed component examples and code snippets → read `references/components.md`.
For the full token reference (colors, spacing, type scale) → read `references/tokens.md`.
