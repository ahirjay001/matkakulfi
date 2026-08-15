# plan.md — Desi Mastaani Marketing + Franchise Website Plan

> STATUS (updated): Phase 1 + Phase 2 COMPLETE & TESTED (iteration_1: backend 100%, frontend 95%+, zero real bugs).
> Built: all 6 pages with maximalist design system (Yatra One + Figtree, marigold/terracotta/gulal palette, truck-art dividers, jali textures, stamp badges, count-ups, carousel, parallax hero, condensing branded navbar), both forms (validated, MongoDB persisted, SMTP graceful-skip w/ placeholder .env creds), searchable 37-city Gujarat locations API, WhatsApp FAB (+919909399882), SEO meta + JSON-LD + analytics placeholder in index.html.
> PENDING (Phase 3, needs client input): real SMTP credentials in /app/backend/.env, real product photos/logo (stock placeholders in /app/frontend/src/lib/brand.js + /app/backend/data.py), real location list (/app/backend/data.py GUJARAT_LOCATIONS), real franchise investment figures (Franchise.jsx accordion), real testimonials, founding year.

## 1. Objectives
- Deliver a responsive, high-polish, **Indian-heritage maximalist** marketing website for Desi Mastaani with strong Franchise emphasis.
- Implement **functional forms** (Franchise Enquiry + Contact) with validation, success states, and **MongoDB persistence**.
- Send form submissions via **SMTP email** using `.env` credentials (placeholders until provided) with graceful failure + logs.
- Provide **Locate Us** with a fast **searchable Gujarat city list** (clearly editable placeholder data) via backend.
- Bake in performance (lazy-loaded images), SEO (meta + JSON-LD), and a prominent **WhatsApp CTA** (wa.me/919909399882).

## 2. Implementation Steps

### Phase 1 — Core Flow (No POC required)
Core is standard web + DB; SMTP is non-blocking with fallback to DB.

**User stories (Phase 1)**
1. As a visitor, I can submit a franchise enquiry and see a clear success confirmation.
2. As a visitor, I can submit a contact enquiry and see a clear success confirmation.
3. As the brand owner, I can be confident enquiries are stored even if SMTP is misconfigured.
4. As a marketer, I can change recipient email/SMTP creds via `.env` without code edits.
5. As a visitor, I can instantly WhatsApp the brand from any page.

**Build**
- Backend (FastAPI)
  - Models: `FranchiseEnquiry`, `ContactEnquiry`, timestamps, source page.
  - Endpoints:
    - `POST /api/franchise-enquiry`
    - `POST /api/contact`
    - `GET /api/locations?query=`
    - `GET /api/flavours`
  - MongoDB persistence for all submissions.
  - SMTP sender service:
    - Reads env: host/port/user/pass/from/to.
    - Attempts send in background task; on failure, returns success (since stored) but logs error.
- Frontend (React)
  - Minimal wiring for two forms + toast/success UI.
  - WhatsApp floating CTA linking to `https://wa.me/919909399882`.

### Phase 2 — V1 App Development (Design-first, full site)
**Call design_agent first** to lock visual system: palette, type pairing, motifs, component tokens, motion rules.
**Use stock imagery** placeholders; structure for easy replacement when user uploads assets.

**User stories (Phase 2)**
1. As a visitor, I immediately understand the brand vibe and tagline from the Home hero.
2. As a kulfi lover, I can browse flavours in an interactive carousel and open details.
3. As a franchise prospect, I can quickly understand the FOCO model and submit an enquiry.
4. As a visitor, I can search my city in Gujarat to find availability.
5. As a visitor, I can read the heritage story and trust the brand scale (120+ locations, 70+ partners).

**Frontend pages + key sections**
- Global
  - Sticky condensing navbar: Home | Our Kulfi | Franchise | Locate Us | About | Contact.
  - Maximalist-but-clean design system: truck-art/rangoli dividers, jali textures, stamp badges.
  - Framer-motion: scroll reveals, count-ups, subtle parallax.
  - SEO: per-page meta; JSON-LD (Organization/LocalBusiness).
- Home
  - Full-bleed hero with Hinglish headline + “Banaye Meethi Yaadein”; CTAs.
  - Brand story snippet; flavour carousel preview.
  - Animated stats band (stamp-style): 120+ Locations, 70+ Partners, 18 months growth.
  - Franchise CTA band; Locate teaser.
- Our Kulfi
  - Flavour lineup from `GET /api/flavours` with Hinglish descriptions.
  - “Matka-making / process” illustrated step section.
- Franchise (equal weight to Home)
  - Why Desi Mastaani + growth story.
  - FOCO overview; **placeholder-flagged** investment figures.
  - Steps: Enquire → Discuss → Onboard → Launch.
  - Testimonials section (placeholder-flagged).
  - Enquiry form wired to backend.
- Locate Us
  - Search + filter UI; city results via `GET /api/locations`.
  - Copy: “Nearest Desi Mastaani”.
- About
  - Mor N Mor Foods LLP heritage (since 1998, Ahmedabad) + brief sibling brand mention.
- Contact
  - Contact form, phone/email placeholders if needed, WhatsApp prominent.

**Backend additions**
- Seed/serve Gujarat city list (30–60 realistic cities/areas) with clear edit location.
- Flavour data seed (names, short Hinglish description, category tags, image placeholder URLs).
- Add basic rate-limiting or honeypot field to forms (light anti-spam).

**Testing (end of Phase 2)**
- Call testing_agent for one full E2E pass:
  - Both forms submit + persist + success UI.
  - SMTP failure does not break UX.
  - Locate search works; responsive checks; nav/motion sanity.

### Phase 3 — Refinement + Production Readiness
**User stories (Phase 3)**
1. As a user, pages feel fast on mobile with images loading smoothly.
2. As a franchise lead, I can trust form deliverability once SMTP creds are set.
3. As the owner, I can swap in real brand assets without breaking layout.
4. As a visitor, I can clearly read content with accessible contrast and type scale.
5. As a marketer, I can track traffic later via an analytics placeholder.

**Work**
- Replace stock imagery with user-provided logo/photos (when attached); ensure responsive crops.
- Harden SMTP:
  - Validate env at startup; clear admin-friendly logs.
  - Optional: retry/backoff; email templates (HTML + text).
- SEO polish:
  - OpenGraph images placeholders; sitemap/robots; canonical URLs.
- Performance:
  - Image compression guidance + lazy loading; route-level code splitting.
- Content polish:
  - Ensure Hinglish is natural, not forced; functional UI text stays English.

**Testing (end of Phase 3)**
- Call testing_agent for E2E + responsive + lighthouse quick checks; fix regressions.

### Phase 4 — Optional Enhancements (only if requested)
**User stories (Phase 4)**
1. As the owner, I can view enquiries in a simple admin table.
2. As the team, we can export enquiries to CSV.
3. As a visitor, I can see outlet cards by city with richer details when available.
4. As a marketer, I can run A/B variants of hero copy.
5. As the owner, I can add/edit flavours and locations without developer help.

**Options**
- Lightweight admin (no auth or simple password gate) for viewing/exporting enquiries.
- CMS-like JSON editing or simple CRUD screens.
- If adding auth, ask approval first (impacts agent testing).

## 3. Next Actions
- You provide (when ready): SMTP host, port, password/app-password, recipient email, and brand assets.
- I will:
  - Run **design_agent** to lock the maximalist visual system.
  - Implement backend + frontend V1 in one cohesive build.
  - Run testing_agent for end-to-end validation.

## 4. Success Criteria
- Visual: matches “Indian heritage + joyful maximalism” with modern polish (not clutter).
- Functional:
  - Franchise + Contact forms validate, submit, show success.
  - Submissions always stored in MongoDB; SMTP emails send once `.env` is filled.
  - Locate Us search returns relevant Gujarat cities quickly.
  - WhatsApp CTA works site-wide.
- Quality:
  - Mobile-first responsive; fast perceived load; no broken animations.
  - SEO meta + JSON-LD present; accessible typography/contrast.
