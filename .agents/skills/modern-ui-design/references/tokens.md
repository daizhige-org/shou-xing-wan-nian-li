# Design Tokens

Concrete values to copy directly into code. All tokens are framework-agnostic (plain CSS variables
or inline values). For Tailwind equivalents, the class names are noted in parentheses.

---

## Color Tokens

### Base surfaces
```css
--color-surface-primary:   #ffffff;    /* white — main content bg */
--color-surface-secondary: #f9fafb;    /* gray-50 — page bg, hover rows */
--color-surface-tertiary:  #f3f4f6;    /* gray-100 — code blocks, badges */
```

### Text
```css
--color-text-primary:   #111827;   /* gray-900 — headings, body */
--color-text-secondary: #6b7280;   /* gray-500 — meta, placeholders */
--color-text-muted:     #9ca3af;   /* gray-400 — timestamps, hints */
```

### Borders
```css
--color-border-default: #e5e7eb;   /* gray-200 — all standard borders */
--color-border-subtle:  #f3f4f6;   /* gray-100 — row dividers */
```

### Semantic (status only)
```css
/* Success */
--color-success-bg:   #f0fdf4;   --color-success-text:   #15803d;   --color-success-border: #bbf7d0;
/* Warning */
--color-warning-bg:   #fffbeb;   --color-warning-text:   #b45309;   --color-warning-border: #fde68a;
/* Error */
--color-error-bg:     #fef2f2;   --color-error-text:     #b91c1c;   --color-error-border:   #fecaca;
/* Info */
--color-info-bg:      #eff6ff;   --color-info-text:      #1d4ed8;   --color-info-border:    #bfdbfe;
/* Neutral */
--color-neutral-bg:   #f9fafb;   --color-neutral-text:   #374151;   --color-neutral-border: #d1d5db;
```

### Interactive (accent)
```css
--color-accent:         #2563eb;   /* blue-600 — links, primary buttons, focus rings */
--color-accent-hover:   #1d4ed8;   /* blue-700 */
--color-accent-subtle:  #eff6ff;   /* blue-50 — hover bg for accent rows */
```

---

## Syntax Highlight Tokens (for code blocks)

```css
--syntax-keyword:  #2563eb;   /* blue — property names, keywords */
--syntax-string:   #d97706;   /* amber — string values, identifiers */
--syntax-comment:  #9ca3af;   /* gray — comments, punctuation */
--syntax-number:   #16a34a;   /* green — numeric literals */
--syntax-bg:       #f8fafc;   /* slate-50 — code block background */
--syntax-border:   #e5e7eb;   /* gray-200 */
```

---

## Spacing Scale (8px grid)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

---

## Typography Scale

```css
/* Page title */
--text-title-size:   24px;
--text-title-weight: 600;
--text-title-color:  var(--color-text-primary);

/* Section heading / tab label */
--text-heading-size:   15px;
--text-heading-weight: 500;
--text-heading-color:  var(--color-text-primary);

/* Body */
--text-body-size:   14px;
--text-body-weight: 400;
--text-body-color:  var(--color-text-primary);
--text-body-line-height: 1.6;

/* Meta / secondary */
--text-meta-size:   13px;
--text-meta-weight: 400;
--text-meta-color:  var(--color-text-secondary);

/* Badge / label */
--text-badge-size:   12px;
--text-badge-weight: 500;

/* Code */
--text-code-size:        13px;
--text-code-family:      ui-monospace, 'SF Mono', Menlo, monospace;
--text-code-line-height: 1.6;
```

---

## Border Radius

```css
--radius-sm:   4px;    /* version tags, small code badges */
--radius-md:   6px;    /* buttons, inputs */
--radius-lg:   8px;    /* cards, code blocks, panels */
--radius-pill: 9999px; /* status badges, tags */
```

---

## Elevation / Shadows

Modern UIs use minimal or no shadows. If shadows are needed:

```css
--shadow-none:  none;
--shadow-sm:    0 1px 2px 0 rgb(0 0 0 / 0.05);   /* subtle card lift */
--shadow-md:    0 4px 6px -1px rgb(0 0 0 / 0.07); /* dropdown, popover */
```

Never use `box-shadow` with `blur > 12px` — it creates a soft glow effect that looks unmoored.

---

## Component Size Reference

| Component         | Height  | Padding (v / h) |
|-------------------|---------|-----------------|
| Top nav bar       | 56px    | —               |
| Primary button    | 36px    | 8px / 16px      |
| Secondary button  | 32px    | 6px / 12px      |
| Text input        | 36px    | 8px / 12px      |
| Tab item          | 40px    | 10px / 16px     |
| Table row         | 44px    | 10px / 16px     |
| Badge / pill      | 22px    | 2px / 10px      |
| Version tag       | 20px    | 2px / 8px       |
| Section card      | auto    | 16px / 20px     |

---

## CSS Reset Baseline

Paste this at the top of any new stylesheet:

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px; line-height: 1.6; color: #111827; background: #f9fafb; }
a { color: #2563eb; text-decoration: none; }
a:hover { text-decoration: underline; }
button { cursor: pointer; font-family: inherit; }
```
