# Component Reference

Concrete HTML/CSS/React patterns for common UI components.
All patterns use the tokens defined in `tokens.md`.

---

## Status Badge

```html
<!-- Success -->
<span style="display:inline-flex;align-items:center;gap:4px;padding:2px 10px;
  border-radius:9999px;background:#f0fdf4;color:#15803d;font-size:12px;font-weight:500;">
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  Latest
</span>

<!-- Warning -->
<span style="...background:#fffbeb;color:#b45309;...">Deprecated</span>

<!-- Neutral (version number) -->
<span style="display:inline-flex;padding:2px 8px;border-radius:4px;
  background:#f3f4f6;color:#374151;font-size:12px;font-weight:500;font-family:monospace;">
  v1.3.1
</span>
```

---

## Code Block with Copy Button

```html
<div style="position:relative;background:#f8fafc;border:1px solid #e5e7eb;
  border-radius:8px;padding:14px 16px;font-family:monospace;font-size:13px;line-height:1.6;">

  <button onclick="navigator.clipboard.writeText(this.dataset.text)"
    data-text="bazel_dep(name = &quot;opencc&quot;, version = &quot;1.3.1&quot;)"
    style="position:absolute;top:10px;right:10px;padding:4px 8px;border:1px solid #e5e7eb;
      border-radius:6px;background:white;font-size:11px;cursor:pointer;color:#6b7280;">
    Copy
  </button>

  <span style="color:#6b7280;">bazel_dep(</span>
  <span style="color:#2563eb;">name</span>
  <span style="color:#6b7280;"> = </span>
  <span style="color:#d97706;">"opencc"</span>
  <span style="color:#6b7280;">, </span>
  <span style="color:#2563eb;">version</span>
  <span style="color:#6b7280;"> = </span>
  <span style="color:#d97706;">"1.3.1"</span>
  <span style="color:#6b7280;">)</span>

</div>
```

---

## Tab Navigation

```html
<nav style="display:flex;gap:0;border-bottom:1px solid #e5e7eb;margin-bottom:24px;">
  <a href="#overview" style="padding:10px 16px;font-size:14px;font-weight:500;
    color:#111827;border-bottom:2px solid #2563eb;text-decoration:none;">
    Overview
  </a>
  <a href="#docs" style="padding:10px 16px;font-size:14px;color:#6b7280;
    border-bottom:2px solid transparent;text-decoration:none;">
    Documentation
  </a>
  <a href="#packages" style="padding:10px 16px;font-size:14px;color:#6b7280;
    border-bottom:2px solid transparent;text-decoration:none;">
    Packages
  </a>
</nav>
```

---

## Dependency Row List

```html
<div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
  <!-- Row -->
  <div style="display:flex;align-items:center;padding:10px 16px;
    border-bottom:1px solid #f3f4f6;">
    <span style="flex:1;font-size:14px;color:#111827;">darts-clone</span>
    <span style="font-size:13px;color:#6b7280;font-family:monospace;margin-right:12px;">0.32</span>
    <!-- Green check = compatible -->
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l4 4 6-6" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </div>
  <!-- Row with upgrade hint -->
  <div style="display:flex;align-items:center;padding:10px 16px;">
    <span style="flex:1;font-size:14px;color:#111827;">rules_cc</span>
    <span style="font-size:13px;font-family:monospace;margin-right:12px;
      color:#d97706;">0.2.17 → 0.2.19</span>
    <!-- Amber dot = upgrade available -->
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="4" fill="#f59e0b"/>
    </svg>
  </div>
</div>
```

---

## Page Header Pattern

```html
<div style="padding:24px 0 20px;">
  <!-- Title row -->
  <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px;">
    <h1 style="font-size:24px;font-weight:600;color:#111827;margin:0;">opencc</h1>
    <span style="font-size:22px;font-weight:400;color:#9ca3af;">1.3.1</span>
    <!-- Status badge -->
    <span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;
      border-radius:9999px;background:#f0fdf4;color:#15803d;font-size:12px;font-weight:500;
      border:1px solid #bbf7d0;">
      Latest ✓
    </span>
  </div>
  <!-- Secondary meta row -->
  <p style="font-size:13px;color:#9ca3af;margin:0;">published 19 days ago</p>
</div>
```

---

## Empty State

```html
<div style="display:flex;flex-direction:column;align-items:center;padding:48px 24px;
  text-align:center;color:#6b7280;">
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style="margin-bottom:16px;opacity:0.4;">
    <rect x="8" y="8" width="24" height="24" rx="4" stroke="currentColor" stroke-width="1.5"/>
    <path d="M14 20h12M14 15h8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <p style="font-size:15px;font-weight:500;color:#374151;margin:0 0 6px;">No packages found</p>
  <p style="font-size:13px;margin:0 0 20px;">Try a different search term or browse all packages.</p>
  <a href="/browse" style="padding:8px 16px;border-radius:6px;background:#2563eb;
    color:white;font-size:13px;font-weight:500;text-decoration:none;">Browse all</a>
</div>
```

---

## Language Bar

```html
<div>
  <!-- Color bar -->
  <div style="display:flex;height:6px;border-radius:9999px;overflow:hidden;margin-bottom:10px;">
    <div style="width:71.4%;background:#3b82f6;" title="C++"></div>
    <div style="width:7.7%;background:#f59e0b;" title="Python"></div>
    <div style="width:6.8%;background:#eab308;" title="JavaScript"></div>
    <div style="width:14.1%;background:#6b7280;" title="Other"></div>
  </div>
  <!-- Legend -->
  <div style="display:flex;flex-wrap:wrap;gap:12px;">
    <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#374151;">
      <span style="width:10px;height:10px;border-radius:50%;background:#3b82f6;"></span>
      C++ <span style="color:#9ca3af;">71.4%</span>
    </span>
    <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:#374151;">
      <span style="width:10px;height:10px;border-radius:50%;background:#f59e0b;"></span>
      Python <span style="color:#9ca3af;">7.7%</span>
    </span>
  </div>
</div>
```
