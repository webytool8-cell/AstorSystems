# Astor Systems — Company Website (Phases 1–2)

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
| `/demos`, `/demos/[slug]` | Phase 2: three interactive prototypes (AI receptionist, cleaning quotes & CRM, maintenance requests) |
| `/guides`, `/guides/[slug]` | Phase 2: educational articles with Article schema |
| `/credits` | Photo credits and licenses |
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

## AI intake chat (`/start`)

Visitors describe their business in a chat (homepage hero box → `/start`). The assistant asks a few plain-language questions, then drafts a **preliminary proposal** of systems from the site catalog, which the visitor can send to the team.

- `src/app/api/chat/route.ts`: streams newline-delimited JSON events to the browser and runs a short tool loop (at most 3 proposal attempts per turn).
- `src/lib/intake/system-prompt.ts`: the assistant's instructions plus the full catalog (solutions, workflows, integrations with statuses, industries). It's byte-stable, so it is prompt-cached; don't add timestamps or other per-request data.
- `src/lib/intake/proposal.ts`: the `create_proposal` tool (strict JSON schema whose enums come from the catalog) and a zod schema the server re-checks **before anything is shown**. Invalid proposals go back to the model as tool errors, so it can only recommend things the catalog actually contains.
- **Model:** `claude-opus-5-5` at `effort: medium`, with server-side refusal fallbacks enabled (`fallbacks: "default"`). Override the model with `ASTOR_CHAT_MODEL`.
- **Conversation state:** kept in the visitor's browser (`sessionStorage`) and sent with each turn, including thinking blocks, which are passed back unchanged; the server stays stateless. Limits: 2,000 characters per message, 60 messages, 40 requests per IP per 10 minutes (best-effort, per instance).
- **Submission:** "Send proposal for review" posts a `proposal` inquiry (proposal + transcript) through the existing inquiry pipeline, tagged `source:ai-intake`. Run `supabase/migrations/0002_inquiry_kind_proposal.sql` if you use Supabase.
- **Guardrails** (in the prompt): the assistant discloses that it is AI, quotes no prices, invents no clients or statistics, only offers *planned* integrations when the visitor already uses that tool, and doesn't collect sensitive data. The proposal card states it is an AI draft that a person reviews.
- **Cost:** each visitor message is one or more Claude requests. Watch usage in the Anthropic Console, and consider a stronger rate limit (e.g. Vercel firewall rules) before heavy promotion.

## Phase 2 features

- **Interactive demos** (`src/components/demos/*`, data in `src/content/demos.ts`): client-side simulations on sample data. They make no network calls, and every demo is labelled "Prototype · sample data". Business names, people and numbers are fictional (phone numbers use the 555-01xx range).
- **Interactive workflow player** (`src/components/workflow-player.tsx`): steps through any workflow on the workflow and solution pages.
- **Guides** (`src/content/guides.ts`): structured blocks (`p`, `h2`, `list`, `tip`), ready to move to MDX or a CMS.
- **20 workflows** in the library.

## Photography

Photos live in `public/images/photos/` as WebP, and every one is registered in `src/content/photos.ts` with its creator, license and source. They were found via [Openverse](https://openverse.org) and are CC0, public domain, CC BY 2.0 or CC BY-SA 2.0, which all allow commercial use with attribution. Credits are listed on `/credits`, linked from the footer.

- To swap in your own photography, replace the file and update its entry in `photos.ts`; remove the credit once it's your own image.
- Avoid "NoDerivatives" (ND) and "NonCommercial" (NC) licensed images: cropping and commercial use aren't permitted.
- Photos show general industry scenes; the people pictured are not clients or staff, and the credits page says so.

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
| `ANTHROPIC_API_KEY` | For the AI chat | Powers `/start`. Without it the chat shows a fallback message. |
| `ASTOR_CHAT_MODEL` | Optional | Model override for the chat (default `claude-opus-5-5`). |

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

- **Phase 2 (done):** demos, workflow player, guides, additional workflows, photography.
- **Phase 3:** admin dashboard and customer portal (Supabase Auth; add RLS policies to `inquiries`), move content into tables behind `lib/content.ts`, Stripe checkout via `WorkflowAccess.paid.checkoutUrl`, and an Automation Discovery Tool that reuses the industry and solution data to generate recommendations.
