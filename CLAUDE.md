# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Trickest is a skateboarding challenge platform built with Next.js 14, where skaters submit video submissions of tricks for different difficulty levels, and judges evaluate them. The platform includes user authentication (Google OAuth + credentials), profile management, team features, and a scoring system.

## Commands

### Development
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate           # Generate Prisma Client (runs automatically on postinstall)
npx prisma migrate dev        # Create and apply migration
npx prisma migrate deploy     # Apply migrations in production
npx prisma db push            # Push schema changes without migration
npx prisma studio             # Open Prisma Studio GUI
npm run seed                  # Seed database with test data (creates admin, judges, challenges)
node scripts/check_db_user.js # Debug database connection and verify user
```

**Note:** The seed script creates test users (admin@trickest.com, judge1-3@trickest.com) all with password `password123`.

## Architecture

### Database & Authentication

- **Database:** PostgreSQL via Prisma ORM
  - Uses Supabase with connection pooling (DATABASE_URL port 6543) and direct connections (DIRECT_URL port 5432)
  - Main models: User, SocialMedia, WishSkate, Challenge, Submission, Team
  - Users are identified by email (not ID) across relationships

- **Authentication:** NextAuth.js v4 with dual provider strategy
  - Google OAuth: Auto-creates users with `profileStatus: 'basic'` and `password: null`
  - Credentials: Email/password login using bcrypt
  - Session stored in JWT with custom fields: `profileStatus`, `hasPassword`, `role`
  - Auth route: `src/app/api/auth/[...nextauth]/route.ts`
  - Type definitions: `src/types/next-auth.d.ts`

### User System & Roles

Three role types managed via `User.role` field:
- **skater** (default): Can submit trick videos, manage profile, join teams
- **judge**: Can evaluate submissions in addition to skater features
- **admin**: Full access (currently same as judge + ownership privileges)

Role helpers in `src/lib/auth-helpers.ts`: `getUserRole()`, `isJudge()`, `isAdmin()`, `canEvaluateSubmissions()`

### Profile Status Flow

Users progress through status states in `User.profileStatus`:
1. **basic** - Only Google OAuth data, no password set
2. **complete** - Full profile with password, personal info, and skate data

Modals guide users through completion:
- `SetPasswordModal` - Password creation for Google users
- `SkateProfileCompletionModal` - Multi-step profile completion (general info, dream setup, social media)
- `WelcomeModal` - Post-completion welcome screen

### Application Structure

**Route Groups:**
- `src/app/(routes)/` - Public pages and dashboards
  - `dashboard/skaters/` - Skater features (profile, tricks, achievements)
  - `dashboard/judges/` - Judge features (evaluate submissions)
  - `dashboard/jueces/` - Legacy judge routes (consider consolidating)

**API Routes:** `src/app/api/`
- `auth/` - NextAuth endpoints, registration, password setting
- `skate_profiles/` - Profile data endpoints (general_info, dream_setup, social_media)
- `submissions/` - Trick submission management (pending, evaluate)
- `users/` - User data endpoints (score)

**Components:**
- `src/components/` - Shared UI components
- `src/components/sidebar/` - Dashboard navigation (Sidebar.tsx for skaters, SidebarJuez.tsx for judges)
- Modals: Registration, login, profile completion flows

**Providers:**
- `SessionWrapper` in `src/providers/` wraps app with NextAuth session

### Challenge System

- **10 difficulty levels** + 1 bonus challenge seeded in database
- Each challenge has: name, description, demoVideoUrl (YouTube), difficulty, points
- Submissions link users to challenges with status: "pending" → "approved"/"rejected"
- Judges evaluate submissions and assign scores (0-100) plus feedback

### Styling

- **Tailwind CSS** with NextUI components (`@nextui-org/react`)
- Custom colors defined in `tailwind.config.ts`: watermelon, melon, budGreen, dartmouthGreen, darkBg
- Framer Motion for animations
- TSParticles for visual effects

### Key Patterns

1. **Prisma Client:** Always import from `@/app/lib/prisma` (not direct PrismaClient) to ensure singleton pattern in development
2. **Path Aliases:** Use `@/*` to import from `src/*`
3. **Image Domains:** Configured in `next.config.mjs` for external images (Google, Unsplash, etc.)
4. **ESLint:** Disabled during builds (`ignoreDuringBuilds: true`)

### Environment Variables

Required variables (see `.env.example`):
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
- `DATABASE_URL` (port 6543 with pgbouncer), `DIRECT_URL` (port 5432)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_BACKEND_URL`

## Important Notes

- Users are uniquely identified by **email** (not numeric ID) in most relationships
- When creating migrations, always test with both `DATABASE_URL` and `DIRECT_URL`
- Password hashing uses bcrypt with 10 rounds
- NextAuth callbacks query the database on every JWT/session operation to keep role/status fresh
