# SafeHand Dashboard — Product Requirements Document

### Web Layer for the SafeHand OH&S Co-Pilot (Framing A)

**Version:** 1.0  
**Status:** Active — Agenthon Build Reference  
**Last Updated:** 2026-05-14  
**Companion Doc:** SafeHand Agent PRD v1.0  
**Stack:** Next.js 14 (App Router) + Vercel  
**Data Sources:** GitHub repo (primary) + Hermes VPS API (live triggers)

---

> **Design Principle:** The dashboard is a *read-mostly viewer and trigger surface* — not an alternative to Telegram. Owners use Telegram to operate SafeHand. They use this dashboard to review outputs, view compliance state, and generate documents. No safety data is entered here. No chat interface lives here. Every write operation routes through Hermes via Telegram or VPS API call.

---

## 1. What This Document Covers

This PRD scopes only the **web dashboard layer**. It does not re-specify the Hermes agent, skills, or crons — those are defined in the SafeHand Agent PRD. Read that doc first if you haven't.

This document answers:
- What pages exist and what they show
- How the dashboard connects to the Hermes agent and GitHub repo
- What the owner onboarding flow looks like on the web
- How live triggers from the dashboard reach Hermes
- What is in scope for the Agenthon demo vs. what is deferred

---

## 2. Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                   Owner's Browser                         │
│              SafeHand Dashboard (Next.js)                 │
│   Read: GitHub repo data (24hr lag, acceptable for demo) │
│   Write: Hermes VPS HTTP endpoint (live triggers only)   │
└──────────────┬──────────────────────┬────────────────────┘
               │ reads                │ POST triggers
               ▼                      ▼
┌──────────────────────┐   ┌─────────────────────────────┐
│  Private GitHub Repo  │   │   Hermes VPS (Docker)        │
│  (source of truth)   │   │   Small Express wrapper       │
│                       │   │   exposes /trigger endpoint  │
│  hazard-register.json │   │   → sends Telegram message   │
│  training-matrix.json │   │     to Owner's bot on behalf │
│  action-items.json    │   │     of the dashboard action  │
│  sops/               │   └─────────────────────────────┘
│  inspections/        │
│  weekly-summaries/   │
│  workers.json        │
└──────────────────────┘
```

### Data Flow Rules

| Action | Route | Latency |
|--------|-------|---------|
| View hazard register | Dashboard reads GitHub JSON | Up to 24hr |
| View training matrix | Dashboard reads GitHub JSON | Up to 24hr |
| View action items | Dashboard reads GitHub JSON | Up to 24hr |
| Generate client package | Dashboard POSTs to VPS trigger | Near real-time |
| Trigger toolbox talk | Dashboard POSTs to VPS trigger | Near real-time |
| Owner onboarding | Dashboard → Telegram deeplink | Immediate |

---

## 3. Owner Onboarding Flow

This is the **most important user journey**. Get this right before building anything else.

### 3.1 Flow Steps

```
Step 1: Landing page → "Get Started" CTA
         ↓
Step 2: Sign up form (email + password via Clerk/Auth.js)
         ↓
Step 3: Business profile — 4 fields only:
         - Business name
         - Industry (dropdown: Construction / Trades / Agriculture /
                    Food Production / Logistics / Field Services / Other)
         - Province/State (dropdown — determines jurisdiction display)
         - Number of workers (slider: 1–12)
         ↓
Step 4: Connect Telegram
         - Dashboard generates a unique 6-digit pairing code
         - Owner opens Telegram, messages the SafeHand bot: /start [code]
         - Bot confirms, links account, sends welcome message
         - Dashboard polls for confirmation (5s interval, 2min timeout)
         - On confirmation: redirect to dashboard home
         ↓
Step 5: Dashboard home with empty state
         - Hazard register: empty, prompt to send first hazard via Telegram
         - Training matrix: empty, prompt to onboard first worker
         - Action items: empty
         - Status bar: "Your SafeHand agent is ready. Say hi in Telegram."
```

### 3.2 Onboarding Field Constraints

- Maximum 4 fields on the web. Resist the urge to add more.
- Everything else (crew details, equipment, past incidents, certifications) is collected by Hermes via Telegram conversation.
- The web form is not the onboarding — it is the *prerequisite* to the onboarding.

### 3.3 Telegram Pairing

**How it works:**

1. Dashboard generates `pairing_code` (6-digit numeric, stored in DB with 10-minute TTL).
2. Owner sends `/start [pairing_code]` to the SafeHand Telegram bot.
3. Hermes bot handler verifies code, maps `telegram_user_id` → `dashboard_account_id`, marks account as linked.
4. Dashboard polls `GET /api/auth/telegram-status?account_id=X` every 5 seconds.
5. On success: dashboard writes `telegram_linked: true` to account record, redirects to home.

**Fallback:** If owner doesn't link within 2 minutes, show "Didn't work? Try again" button that regenerates the code. Add a link to the Telegram bot directly.

---

## 4. Pages and Views

### 4.1 Page Map

```
/                    → Landing page (public)
/signup              → Account creation
/onboarding          → Business profile + Telegram pairing
/dashboard           → Home / overview (authenticated)
/dashboard/hazards   → Hazard register viewer
/dashboard/training  → Training matrix viewer
/dashboard/actions   → Open action items list
/dashboard/sops      → SOP library viewer
/dashboard/reports   → Weekly summaries archive
/dashboard/package   → Generate client documentation package
/dashboard/settings  → Account settings, Telegram status
```

---

### 4.2 Dashboard Home (`/dashboard`)

**Purpose:** At-a-glance program health. No data entry.

**Components:**

| Component | Data Source | Notes |
|-----------|-------------|-------|
| Program Health Score | Computed from GitHub JSON | 0–100 based on coverage of 9 management system elements |
| Hazard Register Summary | `hazard-register.json` | Count of open hazards, last logged date |
| Training Matrix Summary | `training-matrix.json` | Count of workers, upcoming expiries (within 30 days) |
| Open Action Items | `action-items.json` | Count by priority, oldest open item age |
| Last GitHub Sync | GitHub API | Timestamp of last commit to the repo |
| Telegram Status | DB | Connected / Not connected badge |
| Quick Actions | VPS trigger | "Generate Toolbox Talk", "Generate Client Package" buttons |

**Empty state:** If GitHub repo has no data yet, show a friendly prompt: *"Your agent is learning your business. Send it a voice note in Telegram to get started."* Link to Telegram bot.

---

### 4.3 Hazard Register (`/dashboard/hazards`)

**Data source:** `hazard-register.json` from GitHub repo

**Expected JSON structure (Hermes writes this):**
```json
[
  {
    "id": "hz-001",
    "date": "2026-05-14",
    "type": "near-miss",
    "description": "Worker almost struck by forklift in loading bay",
    "location": "Loading bay",
    "severity": "high",
    "controls": ["Spotter required", "Exclusion zone marked"],
    "status": "open",
    "action_items": ["az-003"]
  }
]
```

**UI:**
- Table view: date, type, description (truncated), severity (colour-coded chip), status
- Filter by: severity, status, date range
- Click row → expand to full detail panel
- No add/edit buttons. Read only.
- Banner: *"Report a new hazard by voice note in Telegram"*

---

### 4.4 Training Matrix (`/dashboard/training`)

**Data source:** `training-matrix.json` from GitHub repo

**Expected JSON structure:**
```json
[
  {
    "worker_id": "w-001",
    "name": "Worker 1",
    "start_date": "2026-03-01",
    "certifications": [
      {
        "name": "First Aid Level 1",
        "issued": "2025-06-01",
        "expires": "2027-06-01",
        "status": "current"
      },
      {
        "name": "WHMIS 2018",
        "issued": "2024-01-01",
        "expires": "2026-01-01",
        "status": "expired"
      }
    ]
  }
]
```

**UI:**
- Grid: workers as rows, certification types as columns
- Cell colour: green (current), yellow (expiring within 30 days), red (expired), grey (not held)
- Click cell → show expiry date tooltip
- Expiry alert bar at top if any reds or yellows exist
- No add/edit. Read only.

---

### 4.5 Action Items (`/dashboard/actions`)

**Data source:** `action-items.json` from GitHub repo

**Expected JSON structure:**
```json
[
  {
    "id": "az-001",
    "source": "near-miss hz-001",
    "description": "Install forklift exclusion zone signage in loading bay",
    "assigned_to": "Owner",
    "due_date": "2026-05-21",
    "priority": "high",
    "status": "open",
    "age_days": 7
  }
]
```

**UI:**
- List grouped by priority (high / medium / low)
- Each item: description, source event, due date, age badge
- Filter by: status, priority
- No status updates from the dashboard. Read only.
- Banner: *"Mark items complete by telling SafeHand in Telegram"*

---

### 4.6 SOP Library (`/dashboard/sops`)

**Data source:** `sops/*.md` files from GitHub repo

**UI:**
- List of SOPs: title, equipment/task, last updated date
- Click → render markdown content in reading panel
- No edit. Read only.
- Banner: *"Ask SafeHand to generate a new SOP in Telegram: 'Can you create a procedure for [task]?'"*

---

### 4.7 Weekly Reports (`/dashboard/reports`)

**Data source:** `weekly-summaries/*.md` or `.json` from GitHub repo

**UI:**
- Chronological list of weekly summary files
- Click → view full summary
- Most recent summary shown expanded by default

---

### 4.8 Client Package Generator (`/dashboard/package`)

**This is the one live-trigger page.** When owner clicks "Generate Package", the dashboard POSTs to the Hermes VPS trigger endpoint, which sends a message to the Telegram bot as if the owner typed: *"Generate my client documentation package now."*

**UI:**
- Explanation of what the package contains (hazard register summary, training matrix, recent inspections, policy statement, SOP list)
- "Generate Package" button → POST to `/api/trigger/client-package`
- After POST: *"SafeHand is generating your package. You'll receive it in Telegram within 2 minutes."*
- Do not attempt to stream or display the package in the dashboard. Hermes sends it via Telegram. The dashboard just triggers it.

---

### 4.9 Settings (`/dashboard/settings`)

**Components:**
- Business name (editable)
- Industry / jurisdiction (editable — triggers memory update in Hermes on next session)
- Telegram link status — Connected badge + "Relink" option
- Account email
- Danger zone: Delete account

---

## 5. VPS Trigger Endpoint

The dashboard needs to reach Hermes to fire live actions. This requires a small HTTP wrapper on the VPS.

### 5.1 What to Build on the VPS

A minimal Express.js server running alongside the Hermes Docker container. It accepts POST requests from the dashboard and fires them as Telegram messages to the linked user.

**File:** `/opt/safehand-trigger/server.js`

```javascript
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const DASHBOARD_SECRET = process.env.DASHBOARD_TRIGGER_SECRET;

app.post('/trigger', async (req, res) => {
  const { secret, telegram_user_id, action } = req.body;

  if (secret !== DASHBOARD_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const messages = {
    'client-package': 'Generate my client documentation package now.',
    'toolbox-talk': 'Generate this week\'s toolbox talk based on recent hazards.',
    'weekly-summary': 'Give me the weekly safety summary.',
  };

  const text = messages[action];
  if (!text) return res.status(400).json({ error: 'Unknown action' });

  await axios.post(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    { chat_id: telegram_user_id, text }
  );

  res.json({ ok: true });
});

app.listen(3456, () => console.log('Trigger server on 3456'));
```

### 5.2 Dashboard API Route

**File:** `app/api/trigger/[action]/route.ts`

```typescript
export async function POST(
  req: Request,
  { params }: { params: { action: string } }
) {
  const session = await getServerSession();
  if (!session) return Response.json({ error: 'Unauth' }, { status: 401 });

  const account = await db.account.findUnique({
    where: { id: session.user.id }
  });

  if (!account?.telegram_user_id) {
    return Response.json({ error: 'Telegram not linked' }, { status: 400 });
  }

  await fetch(`${process.env.VPS_TRIGGER_URL}/trigger`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.DASHBOARD_TRIGGER_SECRET,
      telegram_user_id: account.telegram_user_id,
      action: params.action,
    }),
  });

  return Response.json({ ok: true });
}
```

### 5.3 Environment Variables Required

**Vercel (dashboard):**
```
GITHUB_TOKEN=           # Read-only PAT for private repo
GITHUB_REPO=            # owner/repo-name
VPS_TRIGGER_URL=        # http://[VPS-IP]:3456
DASHBOARD_TRIGGER_SECRET=  # random secret, shared with VPS
NEXTAUTH_SECRET=
DATABASE_URL=           # Postgres (Supabase or Vercel Postgres)
```

**VPS (`/opt/safehand-trigger/.env`):**
```
TELEGRAM_BOT_TOKEN=
DASHBOARD_TRIGGER_SECRET=  # same as dashboard side
```

---

## 6. GitHub Data Layer

### 6.1 How the Dashboard Reads the Repo

Use the GitHub Contents API. No cloning, no webhooks needed for the demo.

**Utility function:**

```typescript
// lib/github.ts
const GITHUB_API = 'https://api.github.com';
const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github.v3+json',
};

export async function getRepoFile(path: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`,
    { headers, next: { revalidate: 300 } } // cache 5 minutes
  );
  if (!res.ok) return null;
  const data = await res.json();
  // GitHub returns base64-encoded content
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

export async function getRepoDirectory(path: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${process.env.GITHUB_REPO}/contents/${path}`,
    { headers, next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  return res.json(); // returns array of file metadata
}
```

**Usage in page:**
```typescript
// app/dashboard/hazards/page.tsx
import { getRepoFile } from '@/lib/github';

export default async function HazardsPage() {
  const raw = await getRepoFile('hazard-register.json');
  const hazards = raw ? JSON.parse(raw) : [];
  return <HazardRegisterView hazards={hazards} />;
}
```

### 6.2 File Structure the Dashboard Expects in the Repo

Hermes must write files at these paths. Add this to the Hermes agent PRD or instruct Hermes directly.

```
/hazard-register.json
/training-matrix.json
/action-items.json
/workers.json
/sops/[sop-name].md
/inspections/[date]-[type].md
/weekly-summaries/[YYYY-WW].md
```

> **Note for Hermes:** When you write safety data to disk, always write to these exact paths. The dashboard cannot find data at arbitrary filenames. Confirm file paths after creating each skill.

---

## 7. Database Schema

Use Supabase or Vercel Postgres. Prisma recommended.

```prisma
model Account {
  id                String   @id @default(cuid())
  email             String   @unique
  password_hash     String
  business_name     String?
  industry          String?
  jurisdiction      String?
  worker_count      Int?
  telegram_user_id  String?  @unique
  telegram_linked   Boolean  @default(false)
  github_repo       String?
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
}

model PairingCode {
  id          String   @id @default(cuid())
  account_id  String
  code        String   @unique
  expires_at  DateTime
  used        Boolean  @default(false)
  created_at  DateTime @default(now())
}
```

---

## 8. Agenthon Demo Scope

Build only what the judges will see. Cut everything else.

### In Scope for Demo

| Feature | Priority |
|---------|----------|
| Landing page | P0 |
| Account signup + login | P0 |
| Business profile + Telegram pairing | P0 |
| Dashboard home with program health | P0 |
| Hazard register viewer | P0 |
| Client package trigger button | P0 |
| Training matrix viewer | P1 |
| Action items list | P1 |
| Settings page (Telegram status) | P1 |
| SOP library viewer | P2 |
| Weekly reports archive | P2 |

### Explicitly Out of Scope for Demo

- Multi-tenant isolation (one demo account only)
- Worker-facing interface
- Mobile-optimised layout (desktop only for demo)
- Real-time data sync (GitHub nightly is fine)
- Email notifications
- Billing / subscription management
- Role-based access (owner-only for now)

### Demo Data Fallback

If the live Hermes agent hasn't generated enough real data by demo day, seed the GitHub repo with realistic JSON files. The dashboard reads JSON — it cannot tell the difference. Have seed data ready.

**Seed files location:** `/demo-seed/` in this repo — copy to GitHub repo before demo.

---

## 9. Visual Design Direction

**Tone:** Industrial utility — not consumer SaaS, not corporate enterprise. This tool is used on job sites. The UI should feel like a serious piece of field equipment software, not a marketing dashboard.

**Palette:**
- Primary: `#1A4D2E` (deep forest green — safety, authority)
- Accent: `#F5A623` (amber — warning states, CTAs)
- Danger: `#C0392B` (expired certs, high-severity hazards)
- Background: `#F4F1EC` (warm off-white — not clinical)
- Text: `#1C1C1C`

**Typography:**
- Display: IBM Plex Mono (for data, codes, IDs — signals precision)
- Body: DM Sans (clean, readable at small sizes)

**Key design rules:**
- Status is communicated by colour only — no ambiguous icons
- Every read-only view has a visible CTA pointing to Telegram (don't hide the channel relationship)
- Data freshness timestamp shown on every data view ("Last synced: 3 hours ago")
- No animations on data tables — this is for field use, not to impress
- Mobile layout: defer to v2. Demo is desktop.

---

## 10. Build Sequence (Agenthon Timeline)

Work in this order. Do not skip ahead.

### Day 1
- [ ] Next.js project init + Vercel deploy (get CI/CD working first)
- [ ] Auth setup (Clerk recommended for speed — pre-built UI)
- [ ] Database setup (Supabase — free tier, instant)
- [ ] GitHub data layer (`lib/github.ts` + test read from repo)
- [ ] Telegram pairing flow (backend only — pairing code generate + verify)
- [ ] Dashboard home page (even with empty/seed data)

### Day 2
- [ ] Hazard register viewer (most important data view)
- [ ] Training matrix viewer
- [ ] Action items list
- [ ] VPS trigger endpoint (Express server on VPS)
- [ ] Client package trigger button wired end-to-end
- [ ] Landing page

### Day 3 (Demo Day Buffer)
- [ ] Seed data in GitHub repo (fallback if Hermes hasn't populated it)
- [ ] Full demo run-through: onboarding → hazard view → package trigger → receive in Telegram
- [ ] Fix whatever breaks
- [ ] Record a fallback video of the full demo flow

---

## 11. Risks and Mitigations

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Hermes hasn't written structured JSON to GitHub by demo day | High | Seed the repo manually. The agent PRD specifies file paths — confirm Hermes writes to them early. |
| VPS trigger endpoint unreachable from Vercel | Medium | Test the endpoint behind the VPS IP. Open port 3456 in the firewall. |
| Telegram pairing breaks during live demo | Medium | Have a pre-linked account ready. Don't demo the pairing live if you're not confident it works. |
| GitHub API rate limits (60 req/hr unauthenticated) | Low | Always use authenticated requests. Authenticated limit is 5,000/hr. |
| Context rot in Hermes during demo session | Medium | Run the demo from a fresh Hermes session. Don't try to demo mid-conversation. |

---

## 12. What This Dashboard Is Not

Repeat this to yourself before adding any feature:

- It is **not a chat interface** — no text input box, no conversation history
- It is **not a form** — no safety data is entered here
- It is **not the primary interface** — Telegram is where owners work
- It is **not a compliance certification** — language throughout must say "aligns with" not "certifies"
- It is **not multi-tenant** for the demo — one owner, one agent, one repo

---

## 13. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-14 | Initial dashboard PRD — Framing A, Agenthon scope |

---

*SafeHand Dashboard PRD — Companion to SafeHand Agent PRD v1.0 | Private and Confidential*