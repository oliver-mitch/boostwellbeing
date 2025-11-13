# PlanSelector Integration - Quick TODO Checklist

## 🚀 Quick Start for Claude Code

**Prompt to use**:
```
Complete the planSelector integration using TODO_PLANSELECTOR.md and PLANSELECTOR_INTEGRATION_PLAN.md as guides. Start with the Component Migration section.
```

---

## ✅ Component Migration (START HERE)

### 1. Create Type Definitions
- [ ] Create `src/types/portal.ts`
- [ ] Export `FamilyMember` interface
- [ ] Export any other shared types

### 2. Migrate Components
- [ ] Copy `PlanSelector.tsx` to `src/components/portal/`
  - [ ] Update imports
  - [ ] Add 'use client' directive
  - [ ] Test rendering

- [ ] Copy `FamilyMembers.tsx` to `src/components/portal/`
  - [ ] Update imports
  - [ ] Add 'use client' directive
  - [ ] Test add/edit/delete functionality

- [ ] Copy `CostSummary.tsx` to `src/components/portal/`
  - [ ] Update imports
  - [ ] Add 'use client' directive
  - [ ] Test cost calculations

### 3. Create Plan Selector Page
- [ ] Create `src/app/portal/plan-selector/page.tsx`
- [ ] Add authentication check
- [ ] Integrate all three components
- [ ] Add header with logout button
- [ ] Test full flow

---

## 💾 Supabase Integration

### 1. Setup
- [ ] Create Supabase project at supabase.com
- [ ] Copy URL and anon key to `.env.local`
- [ ] Test connection

### 2. Database
- [ ] Create tables (users, plans, family_members)
- [ ] Test with manual inserts
- [ ] Create `src/lib/supabase.ts` client

### 3. Save/Load Features
- [ ] Create `src/lib/planStorage.ts`
- [ ] Add save function
- [ ] Add load function
- [ ] Add UI buttons to plan selector page
- [ ] Test save and load

---

## 🔐 Real Authentication

### 1. Choose Auth Method
- [ ] Decide: Supabase Auth, Prisma, or NextAuth DB adapter
- [ ] Set up chosen method

### 2. Update Auth
- [ ] Remove hardcoded credentials from `src/lib/auth.ts`
- [ ] Add database user lookup
- [ ] Add password hashing

### 3. User Management
- [ ] Create registration page
- [ ] Create password reset flow
- [ ] Test complete auth flow

---

## 🎨 Polish (Optional but Recommended)

- [ ] Add PDF export
- [ ] Add email quote functionality
- [ ] Mobile optimization
- [ ] Plan comparison feature

---

## 🧪 Testing & Deploy

### Before Production
- [ ] Test all user flows manually
- [ ] Add unit tests
- [ ] Security audit
- [ ] Update production environment variables
- [ ] Remove all test/temporary credentials

### Deploy
- [ ] Build locally (`npm run build`)
- [ ] Commit and push
- [ ] Test on Vercel preview
- [ ] Merge to main
- [ ] Test production site

---

## 📊 Current Status

**✅ Completed**:
- Authentication foundation
- Portal structure
- Rate data migration
- Protected routes

**🚧 In Progress**:
- Component migration

**⏳ Not Started**:
- Supabase integration
- Real authentication
- Polish features

---

## 🔗 File Locations

**Source** (planSelector):
- `../planSelector/src/components/PlanSelector.tsx`
- `../planSelector/src/components/FamilyMembers.tsx`
- `../planSelector/src/components/CostSummary.tsx`
- `../planSelector/src/App.tsx` (for state management reference)

**Target** (boostwellbeing):
- `src/components/portal/` (create this directory)
- `src/app/portal/plan-selector/page.tsx` (create)
- `src/types/portal.ts` (create)
- `src/lib/supabase.ts` (create)
- `src/lib/planStorage.ts` (create)

**Existing**:
- `src/data/rateData.ts` ✅ Already copied
- `src/lib/auth.ts` ✅ Needs update later
- `src/app/portal/page.tsx` ✅ Portal dashboard
- `src/app/portal/login/page.tsx` ✅ Login page

---

## 💡 Tips for Claude Code

1. **Start with Phase 1** - Get components rendering first
2. **Test incrementally** - Run `npm run dev` after each component
3. **Check imports** - All `../` imports need to become `@/` imports
4. **Use 'use client'** - All interactive components need this directive
5. **Reference the plan** - See `PLANSELECTOR_INTEGRATION_PLAN.md` for details

---

## 🆘 If You Get Stuck

**Build errors?**
- Check all imports use `@/` paths
- Ensure all components have 'use client' directive
- Run `npm run build` to see detailed errors

**Auth not working?**
- Check `.env.local` exists with NEXTAUTH_URL and NEXTAUTH_SECRET
- Test login at `/portal/login`
- Check browser console for errors

**Components not rendering?**
- Check the data imports work
- Look for missing dependencies
- Check browser console

---

## 📝 Commit Strategy

Good commit points:
1. After migrating type definitions
2. After each component migration
3. After plan selector page works
4. After Supabase integration
5. After auth update
6. After polish features
7. Before deployment

Use descriptive commit messages and test between commits!
