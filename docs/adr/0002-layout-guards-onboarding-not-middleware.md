# Dashboard layout guards onboarding completion, not middleware

The `(dashboard)` route group layout is a React Server Component that fetches the `Account` record for the authenticated Clerk user. If no `Account` exists, it calls `redirect('/onboarding')`. This is the sole enforcement point for onboarding completion.

## Considered Options

**Middleware edge check** — query the DB from `middleware.ts`. Rejected: Prisma doesn't run on the edge runtime; a raw fetch to an internal API route to do a DB lookup from middleware is indirect and harder to test.

**Clerk `publicMetadata` flag** — write `onboardingComplete: true` to Clerk metadata on onboarding completion; read it from the session token in middleware. Rejected: requires keeping two sources of truth in sync (Clerk metadata + Supabase Account record). A bug that updates one but not the other creates a stuck user.

**Layout server component** (chosen) — the `(dashboard)/layout.tsx` server component runs on every dashboard request anyway. A single `prisma.account.findUnique({ where: { clerkUserId } })` call, and `redirect('/onboarding')` if null. One source of truth, testable, no edge constraints.

## Consequences

Every page under `(dashboard)/` inherits this guard automatically. The `Account` record fetched by the layout is passed down as a prop to child layouts and pages to avoid duplicate DB calls per request.
