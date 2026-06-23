#!/usr/bin/env node
/**
 * One-time script: subscribe a Facebook Page to the leadgen webhook field.
 *
 * Run AFTER deploying the webhook endpoint and configuring the Meta app:
 *   node scripts/subscribe-page-to-leadgen.mjs
 *
 * Required env vars (set in shell or .env.local before running):
 *   META_PAGE_ACCESS_TOKEN  — long-lived Page access token
 *   META_APP_ID             — your Meta App ID (from the App Dashboard)
 */

const PAGE_TOKEN = process.env.META_PAGE_ACCESS_TOKEN;
const APP_ID = process.env.META_APP_ID;

if (!PAGE_TOKEN || !APP_ID) {
  console.error('Missing META_PAGE_ACCESS_TOKEN or META_APP_ID');
  process.exit(1);
}

// Step 1: get the Page ID from the token
const meRes = await fetch(
  `https://graph.facebook.com/v21.0/me?access_token=${PAGE_TOKEN}&fields=id,name`
);
const me = await meRes.json();
if (me.error) {
  console.error('Could not resolve Page from token:', me.error);
  process.exit(1);
}
console.log(`Page: ${me.name} (id=${me.id})`);

// Step 2: subscribe the Page to the app's leadgen field
const subRes = await fetch(
  `https://graph.facebook.com/v21.0/${me.id}/subscribed_apps`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subscribed_fields: ['leadgen'],
      access_token: PAGE_TOKEN,
    }),
  }
);
const sub = await subRes.json();
if (sub.error) {
  console.error('Subscription failed:', sub.error);
  process.exit(1);
}

console.log('Subscription result:', sub);
console.log('Done — the Page is now subscribed to leadgen webhook events.');
console.log('Verify in Meta App Dashboard → Webhooks → Page → leadgen field shows as subscribed.');
