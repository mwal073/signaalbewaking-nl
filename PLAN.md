# SignaalBewaking.nl Rebuild Plan

## 1. Stack

### Core
- **WordPress 6.7+** (latest stable)
- **Custom lightweight theme**: `signaalbewaking` (block theme, FSE-ready)
- **Gutenberg** native blocks only (NO Elementor, NO page builders)
- **PHP 8.4** (already on server)

### Plugins (minimal — 4 total)
| Plugin | Purpose | Alternative considered |
|--------|---------|----------------------|
| **Yoast SEO** | Meta, schema, sitemap, breadcrumbs | Rank Math (heavier UI) |
| **WP Super Cache** | Page caching + gzip | LiteSpeed Cache (not on Nginx) |
| **Contact Form 7** | Lightweight contact forms | Ninja Forms (heavier), WPForms (freemium bloat) |
| **WebP Express** | Auto WebP conversion + serving | ShortPixel (SaaS dependency) |

**Removed from current site**: Elementor (3 plugins), ITPlot theme, Ninja Forms, Revolution Slider, portfolio/case-study CPTs.

---

## 2. Information Architecture

### Pages & URL Slugs
| Page | Slug | Menu | Priority |
|------|------|------|----------|
| Home | `/` | ✓ | P0 |
| Diensten (overview) | `/diensten/` | ✓ | P0 |
| Meldkamerdiensten (PAC detail) | `/meldkamerdiensten/` | ✓ | P0 (SEO target) |
| Alarmopvolging | `/alarmopvolging/` | submenu | P1 |
| Cameratoezicht | `/cameratoezicht/` | submenu | P1 |
| Over ons | `/over-ons/` | ✓ | P1 |
| Contact | `/contact/` | ✓ | P0 |
| Support | `/support/` | ✓ | P1 |
| Aanmelden installateur | `/aanmelden/` | CTA button | P1 |
| Privacy Policy | `/privacy/` | footer | P2 |
| Algemene Voorwaarden | `/algemene-voorwaarden/` | footer | P2 |

### Navigation Structure
```
[Logo] Home | Diensten ▾ | Over ons | Support | Contact | [CTA: Aanmelden]
                ├── Meldkamerdiensten
                ├── Alarmopvolging
                └── Cameratoezicht
```

### Internal Linking Plan
- Home → Diensten overview → Individual service pages
- Every service page → Contact CTA
- Meldkamerdiensten → related services (alarmopvolging, cameratoezicht)
- Footer: all pages + legal links

---

## 3. Hero Section (Schipper-inspired)

### Behavior Spec
Inspired by schippersecurity.nl hero:
- **Full-viewport hero** with `min-height: clamp(56vh, 64vw, 78vh)`
- **Background image** with gradient overlay: `linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.58))`
- **Text bottom-left**: max-width `min(52ch, 70%)`, large responsive type `clamp(1.6rem, 2.4vw, 2.6rem)`
- **CTA button**: brand blue (#6EC1E4) pill, hover → white
- **Mobile**: full-width, text stacked, reduced padding, image repositioned via `object-position`
- **No carousel/slider** (better CWV than current Revolution Slider)
- **Single static hero** per page (faster LCP)

### SignaalBewaking adaptation
- Brand blue (#6EC1E4) as accent instead of Schipper orange
- Hero image: security/monitoring themed placeholder
- Headline: "Uw Kiwa-gecertificeerde meldkamer"
- Subtitle: "24/7 alarmverwerking volgens NEN-50518"
- CTA: "Bekijk onze diensten →"

---

## 4. Performance Plan

### Image Strategy
- All images served as WebP (WebP Express auto-conversion)
- Responsive `srcset` via WordPress native
- Hero image: preloaded via `<link rel="preload">`
- Lazy loading on all below-fold images (native `loading="lazy"`)

### CSS/JS Strategy
- **No external CSS frameworks** — custom theme CSS only (~15KB)
- **Critical CSS** inlined in `<head>` for above-fold content
- Font: system font stack OR self-hosted Roboto (preloaded, `font-display: swap`)
- Minimal JS: only for mobile menu toggle + smooth scroll (~2KB)
- No jQuery dependency

### Caching
- WP Super Cache: full-page cache
- Nginx: `Cache-Control` headers for static assets (1 year)
- Nginx gzip compression enabled

### CWV Targets
- **LCP** < 2.5s: preloaded hero image, minimal render-blocking resources
- **CLS** < 0.1: explicit image dimensions, no layout shifts from fonts/ads
- **INP** < 200ms: minimal JS, no heavy event handlers

---

## 5. SEO Plan

### Meta Titles & Descriptions
| Page | Title | Description |
|------|-------|-------------|
| Home | SignaalBewaking — Kiwa-gecertificeerde Meldkamerdiensten | 24/7 alarmverwerking, fysieke alarmopvolging en cameratoezicht. NEN-50518 gecertificeerd vanuit Veenendaal. |
| Meldkamerdiensten | Meldkamerdiensten — PAC Alarmcentrale \| SignaalBewaking | Professionele particuliere alarmcentrale (PAC). Alarmverwerking, opvolging, persoonsalarmering en remote monitoring. Kiwa gecertificeerd. |
| Alarmopvolging | Fysieke Alarmopvolging — 24/7 Response \| SignaalBewaking | Snelle alarmopvolging door gecertificeerde teams. Verificatie ter plaatse bij inbraak, brand en overval. Landelijke dekking. |
| Cameratoezicht | Remote Cameratoezicht — Live Monitoring \| SignaalBewaking | Professioneel cameratoezicht op afstand. Live meekijken, beeldverificatie en doormelding naar hulpdiensten. |
| Diensten | Beveiligingsdiensten Overzicht \| SignaalBewaking | Compleet overzicht van onze meldkamerdiensten: alarmverwerking, opvolging, cameratoezicht, teleservice en meer. |
| Over ons | Over SignaalBewaking — Uw Betrouwbare Meldkamer | Leer meer over SignaalBewaking: Kiwa-gecertificeerd, NEN-50518 compliant, gevestigd in Veenendaal. |
| Contact | Contact — SignaalBewaking Veenendaal | Neem contact op met SignaalBewaking. Vendelier 71, 3905 PD Veenendaal. Tel: 088-1199911. |

### Heading Structure (per page)
- Single `<h1>` per page (unique, keyword-rich)
- `<h2>` for main sections
- `<h3>` for sub-sections/features
- No heading skips

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SignaalBewaking",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Vendelier 71",
    "postalCode": "3905 PD",
    "addressLocality": "Veenendaal",
    "addressCountry": "NL"
  },
  "telephone": "+31881199911",
  "email": "info@signaalbewaking.nl",
  "url": "https://signaalbewaking.nl"
}
```
Plus `Service` schema on service pages.

### Technical SEO
- XML sitemap via Yoast
- Clean permalink structure: `/%postname%/`
- Canonical URLs on all pages
- `robots.txt` allowing all (except wp-admin)
- Open Graph + Twitter Card meta via Yoast
- Breadcrumbs via Yoast

---

## 6. Expanded PAC Service Content

### Meldkamerdiensten (Main SEO page)
Structured sections:
1. **Wat is een PAC?** — Uitleg particuliere alarmcentrale
2. **Onze meldkamerdiensten** — Grid van 6 kernservices
3. **Hoe werkt het?** — 3-stappen proces (Aansluiting → Monitoring → Response)
4. **Certificering** — NEN-50518, Kiwa, kwaliteitswaarborgen
5. **Voor wie?** — Bedrijven, particulieren, zorginstellingen
6. **FAQ** — 6-8 veelgestelde vragen over meldkamerdiensten
7. **CTA** — Contact / offerte aanvragen

### Individual service pages
Each with:
- Hero + intro paragraph
- Hoe werkt het (process)
- Voordelen (benefits list)
- Technische specificaties
- FAQ block (3-5 questions)
- CTA naar contact

---

## 7. Implementation Order
1. WordPress install + DB setup
2. Custom theme scaffold (theme.json, templates, styles)
3. Hero component (CSS-only, responsive)
4. Page templates (home, diensten, single-service, contact, generic)
5. Content creation (all pages with expanded copy)
6. Plugin install + configuration (Yoast, Cache, CF7, WebP Express)
7. Schema markup injection
8. Performance optimization (critical CSS, preload, cache)
9. Git init + push to GitHub
