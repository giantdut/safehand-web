@AGENTS.md

# SafeHand Agent Context (Web Dashboard)

This file extends the base workspace rules with project-specific context for SafeHand.

## Product Model

- The web app is a read-mostly dashboard.
- Hermes on Telegram is the operational write surface.
- Safety artifacts are read from a GitHub repo.
- Live actions are triggered from dashboard -> VPS endpoint -> Telegram bot.

## Current Scope Implemented

- Clerk sign-up/sign-in routes.
- Onboarding wizard with:
  - business profile capture
  - pairing code generation
  - pairing status polling
  - telegram confirm callback API
- Dashboard route guard enforced in layout.
- Dashboard views:
  - overview
  - hazards
  - training
  - actions
  - SOP library
  - weekly reports
  - package trigger
  - settings
- Trigger API for Hermes actions.

## Implementation Constraints

- Use `pnpm` only.
- Keep server on port `3000`.
- Prefer modular reuse over duplication.
- Build UI from `src/components/ui`.
- Keep dashboard read-only for safety data; direct data mutation belongs to Hermes flows.

## Security and Reliability

- Never expose `DASHBOARD_TRIGGER_SECRET` or `TELEGRAM_CONFIRM_SECRET` to the client.
- Keep Telegram confirm endpoint protected with shared-secret header.
- Pairing codes are single-use with TTL.
- Add rate limiting and request logging to trigger/confirm APIs before production release.

## Known Build Gap

The app currently passes lint but production build still needs Prisma 7 runtime adapter (or Accelerate URL) wiring for the active engine mode.
