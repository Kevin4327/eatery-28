# Coffee Bar – Eatery 28 — Single-Page Website Source Code

A refined, aesthetic, responsive single-page café website built for **Coffee Bar – Eatery 28** on Waterfield Drive in Nuwara Eliya, Sri Lanka.

Built strictly in accordance with [`eatery-28-website-brief.md`](file:///c:/Users/Kevin/Downloads/eatery-28-website-brief.md) using **semantic HTML5, modern CSS3, and vanilla JavaScript only**. No heavy frameworks, no external build dependencies, and no bloated libraries.

---

## 1. Project Overview & Architecture

* **Type**: Single-page scrolling café website with smooth-scrolling section navigation.
* **Sections in Order**:
  1. `8.1 #home` — Hero with accessible image carousel, concise copy, and primary CTAs (*View Menu*, *Find Us*).
  2. `Lavazza Spotlight` — Prominent feature dedicated to the café's exclusive Lavazza Italian coffee roast.
  3. `8.2 #menu` — Breakfast & lunch focus only (highlighting Avocado Toast & American-style sandwiches; **strictly no dinner**; illustrative placeholder disclaimer).
  4. `8.3 #about` — Café introduction, mountain atmosphere, and welcoming setting without fabricated history.
  5. `8.4 #gallery` — Responsive photo grid with accessible vanilla JS keyboard-navigable Lightbox.
  6. `8.5 #strawberry` — **“Coming Soon”** feature for the upcoming Nuwara Eliya Strawberry Experience (clearly labelled as not yet operational).
  7. `8.6 #reviews` — Compact Google Reviews section with direct links to the Google Business Profile (no fabricated testimonials).
  8. `8.7 #contact` — Location (26 Waterfield Drive), clickable `tel:`, WhatsApp chat, and interactive Google Map embed (no booking system).

---

## 2. Directory Structure

```text
eatery-28/
├── index.html                 # Complete single-page scrolling website
├── 404.html                   # Art-directed fallback error page
├── .htaccess                  # Apache / cPanel configuration (gzip, expires caching, security headers)
├── robots.txt                 # Search engine crawler instructions and sitemap link
├── sitemap.xml                # Canonical XML sitemap for single-page root
├── favicon.svg                # Scalable vector brand favicon
├── site.webmanifest           # Web app manifest for mobile home-screen bookmarking
├── CONTENT-NEEDED.md          # Client confirmation & asset handoff checklist
├── README.md                  # Project documentation (this file)
└── assets/
    ├── css/
    │   └── style.css          # Design tokens, typography scale clamp(), layout grids, carousel & lightbox
    ├── js/
    │   └── main.js            # Vanilla JS: mobile navigation, scrollspy, carousel, tabs, lightbox modal
    └── images/
        └── temp/              # Curated development photography & IMAGE-LICENSES.md
```

---

## 3. Design System & Brand Atmosphere

- **Palette**:
  - Espresso Deep (`#1E140F` & `#2B1D16`) — Primary dark coffee canvas, headings, and footer.
  - Warm Oat / Cream (`#F7F3EE` & `#F0EAE1`) — Clean, inviting café background.
  - Warm Caramel / Brown (`#9C6644`) — Primary button, interactive highlights & callouts.
  - Highland Olive / Sage (`#606C5D`) — Badges and botanical accents.
  - Strawberry Red (`#C93B4A`) — "Coming Soon" Strawberry project callout.
- **Typography**:
  - Display Serif: *Playfair Display* (Editorial headings with responsive fluid clamp scaling).
  - Modern Sans: *Plus Jakarta Sans* (High-legibility interface typography, navigation, and body copy).
- **Accessibility & Restraint**:
  - Semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - WCAG-compliant color contrast ratios.
  - Respects `prefers-reduced-motion` for transitions and disables hero carousel auto-play.
  - Complete keyboard navigation (Esc, Arrow keys, focus trapping in modal).
  - No fake reviews, no unverified claims, no broken links.

---

## 4. Local Testing & Verification

To run and preview the website locally:

```bash
cd eatery-28
python -m http.server 8000
```
Open `http://localhost:8000/` in any browser.

---

## 5. Deployment Options

### A. GitHub Pages Deployment (Automated)

The project includes an automated deployment workflow at `.github/workflows/deploy.yml`:

1. Create a new public repository on GitHub named `eatery-28` under your account (`Kevin4327`).
2. Push the code:
   ```bash
   git push -u origin main
   ```
3. In your GitHub repository, go to **Settings &rarr; Pages**.
4. Under **Build and deployment &rarr; Source**, select **GitHub Actions** (or **Deploy from a branch** &rarr; `main` / root).
5. Your website will be live at: `https://kevin4327.github.io/eatery-28/`

---

## 6. Deployment Checklist (cPanel / Shared Hosting)

1. Verify all client confirmation items in `CONTENT-NEEDED.md`.
2. Swap development images in `assets/images/temp/` with client-provided high-resolution photography.
3. Verify domain name in `sitemap.xml` and `index.html` canonical meta tag.
4. Upload all root files and `assets/` to `public_html/`.
