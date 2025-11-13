# Client Portal Integration Guide

## Overview

A secure client portal has been integrated into the BoostWellbeing website. This portal will eventually house the full planSelector functionality for interactive health plan selection.

## Current Status

### ✅ Completed
- Authentication system using NextAuth.js
- Protected `/portal` route with login page
- Session management
- Basic portal dashboard UI
- Environment configuration

### 🚧 In Progress
- Full planSelector component integration
- Supabase backend connection for data persistence
- Family member management
- Real-time cost calculations

## Access

### Portal URL
- **Development**: `http://localhost:3000/portal`
- **Production**: `https://boostwellbeing.co.nz/portal`

### Test Credentials (Temporary)
- **Email**: `client@boostwellbeing.co.nz`
- **Password**: `temppassword`

**⚠️ Important**: These are temporary hardcoded credentials for development. Replace with proper database authentication before production deployment.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts           # NextAuth API route
│   ├── portal/
│   │   ├── page.tsx                   # Portal dashboard
│   │   └── login/
│   │       └── page.tsx               # Login page
│   ├── providers.tsx                  # SessionProvider wrapper
│   └── layout.tsx                     # Root layout (updated)
├── lib/
│   └── auth.ts                        # NextAuth configuration
├── data/
│   └── rateData.ts                    # Health plan rate data (copied from planSelector)
└── components/
    └── portal/                        # Portal-specific components (to be added)
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# For Supabase integration (when ready)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Generating NEXTAUTH_SECRET

For production, generate a secure secret:
```bash
openssl rand -base64 32
```

## Next Steps

### 1. Integrate PlanSelector Components
The planSelector React app has been cloned to `../planSelector`. Key components to migrate:
- `PlanSelector.tsx` - Main plan selection interface
- `FamilyMembers.tsx` - Family member management
- `CostSummary.tsx` - Real-time cost calculations

### 2. Set up Supabase
- Create Supabase project
- Set up tables for storing user selections
- Add authentication integration

### 3. Replace Temporary Auth
Current auth uses hardcoded credentials. Replace with:
- Database-backed user authentication
- Email verification
- Password reset functionality
- Role-based access control

### 4. Deploy

#### Update Production Environment Variables
In Vercel dashboard, add:
- `NEXTAUTH_URL=https://boostwellbeing.co.nz`
- `NEXTAUTH_SECRET=<generated-secret>`
- Supabase credentials

## Development

### Run Locally
```bash
npm run dev
```

Visit `http://localhost:3000/portal/login` to test the portal.

### Build
```bash
npm run build
```

## Security Notes

1. **Current Auth**: Using temporary hardcoded credentials
2. **Session**: JWT-based sessions with NextAuth
3. **Protected Routes**: Portal pages check authentication status
4. **HTTPS**: Ensure HTTPS is used in production

## Dependencies Added

- `next-auth` - Authentication
- `@next-auth/prisma-adapter` - Database adapter (for future use)
- `bcryptjs` - Password hashing (for future use)
- `@supabase/supabase-js` - Supabase client

## References

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [planSelector Repository](https://github.com/oliver-mitch/planSelector)
- [Supabase Documentation](https://supabase.com/docs)
