# SignaalBewaking.nl Rebuild Plan

## Status: IN PROGRESS (2026-02-19)

### Completed
- [x] WordPress 6.9.1 install + MySQL DB (`signaalbewaking_tmp`)
- [x] Custom block theme `signaalbewaking` (FSE, no page builders)
- [x] theme.json v3 (colors, typography, layout, custom templates)
- [x] Full CSS with CSS variables (navy #0A2C3D + red #D00A2B)
- [x] Header + Footer template parts (nav, dropdown, mobile toggle)
- [x] Templates: index, page, front-page, 404, home (blog), single (post)
- [x] All 11 pages created (Home, Diensten, 3 service detail, Over ons, Contact, Support, Aanmelden, Privacy, AV)
- [x] Hero images downloaded from old site (4 images)
- [x] Real logo from old site (PNG)
- [x] Plugins: Yoast SEO, CF7, WP Super Cache
- [x] functions.php: Schema.org, nav walker, asset loading, cleanup
- [x] GitHub repo: github.com/mwal073/signaalbewaking-nl
- [x] Nginx preview on port 8088
- [x] DB backup exported
- [x] Blog templates: home.html (nieuwsoverzicht), single.html (artikel)
- [x] Blog CSS: .sb-blog-card, .sb-blog-grid, .sb-article styling
- [x] 9 nieuwe dienstpagina's (alarmverwerking, persoonsalarmering, alarmcentrale, ip-kiezer, teleservice, remote-fm, open-sluit, toegangsbeheer, live-view)
- [x] Diensten overzichtspagina bijgewerkt met alle 11 diensten als linked cards
- [x] Homepage: "Ons platform" sectie (Mijn SignaalBewaking, SB Pro, x-Admin met App Store/Play links)
- [x] JotForm integratie: 2 aanmeldformulieren (alarmcentrale #241633433809053, cameratoezicht #240673706672057)
- [x] Aanmelden pagina: links naar beide JotForm formulieren
- [x] Contact Form 7 geconfigureerd → info@signaalbewaking.nl
- [x] CF7 styling in CSS (inputs, focus states, submit button)
- [x] Support FAQ gecorrigeerd (geen valse claims over remote diagnostiek)
- [x] /voorwaarden-condities/ pagina aangemaakt (WP ID 36)
- [x] Footer: link naar Voorwaarden & Condities + kantoor/meldkamer openingstijden
- [x] 9 dienstpagina's professioneel herschreven (drone-beveiliging, certificeringen, etc.)
- [x] Header nav mega-dropdown met alle diensten gegroepeerd (Meldkamer, Opvolging & Toezicht, Remote Services, Innovatie)
- [x] Alle 20+ pagina's responsive CSS (inline grid overrides via attribute selectors)
- [x] **Mobiel menu volledig werkend** (v2.1.1):
  - Hamburger button: zichtbaar, 44x44px tap target, border + border-radius
  - Menu overlay: full-screen wit, height:calc(100vh-64px) (fix voor backdrop-filter containing block)
  - Diensten dropdown: categorieën met strong/small stacking
  - Nav-list: align-items:stretch (fix voor desktop align-items:center overerving)
- [x] **Responsive layout fixes** (v2.1.1):
  - Sections: width:100% i.p.v. 100vw op mobile (scrollbar width bug)
  - Inner containers: max-width:100% + horizontale padding
  - Hero: padding, font-size clamp, word-wrap
  - html: overflow-x:hidden
  - Post content/wp-site-blocks: max-width:100% + overflow-x:hidden
- [x] Alle 15+ pagina's gevalideerd op 375px viewport (Puppeteer)

### VOLGENDE SESSIE (prioriteit)
1. ~~**9 ontbrekende dienst-pagina's**~~ ✅ DONE
2. ~~**Contact Form 7 configureren**~~ ✅ DONE
3. ~~**Header nav uitbreiden**~~ ✅ DONE (mega dropdown)
4. ~~**Mobiel menu + responsive issues**~~ ✅ DONE (v2.1.1)
5. **Alle pagina-content professioneel herschrijven** — over-ons, support, contact nog nalopen
6. **Design op competitor-niveau** — Referentie: smc-monitoring.com, particulieren.nvd.nl — hero's, spacing, beeldmateriaal, micro-animaties
7. **Nieuws/blog sectie** — Categorieen aanmaken, 3-5 initiële SEO-artikelen, nav-integratie
8. **SEO meta titles/descriptions** — Via Yoast instellen per pagina
9. **WebP conversie** — Hero images + logo optimaliseren
10. **Live deployment** — Overzetten naar signaalbewaking.nl op Hostinger
11. **301 redirects** — Oude URL's → nieuwe URL's (vooral /services/ → /diensten/)

---

## 1. Stack

### Core
- **WordPress 6.9.1** (installed)
- **Custom block theme**: `signaalbewaking` (FSE, no page builders)
- **PHP 8.4** (on server)

### Plugins (3 installed)
| Plugin | Purpose | Status |
|--------|---------|--------|
| **Yoast SEO** | Meta, schema, sitemap | ✅ Installed |
| **WP Super Cache** | Page caching | ✅ Installed |
| **Contact Form 7** | Contact forms | ✅ Installed (nog configureren) |

**Removed**: Elementor (3 plugins), ITPlot theme, Ninja Forms, Revolution Slider, portfolio CPTs.

---

## 2. Information Architecture

### Alle 11 Diensten (van live site /services/)
| # | Dienst | Slug | Status |
|---|--------|------|--------|
| 1 | Alarmverwerking | `/alarmverwerking/` | TODO |
| 2 | Fysieke Alarmopvolging | `/alarmopvolging/` | ✅ Pagina bestaat |
| 3 | Persoonsalarmering | `/persoonsalarmering/` | TODO |
| 4 | Alarmcentrale | `/alarmcentrale/` | TODO |
| 5 | IP-Kiezer en SIM-kaarten | `/ip-kiezer/` | TODO |
| 6 | Teleservice | `/teleservice/` | TODO |
| 7 | Remote Facility Management | `/remote-facility-management/` | TODO |
| 8 | Remote Open- en Sluitbegeleiding | `/open-sluitbegeleiding/` | TODO |
| 9 | Remote Toegangsbeheer | `/toegangsbeheer/` | TODO |
| 10 | Remote Camera Surveillance | `/cameratoezicht/` | ✅ Pagina bestaat |
| 11 | Live View | `/live-view/` | TODO |

### Overige Pagina's
| Page | Slug | Status |
|------|------|--------|
| Home | `/` | ✅ Needs polish |
| Diensten overview | `/diensten/` | ✅ Alle 11 diensten listed |
| Meldkamerdiensten | `/meldkamerdiensten/` | ✅ Needs polish |
| Over ons | `/over-ons/` | ✅ Needs polish |
| Contact | `/contact/` | ✅ Needs CF7 form |
| Support | `/support/` | ✅ Needs polish |
| Aanmelden | `/aanmelden/` | ✅ Needs polish |
| Privacy | `/privacy/` | ✅ OK |
| Algemene Voorwaarden | `/algemene-voorwaarden/` | ✅ OK |

### Navigation
```
[Logo] Home | Diensten ▾ | Over ons | Support | Contact | [CTA: Aanmelden]
                ├── Meldkamerdiensten
                ├── Alarmopvolging
                └── Cameratoezicht
```

---

## 3. Design System

### Colors (theme.json + CSS variables)
| Naam | Hex | Gebruik |
|------|-----|---------|
| Brand Red | `#D00A2B` | CTA's, accenten, links |
| Dark Navy | `#0A2C3D` | Headings, hero bg, header |
| Brand Blue | `#6EC1E4` | Secondary accent |
| Brand Green | `#61CE70` | Success states |
| Text Dark | `#333333` | Body text |
| Light Gray | `#f4f4f4` | Section backgrounds |

### Typography
- **Font**: Roboto (Google Fonts, self-hosted woff2)
- **Sizes**: clamp() responsive (small 0.875rem → xx-large clamp(2rem, 3.2vw, 3.2rem))
- **Line-height**: 1.65 body, 1.2 headings

### Hero Sections
- Full-viewport met gradient overlay
- Hero image + text overlay bottom-left
- Pill CTA button (red, hover → white)
- Elke pagina een hero (short variant voor subpagina's)

### Referentie Concurrenten
- smc-monitoring.com/nl-nl/
- particulieren.nvd.nl/alarmcentrale/

---

## 4. Technical Details

### Server
- VPS: 153.92.223.138 (Hostinger)
- Preview: http://153.92.223.138:8088/
- MySQL: `signaalbewaking_tmp` database
- Nginx config: `/etc/nginx/sites-available/sb-preview`

### Local Build
- Path: `/root/tmp/signaalbewaking/`
- Theme: `/root/tmp/signaalbewaking/wp-content/themes/signaalbewaking/`

### Live Site (old)
- Domain: signaalbewaking.nl (Hostinger shared hosting)
- SSH: u762023236@82.198.227.43:65002
- Stack: WordPress + Elementor + ITPlot theme

### GitHub
- Repo: github.com/mwal073/signaalbewaking-nl
- Only theme files + content-export tracked (WP core in .gitignore)

---

## 5. Deployment Plan (TODO)

### Option A: Same VPS (153.92.223.138)
1. DNS A-record signaalbewaking.nl → 153.92.223.138
2. Nginx vhost voor signaalbewaking.nl (port 80/443)
3. SSL via Let's Encrypt
4. Kopie DB + uploads naar productie pad

### Option B: Hostinger (bestaand)
1. Backup huidige Hostinger site
2. Export DB + theme + uploads
3. Import op Hostinger
4. Geen DNS wijziging nodig

### 301 Redirects (kritiek voor SEO)
```
/services/ → /diensten/
/services/alarmverwerking/ → /alarmverwerking/  (etc.)
/case-studies/ → /over-ons/
/portfolio/ → /diensten/
```

---

## 6. File Structure
```
signaalbewaking/
├── PLAN.md
├── .gitignore
├── content-export/          ← HTML export van alle pagina's
│   ├── home.html
│   ├── diensten.html
│   ├── meldkamerdiensten.html
│   └── ...
├── wp-config.php            (gitignored)
├── wp-content/
│   └── themes/
│       └── signaalbewaking/
│           ├── theme.json
│           ├── style.css
│           ├── functions.php
│           ├── assets/
│           │   ├── css/main.css
│           │   ├── js/main.js
│           │   └── images/ (logo, heroes)
│           ├── parts/
│           │   ├── header.html
│           │   └── footer.html
│           └── templates/
│               ├── index.html
│               ├── page.html
│               ├── front-page.html
│               └── 404.html
```
