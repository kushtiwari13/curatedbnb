# Curated BNB

Luxury, boutique-stay marketing and booking site built with React + Vite.

## Features
- Elegant landing page with hero, brand story, feature highlights, property grid, and host inquiry form.
- Three property detail pages sharing a refined template with sticky booking widget, amenity grid, and map placeholder.
- Reusable design system: theme tokens → CSS variables, buttons, cards, layout shell, modal, calendar.
- Availability uses Airbnb iCal feed with fallback and optional proxy to bypass CORS.
- Payment flow supports Stripe Checkout or a realistic stub mode for demos.

## Tech stack
- React 19, React Router 7, React Helmet for SEO
- CSS Modules + global variables, Playfair Display + Inter typography
- react-day-picker for the date range picker
- Optional Express + Stripe backend for Checkout sessions

## Getting started
```bash
npm install
npm run dev        # frontend only (http://localhost:5173)
npm run server     # start Express payment server (http://localhost:4242)
npm run dev:full   # run both (uses concurrently)
```

> This project expects Node 18+ (built-in fetch for the iCal proxy).

## Environment variables
Create a `.env` file in the project root (Vite) and another for the server if needed.

Frontend (`.env`):
- `VITE_PAYMENT_MODE=stub` (default) or `stripe`
- `VITE_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>` (required when `stripe`)
- `VITE_ICAL_PROXY=/api/ical` (optional; use when direct iCal fetch is blocked by CORS)

Server (`.env` or shell exports):
- `STRIPE_SECRET_KEY=<your_stripe_secret_key>` (required for live Stripe mode)
- `DOMAIN=http://localhost:5173` (used for Stripe redirect URLs)
- `PORT=4242` (optional override)

## Availability (Airbnb iCal)
- Default URL: `https://www.airbnb.com/calendar/ical/1194226480033123893.ics?t=b74d8cda4c4a4c88a571bcf0ef4d192d&locale=en-GB`
- The frontend fetches directly first. If CORS blocks it, set `VITE_ICAL_PROXY=/api/ical` and run the Express server; it proxies the feed via `/api/ical?url=<icalUrl>`.
- If both fail, a graceful mock set of blocked dates is used so the UI remains demoable.

## Payment flow
- **Stub mode (default):** Simulated payment with confirmation modal and download/email placeholders.
- **Stripe mode:** Set `VITE_PAYMENT_MODE=stripe`, configure keys above, run `npm run server`, and use the `/api/create-checkout-session` endpoint (proxied in Vite). Secrets remain server-side.

## Project structure
```
src/
  assets/        # Logo + P1/P2/P3 placeholders
  components/    # Reusable UI (layout, buttons, cards, modal, booking widget)
  data/          # Property data model
  pages/         # Home + property detail pages
  routes/        # Router configuration
  services/      # Availability + payment utilities
  styles/        # Global styles
  theme/         # Theme tokens + variable application
server/          # Express + Stripe checkout + iCal proxy
public/Logo.svg  # Favicon/logo
```

## Design tokens
- Centralized in `src/theme/tokens.js`. `applyTheme()` sets CSS variables consumed in `src/styles/global.css`. Adjust colors (primary/secondary), spacing, radii, shadows, and typography once to retheme the site.

## Notes
- Booking widget disables unavailable dates, calculates pricing (nightly + cleaning + service), and keeps the card sticky on desktop.
- Host inquiry form validates inputs client-side, logs payload to the console, and shows success feedback.
- Meta tags and typography are preloaded in `index.html`; Helmet adds per-page titles/descriptions.
