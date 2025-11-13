# PlanSelector Integration - Complete Implementation Plan

## Overview
This plan outlines the step-by-step process to fully integrate the planSelector health insurance tool into the BoostWellbeing client portal.

**Source Repository**: `../planSelector` (React + Vite + TypeScript)
**Target Location**: `/portal` route in Next.js app

---

## Phase 1: Component Migration (Priority: HIGH)

### Task 1.1: Create Portal-Specific Type Definitions
**File**: `src/types/portal.ts`

```typescript
export interface FamilyMember {
  id: string;
  name: string;
  age: number;
  isEmployee: boolean;
  selectedModules: string[];
}
```

**Acceptance Criteria**:
- [ ] Types exported and usable across portal components
- [ ] Matches existing planSelector interface

---

### Task 1.2: Migrate PlanSelector Component
**Source**: `../planSelector/src/components/PlanSelector.tsx`
**Target**: `src/components/portal/PlanSelector.tsx`

**Changes Needed**:
- Change imports from `../App` to use `@/types/portal`
- Change data imports from `../data/rateData` to `@/data/rateData`
- Ensure 'use client' directive at top (Next.js requirement)

**Acceptance Criteria**:
- [ ] Component renders without errors
- [ ] Plan selection works
- [ ] Module selection for Wellbeing plans works
- [ ] All Lucide icons render correctly

---

### Task 1.3: Migrate FamilyMembers Component
**Source**: `../planSelector/src/components/FamilyMembers.tsx`
**Target**: `src/components/portal/FamilyMembers.tsx`

**Changes Needed**:
- Update imports to use `@/types/portal`
- Add 'use client' directive
- Ensure all event handlers work in Next.js

**Acceptance Criteria**:
- [ ] Can add family members
- [ ] Can edit name, age, and type
- [ ] Can delete members (except last one)
- [ ] Active member highlighting works
- [ ] Module count displays correctly

---

### Task 1.4: Migrate CostSummary Component
**Source**: `../planSelector/src/components/CostSummary.tsx`
**Target**: `src/components/portal/CostSummary.tsx`

**Changes Needed**:
- Update imports for data and types
- Add 'use client' directive
- Ensure sticky positioning works in Next.js

**Acceptance Criteria**:
- [ ] Monthly and annual costs calculate correctly
- [ ] Per-member breakdown displays
- [ ] 3rd+ child free rule applies correctly
- [ ] Chemotherapy module exception works
- [ ] All info banners display appropriately

---

### Task 1.5: Create Main PlanSelector Page
**File**: `src/app/portal/plan-selector/page.tsx`

**Implementation**:
```typescript
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FamilyMember } from '@/types/portal';
import PlanSelector from '@/components/portal/PlanSelector';
import FamilyMembers from '@/components/portal/FamilyMembers';
import CostSummary from '@/components/portal/CostSummary';

export default function PlanSelectorPage() {
  // Copy App.tsx logic here
  // Add authentication check
  // Add protected route logic
}
```

**Acceptance Criteria**:
- [ ] Page is protected (redirects to login if not authenticated)
- [ ] All three components render correctly
- [ ] State management works (family members, selected plan)
- [ ] Layout is responsive
- [ ] Header shows user info and logout button

---

## Phase 2: Data Persistence with Supabase (Priority: MEDIUM)

### Task 2.1: Set Up Supabase Project
**Manual Steps**:
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy URL and anon key to `.env.local`

**Acceptance Criteria**:
- [ ] Supabase project created
- [ ] Environment variables added
- [ ] Connection tested

---

### Task 2.2: Create Database Schema
**File**: `supabase/migrations/001_initial_schema.sql`

**Tables Needed**:
- `portal_users` - User accounts
- `user_plans` - Saved plan selections
- `family_members` - Family member data

**SQL Schema**:
```sql
-- Users table
CREATE TABLE portal_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User plans
CREATE TABLE user_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES portal_users(id),
  plan_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family members
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID REFERENCES user_plans(id),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  is_employee BOOLEAN DEFAULT false,
  selected_modules JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Acceptance Criteria**:
- [ ] Tables created in Supabase
- [ ] Foreign keys work correctly
- [ ] Can insert test data manually

---

### Task 2.3: Create Supabase Client
**File**: `src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

**Acceptance Criteria**:
- [ ] Client initializes without errors
- [ ] Environment variables load correctly

---

### Task 2.4: Add Save/Load Functionality
**File**: `src/lib/planStorage.ts`

**Functions Needed**:
```typescript
async function savePlanSelection(userId: string, planData: any)
async function loadPlanSelection(userId: string)
async function deletePlanSelection(planId: string)
```

**Acceptance Criteria**:
- [ ] Can save plan selections
- [ ] Can load saved selections
- [ ] Can delete selections
- [ ] Error handling works

---

### Task 2.5: Add UI for Save/Load
**Update**: `src/app/portal/plan-selector/page.tsx`

**Add**:
- "Save Selection" button
- "Load Previous Selection" button
- Saved plans list
- Confirmation dialogs

**Acceptance Criteria**:
- [ ] Users can save their selections
- [ ] Users can load previous selections
- [ ] UI shows loading states
- [ ] Error messages display properly

---

## Phase 3: Real Authentication (Priority: HIGH)

### Task 3.1: Set Up Database for Users
**Choose ONE**:
- Option A: Supabase Auth (recommended)
- Option B: Prisma + PostgreSQL
- Option C: NextAuth with database adapter

**For Supabase Auth** (Recommended):

**File**: `src/lib/auth-supabase.ts`

**Acceptance Criteria**:
- [ ] User registration works
- [ ] Email verification works
- [ ] Password reset works
- [ ] Session management works

---

### Task 3.2: Update Auth Configuration
**File**: `src/lib/auth.ts`

**Replace** hardcoded credentials with database lookup:
```typescript
async authorize(credentials) {
  // Query database for user
  // Verify password
  // Return user or null
}
```

**Acceptance Criteria**:
- [ ] No more hardcoded credentials
- [ ] Password hashing works (bcryptjs)
- [ ] Database queries work
- [ ] Invalid login attempts fail gracefully

---

### Task 3.3: Add Registration Page
**File**: `src/app/portal/register/page.tsx`

**Features**:
- Email and password fields
- Name field
- Password confirmation
- Terms acceptance
- Email verification

**Acceptance Criteria**:
- [ ] Users can register
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] Duplicate email prevention
- [ ] Success redirect to login

---

### Task 3.4: Add Password Reset
**Files**:
- `src/app/portal/forgot-password/page.tsx`
- `src/app/portal/reset-password/page.tsx`

**Acceptance Criteria**:
- [ ] Users can request password reset
- [ ] Email sent with reset link
- [ ] Reset link works and expires
- [ ] New password can be set

---

## Phase 4: Polish & Features (Priority: MEDIUM)

### Task 4.1: Add Export Functionality
**Feature**: Export plan selection as PDF

**File**: Create `src/lib/exportPlan.ts`

**Library**: Use `jsPDF` or `react-pdf`

**Acceptance Criteria**:
- [ ] Can export to PDF
- [ ] PDF includes all member details
- [ ] PDF shows cost breakdown
- [ ] PDF branded with BoostWellbeing logo

---

### Task 4.2: Add Email Quote
**Feature**: Email plan quote to user

**File**: `src/app/api/email-quote/route.ts`

**Integration**: Use Resend or SendGrid

**Acceptance Criteria**:
- [ ] Can email quote to user
- [ ] Email includes plan details
- [ ] Email is professionally formatted
- [ ] Includes contact info for follow-up

---

### Task 4.3: Add Comparison Mode
**Feature**: Compare multiple plans side-by-side

**Acceptance Criteria**:
- [ ] Can select multiple plans
- [ ] Side-by-side comparison view
- [ ] Highlights differences
- [ ] Shows cost comparison

---

### Task 4.4: Mobile Optimization
**Updates**: All portal components

**Acceptance Criteria**:
- [ ] Works on mobile devices
- [ ] Touch-friendly controls
- [ ] Responsive layout
- [ ] No horizontal scroll

---

## Phase 5: Testing & Deployment (Priority: HIGH)

### Task 5.1: Add Unit Tests
**Files**: Create `__tests__` directories

**Test**:
- Component rendering
- Cost calculations
- State management
- Form validation

**Acceptance Criteria**:
- [ ] All components have tests
- [ ] Tests pass
- [ ] Coverage > 80%

---

### Task 5.2: Manual Testing Checklist
- [ ] User registration flow
- [ ] Login/logout
- [ ] Plan selection for all plan types
- [ ] Module selection
- [ ] Cost calculations accurate
- [ ] Save/load functionality
- [ ] Email/export features
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Loading states

---

### Task 5.3: Update Production Environment
**Vercel Dashboard**:
- [ ] Add `NEXTAUTH_URL` (production URL)
- [ ] Add `NEXTAUTH_SECRET` (generate new)
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Add email service API keys

---

### Task 5.4: Security Audit
- [ ] No secrets in code
- [ ] HTTPS only
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF protection (NextAuth handles)
- [ ] Rate limiting on auth endpoints

---

### Task 5.5: Deploy
- [ ] Build succeeds locally
- [ ] Push to GitHub
- [ ] Vercel auto-deploys
- [ ] Test production deployment
- [ ] Remove test credentials
- [ ] Update documentation

---

## Quick Start Command for Claude Code

**Copy this prompt to Claude Code (Web or CLI)**:

```
I need to complete the planSelector integration for the BoostWellbeing website.
Please follow the tasks in PLANSELECTOR_INTEGRATION_PLAN.md starting from Phase 1.

The planSelector source code is in ../planSelector directory.
The target is the /portal route in the Next.js app.

Start with Task 1.1: Create Portal-Specific Type Definitions and work through
each task sequentially. Mark tasks as complete as you finish them.

Ask me if you need clarification on any requirements or encounter issues.
```

---

## Progress Tracking

### Phase 1: Component Migration
- [ ] Task 1.1: Type Definitions
- [ ] Task 1.2: PlanSelector Component
- [ ] Task 1.3: FamilyMembers Component
- [ ] Task 1.4: CostSummary Component
- [ ] Task 1.5: Main Page

### Phase 2: Data Persistence
- [ ] Task 2.1: Supabase Setup
- [ ] Task 2.2: Database Schema
- [ ] Task 2.3: Supabase Client
- [ ] Task 2.4: Save/Load Functions
- [ ] Task 2.5: Save/Load UI

### Phase 3: Real Authentication
- [ ] Task 3.1: Database Setup
- [ ] Task 3.2: Auth Config Update
- [ ] Task 3.3: Registration Page
- [ ] Task 3.4: Password Reset

### Phase 4: Polish & Features
- [ ] Task 4.1: PDF Export
- [ ] Task 4.2: Email Quote
- [ ] Task 4.3: Comparison Mode
- [ ] Task 4.4: Mobile Optimization

### Phase 5: Testing & Deployment
- [ ] Task 5.1: Unit Tests
- [ ] Task 5.2: Manual Testing
- [ ] Task 5.3: Production Env
- [ ] Task 5.4: Security Audit
- [ ] Task 5.5: Deploy

---

## Estimated Timeline

- **Phase 1**: 4-6 hours
- **Phase 2**: 3-4 hours
- **Phase 3**: 3-4 hours
- **Phase 4**: 4-6 hours
- **Phase 5**: 2-3 hours

**Total**: 16-23 hours

---

## Support & Resources

- **Documentation**: See `PORTAL_README.md`
- **Source Code**: `../planSelector`
- **Rate Data**: Already copied to `src/data/rateData.ts`
- **Current Auth**: `src/lib/auth.ts` (temporary credentials)

---

## Notes

- Each task has clear acceptance criteria
- Tasks can be done in order or some in parallel
- Phase 1 is prerequisite for other phases
- Phase 3 should be done before production deployment
- Phase 4 is optional but recommended
- Phase 5 is critical before going live
