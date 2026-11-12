# Astor Systems — Company Website (Phase 1)

The public website for Astor Systems, a business technology and automation company. It is built with Next.js (App Router), TypeScript and Tailwind CSS, and is designed to deploy to Vercel.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional in development
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run typecheck
```

Requires Node 20+ (developed on Node 22).

## What's included

| Route | Purpose |
| --- | --- |
| `/` | Homepage: hero, problems, solutions, industries, process, featured workflows, integrations, why us, CTA |
| `/solutions`, `/solutions/[slug]` | 9 problem-oriented solutions, each with problem, solution, workflow diagram, benefits, requirements, implementation options |
| `/industries`, `/industries/[slug]` | 9 industry landing pages with challenges, a before/after scenario, solutions and workflows |
| `/workflows`, `/workflows/[slug]` | Searchable, filterable workflow library (industry, function, platform, category; URL-synced) and detail pages |
| `/integrations`, `/integrations/[slug]` | Integration directory with **Supported** vs **Planned** status |
| `/services` | Integration services, workflow templates, managed automation |
| `/custom-projects` | Qualified project inquiry form (accepts `?workflow=` / `?solution=` context) |
| `/contact` | Contact and consultation form (accepts `?type=consultation` etc.) |
| `/about`, `/privacy` | Company and privacy notice |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | SEO infrastructure |

## Architecture

```
src/
  app/                 Routes (App Router). Detail pages are statically generated.
    api/inquiry/       POST endpoint for both forms
  components/          Reusable UI (cards, diagrams, forms, header/footer, sections)
  content/             Typed content: solutions, industries, workflows, integrations
    types.ts           The content model
  lib/
    content.ts         Content access layer — pages only read through this
    inquiry.ts         Shared zod schemas (client + server) and qualification signals
    inquiry-delivery.ts Delivery to Supabase and/or webhook
    seo.ts, site.ts    Metadata helpers, JSON-LD, site config
supabase/migrations/   SQL for the inquiries table
```

### Key decisions

- **Content as typed data, behind an access layer.** All content lives in `src/content/*.ts`. Pages call `src/lib/content.ts`, never the raw files. To move content to Supabase or an admin dashboard (Phase 3), reimplement those accessors; page code stays the same.
- **Workflows are data-driven diagrams.** Each workflow or solution defines `steps` (`trigger`, `ai`, `condition`, `action`, `record`, `notify`). `WorkflowDiagram` and `WorkflowMini` render them, so every page shares one visual language and new workflows need no design work.
- **Marketplace-ready access model.** `Workflow.access` is a union: `implementation | coming-soon | free | paid` (with `priceUsd`, `checkoutUrl`). Paid downloads and bundles can be added per record later without changing the shape of existing records.
- **No auth, payments or database are required to run the site.** The only server code is the inquiry endpoint.
- **No third-party logos.** Integrations use monogram marks. Product names are used descriptively.
- **Fonts are self-hosted** via `@fontsource` (Inter, IBM Plex Mono), so there are no external font requests and the build works offline.
- **Accessibility:** skip link, semantic landmarks, labelled form fields with `aria-invalid` / `aria-describedby`, visible focus states, reduced-motion support.

## Inquiry handling

`POST /api/inquiry` validates with the same zod schema used client-side, then builds a record with:

- a reference ID (`AS-YYMMDD-XXXX`)
- the page context (e.g. `workflow:missed-call-text-back`)
- qualification signals (budget band, timeline, completeness) and a `priority` hint

It delivers to **every configured destination**:

1. **Supabase**: inserts into `public.inquiries` (run `supabase/migrations/0001_inquiries.sql`).
2. **Webhook** (`INQUIRY_WEBHOOK_URL`): POSTs JSON, signed with `X-Astor-Signature` (HMAC-SHA256 of the body) when `INQUIRY_WEBHOOK_SECRET` is set. Point it at an n8n/Make workflow to email or Slack you new leads.

If no destination is configured, development logs the inquiry to the console. **Production returns 503** and asks visitors to email you, so inquiries are never silently lost. The endpoint also has a honeypot field and a best-effort per-IP rate limit.

## External services and credentials

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | Canonical URLs, sitemap, Open Graph |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | One destination required | Store inquiries. The service role key is server-only. |
| `INQUIRY_WEBHOOK_URL`, `INQUIRY_WEBHOOK_SECRET` | One destination required | Forward inquiries to n8n/Make/etc. |

No other accounts are needed for Phase 1.

## Before launch: checklist

- [ ] Replace the placeholder email `hello@astorsystems.com` in `src/lib/site.ts`.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the real domain.
- [ ] Configure at least one inquiry destination and submit a test inquiry.
- [ ] **Review integration statuses** in `src/content/integrations.ts`. Only mark an integration `supported` once you have built and tested it. Current defaults: supported = n8n, Make, Zapier, OpenAI, Anthropic, Twilio, Google Workspace, Airtable; planned = Microsoft 365, HubSpot, Calendly, Stripe, Supabase.
- [ ] Review the "typical setup" estimates on workflows and the response-time promises ("two business days") on the forms.
- [ ] Have the privacy notice reviewed.
- [ ] Add analytics if desired (e.g. Vercel Analytics) and update the privacy notice to match.

## Content rules

- No testimonials, client logos, case studies, team size or credentials unless real.
- Scenarios on industry pages are labelled illustrative. Demonstrations must be labelled as prototypes.
- Workflows marked "Available with implementation" are delivered as part of a project. "Template coming soon" means no self-install download exists yet.

## Roadmap hooks (later phases)

- **Phase 2:** demo projects (AI receptionist, cleaning CRM, property maintenance). Add `/demos/*` using `WorkflowDiagram`. Add blog/guides under `/guides` (MDX).
- **Phase 3:** admin dashboard and customer portal (Supabase Auth; add RLS policies to `inquiries`), move content into tables behind `lib/content.ts`, Stripe checkout via `WorkflowAccess.paid.checkoutUrl`, and an Automation Discovery Tool that reuses the industry and solution data to generate recommendations.
