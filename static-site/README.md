# Static site — plain HTML, CSS and JS

`dist/` is the whole website as static files. No Node, no Next.js, no build step
on the server. It runs on cPanel shared hosting, or any web server at all.

## Uploading to cPanel

1. Build it: `npm run build:static` (from the repo root).
2. In cPanel open **File Manager → public_html**.
3. Upload **everything inside `static-site/dist/`** — not the `dist` folder
   itself, its contents. The easiest route is to zip `dist`, upload the zip,
   extract it, then move the files up one level.
4. Make sure the hidden `.htaccess` file came across. In File Manager use
   **Settings → Show Hidden Files** to check. It gives you clean URLs
   (`/about` rather than `/about/index.html`), the 404 page, gzip and caching.

That's it. There is nothing to install and nothing to restart.

## What's in here

```
dist/
  index.html            home
  about/index.html      …and one folder per page
  insights/<slug>/      the eight articles
  assets/
    styles.css          compiled stylesheet
    site.css            fonts and small additions
    main.js             menu, currency switch, quick exit, forms
    assessment.js       the two assessments
    data.js            ← fees and contact email live here
  abc-of-marriage.jpg
  .htaccess  robots.txt  sitemap.xml  404.html
```

## Making changes

**Fees** — edit `src/lib/pricing.ts`, then rebuild. Every page and the currency
switcher read from that one object. (To change a price without rebuilding, you
can edit `dist/assets/data.js` directly, but the next build overwrites it.)

**Contact details** — `src/lib/siteData.ts`, then rebuild.

**Article text** — `src/lib/insights.ts`, then rebuild.

**Page layout or wording** — `static-site/template.mjs` (header, footer, shared
pieces), `static-site/build.mjs` (home, services, assessments, insights) and
`static-site/pages-extra.mjs` (about, contact, academy, books, speaking, letter,
crisis, privacy).

Editing files in `dist/` by hand works, but a rebuild replaces them. Change the
source and rebuild instead.

## The contact form

Static hosting has no server to receive a form post, so there are two modes:

- **Default** — submitting opens the visitor's email app with the message
  already written, addressed to the practice. Works everywhere, no signup, but
  it depends on the visitor having a mail app set up.
- **Better** — sign up for a form service (Formspree, Web3Forms, FormSubmit —
  all have free tiers), then set the endpoint in `dist/assets/data.js`:

  ```js
  window.FORM_ENDPOINT = "https://formspree.io/f/xxxxxxx";
  ```

  Submissions then post straight to your inbox with no mail app involved. To
  make it permanent across rebuilds, set the same value in `build.mjs` where
  `data.js` is written.

Either way the page also shows the email address and WhatsApp button, so nobody
is ever stuck.

## Notes

- The assessments run entirely in the browser. Nothing is submitted or stored.
- Fonts are self-hosted. The `.woff2` files live in `static-site/media/` and the
  `@font-face` rules in `assets/styles.css` reference them as `../media/…`, so
  the build copies them to `dist/media/` — a sibling of `dist/assets/`, not
  inside it. If you ever replace `styles.css` with a fresh Tailwind build, check
  the font filenames still match what's in `media/`.
- Canonical tags, `og:url`, `sitemap.xml` and `robots.txt` all use `ORIGIN`,
  defined once at the top of `template.mjs` as `https://theactivatorcoach.com`.
  Build for a different domain with
  `SITE_ORIGIN=https://example.com npm run build:static`.
