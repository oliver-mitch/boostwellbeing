Boost Wellbeing — Version 2 Design Specification

(Creative & UX/UI brief for Claude Code)

1. Purpose

Redesign boostwellbeing.co.nz into a conversion-focused, trust-building, and executive-oriented website for NZ company decision makers (HR Directors, CFOs, CEOs) evaluating Southern Cross Group Health Insurance schemes.

The redesign should:

Clearly communicate why group health schemes are valuable to companies.

Provide an elevator-pitch level overview within 10 seconds of page load.

Encourage direct contact or proposal requests.

Visually feel corporate, modern, clean, and trustworthy (not “wellness blog”).

Use existing backend infrastructure (Vercel, Railway, Supabase).

Reuse existing tools (survey + cost calculator) where appropriate — update styling and UX, not discard them.

Claude Code should determine the best technical approach (e.g., React/Next.js, Tailwind, etc.) but follow this design and content direction closely.

2. Core pages and purpose
Page	Purpose	Key CTA
/ (Home)	Elevator pitch + trust + core benefits	“Request a tailored quote”
/how-it-works	Show the simple 3-step implementation process	“Book a call”
/case-studies	Proof + measurable results	“Get a proposal”
/resources	Host survey, cost calculator, guides	“Try the calculator”
/contact	Capture leads, provide human connection	“Submit enquiry”

Merge /group-health into / and redirect /group-health → /.

3. Visual & brand direction
a. Brand mood

Corporate + human.

Clean and professional, but approachable (Southern Cross brand synergy).

Target audience: NZ business decision-makers → prefer clarity, ROI focus, trustworthiness.

b. Color palette

Primary: Southern Cross blue (#0077C8 or similar)

Secondary: Deep navy or slate gray (#1B2B3A)

Accent: Light green or turquoise (#2ECCB6) for highlights and CTAs

Background: Off-white (#F9FAFB) or very light gray

Text: Dark charcoal (#212529)

Claude should generate CSS variables based on this palette.

c. Typography

Headings: Modern sans-serif (e.g., Inter, Poppins, or Work Sans)

Body: Readable system sans-serif (e.g., Inter, Helvetica Neue)

Font sizing: Large hero headline (min 48px desktop, 32px mobile).

Line length: ≤ 80 characters.

Line height: 1.5–1.7 for body text.

d. Layout

Responsive grid layout (12-column, mobile-first).

Prominent hero section with headline + CTA above the fold.

3-column benefits section below hero.

Mid-page trust section (logos, partners).

Integrated calculator/survey within the flow (no popups).

Sticky header with CTA button.

Footer: minimal, with contact + social + disclaimer.

e. Imagery

Focus on corporate NZ workplaces: teams in offices, meetings, collaboration, hybrid work, modern workplaces.

Avoid “wellness” clichés (e.g., yoga, salads, nature).

Include one authentic photo or illustration per major section.

Use consistent tone — warm lighting, real people, local feel.

Include Southern Cross branding where allowed.

All images must have alt text and lazy loading.

4. Homepage (key visual & copy structure)
Section 1 — Hero (Above the Fold)

Goal: Deliver the elevator pitch in < 10 seconds.

Headline (H1):
“Corporate health cover that simplifies benefits, cuts admin, and keeps teams healthy.”

Subhead (H2):
“Partner with Southern Cross to create a tailored group health plan that reduces costs and boosts retention for NZ businesses.”

Primary CTA: Request a tailored quote

Secondary CTA: See how it works (scroll link)

Background: Subtle abstract graphic or hero photo (NZ workplace)

Layout:

Left: Headline + text + buttons

Right: Illustration or image of professionals at work

Overlay a trust badge: “In partnership with Southern Cross Health Society”

Section 2 — Benefits Summary

3 cards horizontally aligned (stacked on mobile):
Each with an icon, headline, and short text.

Predictable Costs – Control premiums and tailor coverage.

Admin Simplified – We handle enrolment, claims, and reporting.

Better Retention – Health cover your team actually values.

Section 3 — Existing Tools (Survey + Calculator)

Embed the existing cost calculator and survey tools, but visually redesign them:

Clean card design.

Clear callouts: “Estimate your company’s savings” and “Assess your team’s needs.”

Progress bar for survey (if multi-step).

Results page should link to “Request your tailored proposal.”

Section 4 — How It Works (3 Steps)

Mini-graphic timeline with icons:

Assess your workforce needs

Design a tailored plan

Launch & support with ongoing insights

CTA: “Book a 15-minute consultation”

Section 5 — Case Study Preview

Show 1–2 short tiles summarizing client outcomes (real or placeholder):

“Auckland engineering firm reduced admin time by 35% after implementing group cover.”
Button: “See all case studies”

Section 6 — Call to Action

Large centered CTA block:

“Ready to simplify your employee benefits?”
[Request a tailored quote]

5. How It Works page

Repeat 3-step layout from homepage, but with visuals, e.g., icons or photos.

Include a short explainer video (can be a stock placeholder).

Add short paragraph per step.

Include CTA: “Get started now” → /request-proposal.

6. Case Studies

Grid of 2–3 cards.

Each card: photo or logo, summary (Problem → Solution → Result).

Example placeholder copy:

Problem: High absenteeism & low uptake of benefits.

Solution: Introduced tailored Southern Cross group scheme.

Result: 28% fewer sick days, 92% employee satisfaction.

CTA: “Book a discovery call.”

7. Resources page

Integrate both survey and cost calculator tools, restyled consistently.

Each tool should have its own card with a short description and CTA:

“Use our 2-minute survey to assess your team’s needs.”

“Estimate savings with our cost calculator.”

Include embedded iframe or reimplemented UI for both.

If using Supabase for data capture, maintain current backend connections.

Add optional “Download summary as PDF” feature.

8. Contact page

Hero: “Let’s build your group health plan.”

Contact form fields:

Name

Company

Email

Phone (optional)

Message

Consent checkbox (“I agree to be contacted by Boost Wellbeing regarding group health schemes”)

Optional meeting scheduler (Calendly embed).

Include alternate CTA: “Email us directly at contact@boostwellbeing.co.nz
.”

9. Navigation

Top-level menu:

Home

How It Works

Case Studies

Resources

Contact

CTA Button: Request Quote

Sticky nav with subtle drop shadow when scrolling.

10. Footer

Boost Wellbeing logo

“In partnership with Southern Cross Health Society” (legal phrasing if approved)

Contact info

Privacy Policy

Small social icons (LinkedIn preferred)

11. Responsiveness

Fully responsive design for mobile, tablet, and desktop.

Ensure CTAs are tap-friendly and text remains readable on all breakpoints.

Maintain visual consistency across screen sizes.

12. Animation & interaction

Subtle animations only:

Fade-in hero text.

Slide-up effect for benefit cards.

Smooth scrolling between sections.

Animated number counters in calculator results (optional).

Ensure all animations are reduced-motion friendly (prefers-reduced-motion).

13. Accessibility

All interactive elements keyboard navigable.

Maintain focus styles.

High contrast color combinations (test via WCAG AA).

All images must have descriptive alt text.

Use semantic HTML (<main>, <header>, <footer>, <section>).

Avoid text in images.

14. Content tone & style

Confident, plain English, executive-level.

Avoid wellness buzzwords — focus on ROI and simplicity.

Prioritize results and outcomes.

Keep sentences short (max 20 words).

Use active voice and data when possible.

Example:

“Boost Wellbeing helps NZ businesses offer Southern Cross group health schemes that lower costs, cut admin, and support healthier teams.”

15. Use of existing tools

Keep both the survey and cost calculator; they are value props.

Redesign visually to match new site style (card UI, spacing, font).

Ensure results pages have clear CTAs (“Request tailored proposal”).

Add contextual descriptions explaining each tool’s purpose.

Ensure data continues to save to Supabase (Claude may reuse existing API routes).

16. Media & assets

Claude may source or generate placeholder images (Unsplash, Pexels).
If possible:

Hero image: corporate meeting, NZ workplace.

Case studies: team working, office interactions.

Icons: flat SVGs with blue/green tones.

Explainer video: can use AI-generated narration or placeholder until real version is ready.

17. Deliverables for Claude

Claude Code should output:

New responsive layout and design system (consistent colors, typography, spacing).

Updated homepage, how-it-works, case-studies, resources, and contact pages.

Integration of existing survey and cost calculator (restyled).

Accessibility-checked HTML/CSS.

Copy placeholders from this doc.

Redirect /group-health → /.

Updated meta tags for SEO and social sharing.

All links verified (no 404s).

18. Testing & signoff checklist

 Homepage elevator pitch visible without scroll on desktop & mobile.

 All CTAs function and lead to correct pages/forms.

 Survey and calculator load correctly and save results.

 Mobile layout tested on iPhone & Android.

 No broken links or 404s.

 Accessible: passes WCAG 2.1 AA basics.

 Meta titles & descriptions present.

 Favicon & OG image added.

19. Optional enhancements

Add floating “Request Quote” button that follows scroll.

Use Supabase edge functions for form submission if needed.

Option to embed quick video testimonial or case study snippet.

Option for PDF generator (summary of results).