# Supabase Setup Guide

This directory contains the database migrations and setup instructions for the BoostWellbeing plan selector feature.

## Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: `boostwellbeing-prod` (or your preferred name)
   - Database Password: (generate a secure password)
   - Region: Choose closest to your users (e.g., ap-southeast-1 for NZ)
4. Click "Create new project" and wait for setup to complete

### 2. Run Database Migration

1. In your Supabase project dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy the contents of `migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click "Run" to execute the migration
6. Verify tables were created in the **Table Editor**

You should see three tables:
- `portal_users`
- `user_plans`
- `family_members`

### 3. Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 4. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and update the Supabase values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Make sure `.env.local` is in your `.gitignore` (it should be by default)

### 5. Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/portal/plan-selector`
3. Try saving a plan selection
4. Check the Supabase Table Editor to see if data was saved

## Database Schema

### portal_users
- Stores basic user information
- Links to NextAuth user email
- Used for associating plans with users

### user_plans
- Stores saved plan selections
- Each user can have multiple saved plans
- Contains plan_code and plan_name

### family_members
- Stores family member details for each plan
- Includes name, age, employee status
- Stores selected modules as JSONB

## Row Level Security (RLS)

The database is configured with Row Level Security policies that ensure:
- Users can only see their own data
- Users can only modify their own plans and family members
- Authentication is handled via NextAuth JWT tokens

## Troubleshooting

### Connection Issues

If you see "Failed to connect to Supabase":
1. Check your `.env.local` file has correct credentials
2. Verify the Supabase project is active (not paused)
3. Check browser console for specific error messages

### Permission Issues

If you see "permission denied" errors:
1. Verify RLS policies are enabled (they're created in the migration)
2. Check that you're logged in via NextAuth
3. Ensure your JWT token includes the email claim

### Data Not Saving

1. Check browser console for errors
2. Verify tables exist in Supabase Table Editor
3. Check Supabase Logs in the dashboard for server-side errors

## Maintenance

### Backing Up Data

Supabase automatically backs up your database. You can also:
1. Go to **Database** → **Backups** in Supabase dashboard
2. Download manual backups as needed

### Adding New Migrations

When you need to modify the schema:
1. Create a new file: `migrations/002_your_change.sql`
2. Write your SQL changes
3. Run it in the SQL Editor
4. Commit the migration file to git

## Security Notes

- Never commit `.env.local` to git
- Never expose your `service_role` key (only use `anon` key in frontend)
- RLS policies are critical - don't disable them
- Use environment variables for all sensitive data
