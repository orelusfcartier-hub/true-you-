# True You Communities — website prototype

A front-end prototype for a company that buys land, builds triplexes, rents them **by the unit**,
sells the finished buildings, and puts an **activity center** and **safety kits** in every community.

No backend, no build step, no dependencies. Open `index.html` in a browser.

## Pages

| File | What it shows |
| --- | --- |
| `index.html` | Hero, the four business lines, the land→build→lease/sell model, featured units, triplexes, centers, and kits |
| `rentals.html` | Unit listings with live filters (community, bedrooms, max rent, availability) + sort, and a detail modal per unit |
| `triplexes.html` | Buildings for sale with sample pro-formas (rent roll, NOI, cap rate), the unit mix, and the buying process |
| `community.html` | The four activity centers, an events calendar, and how the spaces are governed |
| `safety.html` | Three kit tiers, a full contents comparison table, and the training program |
| `contact.html` | One combined waitlist / inquiry form (demo — nothing submits) |

## Files

```
index.html  rentals.html  triplexes.html  community.html  safety.html  contact.html
assets/css/styles.css   design tokens, layout, components — light + dark theme
assets/js/data.js       all sample content: units, triplexes, centers, kits, events, photo URLs
assets/js/site.js       rendering, filtering, modal, theme toggle, mobile nav, scroll reveal
```

## What works in the prototype

- Filter and sort the rental listings; click **View unit** for a detail modal
- Light/dark theme toggle, remembered in `localStorage`
- Responsive down to phone widths, with a collapsing nav
- Scroll-reveal animations (disabled under `prefers-reduced-motion`)
- Every form shows a toast confirming that nothing was submitted

## Editing the content

All sample content lives in `assets/js/data.js`:

- `UNITS` — rental units (`status`: `available` / `soon` / `leased`)
- `TRIPLEXES` — buildings for sale (`status`: `available` / `soon` / `sold`)
- `CENTERS`, `KITS`, `EVENTS` — community spaces, safety kit tiers, calendar
- `IMG` — every photo URL on the site, in one map

Add an object to any of those arrays and it appears on the site — no other file needs to change.

### Photos

Photos are stock images loaded from Unsplash by URL. If an image can't load (offline, blocked
network, dead URL), its frame keeps a gradient placeholder with a caption instead of showing a
broken image — so the layout never falls apart during a demo. Replace the URLs in `IMG` with real
project photography when you have it.

## Not built (on purpose)

Applications, payments, lease signing, listing CMS, availability sync, and email delivery are all
out of scope for this prototype. Financial figures on the triplex pages are illustrative sample
numbers, not offers or projections.
