/* =========================================================
   True You — content. Products, drops, quizzes, FAQ, ticker.
   Add an object to any array and it shows up on the site.
   Product photos: assets/media/products/<id>.jpg (optional;
   the retro tile shows until the photo exists).
   ========================================================= */

/* Retro tiles: each product gets a gradient + an emoji "sticker"
   so cards look designed even before real photos land. */
window.PRODUCTS = [
  {
    id: 'windbreaker-sunset', name: 'The Sunset Windbreaker', cat: 'wear',
    price: 78, compareAt: 95, badge: 'LAUNCH DROP',
    colorways: ['Sorrel Red', 'Guava Pink', 'Sea Grape'], sizes: ['XS', 'S', 'M', 'L', 'XL', '2X', '3X'],
    tile: { from: '#ff2d95', to: '#ff9d00', icon: '🧥' },
    blurb: 'Color-block nylon, cropped just enough, with a hood that actually fits over big hair.',
    details: ['Water-resistant nylon shell', 'Oversized hood, satin-lined', 'Reflective piping on the sleeves', 'Sizes XS to 3X, cut for hips']
  },
  {
    id: 'tee-true', name: '"TRUE" Chrome Tee', cat: 'wear',
    price: 36, badge: 'BEST SELLER',
    colorways: ['Black', 'Hot Pink', 'Electric Blue'], sizes: ['XS', 'S', 'M', 'L', 'XL', '2X', '3X'],
    tile: { from: '#7b2cff', to: '#19e6ff', icon: '👕' },
    blurb: 'Heavyweight cotton with a puffy chrome print. Wear it with everything, wash it a hundred times.',
    details: ['100% ring-spun cotton, 220 gsm', 'Puff chrome print', 'Relaxed unisex fit', 'Pre-shrunk']
  },
  {
    id: 'scrunchie-set', name: 'Big Hair Scrunchie Trio', cat: 'hair',
    price: 24, badge: 'GENTLE ON CURLS',
    colorways: ['Sherbet Mix', 'Night Neon'], sizes: [],
    tile: { from: '#fff01f', to: '#ff2d95', icon: '🎀' },
    blurb: 'Three satin-lined jumbo scrunchies. No snags, no dents, no drama. Made for curls, coils and locs.',
    details: ['Satin lining, zero friction', 'Jumbo elastic for thick hair', 'Three per set', 'Machine washable']
  },
  {
    id: 'bonnet-satin', name: 'Sleep Loud Satin Bonnet', cat: 'hair',
    price: 22,
    colorways: ['Hot Pink', 'Ultraviolet', 'Cyan'], sizes: ['Regular', 'XL for locs'],
    tile: { from: '#ff2d95', to: '#7b2cff', icon: '🌙' },
    blurb: 'Double-layer satin, wide band that stays put, and a neon lightning bolt so it looks cute on purpose.',
    details: ['Double-layer charmeuse satin', 'Adjustable wide band', 'XL fits locs and braids', 'Hand wash']
  },
  {
    id: 'hoops-jumbo', name: 'Doorknocker Hoops', cat: 'shine',
    price: 28, badge: 'ICONIC',
    colorways: ['Gold', 'Silver'], sizes: ['Medium (50mm)', 'Jumbo (70mm)'],
    tile: { from: '#ffb800', to: '#fff01f', icon: '⭕' },
    blurb: 'Bamboo-style hoops, lightweight enough for all day, loud enough for all night.',
    details: ['Hypoallergenic, nickel-free', '18k gold or rhodium plating', 'Secure latch back', 'Comes in a tiny cassette case']
  },
  {
    id: 'lipgloss-glossytalk', name: 'Glossy Talk Lip Gloss', cat: 'glow',
    price: 16, badge: 'NEW',
    colorways: ['Mango Glass', 'Hibiscus', 'Clear Shine'], sizes: [],
    tile: { from: '#ff6b6b', to: '#ffb800', icon: '💋' },
    blurb: 'High shine, no stick. Made for deep skin tones first, not as an afterthought.',
    details: ['Non-sticky formula', 'Vitamin E + coconut oil', 'Sheer tint, mirror finish', 'Cruelty-free']
  },
  {
    id: 'bucket-hat', name: 'Boombox Bucket Hat', cat: 'wear',
    price: 32,
    colorways: ['Sea Grape', 'Neon Yellow', 'Black'], sizes: ['S/M', 'L/XL'],
    tile: { from: '#19e6ff', to: '#7b2cff', icon: '🧢' },
    blurb: 'Reversible: bright side out for the day, black side out when you feel mysterious.',
    details: ['Reversible twill', 'Embroidered boombox', 'Two sizes', 'Packs flat']
  },
  {
    id: 'fanny-pack', name: 'Hands-Free Fanny Pack', cat: 'shine',
    price: 42,
    colorways: ['Hot Pink', 'Cyan'], sizes: [],
    tile: { from: '#ff2d95', to: '#19e6ff', icon: '👝' },
    blurb: 'Holographic, water-resistant, big enough for a phone, gloss, cards and your edge brush.',
    details: ['Holographic PU', 'Adjustable strap to 52"', 'Two zip pockets', 'Wipe clean']
  },
  {
    id: 'sweatshirt-crew', name: 'True You Crewneck', cat: 'wear',
    price: 64, compareAt: 72,
    colorways: ['Sorrel Red', 'Lavender', 'Cream'], sizes: ['XS', 'S', 'M', 'L', 'XL', '2X', '3X'],
    tile: { from: '#b91d5e', to: '#ff2d95', icon: '✨' },
    blurb: 'Brushed fleece, dropped shoulder, retro varsity letters. The one you steal back from your cousin.',
    details: ['400 gsm brushed fleece', 'Dropped shoulder', 'Chenille varsity patch', 'Sizes XS to 3X']
  },
  {
    id: 'sticker-pack', name: 'Neon Sticker Pack', cat: 'shine',
    price: 9,
    colorways: [], sizes: [],
    tile: { from: '#fff01f', to: '#19e6ff', icon: '⚡' },
    blurb: 'Twelve holographic stickers: cassettes, lightning bolts, a boombox, and one that just says TRUE.',
    details: ['12 die-cut stickers', 'Waterproof vinyl', 'Laptop and water-bottle safe']
  },
  {
    id: 'body-shimmer', name: 'Gold Hour Body Shimmer', cat: 'glow',
    price: 26, badge: 'NEW',
    colorways: ['Gold', 'Rose Gold'], sizes: [],
    tile: { from: '#ffb800', to: '#ff6b6b', icon: '🌟' },
    blurb: 'Shea-based shimmer oil that shows up on melanin. Shoulders, collarbones, legs, everything.',
    details: ['Shea + jojoba base', 'Fine-milled mica', 'Light coconut scent', '100 ml pump']
  },
  {
    id: 'socks-neon', name: 'Slouch Socks (2 pack)', cat: 'wear',
    price: 18,
    colorways: ['Pink + Cyan', 'Yellow + Purple'], sizes: ['One size'],
    tile: { from: '#7b2cff', to: '#fff01f', icon: '🧦' },
    blurb: 'Scrunch them, stack them, wear them with heels if you dare.',
    details: ['Cotton blend', 'Extra-long slouch cuff', 'Two pairs']
  }
];

window.CATEGORIES = [
  { id: 'all',   label: 'Everything' },
  { id: 'wear',  label: 'Wear' },
  { id: 'hair',  label: 'Hair' },
  { id: 'shine', label: 'Shine' },
  { id: 'glow',  label: 'Glow' }
];

/* ---------------- upcoming products ---------------- */
window.UPCOMING = [
  {
    id: 'up-jacket', name: 'The Varsity Jacket', eta: 'October', stage: 'In sampling',
    tile: { from: '#ff2d95', to: '#7b2cff', icon: '🏆' },
    blurb: 'Wool body, satin sleeves, a chenille "T" on the chest. The big one.',
    votes: 312
  },
  {
    id: 'up-edge', name: 'Edge Control That Behaves', eta: 'October', stage: 'Testing formulas',
    tile: { from: '#19e6ff', to: '#fff01f', icon: '💫' },
    blurb: 'Strong hold, no flaking, no white cast, smells like vanilla and soursop.',
    votes: 540
  },
  {
    id: 'up-cassette', name: 'Mixtape Vol. 1 (the playlist + the merch)', eta: 'November', stage: 'Tracklist locked',
    tile: { from: '#fff01f', to: '#ff2d95', icon: '📼' },
    blurb: 'A real cassette with a real playlist, plus a matching tee. Soca, dancehall, freestyle, all the joy.',
    votes: 201
  },
  {
    id: 'up-leggings', name: 'High-Rise Neon Leggings', eta: 'November', stage: 'Fit testing',
    tile: { from: '#7b2cff', to: '#19e6ff', icon: '🩰' },
    blurb: 'Squat-proof, waist that stays up, colors that glow under blacklight.',
    votes: 428
  },
  {
    id: 'up-perfume', name: 'Golden Hour Eau de Parfum', eta: 'Holiday', stage: 'Bottle design',
    tile: { from: '#ffb800', to: '#ff6b6b', icon: '🌺' },
    blurb: 'Warm, sweet, a little bit of sea air. Bella has been chasing this scent for two years.',
    votes: 689
  }
];

/* ---------------- quizzes ---------------- */
/* Each quiz: questions with options that score one or more result keys.
   Results map to a product id so the quiz sells something. */
window.QUIZZES = [
  {
    id: 'era', title: 'Which 80s icon energy are you?', emoji: '📼',
    intro: 'Six questions. Zero wrong answers. Big reveal at the end.',
    questions: [
      { q: 'Your alarm goes off. First move?', a: [
        { t: 'Full playlist, full volume, dancing while brushing my teeth', s: { pop: 2, glam: 1 } },
        { t: 'Snooze, then a very dramatic stretch', s: { glam: 2 } },
        { t: 'Up, moving, plans already made', s: { boss: 2 } },
        { t: 'Already outside, don\'t ask', s: { rebel: 2 } } ] },
      { q: 'Pick a color to wear head to toe.', a: [
        { t: 'Hot pink', s: { pop: 2 } }, { t: 'Gold', s: { glam: 2 } },
        { t: 'Electric blue', s: { boss: 2 } }, { t: 'Black with one neon thing', s: { rebel: 2 } } ] },
      { q: 'Your hair today is…', a: [
        { t: 'Big. Bigger. Biggest.', s: { pop: 2 } }, { t: 'Slicked, sculpted, edges immaculate', s: { glam: 2 } },
        { t: 'Braids, protective, ready for the week', s: { boss: 2 } }, { t: 'Whatever it woke up as, and it\'s serving', s: { rebel: 2 } } ] },
      { q: 'A song comes on at the cookout and you…', a: [
        { t: 'Start the line dance', s: { pop: 2 } }, { t: 'Get the camera out first', s: { glam: 2 } },
        { t: 'Take over the aux', s: { boss: 2 } }, { t: 'Dance like nobody is filming (somebody is)', s: { rebel: 2 } } ] },
      { q: 'Your bag always has…', a: [
        { t: 'Gloss, gum, and glitter', s: { pop: 1, glam: 1 } }, { t: 'A mirror and an opinion', s: { glam: 2 } },
        { t: 'A charger, a plan B, and snacks for everybody', s: { boss: 2 } }, { t: 'Sunglasses. That\'s it.', s: { rebel: 2 } } ] },
      { q: 'Your ideal Saturday ends…', a: [
        { t: 'On a dance floor', s: { pop: 2 } }, { t: 'At a rooftop with a view', s: { glam: 2 } },
        { t: 'Hosting everybody at mine', s: { boss: 2 } }, { t: 'Somewhere I didn\'t plan to be', s: { rebel: 2 } } ] }
    ],
    results: {
      pop:   { title: 'Pop Princess', emoji: '🎀', text: 'Loud joy, big hair, a soundtrack for everything. People feel better when you walk in and you know it.', product: 'windbreaker-sunset' },
      glam:  { title: 'Glamour Queen', emoji: '💎', text: 'You do not do "casual". Gold hoops at breakfast, gloss before the gym. It\'s not extra, it\'s standard.', product: 'hoops-jumbo' },
      boss:  { title: 'Power Suit', emoji: '📎', text: 'Shoulder pads energy. You run the group chat, the plans, and probably a business. Your calm is the flex.', product: 'sweatshirt-crew' },
      rebel: { title: 'New Wave Rebel', emoji: '⚡', text: 'One color, one rule: yours. You like things a little off-beat and you make them look intentional.', product: 'bucket-hat' }
    }
  },
  {
    id: 'colorway', title: 'Find your colorway', emoji: '🌈',
    intro: 'We name our colors after the good stuff. Let\'s find yours.',
    questions: [
      { q: 'Pick a drink.', a: [
        { t: 'Sorrel, extra ginger', s: { sorrel: 2 } }, { t: 'Fresh mango juice', s: { mango: 2 } },
        { t: 'Something blue with an umbrella', s: { seagrape: 2 } }, { t: 'Guava anything', s: { guava: 2 } } ] },
      { q: 'Pick a time of day.', a: [
        { t: 'Golden hour', s: { mango: 2 } }, { t: 'Midnight', s: { seagrape: 2 } },
        { t: 'Sunrise', s: { guava: 2 } }, { t: 'That red-sky moment before a storm', s: { sorrel: 2 } } ] },
      { q: 'Your go-to nail color.', a: [
        { t: 'Deep red', s: { sorrel: 2 } }, { t: 'Neon orange', s: { mango: 2 } },
        { t: 'Purple chrome', s: { seagrape: 2 } }, { t: 'Baby pink, glossy', s: { guava: 2 } } ] },
      { q: 'How do you want people to describe you?', a: [
        { t: 'Bold', s: { sorrel: 2 } }, { t: 'Warm', s: { mango: 2 } },
        { t: 'Mysterious', s: { seagrape: 2 } }, { t: 'Sweet, with range', s: { guava: 2 } } ] },
      { q: 'Pick a sound.', a: [
        { t: 'Steel pan', s: { mango: 2 } }, { t: 'A synth bass line', s: { seagrape: 2 } },
        { t: 'A crowd singing the chorus back', s: { sorrel: 2 } }, { t: 'A cassette clicking into place', s: { guava: 2 } } ] }
    ],
    results: {
      sorrel:   { title: 'Sorrel Red', emoji: '🌺', text: 'Deep, spicy, unforgettable. You wear red like it\'s a neutral.', product: 'sweatshirt-crew' },
      mango:    { title: 'Mango Glass', emoji: '🥭', text: 'Warm and golden. Everything looks like sunset on you.', product: 'lipgloss-glossytalk' },
      seagrape: { title: 'Sea Grape', emoji: '🔮', text: 'Purple-blue, cool, a little electric. You glow under neon.', product: 'bucket-hat' },
      guava:    { title: 'Guava Pink', emoji: '🍬', text: 'Bright, sweet, and not to be underestimated.', product: 'scrunchie-set' }
    }
  },
  {
    id: 'hair', title: 'What does your hair want this week?', emoji: '💇🏾‍♀️',
    intro: 'Quick check-in with your crown.',
    questions: [
      { q: 'Wash day was…', a: [
        { t: 'Yesterday, hydrated and happy', s: { protect: 1, big: 2 } }, { t: 'Last week (don\'t judge)', s: { protect: 2 } },
        { t: 'A whole event, and now it\'s in a style', s: { sleep: 2 } }, { t: 'I have locs, wash day is a vibe', s: { sleep: 1, protect: 1 } } ] },
      { q: 'This week you have…', a: [
        { t: 'A party', s: { big: 2 } }, { t: 'Work, work, work', s: { protect: 2 } },
        { t: 'Nothing planned and I like it', s: { sleep: 2 } }, { t: 'A trip', s: { protect: 1, sleep: 1 } } ] },
      { q: 'Biggest hair annoyance?', a: [
        { t: 'Dents from regular hair ties', s: { big: 2 } }, { t: 'Frizz by day two', s: { sleep: 2 } },
        { t: 'Edges that won\'t cooperate', s: { protect: 2 } }, { t: 'None, I\'m the annoyance', s: { big: 1, sleep: 1 } } ] },
      { q: 'Pick your bedtime ritual.', a: [
        { t: 'Bonnet on, lights off', s: { sleep: 2 } }, { t: 'Pineapple it and pray', s: { big: 2 } },
        { t: 'Silk pillowcase, no bonnet', s: { sleep: 1, protect: 1 } }, { t: 'What ritual?', s: { protect: 2 } } ] }
    ],
    results: {
      big:     { title: 'Let it be BIG', emoji: '🦁', text: 'Your hair wants volume and zero dents. Jumbo satin scrunchies, loose styles, and lots of compliments.', product: 'scrunchie-set' },
      sleep:   { title: 'Protect the style', emoji: '🌙', text: 'Your hair wants to be left alone in satin. Bonnet at night, minimal manipulation, maximum shine.', product: 'bonnet-satin' },
      protect: { title: 'Low effort, high shine', emoji: '✨', text: 'Your hair wants an easy week. A satin bonnet, one good scrunchie, and edges handled (that product is coming soon).', product: 'bonnet-satin' }
    }
  }
];

/* ---------------- FAQ ---------------- */
window.FAQ = [
  { q: 'When does my order ship?', a: 'Launch orders ship within 5 business days. You get a tracking number by email the moment it leaves.' },
  { q: 'What is the launch-day surprise?', a: 'If you order on launch day, something extra goes in your box. We are not saying what. That is the point.' },
  { q: 'What sizes do you carry?', a: 'XS to 3X on everything with a size. Our fits are cut for hips, chest and big hair, in that order.' },
  { q: 'Do you ship outside the US?', a: 'Yes: Canada, the UK and the Caribbean at launch, with more countries on the way. Rates show at checkout.' },
  { q: 'Returns?', a: '30 days, unworn, for exchange or store credit. Hair and lip products are final sale for hygiene reasons.' },
  { q: 'Is the gloss made for deep skin tones?', a: 'It was made on deep skin tones. Every shade was tested on the founder and her friends first.' }
];

/* ---------------- ticker lines ---------------- */
window.TICKER = [
  'LAUNCH DAY', 'FREE SHIPPING OVER $75', 'BIG HAIR WELCOME', 'SIZES XS TO 3X',
  'ORDER TODAY FOR THE SURPRISE', 'NEW WAVE, SAME YOU', 'TAKE THE QUIZ', 'MADE WITH JOY'
];
