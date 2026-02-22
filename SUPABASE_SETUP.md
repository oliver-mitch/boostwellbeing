# Supabase Setup & Password Reset Guide

## Current Status

Your Supabase project appears to be **paused** (free tier projects pause after 7 days of inactivity).

## How to Reactivate Supabase

1. Go to [supabase.com](https://supabase.com) and sign in
2. Find your project: `rrhbwtinpnsjwivtrqcx`
3. Click the **"Restore"** or **"Unpause"** button
4. Wait 2-5 minutes for the database to fully restore

## After Reactivating

### Run Database Migrations

Once your Supabase project is active, run the migrations to set up the password reset table:

1. Install Supabase CLI if not already installed:
   ```bash
   npm install -g supabase
   ```

2. Link to your project:
   ```bash
   supabase link --project-ref rrhbwtinpnsjwivtrqcx
   ```

3. Push migrations:
   ```bash
   supabase db push
   ```

   Or manually run the SQL from `supabase/migrations/003_password_reset.sql` in the Supabase SQL Editor.

## Features Now Available

### 1. Health Check Endpoint

Check if Supabase is connected:
```
GET https://boostwellbeing.co.nz/api/health/supabase
```

This returns:
- `200 OK` if Supabase is healthy
- `503 Service Unavailable` if Supabase is paused/disconnected
- `500 Internal Server Error` if there's another issue

### 2. Password Reset Flow

#### Request Password Reset
- Visit: `https://boostwellbeing.co.nz/portal/forgot-password`
- Or use the "Forgot password?" link on the login page
- Enter your email address
- A reset token will be generated and emailed via Resend
- The token is valid for 1 hour
- Requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL` env vars in Vercel

#### Complete Password Reset
- Click the reset link (or manually visit with token)
- Enter new password (min 8 characters)
- Confirm password
- Submit to update

### 3. Default Admin Account

**Email:** `admin@boostwellbeing.co.nz`
**Password:** `AdminPass123!`

⚠️ **IMPORTANT:** Change this password immediately after first login!

## Testing the System

### Test Supabase Connection
```bash
curl https://boostwellbeing.co.nz/api/health/supabase
```

### Test Password Reset (Request)
```bash
curl -X POST https://boostwellbeing.co.nz/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@boostwellbeing.co.nz"}'
```

## Email Service (Resend)

Password reset emails are sent via [Resend](https://resend.com). The implementation is in `src/lib/email.ts`.

### Setup
1. Create an account at [resend.com](https://resend.com)
2. Verify your domain (`boostwellbeing.co.nz`)
3. Create an API key
4. Add environment variables in Vercel:
   ```bash
   vercel env add RESEND_API_KEY
   vercel env add RESEND_FROM_EMAIL  # e.g. noreply@boostwellbeing.co.nz
   ```

## Database Tables

### portal_users
- Stores user accounts
- Fields: id, email, name, password_hash, is_admin, company_name

### password_reset_tokens
- Stores password reset tokens
- Fields: id, user_id, token, used, expires_at, created_at
- Tokens expire after 1 hour
- Can only be used once

### invite_tokens
- Stores invite tokens for new user registration
- Fields: id, token, email, company_name, created_by, used, expires_at

## Security Features

✅ Password hashing with bcrypt (10 rounds)
✅ Email enumeration protection (always returns success)
✅ Token expiry (1 hour)
✅ Single-use tokens
✅ Secure random token generation
✅ HTTPS only (enforced by Vercel)
✅ Row Level Security (RLS) enabled on all tables

## Troubleshooting

### "Invalid email or password" on correct credentials
- **Cause:** Supabase project is paused
- **Fix:** Reactivate Supabase as described above

### Reset token not working
- **Check:** Token hasn't expired (1 hour limit)
- **Check:** Token hasn't been used already
- **Check:** Migrations have been run on production database

### Health check returns 503
- **Cause:** Supabase is paused or disconnected
- **Fix:** Reactivate Supabase

## Support

For issues or questions:
- Check Vercel logs: `vercel logs boostwellbeing.co.nz`
- Check Supabase logs in the Supabase dashboard
- Contact support: contact@boostwellbeing.co.nz
