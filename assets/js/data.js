/* =========================================================
   Demo data for the True You Communities prototype.
   Everything here is sample content — no backend, no API.
   Swap these arrays for real listings when the CMS lands.
   ========================================================= */

/* Stock photo URLs. If a photo can't load (offline preview, blocked
   network), the .ph frame keeps its gradient and label so the layout
   never looks broken. See site.js → wirePhotos(). */
const IMG = {
  heroExterior: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=70',
  heroPorch:    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=70',
  land:         'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=70',
  build:        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=70',
  street:       'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=70',
  unitA:        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=70',
  unitB:        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=70',
  unitC:        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=70',
  unitD:        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=70',
  unitE:        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=70',
  unitF:        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=70',
  kitchen:      'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1200&q=70',
  triplexA:     'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1400&q=70',
  triplexB:     'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=70',
  triplexC:     'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=70',
  triplexD:     'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=70',
  gather:       'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=70',
  workshop:     'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=70',
  garden:       'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1400&q=70',
  court:        'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=70',
  kids:         'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=70',
  safety:       'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=70',
  kitBag:       'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=1200&q=70',
  water:        'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=1200&q=70',
  training:     'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=70',
  team:         'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=70'
};

/* ---------------- rental units ---------------- */
const UNITS = [
  {
    id: 'ce-a', name: 'Cedar Row · Unit A', community: 'Cedar Row',
    city: 'Lakeland, FL', beds: 2, baths: 2, sqft: 1080, rent: 1795,
    status: 'available', available: 'Now', floor: 'Ground floor',
    img: IMG.unitA, label: 'Unit A · living room',
    tags: ['Corner unit', 'Private patio', 'W/D in unit'],
    blurb: 'Ground-floor corner with a wrap of south light, a fenced patio, and a straight walk to the Commons.',
    amenities: ['In-unit washer/dryer', 'Quartz counters', 'Fenced patio', 'Covered parking (1)', 'Smart lock + video doorbell', 'Pet friendly (2 max)']
  },
  {
    id: 'ce-b', name: 'Cedar Row · Unit B', community: 'Cedar Row',
    city: 'Lakeland, FL', beds: 3, baths: 2, sqft: 1340, rent: 2150,
    status: 'available', available: 'Sep 1', floor: 'Upper floor',
    img: IMG.unitB, label: 'Unit B · great room',
    tags: ['Top floor', 'Balcony', 'Vaulted ceiling'],
    blurb: 'Three bedrooms up top with vaulted ceilings and a balcony that looks over the shared green.',
    amenities: ['In-unit washer/dryer', 'Balcony', 'Vaulted ceilings', 'Covered parking (2)', 'Smart thermostat', 'Storage locker']
  },
  {
    id: 'ce-c', name: 'Cedar Row · Unit C', community: 'Cedar Row',
    city: 'Lakeland, FL', beds: 1, baths: 1, sqft: 720, rent: 1395,
    status: 'leased', available: 'Waitlist', floor: 'Ground floor',
    img: IMG.unitC, label: 'Unit C · studio kitchen',
    tags: ['Efficient', 'Garden access'],
    blurb: 'The one-bedroom end unit — small footprint, big kitchen, door straight into the garden beds.',
    amenities: ['In-unit washer/dryer', 'Garden plot included', 'Covered parking (1)', 'Smart lock']
  },
  {
    id: 'ma-a', name: 'Marigold Court · Unit A', community: 'Marigold Court',
    city: 'Ocala, FL', beds: 2, baths: 2, sqft: 1120, rent: 1690,
    status: 'available', available: 'Now', floor: 'Ground floor',
    img: IMG.unitD, label: 'Unit A · dining',
    tags: ['ADA accessible', 'Zero-step entry'],
    blurb: 'Zero-step entry, 36-inch doorways, and a roll-in shower — accessible without looking clinical.',
    amenities: ['Zero-step entry', 'Roll-in shower', 'Lever hardware', 'In-unit washer/dryer', 'Covered parking (1)', 'Pet friendly']
  },
  {
    id: 'ma-b', name: 'Marigold Court · Unit B', community: 'Marigold Court',
    city: 'Ocala, FL', beds: 3, baths: 2.5, sqft: 1480, rent: 2295,
    status: 'available', available: 'Oct 15', floor: 'Two-story',
    img: IMG.unitE, label: 'Unit B · stairwell',
    tags: ['Townhome style', 'Home office nook'],
    blurb: 'Two-story townhome layout with an office nook on the landing and a two-car pad out front.',
    amenities: ['Office nook', 'Half bath down', 'In-unit washer/dryer', 'Two-car pad', 'Smart thermostat', 'Storage locker']
  },
  {
    id: 'ma-c', name: 'Marigold Court · Unit C', community: 'Marigold Court',
    city: 'Ocala, FL', beds: 2, baths: 1, sqft: 940, rent: 1550,
    status: 'soon', available: 'Nov 1', floor: 'Upper floor',
    img: IMG.unitF, label: 'Unit C · bedroom',
    tags: ['Pre-lease open', 'Treetop view'],
    blurb: 'Pre-leasing now. Upper unit tucked under the oaks with a screened sleeping porch.',
    amenities: ['Screened porch', 'In-unit washer/dryer', 'Covered parking (1)', 'Smart lock']
  },
  {
    id: 'wi-a', name: 'Willow Bend · Unit A', community: 'Willow Bend',
    city: 'Savannah, GA', beds: 2, baths: 2, sqft: 1060, rent: 1875,
    status: 'available', available: 'Now', floor: 'Ground floor',
    img: IMG.kitchen, label: 'Unit A · kitchen',
    tags: ['New build', 'Solar-ready'],
    blurb: 'First delivery at Willow Bend — everything new, panel pre-wired for rooftop solar.',
    amenities: ['Solar-ready panel', 'Induction range', 'In-unit washer/dryer', 'EV-ready outlet', 'Covered parking (1)']
  },
  {
    id: 'wi-b', name: 'Willow Bend · Unit B', community: 'Willow Bend',
    city: 'Savannah, GA', beds: 3, baths: 2, sqft: 1390, rent: 2380,
    status: 'soon', available: 'Dec 1', floor: 'Upper floor',
    img: IMG.unitB, label: 'Unit B · living',
    tags: ['Pre-lease open', 'Corner windows'],
    blurb: 'Corner windows on three sides, and the only unit with a direct view of the activity center lawn.',
    amenities: ['Corner windows', 'Balcony', 'In-unit washer/dryer', 'Covered parking (2)', 'Smart thermostat']
  },
  {
    id: 'wi-c', name: 'Willow Bend · Unit C', community: 'Willow Bend',
    city: 'Savannah, GA', beds: 1, baths: 1, sqft: 760, rent: 1425,
    status: 'available', available: 'Now', floor: 'Ground floor',
    img: IMG.unitD, label: 'Unit C · interior',
    tags: ['Live/work', 'Street entry'],
    blurb: 'Live/work end unit with its own street door — zoned for a quiet shopfront or studio.',
    amenities: ['Separate street entry', 'Live/work zoning', 'In-unit washer/dryer', 'Utility sink', 'Covered parking (1)']
  }
];

/* ---------------- triplexes for sale ---------------- */
const TRIPLEXES = [
  {
    id: 'tx-01', name: 'The Cedar', community: 'Cedar Row',
    city: 'Lakeland, FL', price: 749000, status: 'available',
    sqft: 3140, lot: '0.28 ac', built: 2025, img: IMG.triplexA,
    label: 'The Cedar · street view',
    mix: '2BR + 3BR + 1BR', rentRoll: 5340, expenses: 1580, capRate: 6.0,
    tags: ['Turnkey', 'Tenants in place'],
    blurb: 'Our flagship plan: three units, three private entries, one shared green. Delivered leased.',
    highlights: ['All three units leased at delivery', 'Impact windows + 30-yr architectural shingle', 'Separately metered water, power, and internet', 'Shared green with grill pad and mail kiosk']
  },
  {
    id: 'tx-02', name: 'The Marigold', community: 'Marigold Court',
    city: 'Ocala, FL', price: 689000, status: 'available',
    sqft: 3540, lot: '0.31 ac', built: 2025, img: IMG.triplexB,
    label: 'The Marigold · front elevation',
    mix: '2BR + 3BR + 2BR', rentRoll: 5535, expenses: 1610, capRate: 6.8,
    tags: ['ADA ground unit', 'Best cap rate'],
    blurb: 'Wider lot, accessible ground unit, and the strongest pro-forma of the current release.',
    highlights: ['Ground unit built to full ADA spec', 'Two-car pad per unit', 'Pre-wired for solar and EV', 'Ten-year structural warranty']
  },
  {
    id: 'tx-03', name: 'The Willow', community: 'Willow Bend',
    city: 'Savannah, GA', price: 812000, status: 'soon',
    sqft: 3210, lot: '0.26 ac', built: 2026, img: IMG.triplexC,
    label: 'The Willow · rendering',
    mix: '2BR + 3BR + 1BR live/work', rentRoll: 5680, expenses: 1690, capRate: 5.9,
    tags: ['Reserving now', 'Live/work unit'],
    blurb: 'Corner parcel across from the Willow Bend activity center. Live/work end unit included.',
    highlights: ['Live/work end unit with street door', 'Faces the activity center lawn', 'Solar-ready with 200A service', 'Reservation holds price through close']
  },
  {
    id: 'tx-04', name: 'The Juniper', community: 'Cedar Row',
    city: 'Lakeland, FL', price: 724000, status: 'sold',
    sqft: 3080, lot: '0.25 ac', built: 2024, img: IMG.triplexD,
    label: 'The Juniper · rear yard',
    mix: '2BR + 2BR + 2BR', rentRoll: 5190, expenses: 1540, capRate: 6.1,
    tags: ['Sold Mar 2026'],
    blurb: 'Sold to a first-time small-multifamily buyer. Shown here as a reference build.',
    highlights: ['Identical unit mix on all three floors', 'Closed 41 days from reservation', 'Managed by our in-house team post-close']
  }
];

/* ---------------- activity centers ---------------- */
const CENTERS = [
  {
    name: 'The Commons at Cedar Row', city: 'Lakeland, FL', size: '2,400 sq ft',
    status: 'Open', img: IMG.gather, label: 'The Commons',
    blurb: 'The living room of the neighborhood — open seating, a teaching kitchen, and a covered porch that runs the length of the building.',
    features: ['Teaching kitchen', 'Two bookable meeting rooms', 'Free Wi-Fi + printing', 'Covered porch with fans', 'Tool library']
  },
  {
    name: 'Marigold Workshop', city: 'Ocala, FL', size: '1,800 sq ft',
    status: 'Open', img: IMG.workshop, label: 'Marigold Workshop',
    blurb: 'A maker space and after-school room in one. Benches by day, homework tables by afternoon.',
    features: ['Shared workbenches', 'After-school room', 'Quiet study booths', 'Bike repair stand', 'Weekly repair café']
  },
  {
    name: 'Willow Bend Green', city: 'Savannah, GA', size: '0.6 acre',
    status: 'Building', img: IMG.court, label: 'Willow Bend Green',
    blurb: 'Half-court, shade structure, and a lawn sized for a hundred folding chairs. Opening with the second phase.',
    features: ['Half-court + open lawn', 'Shade pavilion', 'Outdoor movie wall', 'Splash pad', 'Perimeter walking loop']
  },
  {
    name: 'Cedar Row Garden Block', city: 'Lakeland, FL', size: '32 plots',
    status: 'Open', img: IMG.garden, label: 'Garden Block',
    blurb: 'Raised beds assigned by lottery each spring, plus a shared herb strip anyone can pick from.',
    features: ['32 raised beds', 'Shared tool shed', 'Rain catchment', 'Compost line', 'Spring seed swap']
  }
];

/* ---------------- safety kits ---------------- */
const KITS = [
  {
    name: 'Unit Kit', price: 'Included with every lease', img: IMG.kitBag,
    label: 'Unit kit', badge: 'In every unit',
    blurb: 'Mounted by the door of all three units before move-in day, and restocked every year at no charge.',
    contents: ['Smoke + CO alarms (10-yr sealed)', '5 lb ABC fire extinguisher', 'Trauma-rated first aid kit', 'Emergency contact card', 'Flashlight + spare batteries', 'Water + gas shutoff tags']
  },
  {
    name: 'Storm Kit', price: '$149', img: IMG.water,
    label: 'Storm kit', badge: 'Most requested',
    blurb: 'The 72-hour bag for hurricane season. Sized per household when you tell us how many people and pets.',
    contents: ['72 hrs water + purification tabs', 'Shelf-stable food, 3 days', 'Hand-crank radio + charger', 'Document dry bag', 'N95s + work gloves + tarp', 'Pet supply pouch']
  },
  {
    name: 'Block Cache', price: 'Funded per community', img: IMG.safety,
    label: 'Block cache', badge: 'Shared resource',
    blurb: 'A locked cabinet at every activity center, opened by trained volunteer neighbors when the power goes out.',
    contents: ['AED + bleeding control kit', 'Generator + fuel rotation', 'Bulk water and cots', 'Two-way radio set', 'Printed neighbor roster', 'Cooling and warming supplies']
  }
];

/* ---------------- events ---------------- */
const EVENTS = [
  { date: 'Aug 9',  title: 'Repair Café',              place: 'Marigold Workshop',        note: 'Bring one broken thing.' },
  { date: 'Aug 16', title: 'Hurricane Prep Walk-Thru', place: 'The Commons at Cedar Row', note: 'Free storm kit checklist.' },
  { date: 'Aug 23', title: 'Movie on the Green',       place: 'Willow Bend Green',        note: 'Sunset. Bring a chair.' },
  { date: 'Sep 6',  title: 'CPR + Stop the Bleed',     place: 'The Commons at Cedar Row', note: '2 hrs, certification included.' },
  { date: 'Sep 13', title: 'Garden Plot Lottery',      place: 'Cedar Row Garden Block',   note: 'Residents first, then waitlist.' },
  { date: 'Sep 27', title: 'New Owner Orientation',    place: 'Marigold Workshop',        note: 'For buyers closing this fall.' }
];
