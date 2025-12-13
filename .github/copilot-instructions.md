# Copilot Instructions for AI Coding Agents

## Project Overview

- This is a Next.js 14+ project using the App Router, TypeScript, and Tailwind CSS.
- The app is a movie shop with user authentication, admin dashboard, cart, checkout, and order management.
- Data is managed via Prisma ORM with a PostgreSQL database. Prisma schema and migrations are in the `prisma/` directory.

## Key Architecture & Patterns

- **App Structure:**
  - Main app code is in `src/app/` using the App Router convention.
  - Route groups: `(auth)`, `admin/`, `cart/`, `checkout/`, `orders/`, and API routes under `api/`.
  - Shared UI components are in `src/app/components/ui/`.
- **Data Access:**
  - Use the `prisma` client from `@/app/lib/prisma` for all DB access.
  - Business logic and helpers are in `src/app/lib/`.
- **Authentication:**
  - Auth logic is in `src/app/lib/auth.ts` and API route `src/app/api/auth/[...betterauth]/route.ts`.
  - Use `auth.getSession()` to get the current user/session.
- **Admin Patterns:**
  - Admin-only pages check `session.user.role === 'admin'`.
  - Example: see `src/app/admin/page.tsx` for dashboard logic.
- **Soft Deletes:**
  - Movies use a `deleted: false` filter for soft deletion (see admin dashboard).

## Developer Workflows

- **Build:** `next build` (see `package.json` for scripts)
- **Dev:** `next dev` (hot reload)
- **Prisma:**
  - Migrate: `npx prisma migrate dev`
  - Generate: `npx prisma generate`
  - Seed: `npx tsx prisma/seed.ts`
- **Tailwind:** Config in `tailwind.config.js`, styles in `globals.css`.

## Conventions & Tips

- Use absolute imports with `@/` alias (see `tsconfig.json`).
- Keep business logic out of components; use helpers in `lib/`.
- Use async/await for all DB and API calls.
- UI components are atomic and reusable; extend from `components/ui/`.
- For new features, follow the folder structure and naming conventions in `src/app/`.

## Integration Points

- Prisma client is generated in `src/generated/prisma/` (do not edit manually).
- All DB schema changes must be reflected in `prisma/schema.prisma` and migrated.
- Auth integrates with session-based logic; see `lib/auth.ts` and API route.

## References

- Example admin dashboard: `src/app/admin/page.tsx`
- Prisma schema: `prisma/schema.prisma`
- Main entry: `src/app/page.tsx`, layout: `src/app/layout.tsx`
- UI library: `src/app/components/ui/`

---

For questions or unclear patterns, ask for clarification or check referenced files.
