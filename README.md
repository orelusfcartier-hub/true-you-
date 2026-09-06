# True You — launch website

A fun, loud, 80s-themed brand site: shop, cart, checkout, three quizzes, upcoming
drops with voting, launch-day surprise, and a hero video. Static files only, so it
runs anywhere (GitHub Pages, Netlify, Vercel, or a folder on your laptop).
Designed for phones first.

See `PLAN.md` for the thinking behind it.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8080
```

## Add the media (2 minutes)

The site pulls the launch video from the Instagram post automatically (official
Instagram embed). For the full-bleed autoplaying hero, add the file itself:

| Put this file here | What it does |
| --- | --- |
| `assets/media/hero.mp4` | Becomes the autoplaying hero background (downloaded from the Instagram post) |
| `assets/media/hero-poster.jpg` | Still frame shown while the video loads |
| `assets/media/bella.jpg` | Bella's portrait on the home page and the about page |
| `assets/media/products/<id>.jpg` | Product photos, e.g. `assets/media/products/windbreaker-sunset.jpg`. IDs are in `assets/js/data.js` |

Anything missing is handled: the hero falls back to the Instagram embed, portraits
and products show their designed retro tiles.

## Launch day and the surprise

`assets/js/config.js` → `launchDate` (YYYY-MM-DD). In the visitor's local time:

- **Before**: countdown in the hero, a "something extra is coming" teaser.
- **On the day**: surprise bar on every page, surprise block on the home page,
  `LAUNCH` code (20% off) auto-applied at checkout, surprise reveal on the order
  confirmation, product sheet and bag show the surprise note.
- **After**: all of that switches off by itself.

The surprise copy and code live under `surprise` in the same file.

## Going live (orders and sign-ups)

Everything works out of the box: the cart is saved in the browser, checkout
creates an order number, and the order confirmation opens a prefilled email to
`orderEmail`. To make it hands-off, fill in any of these in `assets/js/config.js`:

| Setting | What to put there |
| --- | --- |
| `paymentLink` | A Stripe Payment Link, Square checkout link, or PayPal.me link. Customers are sent there after placing the order. |
| `orderEndpoint` | A form/webhook URL that accepts JSON (Formspree, Netlify Forms, Zapier, Make). Each order is POSTed there. |
| `signupEndpoint` | Same idea for newsletter, notify-me, ideas and contact submissions. |
| `orderEmail` | Where the fallback order email goes. |

Promo codes are in `promoCodes`. Free-shipping threshold and flat rate are next to it.

## Edit the content

- `assets/js/config.js` — brand name, handles, launch date, surprise, money, endpoints.
- `assets/js/data.js` — products, categories, upcoming drops, quizzes, FAQ, ticker lines.

Add an object to any array and it appears on the site. No other file changes.

## Files

```
index.html         hero video, launch countdown / surprise, shop preview, quiz teaser, coming soon, Bella, newsletter
shop.html          product grid with category filters and a product sheet
quiz.html          three quizzes with shareable results and a product match
coming-soon.html   upcoming drops with voting and notify-me
about.html         Bella's story, how things are made, FAQ, contact
checkout.html      bag review, promo codes, shipping form, confirmation + surprise
assets/css/retro.css   the whole look, mobile first
assets/js/app.js       cart, checkout, launch logic, quizzes, voting, forms, effects
```
