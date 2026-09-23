# MakeITaplan Website

Modern responsive site for MakeITaplan Ltd, built with React, TypeScript and Vite.

```bash
npm install
npm run dev
```

`npm run build` refreshes client testimonials from the public Beacon partner profile, then creates the production site in `dist/`. If Beacon is unavailable, the last checked-in review data remains in use.

## Analytics and consent

Google Analytics and Microsoft Clarity load only after the visitor accepts Analytics cookies. Copy `.env.example` to `.env.local` for local use and set:

```text

VITE_CLARITY_PROJECT_ID=xxxxxxxxxx
```

For GitHub Pages, add both values under **Repository settings > Secrets and variables > Actions > Variables**. Rejecting Analytics prevents either script from loading. Visitors can revise consent through **Cookie settings** in the footer.

Pushes to `main` deploy through GitHub Actions. Set **Settings > Pages > Source** to **GitHub Actions**. See `CDN_SETUP.md` for Cloudflare setup.
