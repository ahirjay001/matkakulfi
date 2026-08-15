# Desi Mastaani — Design Guidelines (restored master)

## Brand
- Name: Desi Mastaani | Tagline: "Banaye Meethi Yaadein"
- North star: Indian heritage meets joyful maximalism — layered, vibrant, intentional. Never messy, never flyer-like.
- Personality: festival energy, street-heritage nostalgia (kulfi cart / truck art), trustworthy franchise scale, mobile-first.

## Color Tokens (hex)
- brand_marigold #E46A12 (primary), brand_terracotta #B6452C (secondary), brand_gulal_magenta #D11B6B (accent)
- brand_mango_yellow #FFC533, brand_mehendi_green #1F7A3A, brand_royal_blue #1E4ED8
- brand_deep_maroon #3A0B1E (deep sections/footer), brand_kraft_brown #3B2416
- brand_khoya_cream #FFF3D6, brand_lassi_white #FFFDF7 (backgrounds), metallic_gold #D6A84A, ink #1A1208

## shadcn HSL tokens (index.css :root)
- background 36 100% 98% | foreground 24 38% 10% | card 38 100% 96% | primary 22 86% 49% | primary-fg 36 100% 98%
- secondary 12 58% 44% | accent 332 77% 46% | muted 36 55% 92% | muted-fg 24 18% 32%
- border/input 28 35% 82% | ring 332 77% 46% | destructive 0 78% 52% | radius 1rem

## Typography (Google Fonts)
- Display: **Yatra One** (H1/H2, section titles, stamp numbers — Indian signage energy). Alt: Baloo 2 for badges/subheads.
- Body: **Figtree** (UI + copy). Max 2 families.
- Scale: h1 `text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight`; h2 `text-2xl sm:text-3xl lg:text-4xl font-extrabold`; h3 `text-xl sm:text-2xl font-bold`; body `text-sm sm:text-base leading-relaxed`.

## Layout
- Container `max-w-6xl mx-auto px-4 sm:px-6`; sections `py-14 sm:py-18 lg:py-24`; card padding p-5/6; gaps 6-8.
- Alternate high-energy patterned sections with calm cream sections. Footer: deep maroon + gold dividers.
- Radii: card 24px, button 14px, pill 999px. Shadows: soft `0 10px 30px rgba(26,18,8,.10)`, stamp `0 14px 0 rgba(26,18,8,.12)`, lift `0 18px 50px rgba(26,18,8,.14)`.

## Motifs & Textures (CSS/SVG only, low-contrast)
- jali pattern: `background-image: radial-gradient(circle at 1px 1px, rgba(26,18,8,0.10) 1px, transparent 0); background-size: 18px 18px;`
- noise overlay via inline SVG feTurbulence (opacity .08)
- truck-art border strip: repeating-linear-gradient 90deg gold/marigold/magenta 10px stripes, rounded, used as section divider
- Hand-drawn inline SVG doodles (matka outline, kulfi drip, marigold garland) using currentColor.
- Stamp badges: scalloped/dotted border, slight rotation (-1deg..1deg) for stats (120+ Locations, 70+ Partners, 18 Months).

## Gradients (hero/section bg only, <=20% viewport, never on text areas)
- Marigold→Khoya: `linear-gradient(135deg, rgba(228,106,18,.22), rgba(255,197,51,.18) 45%, rgba(255,243,214,.55))`
- Terracotta→Lassi: `linear-gradient(120deg, rgba(182,69,44,.18), rgba(228,106,18,.14) 40%, rgba(255,253,247,.7))`
- Gulal glow radial overlay: `radial-gradient(closest-side, rgba(209,27,107,.18), transparent)`

## Motion (framer-motion)
- Reveal: initial `{opacity:0,y:18,scale:.98}` → `{opacity:1,y:0,scale:1}` spring `{stiffness:220,damping:18,mass:.9}`
- Hover card: scale 1.02 + shadow lift; tap .98. Nav condense: height/padding transition only (no `transition: all`).
- Count-up on in-view (once). Parallax: bg pattern slower than foreground. Respect prefers-reduced-motion.

## Components (shadcn from /app/frontend/src/components/ui/)
- button, badge, card, carousel, sheet, separator, input, textarea, sonner, accordion, scroll-area, command, avatar, aspect-ratio
- Buttons: primary solid marigold, secondary terracotta outline (hover fill), gulal focus ring. Inputs: cream bg, ink text, gold focus, NEVER transparent.
- Flavour carousel: swipeable, 1.1 slides mobile / 3 desktop, hover zoom photo scale 1.04, controlled vibrant per-flavour backgrounds (rotate marigold/terracotta/magenta/mango/green/blue — never rainbow).
- WhatsApp FAB: marigold circle, fixed bottom-5 right-5, data-testid="whatsapp-floating-cta".
- All interactive/key elements need kebab-case data-testid.

## Page-by-page
- **Home**: hero (layered cream + jali + mild gradient + product image card + parallax; H1 "Matka Mein Bani, Dil Se Banayi"; sub "Real Kulfi Ka Asli Mazaa. Har Scoop Mein Nostalgia."; CTAs Explore Flavours / Franchise Ke Baare Mein) → brand story 2-col → flavour carousel → stats stamp band on deep maroon (count-up) → franchise CTA bento (copy + mini Enquire→Launch timeline) → locate teaser (search + city chips) → footer.
- **Our Kulfi**: bento flavour grid (vibrant controlled backgrounds, cream text blocks) + matka process illustrated 4-6 steps with numbered badges, pop on scroll.
- **Franchise**: growth story proof cards + timeline; FOCO accordion (investment figures clearly "placeholder"); 4-step framed cards Enquire→Discuss→Onboard→Launch; enquiry form (Name/Phone/Email/City/Message, sonner toast + inline success panel); testimonials placeholder-labeled.
- **Locate Us**: Command search + filter chips, results in ScrollArea; empty state: "Aapke sheher mein jaldi aa rahe hain — Franchise ke liye ping karo."
- **About**: editorial heritage blocks + pull-quote stamps; Mor N Mor Foods LLP since 1998; brief sibling mention (Mor N Rich, Chill House).
- **Contact**: form card + contact details card, WhatsApp emphasized.

## Accessibility & Performance
- WCAG AA: ink on cream; lassi on deep maroon. Visible gulal focus rings. Touch targets ≥44px. Reduced-motion fallback = fades.
- Lazy-load below fold, CSS/SVG patterns over raster textures, responsive sizes.

## Anti-rules
- No `transition: all`, no `.App { text-align: center }`, no emoji icons (lucide-react/FontAwesome only), no dark/saturated purple-pink gradients, gradients <20% viewport, no transparent content backgrounds.

## Curated Stock Images (placeholders until client photos arrive)
- hero/rose macro festive wash: https://images.unsplash.com/photo-1612168829710-1405fc7e0a48?crop=entropy&cs=srgb&fm=jpg&q=85
- mango/kesar bright: https://images.unsplash.com/photo-1546173159-315724a31696?crop=entropy&cs=srgb&fm=jpg&q=85
- mango sliced graphic: https://images.unsplash.com/photo-1604256913753-eef2d1d8ca21?crop=entropy&cs=srgb&fm=jpg&q=85
- paan banana leaf bowl: https://images.unsplash.com/photo-1635778975932-6f51c8fa2ece?crop=entropy&cs=srgb&fm=jpg&q=85
- paan glossy leaf: https://images.unsplash.com/photo-1657599869449-0adb517dc8f2?crop=entropy&cs=srgb&fm=jpg&q=85
- gulab red rose macro: https://images.unsplash.com/photo-1602777256214-19c44dffecb4?crop=entropy&cs=srgb&fm=jpg&q=85
- gulab peach rose: https://images.unsplash.com/photo-1599821532311-3367b0cfdfe4?crop=entropy&cs=srgb&fm=jpg&q=85
- chocolate ice cream hand: https://images.unsplash.com/photo-1599849338138-91c566d530cd?crop=entropy&cs=srgb&fm=jpg&q=85
- chocolate spoon: https://images.unsplash.com/photo-1620197544618-af5f5366abb3?crop=entropy&cs=srgb&fm=jpg&q=85
- chocolate dip cinematic: https://images.unsplash.com/photo-1625996605618-da0c21d42e62?crop=entropy&cs=srgb&fm=jpg&q=85
- terracotta tiles texture: https://images.unsplash.com/photo-1580026926593-14aba6c81e65?crop=entropy&cs=srgb&fm=jpg&q=85
- terracotta pot wall: https://images.unsplash.com/photo-1699190772797-f4b7f130e644?crop=entropy&cs=srgb&fm=jpg&q=85
- hands holding pot (handmade): https://images.unsplash.com/photo-1654595510800-035b282b71f7?crop=entropy&cs=srgb&fm=jpg&q=85
- red flower festive macro: https://images.unsplash.com/photo-1487608817221-9e860a03ea49?crop=entropy&cs=srgb&fm=jpg&q=85
- heritage market b-roll: https://images.unsplash.com/photo-1646578515903-67873a5398f9?crop=entropy&cs=srgb&fm=jpg&q=85
- dessert closeup fallback: https://images.unsplash.com/photo-1517244683847-7456b63c5969?crop=entropy&cs=srgb&fm=jpg&q=85
- moody kitchen process: https://images.unsplash.com/photo-1635952346904-95f2ccfcd029?crop=entropy&cs=srgb&fm=jpg&q=85
