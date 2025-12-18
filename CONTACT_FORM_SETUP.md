# Contact Form Setup Guide

## Overview

The contact form at `https://boostwellbeing.co.nz/contact` now sends submissions to:
- **Database**: Stored in Supabase `contact_submissions` table
- **Logs**: Printed to Vercel logs (until email service is configured)
- **Email**: Currently logs to console - needs email service integration

## Database Schema

### contact_submissions table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| full_name | TEXT | Contact's full name |
| company_name | TEXT | Company name |
| email | TEXT | Contact email address |
| phone | TEXT | Contact phone number |
| number_of_employees | TEXT | Employee range (5-10, 11-25, etc.) |
| message | TEXT | Optional message from contact |
| status | TEXT | new, contacted, or closed |
| notes | TEXT | Internal notes for follow-up |
| created_at | TIMESTAMP | When submitted |
| updated_at | TIMESTAMP | Last update time |

## Setup Instructions

### 1. Run Database Migration

After your Supabase project is active, run the migration:

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase SQL Editor
# Copy/paste content from: supabase/migrations/004_contact_submissions.sql
```

### 2. View Submissions

**Via Supabase Dashboard:**
1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Go to Table Editor
4. Select `contact_submissions` table

**Via Vercel Logs:**
```bash
vercel logs boostwellbeing.co.nz --since 1h
```

Look for entries like:
```
=== NEW CONTACT FORM SUBMISSION ===
Name: John Smith
Company: Acme Corp
Email: john@acme.co.nz
...
```

## Adding Email Notifications

Currently, submissions are logged to the console. To send actual emails to `contact@boostwellbeing.co.nz`:

### Option 1: Resend (Recommended - Simple)

1. **Sign up for Resend**: [resend.com](https://resend.com)
   - Free tier: 100 emails/day

2. **Install package:**
   ```bash
   npm install resend
   ```

3. **Add environment variable:**
   ```bash
   vercel env add RESEND_API_KEY
   # Enter your API key when prompted
   ```

4. **Update the API route** (`src/app/api/contact/route.ts`):
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   // Replace the TODO section with:
   await resend.emails.send({
     from: 'noreply@boostwellbeing.co.nz',
     to: 'contact@boostwellbeing.co.nz',
     subject: `New Contact: ${data.fullName} from ${data.companyName}`,
     text: emailContent,
   });
   ```

5. **Configure domain** (for production):
   - Add DNS records in Resend dashboard
   - Verify your domain

### Option 2: SendGrid

1. **Sign up for SendGrid**: [sendgrid.com](https://sendgrid.com)
   - Free tier: 100 emails/day

2. **Install package:**
   ```bash
   npm install @sendgrid/mail
   ```

3. **Add environment variable:**
   ```bash
   vercel env add SENDGRID_API_KEY
   ```

4. **Update the API route:**
   ```typescript
   import sgMail from '@sendgrid/mail';

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

   await sgMail.send({
     to: 'contact@boostwellbeing.co.nz',
     from: 'noreply@boostwellbeing.co.nz',
     subject: `New Contact: ${data.fullName} from ${data.companyName}`,
     text: emailContent,
   });
   ```

### Option 3: AWS SES

Best for high volume, lower cost at scale.

## Testing

### Test the form locally:
```bash
npm run dev
```

Visit `http://localhost:3000/contact` and submit a test form.

### Test the API directly:
```bash
curl -X POST https://boostwellbeing.co.nz/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "companyName": "Test Company",
    "email": "test@example.com",
    "phone": "021 123 4567",
    "numberOfEmployees": "11-25",
    "message": "This is a test"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for your inquiry. We will contact you within 24 hours."
}
```

## Monitoring Submissions

### Check recent submissions in Vercel logs:
```bash
vercel logs boostwellbeing.co.nz --since 24h | grep "NEW CONTACT FORM"
```

### Query database directly:
```sql
SELECT
  full_name,
  company_name,
  email,
  phone,
  status,
  created_at
FROM contact_submissions
ORDER BY created_at DESC
LIMIT 10;
```

## Managing Submissions

### Update submission status:
```sql
UPDATE contact_submissions
SET status = 'contacted', notes = 'Called and sent quote'
WHERE id = 'submission-uuid';
```

### View uncontacted submissions:
```sql
SELECT * FROM contact_submissions
WHERE status = 'new'
ORDER BY created_at DESC;
```

## Validation

The API validates:
- ✅ All required fields are present
- ✅ Email format is valid
- ✅ Data types are correct

## Security

- ✅ HTTPS enforced by Vercel
- ✅ Input validation on API
- ✅ Database storage with RLS policies
- ✅ Rate limiting (consider adding if spam becomes an issue)

## Future Enhancements

Consider adding:
- Email notifications to `contact@boostwellbeing.co.nz`
- Auto-responder email to the contact
- Slack/Teams notification integration
- CRM integration (HubSpot, Salesforce, etc.)
- Admin dashboard to view/manage submissions
- Analytics tracking (Google Analytics events)

## Contact Email

All submissions should be monitored at: **contact@boostwellbeing.co.nz**

Make sure this email account is actively monitored, or set up forwarding to your main email.
