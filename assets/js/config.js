/* =========================================================
   True You — site configuration. Edit this file first.
   ========================================================= */
window.CONFIG = {
  brand: 'True You',
  tagline: 'Loud. Soft. Shiny. Whatever you are today.',
  founder: { name: 'Bella', handle: '@trueyou', role: 'founder + creative director' },

  /* Media -------------------------------------------------- */
  // The Instagram post whose video is the hero. Used as the fallback
  // embed when assets/media/hero.mp4 is not present.
  instagramPost: 'https://www.instagram.com/p/Dc88wRvjqXa/',
  instagramProfile: 'https://www.instagram.com/',
  heroVideo: 'assets/media/hero.mp4',
  heroPoster: 'assets/media/hero-poster.jpg',

  /* Launch day --------------------------------------------- */
  // Local date, YYYY-MM-DD. The countdown runs until 00:00 on this day,
  // the surprise runs for the whole day, then everything switches off.
  launchDate: '2026-09-06',
  surprise: {
    teaser: 'Order on launch day and something extra is going in your box.',
    headline: 'SURPRISE! You caught launch day.',
    body: 'Every order placed today ships with a mystery gift from the vault, a handwritten note from Bella, and early access to the next drop before anyone else sees it.',
    code: 'LAUNCH',
    codeText: 'Use code LAUNCH for 20% off today only.'
  },

  /* Money -------------------------------------------------- */
  currency: 'USD',
  freeShippingAt: 75,
  flatShipping: 6.95,
  promoCodes: {
    LAUNCH:   { type: 'percent', value: 20, launchDayOnly: true, label: 'Launch day 20% off' },
    TRUEYOU:  { type: 'percent', value: 10, label: 'Friends 10% off' },
    SHIPFREE: { type: 'shipping', value: 0, label: 'Free shipping' }
  },

  /* Where orders and sign-ups go -------------------------- */
  // Hosted on Netlify: orders, newsletter, notify-me, ideas and contact
  // submissions all land in Netlify → Forms (turn on email notifications
  // there). Nothing else to set up.
  netlifyForms: true,
  // Optional: a Stripe / Square / PayPal checkout link. Customers are sent
  // there right after placing the order. Leave empty to send payment links
  // by hand from the order emails.
  paymentLink: '',
  // Optional alternatives to Netlify Forms (any URL that accepts JSON).
  orderEndpoint: '',
  signupEndpoint: '',
  // Fallback: if a submission can't be delivered, the visitor gets a
  // prefilled email to this address.
  orderEmail: 'hello@example.com',

  /* Social ------------------------------------------------- */
  social: {
    instagram: 'https://www.instagram.com/',
    tiktok: 'https://www.tiktok.com/',
    email: 'hello@example.com'
  }
};
