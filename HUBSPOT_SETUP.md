# HubSpot Integration Setup Guide

## Overview

Contact form submissions automatically create:
- **Contact** in HubSpot with all form details
- **Deal** associated with the contact
- **Note** with the submission message

## Setup Instructions

### 1. Get Your HubSpot API Key

1. Log in to your HubSpot account
2. Click the **Settings** icon (gear icon) in the top right
3. Navigate to **Integrations** → **API Key** (or **Private Apps** for newer accounts)

#### Option A: Using API Key (Legacy - Simpler)
1. Go to **Settings** → **Integrations** → **API Key**
2. Click **Show** or **Create API Key**
3. Copy the API key

#### Option B: Using Private Apps (Recommended for newer accounts)
1. Go to **Settings** → **Integrations** → **Private Apps**
2. Click **Create a private app**
3. Name it: "BoostWellbeing Contact Form"
4. Go to the **Scopes** tab and grant these permissions:
   - `crm.objects.contacts.write`
   - `crm.objects.contacts.read`
   - `crm.objects.deals.write`
   - `crm.objects.deals.read`
   - `crm.schemas.contacts.read`
   - `crm.schemas.deals.read`
5. Click **Create app**
6. Copy the **Access token** (this is your API key)

### 2. Add API Key to Vercel

```bash
vercel env add HUBSPOT_API_KEY
```

When prompted:
- **Environment**: Select "Production" (and optionally Preview/Development)
- **Value**: Paste your HubSpot API key

### 3. Add to Local Development

Add to your `.env.local` file:
```
HUBSPOT_API_KEY=your-api-key-here
```

### 4. Configure Custom Properties (Optional)

If you want to track employee count, create a custom property in HubSpot:

1. Go to **Settings** → **Properties**
2. Select **Contact properties**
3. Click **Create property**
4. Settings:
   - **Label**: Number of Employees
   - **Internal name**: `number_of_employees`
   - **Field type**: Single-line text or Dropdown
   - **Group**: Contact information

If using dropdown, add options:
- 5-10 employees
- 11-25 employees
- 26-50 employees
- 51-100 employees
- 100+ employees

### 5. Configure Deal Pipeline (Optional)

The integration creates deals in the "default" pipeline at the "appointmentscheduled" stage.

To customize:
1. Go to **Settings** → **Objects** → **Deals**
2. Click **Pipelines**
3. Note your pipeline name and stage names
4. Update `src/lib/hubspot.ts` if needed:
   ```typescript
   pipeline: 'your-pipeline-name',
   dealstage: 'your-stage-name',
   ```

## What Gets Created in HubSpot

### Contact Properties
- **Email**: Contact's email address (unique identifier)
- **First Name**: Extracted from full name
- **Last Name**: Extracted from full name
- **Phone**: Phone number
- **Company**: Company name
- **Lifecycle Stage**: Set to "Lead"
- **Lead Status**: Set to "NEW"
- **Number of Employees**: Employee range (if custom property exists)

### Deal Properties
- **Deal Name**: "{Company Name} - Contact Form Inquiry"
- **Pipeline**: Default pipeline
- **Deal Stage**: "appointmentscheduled"
- **Close Date**: 30 days from submission
- **Amount**: $0 (can be updated later)

### Note
If a message was provided in the form, a note is attached to the contact with:
- The message content
- Submission timestamp (NZ time)

## Testing

### Test Locally
```bash
npm run dev
```

Visit `http://localhost:3000/contact` and submit the form.

### Check HubSpot
1. Go to **Contacts** → **Contacts**
2. Search for the email you used
3. Verify:
   - Contact was created/updated
   - Deal was created and associated
   - Note was added (if message provided)

### Check Logs
```bash
# Local
Check your terminal output

# Production
vercel logs boostwellbeing.co.nz --since 10m
```

Look for:
- "HubSpot contact created: {id}"
- "HubSpot deal created: {id}"
- "Note added to HubSpot contact"

## Troubleshooting

### "HubSpot not configured - skipping integration"
- **Cause**: `HUBSPOT_API_KEY` environment variable not set
- **Fix**: Add the API key to Vercel and redeploy

### "HubSpot API error: 401"
- **Cause**: Invalid API key
- **Fix**: Verify your API key is correct and has required permissions

### "HubSpot API error: 409" (Contact already exists)
- **Expected**: The integration automatically updates existing contacts
- **Result**: Contact is updated instead of creating duplicate

### Contact created but no custom properties
- **Cause**: Custom properties don't exist in HubSpot
- **Fix**: Create the custom properties or the integration will skip them

### Deal not created
- **Cause**: Invalid pipeline or deal stage name
- **Fix**: Update pipeline/stage names in `src/lib/hubspot.ts` to match your HubSpot setup

## Features

### Automatic Deduplication
- Uses email as unique identifier
- Updates existing contacts instead of creating duplicates
- Adds new note to existing contact on each submission

### Error Handling
- HubSpot errors don't break the contact form
- Falls back gracefully if HubSpot is unavailable
- Submissions still saved to database and logged

### Data Persistence
- All submissions stored in Supabase regardless of HubSpot status
- Can retry HubSpot sync from database if needed

## Advanced Configuration

### Change Deal Pipeline
Edit `src/lib/hubspot.ts`:
```typescript
export async function createHubSpotDeal(contactId: string, dealData: Partial<HubSpotDealData>) {
  // ...
  const properties = {
    dealname: dealData.dealname || 'New Contact Form Inquiry',
    pipeline: 'your-pipeline-id', // Change this
    dealstage: 'your-stage-id',   // Change this
    // ...
  };
}
```

### Add Additional Contact Properties
Edit `src/lib/hubspot.ts` in the `createHubSpotContact` function:
```typescript
const properties = {
  email: data.email,
  firstname: firstname,
  lastname: lastname,
  // Add more properties here
  industry: 'Healthcare',
  lead_source: 'Website Contact Form',
  // etc.
};
```

### Get Pipeline and Stage IDs
```bash
# Get pipelines
curl "https://api.hubapi.com/crm/v3/pipelines/deals?hapikey=YOUR_API_KEY"

# Get stages for a pipeline
curl "https://api.hubapi.com/crm/v3/pipelines/deals/YOUR_PIPELINE_ID?hapikey=YOUR_API_KEY"
```

## Monitoring

### View All Contact Form Leads in HubSpot
Create a list or view:
1. Go to **Contacts** → **Lists**
2. Create a new **Active list**
3. Filter by:
   - **Lead Status** = "NEW"
   - Or **Create date** is in the last 30 days

### Set Up Notifications
1. Go to **Settings** → **Notifications**
2. Under **Contacts**, enable:
   - New contact created
   - Note added to contact
3. Under **Deals**, enable:
   - Deal created

## API Reference

HubSpot API documentation:
- [Contacts API](https://developers.hubspot.com/docs/api/crm/contacts)
- [Deals API](https://developers.hubspot.com/docs/api/crm/deals)
- [Notes API](https://developers.hubspot.com/docs/api/crm/notes)
- [Associations API](https://developers.hubspot.com/docs/api/crm/associations)

## Security

- ✅ API key stored as environment variable
- ✅ Never exposed to client-side code
- ✅ Errors don't reveal API key details
- ✅ Rate limiting handled by HubSpot

## Next Steps

After HubSpot is configured:
1. Set up automated email responses in HubSpot
2. Create workflows for follow-up tasks
3. Set up email sequences for nurturing
4. Configure notifications to your team
5. Create dashboards to track conversions
