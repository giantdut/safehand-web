# SafeHand Design System

**Version:** 1.0  
**Last Updated:** 2026-05-14  
**Applies to:** Dashboard, client-facing views, printed reports, future web surfaces

---

## 1. Principles

These four principles govern every design decision in SafeHand. When something looks wrong, trace it back to one of these.

**1. Read at a glance.** The Owner opens this dashboard in a meeting or before a client call. Every critical piece of information — overdue actions, expired certs, open hazards — must be visible without scrolling or clicking. Status is communicated by color and position, not by reading sentences.

**2. The agent speaks, the dashboard listens.** This surface renders. It does not write. No UI element should invite data entry. The Hermes agent via Telegram is the only input channel. Design must reinforce this — the "Add new procedure" placeholder in the SOP library points back to Hermes, not to a form.

**3. Credibility over personality.** SafeHand exists to be handed to a client, an inspector, or an insurer. Every visual decision should pass the test: *would a safety officer at a large company take this document seriously?* This means restraint — no playful illustrations, no aggressive brand moments, no color for its own sake.

**4. Safety semantics are non-negotiable.** Red = danger/overdue/expired. Amber = warning/expiring/in-progress. Green = safe/current/resolved. These mappings must never be used decoratively. A green badge on an unresolved item, or a decorative red accent, erodes the system's trustworthiness immediately.

---

## 2. Brand Identity

### Logo

The SafeHand mark is a dark forest green circle with a stylised A-chevron inside. It is used:

- In the sidebar at 36×36px with a white background and 8px border radius
- In exported PDFs at full size in the document header
- Never stretched, recolored, or placed on a dark background without the white container

### Name

- Product name: **SafeHand** — always one word, capital S, capital H
- Tagline: **OH&S Co-Pilot for Small Employers** — used in sidebar subheading, document headers, and external-facing materials
- Never: "Safe Hand", "safehand", "SAFEHAND"

### Voice (for UI microcopy)

- Direct and factual: "2 expiries within 30 days" not "You might want to check some certifications"
- Action-oriented: "Book D. Santos first aid renewal" not "First aid renewal may be needed"
- Never alarming beyond the facts: the badge counts tell the story; surrounding copy stays neutral

---

## 3. Color

### Primary Palette — SafeHand Green

The brand color. Used for the sidebar, primary buttons, active states, and positive status indicators.

| Token | Hex | Usage |
|---|---|---|
| `--green-900` | `#0d2b1a` | Sidebar background |
| `--green-800` | `#14391f` | Deep dark accents |
| `--green-700` | `#1a4f2a` | Hover states on dark surfaces |
| `--green-600` | `#1e5c2e` | Active nav item, primary button, icon accents |
| `--green-500` | `#2a7a3b` | Primary button hover, link color |
| `--green-400` | `#3a9e50` | Chart bars active, coverage bars, status dot |
| `--green-300` | `#5db870` | Pulse indicator, light accents |
| `--green-200` | `#92d4a0` | Chart bars default state |
| `--green-100` | `#c8ecd0` | Coverage number bubble (active) |
| `--green-50` | `#edf7ef` | Badge background (success), card accent fill, SOP icon background |

### Semantic Colors

These carry fixed meaning throughout the product. Never repurpose them.

| Token | Hex | Background Token | Hex | Meaning |
|---|---|---|---|---|
| `--red` | `#dc2626` | `--red-bg` | `#fee2e2` | Overdue, expired, critical hazard, gap |
| `--amber` | `#d97706` | `--amber-bg` | `#fef3c7` | Warning, expiring, in-progress, due soon |
| `--blue` | `#1d4ed8` | `--blue-bg` | `#dbeafe` | Informational, scheduled, neutral metric |

### Neutral Palette

| Token | Hex | Usage |
|---|---|---|
| `--gray-900` | `#111827` | Body text, headings |
| `--gray-700` | `#374151` | Table cell text, secondary headings |
| `--gray-500` | `#6b7280` | Labels, metadata, muted text |
| `--gray-300` | `#d1d5db` | Input borders, dividers |
| `--gray-200` | `#e5e7eb` | Card borders, table row dividers |
| `--gray-100` | `#f3f4f6` | Table header background, badge fills |
| `--gray-50` | `#f9fafb` | Page background |
| `--surface` | `#ffffff` | Card backgrounds, sidebar-on-dark surfaces |

### Color Usage Rules

**Do:**
- Use red/amber/green exclusively for safety status
- Use green-900 as the sidebar background only
- Use gray-50 as the page background
- Use surface white for all card backgrounds

**Don't:**
- Use green as a decorative accent that isn't communicating "resolved" or "safe"
- Mix semantic colors with the brand green in a way that creates ambiguity (e.g. a green button next to a green "resolved" badge is fine; a green decorative border on a warning card is not)
- Use red, amber, or blue for non-status purposes (headers, illustrations, branding)

---

## 4. Typography

### Typefaces

| Face | Role | Import |
|---|---|---|
| **DM Serif Display** | Display headings, large numerics, product name | Google Fonts |
| **DM Sans** | All body, UI, labels, table content | Google Fonts |

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Role | Family | Size | Weight | Usage |
|---|---|---|---|---|
| Page title | DM Serif Display | 20px | 400 | Topbar page title |
| Product name (sidebar) | DM Serif Display | 18px | 400 | Sidebar logo lockup |
| Stat value | DM Serif Display | 28px | 300 | KPI metric cards |
| Weekly summary numbers | DM Serif Display | 22px | 400 | Mini stat cards in summaries |
| Card title | DM Sans | 14px | 600 | Card header titles |
| Body / table cells | DM Sans | 14px | 400 | Default body text |
| Table cells | DM Sans | 13px | 400 | Data table content |
| Labels / metadata | DM Sans | 12px | 400–500 | Timestamps, secondary info |
| Section labels (sidebar) | DM Sans | 10px | 500 | Uppercase sidebar group labels |
| Stat card labels | DM Sans | 11.5px | 500 | KPI card labels (uppercase) |
| Badge text | DM Sans | 11px | 600 | Status badges |
| Table headers | DM Sans | 11px | 600 | Uppercase, letter-spaced |

### Typography Rules

- Uppercase is used only for: table column headers, sidebar section labels, stat card labels. Never for body copy or card titles.
- Letter spacing: `0.5–1.2px` only on uppercase labels. Zero on everything else.
- Line height: `1.5` default body, `1.4` for activity titles, `1.7` for summary prose, `1` for large numerics.
- Font weight 300 is used only for large stat values (DM Serif Display). Everything else is 400, 500, or 600.

---

## 5. Spacing & Layout

### Page Layout

```
┌─────────────────────────────────────────────────┐
│  Sidebar (240px fixed) │  Main content (fluid)   │
│                        │  ┌──────────────────┐   │
│  Logo lockup           │  │ Topbar (sticky)  │   │
│  ─────────────────     │  └──────────────────┘   │
│  Nav sections          │  Content padding: 24px  │
│                        │  28px horizontal         │
│  ─────────────────     │                         │
│  Status footer         │                         │
└─────────────────────────────────────────────────┘
```

- Sidebar width: `240px` fixed
- Main content left margin: `240px`
- Content padding: `24px 28px`
- Topbar: sticky, `z-index: 50`
- Sidebar: fixed, `z-index: 100`

### Grid System

| Layout | Columns | Gap | Use case |
|---|---|---|---|
| Stat row | `repeat(4, 1fr)` | `16px` | KPI cards at top of dashboard |
| Two-column | `1fr 1fr` | `20px` | Side-by-side cards (coverage, skills) |
| Main + sidebar | `2fr 1fr` | `20px` | Activity feed + right column |
| SOP grid | `1fr 1fr` | `10px` | SOP library cards |

### Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `4px` | — | Icon-to-label gap, tight internal spacing |
| `8px` | — | Badge padding, compact internal gaps |
| `10px` | — | Nav item padding, SOP card gap |
| `12px` | — | Activity icon gap, action item internal |
| `14px` | — | Card body internal spacing |
| `16px` | — | Section padding, card header padding |
| `20px` | — | Row gaps, card body padding |
| `24px` | — | Content top padding, sidebar logo padding |
| `28px` | — | Content horizontal padding |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius` | `10px` | Cards, stat cards |
| `--radius-sm` | `6px` | Buttons, badges, inputs, nav items, action items |
| `8px` | — | Logo container, SOP icons, coverage bubbles, summary mini-cards |
| `20px` | — | Badge pills, trend pills |
| `50%` | — | Status dot, activity icons |

---

## 6. Elevation & Borders

### Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)` | Default card elevation |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.08)` | Action item hover state |

Shadows are used only on cards and interactive elements on hover. No decorative drop shadows.

### Borders

- Card borders: `1px solid var(--gray-200)`
- Table row dividers: `1px solid var(--gray-100)`
- Table header divider: `1px solid var(--gray-200)`
- Input borders: `1px solid var(--gray-300)`
- Sidebar logo divider: `1px solid rgba(255,255,255,0.08)`
- Sidebar section top: none (padding-only separation)
- Card left accent: `3px solid [semantic color]` — used only on stat cards to indicate category
- Dashed borders: `1px dashed var(--gray-300)` — used only on placeholder/empty state cards

---

## 7. Components

### Stat Card

Used at the top of the dashboard for primary KPIs. Always a row of four.

```html
<div class="stat-card accent-[green|amber|red|blue]">
  <div class="stat-label">LABEL TEXT</div>
  <div class="stat-value">42</div>
  <div class="stat-sub">
    <span class="stat-trend trend-[good|warn|bad]">contextual info</span>
  </div>
</div>
```

**Rules:**
- Left accent color must match the semantic meaning of the metric (red for danger metrics, amber for warnings, green for positive metrics, blue for neutral/informational)
- Stat value uses DM Serif Display, 28px, weight 300
- Label is uppercase, 11.5px, letter-spaced
- Trend pill is optional — include only when the sub-context adds meaning the number alone doesn't carry

### Card

The base container for all content sections.

```html
<div class="card">
  <div class="card-header">
    <div class="card-title">
      <div class="card-title-icon"><!-- 20x20 SVG --></div>
      Title Text
    </div>
    <span class="card-action">Secondary action</span>
  </div>
  <div class="card-body">
    <!-- content -->
  </div>
</div>
```

**Rules:**
- Card title icon: 20×20px container, green-50 background, 5px border radius, holds a 12×12 SVG in green-600
- Card action (top right): 12px, green-500, cursor pointer — used for "View all" type links only
- Card body padding: `16px 20px` standard; `0` when content is a full-width table

### Badge

Communicates status inline. Six variants.

```html
<span class="badge badge-[green|amber|red|blue|gray]">Label</span>
```

| Variant | Background | Text color | Use |
|---|---|---|---|
| `badge-green` | `--green-50` | `--green-600` | Resolved, current, active, clear |
| `badge-amber` | `--amber-bg` | `#92400e` | In progress, expiring, due soon, partial |
| `badge-red` | `--red-bg` | `--red` | Overdue, expired, open (critical), gap |
| `badge-blue` | `--blue-bg` | `--blue` | Scheduled, informational |
| `badge-gray` | `--gray-100` | `--gray-700` | Neutral, not required, N/A |

**Rules:**
- Badge text is always 11px, weight 600
- Padding: `3px 9px` standard; `2px 6px` compact (inside tables)
- Never use a badge where a colored table cell (cert-cell) is the right pattern — badges are for status columns, cert-cells are for matrix cells

### Navigation Item

```html
<a class="nav-item [active]" onclick="showPage('id')">
  <svg class="nav-icon"><!-- 18x18 --></svg>
  Label
  <span class="nav-badge [amber]">3</span>  <!-- optional -->
</a>
```

**Badge colors on nav:**
- Red (default `.nav-badge`): critical items requiring immediate attention
- Amber (`.nav-badge.amber`): warnings requiring attention soon

**Rules:**
- Active state: `background: var(--green-600)`, white text, weight 500
- Default state: `rgba(255,255,255,0.65)` text
- Hover: `rgba(255,255,255,0.08)` background
- Icon size: 18×18px, `opacity: 0.8`

### Button

```html
<button class="btn btn-primary">Label</button>
<button class="btn btn-ghost">Label</button>
```

| Variant | Background | Border | Use |
|---|---|---|---|
| `btn-primary` | `--green-600` | none | Primary actions (Export, Download) |
| `btn-ghost` | transparent | `1px solid --gray-300` | Secondary actions (Print, View) |

**Rules:**
- Padding: `8px 14px`
- Font: 13px, weight 500
- Include a 14×14 SVG icon to the left of label text for primary actions
- Hover: primary → `--green-500`; ghost → `--gray-100` background

### Training Matrix Cell

Used exclusively in the Training Matrix view.

```html
<span class="cert-cell cert-[ok|expiring|expired|na]">Mar 2027</span>
```

| Class | Background | Text | Meaning |
|---|---|---|---|
| `cert-ok` | `--green-50` | `--green-600` | Valid, more than 30 days remaining |
| `cert-expiring` | `--amber-bg` | `#92400e` | Expires within 30 days |
| `cert-expired` | `--red-bg` | `--red` | Expired — immediate action required |
| `cert-na` | `--gray-100` | `--gray-400` | Not applicable to this worker's role |

**Rules:**
- Always display the expiry date in `cert-ok` and `cert-expiring` cells, not just a checkmark
- Use `✓` only in boolean cells (onboarding complete, orientation done)
- Cell padding: `4px 8px`, border-radius: `4px`

### Action Item

```html
<div class="action-item [overdue|due-soon]">
  <div class="action-priority dot dot-[red|amber]"></div>
  <div class="action-body">
    <div class="action-title">Action description</div>
    <div class="action-meta">
      <span>Source</span>
      <span>Location or due date</span>
    </div>
  </div>
  <div class="action-age">14d open</div>
</div>
```

| State | Border | Background |
|---|---|---|
| Default | `--gray-200` | white |
| `.due-soon` | `#fcd34d` | `#fffbeb` |
| `.overdue` | `#fca5a5` | `#fff8f8` |

**Rules:**
- Age counter (top right) shows days the item has been open — never suppress this
- Priority dot: red for overdue/high severity, amber for due-soon/medium
- Group by: Overdue → Due this week → Open → complete (if shown). Never mix groups in one list.

### Activity Feed Item

```html
<div class="activity-item">
  <div class="activity-icon [green|amber|red|blue]">
    <svg><!-- 14x14 --></svg>
  </div>
  <div class="activity-content">
    <div class="activity-title"><strong>Event type</strong> — description</div>
    <div class="activity-time">Date · Source</div>
  </div>
</div>
```

**Icon color mapping:**
- Green: resolved actions, completed inspections, skills built
- Amber: training alerts, expiry warnings
- Red: near-misses, incidents, critical hazards
- Blue: scheduled events, automated cron outputs (weekly summaries, reminders)

### Coverage Item

Used in the Program Coverage view for the 9 ISO 45001 elements.

```html
<div class="coverage-item">
  <div class="coverage-num [active|warn|gap]">1</div>
  <div class="coverage-name">Element name</div>
  <div class="coverage-bar-wrap">
    <div class="coverage-bar [warn|gap]" style="width:80%"></div>
  </div>
  <span class="badge badge-[green|amber|red]">Status</span>
</div>
```

| State | Number bubble | Bar color | Badge |
|---|---|---|---|
| Active | green-100 bg, green-700 text | green-400 | badge-green |
| Partial/warn | amber-bg, `#92400e` text | amber | badge-amber |
| Gap | red-bg, red text | red | badge-red |

---

## 8. Data Tables

### General Rules

- Header row: `1px solid --gray-200` bottom border, `--gray-50` background
- Header cells: 11px, weight 600, uppercase, `letter-spacing: 0.5px`, `--gray-500` color
- Body rows: `1px solid --gray-100` divider, hover `--gray-50` background, pointer cursor
- Cell padding: `11px 12px` body; `8px 12px` header
- Cell text: 13px, `--gray-700`
- Last row: no bottom border

### Severity Column (Hazard Register)

```html
<span class="severity-high">High</span>    <!-- --red, weight 600 -->
<span class="severity-medium">Medium</span> <!-- --amber, weight 600 -->
<span class="severity-low">Low</span>       <!-- --green-500, weight 600 -->
```

### Table with Filter Controls

Filter selects sit in the card header right side when the table needs them. Style: `font-size: 12px`, `padding: 5px 8px`, `border: 1px solid --gray-300`, `border-radius: 5px`.

---

## 9. Charts

### Bar Chart (Activity Trend)

Simple CSS bar chart. No charting library required for this use case.

```html
<div class="chart-bars">
  <div class="chart-bar-group">
    <div class="chart-bar" style="height:60%"></div>
    <div class="chart-label">Apr14</div>
  </div>
  <!-- repeat per week -->
</div>
```

- Bar color default: `--green-200`
- Bar color active (current week): `--green-500`
- Bar color hover: `--green-400`
- Container height: `80px`
- Label: 10px, `--gray-400`

**Rules:**
- Heights are percentages of the container, scaled to the max value in the dataset
- Always label the x-axis with the week start date
- Current week bar uses `.active` class automatically

---

## 10. Page Structure

### Topbar

```
┌─────────────────────────────────────────────────────────┐
│  Page Title (DM Serif, 20px)        [Print] [Export]   │
│  Page subtitle (DM Sans, 12px gray)                     │
└─────────────────────────────────────────────────────────┘
```

- Background: `--surface` white
- Border bottom: `1px solid --gray-200`
- Padding: `14px 28px`
- Position: sticky, top 0

### Sidebar Footer

Always shows:
1. Hermes agent status (green pulse dot + "Hermes agent active")
2. Last sync timestamp

The status dot uses a CSS pulse animation to indicate live agent connection. If the agent goes offline, the dot should turn gray and pulse should stop — this is a future implementation note, not current behavior.

---

## 11. Status System

This is the most important section. The entire product's trustworthiness depends on consistent status semantics.

### The Three-Color Rule

| Color | Token | Means | Never use for |
|---|---|---|---|
| 🔴 Red | `--red` / `--red-bg` | Immediate attention required. Overdue, expired, critical, gap in program | Decorative accents, severity that isn't actually critical |
| 🟡 Amber | `--amber` / `--amber-bg` | Attention required soon. Expiring, in progress, due this week, partial coverage | Neutral information, things that are merely "pending" with no deadline |
| 🟢 Green | `--green-*` | Safe, current, resolved, active | Things that aren't actually resolved or safe |

### Status by Feature Area

| Feature | Red | Amber | Green | Gray |
|---|---|---|---|---|
| Hazard severity | High | Medium | Low | — |
| Hazard status | Open | In Progress | Resolved | — |
| Action items | Overdue | Due this week | — | — |
| Training certs | Expired | Expiring ≤30d | Current | N/A |
| Inspection status | — | Scheduled/In Progress | Clear/Resolved | — |
| Program coverage | Gap | Partial | Active | — |
| Skills | Pending | Building | Active | — |
| Incidents | — | Under investigation | Closed | Not required |

---

## 12. Print Considerations

The dashboard is designed to print cleanly for meeting handouts.

**Print behavior:**
- Sidebar hides (`display: none`)
- Topbar action buttons hide
- Content padding reduces to `16px`
- Cards maintain their borders and structure
- Badge colors should remain visible (use background-print-color if needed in future)

**Page break guidance (future CSS):**
- `break-before: page` before the Training Matrix when printing the full package
- `break-inside: avoid` on all card components
- Action items list should not break mid-item

---

## 13. Iconography

All icons are inline SVG, `viewBox="0 0 24 24"`, `fill="none"`, `stroke="currentColor"`, `stroke-width="2"`.

### Size Standards

| Context | Size | Notes |
|---|---|---|
| Sidebar nav | 18×18px | Class `.nav-icon` |
| Card title | 12×12px inside 20×20 container | Icon is 60% of container |
| Activity feed | 14×14px inside 30×30 circle | |
| Button icon | 14×14px | Left of label text |
| SOP card | 16×16px inside 36×36 container | |
| Topbar buttons | 14×14px | |

### Icon-to-Concept Mapping

| Concept | Icon path description |
|---|---|
| Dashboard | Four equal squares (2×2 grid) |
| Hazard / Warning | Triangle with exclamation |
| Action items / Checklist | Checkbox with checkmark |
| Training / People | Two-person silhouette |
| SOPs / Documents | Document with folded corner |
| Inspections | Checkbox with full border |
| Incidents | Circle with exclamation (info style) |
| Program coverage | Shield |
| Weekly summary | Calendar with lines |
| Client package | Upload arrow |
| Activity / Clock | Circle with clock hands |
| Chart | Pulse/waveform line |
| Print | Printer |
| Export / Download | Down arrow from line |

---

## 14. Future Surfaces

When extending SafeHand to new surfaces, apply these rules:

**Printed client packages:**
- Use the full SafeHand logotype + tagline as the document header
- Green-900 header bar, white text
- Tables use the same color semantics as the dashboard
- Footer: "SafeHand OH&S Co-Pilot · ISO 45001-aligned · Generated [date]"
- Never claim the program is "certified" — always "aligned"

**Mobile (future Telegram mini-app or PWA):**
- Sidebar collapses to a bottom tab bar
- Stat cards stack to single column
- Training matrix requires horizontal scroll — add a "swipe to see all →" hint
- Font sizes remain the same — do not reduce below 12px

**Email reports (weekly summary):**
- Inline CSS only (no stylesheets)
- Green-900 header, white text
- Badges rendered as plain colored text with surrounding brackets if email client strips backgrounds
- Table structure mirrors the dashboard — same column order, same color semantics

---

*SafeHand Design System — Internal Reference | v1.0 | 2026-05-14*