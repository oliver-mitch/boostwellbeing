# BoostWellbeing Architecture

## Diagram 1: System Architecture Overview

```mermaid
graph TB
    subgraph Users["End Users"]
        HR["HR Managers /<br/>Business Owners"]
        PortalUser["Portal Users<br/>(Invited Employees)"]
    end

    subgraph Vercel["Vercel Platform"]
        subgraph NextApp["Next.js 15 App (App Router)"]
            Frontend["React Frontend<br/>(Client Components)"]
            SSR["Server-Side Rendering"]
            subgraph APIRoutes["API Routes"]
                ContactAPI["POST /api/contact"]
                AuthAPI["[...nextauth] /api/auth/*"]
                ResetAPI["POST|PUT /api/auth/reset-password"]
                HealthAPI["GET /api/health/supabase"]
            end
        end
    end

    subgraph Supabase["Supabase (PostgreSQL)"]
        DB_Users["portal_users"]
        DB_Plans["user_plans"]
        DB_Members["family_members"]
        DB_Invites["invite_tokens"]
        DB_Reset["password_reset_tokens"]
        DB_Contact["contact_submissions"]
    end

    subgraph HubSpot["HubSpot CRM"]
        HS_Companies["Companies"]
        HS_Contacts["Contacts"]
        HS_Deals["Deals"]
        HS_Notes["Notes"]
    end

    subgraph SouthernCross["Southern Cross<br/>Health Society"]
        RateData["Rate Tables<br/>(Effective 01 May 2025)<br/>Hardcoded in rateData.ts"]
    end

    subgraph EmailService["Email Service [WIP]"]
        EmailSend["Password Reset Email"]
    end

    %% User flows
    HR -->|"Browse site & submit contact form"| Frontend
    PortalUser -->|"Login & manage plans"| Frontend
    Frontend -->|"Client-side navigation"| SSR

    %% API connections
    Frontend -->|"fetch()"| ContactAPI
    Frontend -->|"NextAuth signIn/signOut"| AuthAPI
    Frontend -->|"Password reset request"| ResetAPI

    %% API to external services
    ContactAPI -->|"HUBSPOT_API_KEY<br/>api.hubapi.com/crm/v3"| HubSpot
    ContactAPI -->|"NEXT_PUBLIC_SUPABASE_URL<br/>+ ANON_KEY"| DB_Contact
    AuthAPI -->|"NEXTAUTH_SECRET<br/>+ Supabase credentials"| DB_Users
    ResetAPI -->|"Creates token in DB"| DB_Reset
    ResetAPI -.->|"TODO: Send email [WIP]"| EmailSend
    HealthAPI -->|"Connection check"| Supabase

    %% HubSpot internal associations
    HS_Companies --- HS_Contacts
    HS_Contacts --- HS_Deals
    HS_Contacts --- HS_Notes

    %% Data source
    RateData -.->|"Static data embedded<br/>at build time"| NextApp

    %% Supabase internal relations
    DB_Users --> DB_Plans
    DB_Plans --> DB_Members
    DB_Users --> DB_Reset
    DB_Users --> DB_Invites
```

---

## Diagram 2: Frontend Routing & Component Tree

```mermaid
graph TD
    subgraph RootLayout["RootLayout (layout.tsx) — Providers: SessionProvider"]

        subgraph PublicRoutes["Public Routes"]
            Home["/ — HomePage"]
            About["/about — AboutPage"]
            Contact["/contact — ContactPage"]
            Survey["/survey — SurveyPage"]
            GroupHealth["/group-health — GroupHealthPage"]
        end

        subgraph V2aRoutes["V2a Routes (alternate design)"]
            V2aHome["/v2a — V2a Homepage"]
            V2aCases["/v2a/case-studies"]
            V2aContact["/v2a/contact"]
            V2aHow["/v2a/how-it-works"]
            V2aRes["/v2a/resources"]
        end

        subgraph AuthRoutes["Auth Routes (public)"]
            Login["/portal/login"]
            Register["/portal/register"]
            ForgotPw["/portal/forgot-password"]
            ResetPw["/portal/reset-password"]
        end

        subgraph ProtectedRoutes["Protected Routes (require session)"]
            Dashboard["/portal — Dashboard"]
            PlanSel["/portal/plan-selector"]
            Admin["/portal/admin"]
        end

        subgraph API["API Routes"]
            APIContact["POST /api/contact"]
            APIAuth["/api/auth/[...nextauth]"]
            APIReset["/api/auth/reset-password"]
            APIHealth["/api/health/supabase"]
        end
    end

    subgraph Components["Components"]
        ScrollVideo["ScrollVideoBackground"]
        BoostIconC["BoostIcon"]
        WPA["WorkplaceWellbeingAssessment"]
        WR["WellbeingResults"]
        THC["TeamHealthCalculator"]
        PS["PlanSelector"]
        CS["CostSummary"]
        FM["FamilyMembers"]
    end

    subgraph TurtleUI["TurtleUI Library"]
        TCalc["Calculator, CalculatorSection,<br/>CalculatorRow"]
        TSlider["Slider"]
        TQuote["QuoteCard, QuoteResultLine,<br/>QuoteInfoBox"]
        TUnused["UNUSED: Toggle, FAQ, TrustBadge,<br/>ReviewCard, EmailCapture, ContactForm"]
    end

    Home -->|uses| ScrollVideo
    Home -->|uses| BoostIconC
    Contact -->|uses| ScrollVideo
    Contact -->|uses| BoostIconC
    Survey -->|uses| WPA
    WPA -->|renders on complete| WR
    GroupHealth -->|uses| THC
    PlanSel -->|uses| PS
    PlanSel -->|uses| CS
    PlanSel -->|uses| FM
    THC -->|imports| TCalc
    THC -->|imports| TSlider
    THC -->|imports| TQuote

    Contact -->|"POST"| APIContact
    Login -->|"signIn()"| APIAuth
    ForgotPw -->|"POST"| APIReset
    ResetPw -->|"PUT"| APIReset
```

---

## Diagram 3: Database Schema (Entity Relationship)

```mermaid
erDiagram
    portal_users {
        uuid id PK
        text email UK "NOT NULL"
        text name
        boolean is_admin "DEFAULT false"
        text company_name
        text password_hash
        timestamptz created_at
        timestamptz updated_at
    }

    user_plans {
        uuid id PK
        uuid user_id FK "→ portal_users(id) CASCADE"
        text plan_code "NOT NULL"
        text plan_name
        timestamptz created_at
        timestamptz updated_at
    }

    family_members {
        uuid id PK
        uuid plan_id FK "→ user_plans(id) CASCADE"
        text name "NOT NULL"
        integer age "NOT NULL CHECK 0-120"
        boolean is_employee "DEFAULT false"
        jsonb selected_modules "DEFAULT []"
        timestamptz created_at
    }

    invite_tokens {
        uuid id PK
        text token UK "NOT NULL"
        text email "NOT NULL"
        text company_name
        text created_by "NOT NULL (admin email)"
        boolean used "DEFAULT false"
        timestamptz used_at
        timestamptz expires_at "NOT NULL"
        timestamptz created_at
    }

    password_reset_tokens {
        uuid id PK
        uuid user_id FK "→ portal_users(id) CASCADE"
        text token UK "NOT NULL"
        boolean used "DEFAULT false"
        timestamptz expires_at "NOT NULL"
        timestamptz created_at
    }

    contact_submissions {
        uuid id PK
        text full_name "NOT NULL"
        text company_name "NOT NULL"
        text email "NOT NULL"
        text phone "NOT NULL"
        text number_of_employees "NOT NULL"
        text message
        text status "DEFAULT new"
        text notes
        timestamptz created_at
        timestamptz updated_at
    }

    portal_users ||--o{ user_plans : "has many"
    user_plans ||--o{ family_members : "has many"
    portal_users ||--o{ password_reset_tokens : "has many"
    portal_users ||--o{ invite_tokens : "creates (admin)"
```

---

## Diagram 4: Data Flow — Contact Form Submission

```mermaid
sequenceDiagram
    actor User as User (Browser)
    participant Page as /contact Page
    participant API as POST /api/contact
    participant HS_Co as HubSpot Companies
    participant HS_Ct as HubSpot Contacts
    participant HS_Note as HubSpot Notes
    participant HS_Deal as HubSpot Deals
    participant Supa as Supabase

    User->>Page: Fill form (name, company, email, phone, employees, message)
    Page->>API: POST /api/contact { formData }

    API->>API: Validate required fields + email format
    alt Validation fails
        API-->>Page: 400 error
        Page-->>User: Show error
    end

    Note over API: STEP 1 — HubSpot (primary CRM)
    API->>API: Check isHubSpotConfigured()

    alt HubSpot configured
        API->>HS_Co: Search company by name
        alt Company exists
            HS_Co-->>API: existing company { id }
        else Not found
            API->>HS_Co: Create company { name, phone, employees }
            HS_Co-->>API: new company { id }
        end

        API->>HS_Ct: Create contact + associate with company
        alt Contact exists (409)
            API->>HS_Ct: Search by email + PATCH update
            HS_Ct-->>API: updated contact { id }
        else New
            HS_Ct-->>API: new contact { id }
        end

        API->>HS_Note: Add note (employee count + message)
        API->>HS_Deal: Create deal "CompanyName - Contact Form Inquiry"
        Note over API: hubspotSuccess = true
    end

    Note over API: STEP 2 — Supabase (backup)
    API->>Supa: INSERT contact_submissions<br/>status = hubspotSuccess ? "new" : "pending_hubspot_sync"

    alt Both failed
        API-->>Page: 500 error
        Page-->>User: Show error, suggest direct email
    else At least one succeeded
        API-->>Page: 200 success
        Page-->>User: "We'll contact you within 24 hours"
    end
```

---

## Environment Variables

| Variable | Service | Used By |
|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | `src/lib/supabase.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | `src/lib/supabase.ts` |
| `HUBSPOT_API_KEY` | HubSpot CRM | `src/lib/hubspot.ts` |
| `NEXTAUTH_URL` | NextAuth | `src/lib/auth.ts` |
| `NEXTAUTH_SECRET` | NextAuth | `src/lib/auth.ts` |

## WIP / Incomplete Features

| Feature | Location | Status |
|---------|----------|--------|
| Password reset email sending | `src/app/api/auth/reset-password/route.ts:54` | TODO — token created but email not sent |
| Admin dashboard functionality | `src/app/portal/admin/page.tsx` | Basic UI only |
