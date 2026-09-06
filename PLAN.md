# True You — launch site plan

## Goal
A fully working, mobile-first brand website with a loud, happy 80s look.
Static files only (no build step, no backend), so it can be hosted anywhere
(GitHub Pages, Netlify, Vercel, a plain folder).

## Audience and voice
Black women, many with Caribbean roots. The site speaks to them as friends:
warm, playful, confident, a little cheeky. Island flavor shows up lightly in
names, colors and small details (colorway names, a song reference, a joke),
never as the headline. The headline is *you* being the truest version of you.

## Media
Instagram blocked our download tools, so media is wired in two layers:
1. `assets/media/hero.mp4` (+ `hero-poster.jpg`) — drop the downloaded post
   video here and it becomes the autoplaying hero background.
2. If the file is missing, the hero falls back to Instagram's official embed
   of the post (`CONFIG.instagramPost`), which loads in the visitor's browser.
Product photos go in `assets/media/products/<id>.jpg`; until then each card
shows a designed retro tile so nothing ever looks broken.

## Pages
| File | Job |
| --- | --- |
| `index.html` | Hero video, launch countdown / launch-day surprise, shop preview, quiz teaser, coming soon, Bella, newsletter |
| `shop.html` | Product grid with category filters, product detail sheet, add to cart |
| `quiz.html` | Three quizzes with shareable results and a product match |
| `coming-soon.html` | Upcoming drops with per-product "tell me first" sign-up and vote |
| `about.html` | Bella, the brand story, FAQ, contact |
| `checkout.html` | Cart review, promo codes, shipping form, order confirmation + surprise reveal |

## Operational pieces (all working, all client-side)
- Cart: persistent (localStorage), slide-in drawer, quantities, promo codes,
  free-shipping progress bar, badge count in the nav.
- Checkout: validates the form, creates an order number, stores the order,
  shows a confirmation with the launch-day surprise, then (optional) sends the
  order to `CONFIG.orderEndpoint` (Formspree / Netlify / any webhook) and/or
  redirects to `CONFIG.paymentLink` (Stripe, Square, PayPal link).
  Without either configured, it opens a prefilled email to `CONFIG.orderEmail`.
- Launch day: `CONFIG.launchDate`. Before it: countdown. On the day: the
  surprise banner, the surprise checkout reveal, and the `LAUNCH` promo code.
  After it: the launch-day extras switch off automatically.
- Quizzes: engine in `app.js`, content in `data.js`. Results map to products.
- Notify-me / newsletter forms: post to `CONFIG.signupEndpoint` if set,
  otherwise saved locally and acknowledged.
- Mobile: designed at 390px first; sticky bottom action bar, full-screen menu,
  thumb-sized buttons, safe-area insets, reduced-motion respected.

## 80s look
Fonts: Bungee (display), Monoton (neon sign moments), Outfit (body).
Colors: hot pink, electric cyan, neon yellow, ultraviolet, night navy.
Motifs: Memphis squiggles and confetti, sunset-grid horizon, chrome text,
VHS scanlines on the hero, cassette / boombox icons, "NEW WAVE" stickers.
Motion: bouncy hover, marquee ticker, confetti on add-to-cart, all disabled
under `prefers-reduced-motion`.

## Where to edit
- `assets/js/config.js` — brand name, handles, launch date, surprise copy,
  endpoints, payment link.
- `assets/js/data.js` — products, upcoming drops, quizzes, FAQ, ticker lines.
