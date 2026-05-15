# SafeHand Web Dashboard

SafeHand is a Next.js dashboard for small employers to review OH&S program state and trigger predefined Hermes actions.

## Product Model

- Dashboard is **read-mostly**.
- Hermes (Telegram) is the **operational write surface**.
- Safety artifacts are read from a private GitHub repository.
- Live actions are sent from dashboard -> VPS trigger endpoint -> Telegram.

## Features Included

- Landing page with sign-up/sign-in CTAs
- Clerk authentication routes
- Onboarding wizard
  - business profile
  - Telegram pairing code generation
  - pairing status polling
  - Telegram confirm callback API
- Protected dashboard with onboarding/layout guard
- Dashboard pages
  - overview
  - hazards
  - training
  - actions
  - SOP library
  - reports
  - package trigger
  - settings
- Trigger API for Hermes actions
- GitHub data readers + Program Health Score

---

## Installation Guide

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL connection string
- Clerk application keys
- GitHub token with read access to the safety repository

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment

Create `.env.local`:

```bash
# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# GitHub read layer
GITHUB_TOKEN=
GITHUB_REPO_OWNER=
GITHUB_REPO_NAME=
# Optional fallback format:
# GITHUB_REPO=owner/repo

# Trigger integration
VPS_TRIGGER_URL=
DASHBOARD_TRIGGER_SECRET=
TELEGRAM_CONFIRM_SECRET=
```

### 3) Generate Prisma client

```bash
pnpm prisma generate
```

### 4) Run development server

```bash
pnpm dev
```

App URL: [http://localhost:3000](http://localhost:3000)

### 5) Optional validation

```bash
pnpm lint
pnpm build
```

---

## Project Manual

### How to use the app (Operator flow)

1. Open the landing page and create/sign in to account.
2. Complete onboarding profile (business name, industry, jurisdiction, worker count).
3. Generate pairing code and send `/start <code>` to Telegram bot.
4. Wait for pairing confirmation and redirect to dashboard.
5. Use dashboard for review/trigger only:
   - read hazard, training, actions, SOPs, reports
   - trigger `client-package`, `toolbox-talk`, or `weekly-summary`

### Dashboard behavior

- No direct safety data entry in dashboard.
- All compliance/safety writes happen through Hermes.
- Pairing code is single-use and expires in 10 minutes.
- Route guard redirects incomplete users to onboarding.

### Trigger actions

Current supported actions:

- `client-package`
- `toolbox-talk`
- `weekly-summary`

---

## Developer Manual

### Key directories

- `src/app/onboarding` -> onboarding route
- `src/app/dashboard` -> dashboard routes + layout guard
- `src/app/api` -> route handlers (pairing, settings, trigger APIs)
- `src/components/dashboard` -> dashboard UI components
- `src/components/onboarding` -> onboarding client flow
- `src/lib` -> prisma, account helpers, GitHub readers, scoring logic
- `prisma` -> schema and Prisma config

### Common commands

```bash
pnpm dev
pnpm lint
pnpm build
pnpm prisma generate
```

### Notes on Prisma 7

This project uses Prisma with adapter-based runtime setup in `src/lib/prisma.ts`.
If you see:

`PrismaClientConstructorValidationError: Using engine type "client" requires either "adapter" or "accelerateUrl"...`

confirm:

- `@prisma/adapter-pg` and `pg` are installed
- `DATABASE_URL` is set
- Prisma client has been regenerated with `pnpm prisma generate`

---

## Security Notes

- Never expose `DASHBOARD_TRIGGER_SECRET` or `TELEGRAM_CONFIRM_SECRET` to client code.
- Keep Telegram confirm callback protected with shared secret header.
- Add rate limiting + request logging to trigger/confirm APIs before production release.
- Use least-privilege GitHub token (read-only where possible).
