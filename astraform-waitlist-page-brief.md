# AstraForm — Waitlist Landing Page: Build Brief for Claude Code

**How to use this:** hand this whole file to Claude Code in the new repo.
It covers the project context, the design direction, the page structure,
and the copy — everything needed to build the page without you having to
re-explain the product. This is a **separate repo** from the AstraForm
backend monorepo — it's just the marketing/waitlist site, meant to be
hosted on its own domain ahead of the actual product existing.

---

## 1. What this page is

A pre-launch waitlist landing page for **AstraForm** — not the product
itself, just the pitch + an email capture. One page, no login, no app
behind it yet.

### Product context (for tone and copy accuracy)

AstraForm is an AI-powered Document Intelligence platform. It takes a
form a user already has — a government form, a bank or insurance
application, a tax form, a scholarship application, legal paperwork — as
a PDF, Word doc, or scanned image, and turns it into a guided,
field-by-field experience:

- Identifies the type of form and what it's for
- Maps every field on it
- Explains, in plain language, exactly what belongs in each field
- Validates entries and flags likely mistakes
- Tells the user what supporting documents they'll need
- Answers questions about the form in real time, grounded in its actual content

It's explicitly **not** a form builder (like Typeform/JotForm) and it's
**not** just OCR — the differentiator vs. a generic PDF/OCR tool is that
AstraForm understands the form's purpose and structure, not just its text.

Long-term vision (fine to reference briefly, don't oversell it): secure
profiles for autofill, multilingual support, a browser extension that
guides users through forms directly on government/bank sites, and
enterprise APIs.

---

## 2. Tech stack

Ask Claude Code to pick this up, but the reasonable default for a
one-page static site headed to its own domain:

- Plain HTML/CSS/JS, or a lightweight static-site framework (Astro,
  or a single-page Next.js app if the repo will later grow beyond one
  page) — favor whichever is simplest to deploy to the target host.
- No backend framework needed for the page itself. See §5 for the
  waitlist email capture, which does need *something* to actually store
  submissions.
- Deploy target: a static host suited to a custom domain (Vercel,
  Netlify, Cloudflare Pages, or GitHub Pages) — confirm which one before
  scaffolding, since it affects the build setup.

---

## 3. Design direction

Aesthetic: dark, minimal, clean — grounded in the subject matter (forms,
documents, official paperwork) rather than a generic SaaS look. Avoid
templated AI-generated defaults: no tracked-out ALL-CAPS eyebrow labels,
no dot-joined meta strings, no numbered 01/02/03 badges unless the content
is genuinely a sequence, no arrow glyphs tacked onto button text, no
identical rounded "SaaS cards" with the same soft shadow on everything.

### Palette (base tokens — adjust only with intent, not by default)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0E1116` | Page background — near-black ink, not pure black |
| `--bg-alt` | `#151922` | Alternating section background, elevated surfaces |
| `--paper` | `#F3EEE3` | Warm paper tone — reserved for literal "document" elements (the hero form mockup), not chrome |
| `--ink` | `#E9E7E1` | Primary text on dark |
| `--ink-dim` | `#90959F` | Secondary text |
| `--gold` | `#CBA457` | Primary accent — muted brass/stamp-ink gold, not neon. CTAs, highlights |
| `--teal` | `#74B8AF` | Secondary accent — AI/guidance moments, success states |

### Type

- Display/headline: a serif with some authority (e.g. Fraunces) — ties to
  the "official document" feel without going stuffy.
- Body/UI: a clean grotesque sans (e.g. Inter).
- Small labels/field tags: a monospace face (e.g. IBM Plex Mono), used
  sparingly for things like field-ID chips — not as an ALL-CAPS eyebrow
  pattern.

### The hero visual — this is the one thing to get right

The hero should show the product's actual core interaction, not a stock
abstract graphic. Concretely: a stylized mockup of a real form (paper-
toned card) with a few fields — most filled normally, one field visually
flagged (dashed gold outline + small "AI" chip) with a floating callout
/ tooltip next to it giving the plain-language explanation for that
field. That single moment *is* the product pitch — lean on it instead of
generic hero art.

### Restraint

Spend visual boldness on the hero mockup. Keep everything else quiet:
one accent color doing most of the work (gold), teal reserved for
success/interactive moments only. Motion: one subtle entrance is fine;
avoid fade-slide-up on every section and hover effects on every card.

---

## 4. Page structure and copy

Build in this order. Copy below is close to final — adjust only for
flow, don't dilute it into generic SaaS-speak.

1. **Nav** — wordmark "AstraForm" + a single "Join the waitlist" button
   that jumps to the final CTA.

2. **Hero**
   - Headline: "Every form field, explained before you fill it in."
   - Subhead: "AstraForm reads your government, banking, tax, and
     scholarship forms and tells you exactly what belongs in each field,
     in plain language, before you get it wrong."
   - Email capture form + button: "Join the waitlist"
   - Micro-copy under the form: "No spam. One email when we're ready
     for you."
   - The hero visual described in §3.

3. **Contrast section** ("OCR reads the text. It doesn't read the
   form.") — two columns, "A typical OCR tool" vs. "AstraForm", each a
   short list contrasting raw text extraction against actual
   understanding (identifies the form, maps fields, explains them,
   flags mistakes, lists required attachments).

4. **How it works** — a genuine 3-step sequence, fine to number:
   1. **Upload** — Add a PDF, scanned image, or Word document.
   2. **Understand** — AstraForm identifies the form, maps every field,
      and pulls the instructions behind it.
   3. **Complete** — Get a plain-language explanation per field, catch
      mistakes before submitting, know what to attach.

5. **Use cases grid** — six short cards: Government forms, Banking &
   loans, Insurance, Tax filings, Scholarships, Legal paperwork. One
   line each on why that category is specifically painful today.

6. **Vision** — short, three-paragraph section on where this goes next
   (autofill from a secure profile, multilingual support, a browser
   extension) — framed as "that's the start, not the ceiling," not a
   roadmap slide.

7. **Final CTA** — headline "Be first in when AstraForm opens up" +
   the same email capture form, centered.

8. **Footer** — wordmark + one dry, understated line, e.g. "We're not a
   law firm, an accountant, or a government agency. We just make their
   paperwork less confusing."

---

## 5. Waitlist email capture — needs an actual backend this time

This repo is meant to go live on a real domain, so the email form should
actually store submissions (unlike a quick chat-side mockup). Options,
roughly in order of least to most setup:

- **Formspree / Getform / Basin** — drop-in form endpoint, zero backend
  code, fastest to ship.
- **A small serverless function** (Vercel/Netlify function) writing to
  a database (Supabase, Postgres, Airtable) — more control, still
  lightweight.
- **An email marketing tool's API directly** (Mailchimp, ConvertKit,
  Loops) — useful if the plan is to email the list from day one anyway.

Ask Claude Code to confirm which one before wiring the form — it changes
the API contract the form JS needs to hit. Whichever is chosen, both the
hero and final CTA forms should submit to the same endpoint, and the
success state (replace the form with a confirmation message) should only
show after a real successful response — not optimistically on submit.

---

## 6. Acceptance checklist

- Responsive down to mobile; hero visual reflows sensibly on small
  screens (the floating callout shouldn't overlap or clip).
- Visible keyboard focus on the email inputs and buttons.
- `prefers-reduced-motion` respected if any motion is added.
- Both waitlist forms submit to the same real endpoint and only show
  success after a confirmed response.
- No copy left as placeholder/lorem ipsum — everything in §4 is meant
  to ship close to as-is.
