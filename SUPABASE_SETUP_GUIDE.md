# Supabase Setup - Step-by-Step Guide

## Quick Setup (10 Minutes)

### Step 1: Create Supabase Account & Project

1. **Go to Supabase**
   - Open: https://supabase.com
   - Click "Start your project"
   - Sign in with GitHub (recommended) or email

2. **Create New Project**
   - Click "New Project"
   - Fill in:
     - **Name**: `boostwellbeing` (or your choice)
     - **Database Password**: Click "Generate a password" and save it!
     - **Region**: Choose `ap-southeast-1` (Singapore - closest to NZ)
     - **Pricing Plan**: Free tier is fine for development
   - Click "Create new project"
   - Wait 2-3 minutes for setup to complete

### Step 2: Run Database Migration

1. **Open SQL Editor**
   - In your Supabase project dashboard
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

2. **Copy Migration SQL**
   - Open the file: `supabase/migrations/001_initial_schema.sql` in your project
   - Copy ALL the contents (it's about 133 lines)

3. **Run Migration**
   - Paste into the SQL editor
   - Click "Run" button (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Verify Tables Created**
   - Click "Table Editor" in left sidebar
   - You should see 3 new tables:
     - `portal_users`
     - `user_plans`
     - `family_members`

### Step 3: Get API Credentials

1. **Navigate to Settings**
   - Click ⚙️ "Settings" in left sidebar
   - Click "API" section

2. **Copy Your Credentials**
   - **Project URL**: Copy the URL (looks like `https://xxxxx.supabase.co`)
   - **anon public key**: Under "Project API keys", copy the `anon` key (NOT the service_role key!)

### Step 4: Update Environment Variables

1. **Open `.env.local`**
   - In your boostwellbeing project root
   - If it doesn't exist, copy from `.env.local.example`

2. **Add Supabase Credentials**
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=development-secret-key-change-in-production

   # Add these lines:
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Replace the values**:
   - Replace `https://your-project-id.supabase.co` with your actual Project URL
   - Replace `your-anon-key-here` with your actual anon public key

4. **Save the file**

### Step 5: Test the Connection

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Login to Portal**
   - Go to: http://localhost:3000/portal/login
   - Email: `client@boostwellbeing.co.nz`
   - Password: `temppassword`

3. **Test Plan Selector**
   - Navigate to: http://localhost:3000/portal/plan-selector
   - Add a family member
   - Select a plan
   - Choose some modules

4. **Test Save/Load**
   - Click "Save Current Selection"
   - Enter a name like "My Family Plan"
   - Click Save
   - Refresh the page
   - Click "Load Saved Plans"
   - You should see your saved plan!

5. **Verify in Supabase**
   - Go back to Supabase dashboard
   - Click "Table Editor"
   - Click on `user_plans` table
   - You should see your saved plan!

---

## ✅ Success Checklist

- [ ] Supabase project created
- [ ] Database password saved securely
- [ ] Migration SQL executed successfully
- [ ] 3 tables visible in Table Editor
- [ ] Project URL copied
- [ ] Anon key copied
- [ ] `.env.local` updated with credentials
- [ ] Development server started
- [ ] Can login to portal
- [ ] Plan selector loads
- [ ] Can save a plan
- [ ] Can load saved plans
- [ ] Data visible in Supabase Table Editor

---

## 🎯 Production Setup (When Ready)

When deploying to production:

1. **Create Production Supabase Project**
   - Create a separate project for production
   - Use a different name (e.g., `boostwellbeing-prod`)
   - Choose same region
   - Run the same migration

2. **Update Vercel Environment Variables**
   - Go to Vercel dashboard
   - Open your project settings
   - Go to "Environment Variables"
   - Add:
     - `NEXT_PUBLIC_SUPABASE_URL` = your production URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your production anon key
     - `NEXTAUTH_URL` = `https://boostwellbeing.co.nz`
     - `NEXTAUTH_SECRET` = generate new secret with `openssl rand -base64 32`

3. **Deploy**
   - Push to main branch
   - Vercel will auto-deploy with new environment variables

---

## 🔒 Security Notes

### ✅ Safe to Use
- Project URL (starts with https://)
- `anon` public key (used in frontend)
- Both can be exposed in client-side code

### ⚠️ NEVER EXPOSE
- Database password (only for Supabase dashboard)
- `service_role` key (has admin access)
- Keep these in a password manager

### 🛡️ Row Level Security (RLS)
- Already enabled in the migration
- Users can only see their own data
- Prevents unauthorized access
- Don't disable RLS policies!

---

## 🐛 Troubleshooting

### "Failed to connect to Supabase"
- Check `.env.local` has correct URL and key
- Verify no extra spaces or quotes
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check Supabase project is active (not paused)

### "Permission denied" errors
- Make sure you're logged in to the portal
- Check RLS policies exist (run migration again if needed)
- Look in browser console for specific error

### Save button does nothing
- Open browser console (F12)
- Look for errors
- Verify Supabase credentials in `.env.local`
- Check Network tab for failed requests

### Can't see saved plans
- Check you're using the same email you logged in with
- Look in Supabase Table Editor → `user_plans`
- Verify data exists
- Check `email` field matches your login email

---

## 📊 Database Schema Reference

### portal_users
```sql
- id (UUID, primary key)
- email (TEXT, unique)
- name (TEXT, nullable)
- created_at (TIMESTAMP)
```

### user_plans
```sql
- id (UUID, primary key)
- user_id (UUID, references portal_users)
- plan_code (TEXT)
- plan_name (TEXT)
- email (TEXT) -- for RLS
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### family_members
```sql
- id (UUID, primary key)
- plan_id (UUID, references user_plans)
- name (TEXT)
- age (INTEGER)
- is_employee (BOOLEAN)
- selected_modules (JSONB array)
- created_at (TIMESTAMP)
```

---

## 🔄 Maintenance

### Backing Up Data
- Supabase auto-backs up daily
- Manual backup: Dashboard → Database → Backups
- Can download SQL dumps

### Adding Columns/Tables
1. Write SQL in a new migration file
2. Test locally first
3. Run in production SQL editor
4. Commit migration to git

### Monitoring Usage
- Dashboard → Settings → Usage
- Free tier limits:
  - 500 MB database
  - 1 GB bandwidth/month
  - 2 GB file storage
  - 50k monthly active users

---

## ✨ Next Steps After Setup

Once Supabase is working:

1. **Test thoroughly**
   - Create multiple plans
   - Test with different family sizes
   - Verify calculations are correct

2. **Consider Phase 3**: Real Authentication
   - Replace temp credentials
   - Add user registration
   - Implement password reset

3. **Consider Phase 4**: Polish Features
   - PDF export of plans
   - Email quotes to clients
   - Plan comparison tool

4. **Deploy to Production**
   - Set up prod Supabase
   - Configure Vercel env vars
   - Test thoroughly
   - Go live!

---

## 📞 Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Supabase Discord**: https://discord.supabase.com
- **Project Issues**: Check browser console and Supabase logs

---

Last Updated: 2025-01-13
Estimated Setup Time: 10-15 minutes
