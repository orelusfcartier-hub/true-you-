/* =========================================================
   True You Communities — prototype behavior
   No framework, no build step, no backend. Open the HTML.
   ========================================================= */

/* ---------- small helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const money = n => '$' + n.toLocaleString('en-US');
const el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };

/* ---------- theme ---------- */
function initTheme() {
  const saved = localStorage.getItem('tyc-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
  syncThemeIcon();

  $$('[data-theme-toggle]').forEach(btn => btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('tyc-theme', next);
    syncThemeIcon();
  }));
}
function syncThemeIcon() {
  const dark = document.documentElement.dataset.theme === 'dark';
  $$('[data-theme-toggle]').forEach(b => {
    b.textContent = dark ? '☀' : '☾';
    b.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/* ---------- nav ---------- */
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const links = $('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  // mark the current page
  const here = location.pathname.split('/').pop() || 'index.html';
  $$('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });
}

/* ---------- photos: fade in, and never show a broken image ---------- */
function wirePhotos(root = document) {
  $$('.ph img', root).forEach(img => {
    if (img.dataset.wired) return;
    img.dataset.wired = '1';
    img.loading = img.loading || 'lazy';
    img.decoding = 'async';
    const done = () => img.classList.add('is-loaded');
    if (img.complete && img.naturalWidth > 0) done();
    img.addEventListener('load', done);
    img.addEventListener('error', () => img.classList.add('is-failed'));
  });
}

/* ---------- scroll reveal ---------- */
function initReveal(root = document) {
  const items = $$('.reveal:not([data-revealed])', root);
  if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      obs.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
  items.forEach((item, i) => {
    item.dataset.revealed = '1';
    item.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
    io.observe(item);
  });
}

/* ---------- toast (stands in for anything backend-y) ---------- */
let toastTimer;
function toast(msg) {
  let t = $('.toast');
  if (!t) { t = el('<div class="toast" role="status"></div>'); document.body.appendChild(t); }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add('is-on'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-on'), 3200);
}

/* Any form on the site is a demo form. */
function initForms() {
  $$('form[data-demo-form]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      toast(form.dataset.demoForm || 'Prototype only — nothing was submitted.');
      form.reset();
    });
  });
}

/* ---------- modal ---------- */
function openModal(html) {
  let m = $('#modal');
  if (!m) {
    m = el(`<div class="modal" id="modal" role="dialog" aria-modal="true">
      <div class="modal__panel">
        <button class="icon-btn modal__close" aria-label="Close">✕</button>
        <div class="modal__body"></div>
      </div>
    </div>`);
    document.body.appendChild(m);
    m.addEventListener('click', e => { if (e.target === m) closeModal(); });
    $('.modal__close', m).addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }
  $('.modal__body', m).innerHTML = html;
  m.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  wirePhotos(m);
  initForms();
}
function closeModal() {
  const m = $('#modal');
  if (!m) return;
  m.classList.remove('is-open');
  document.body.style.overflow = '';
}

/* ---------- status helpers ---------- */
const statusChip = s => ({
  available: '<span class="chip">Available</span>',
  soon:      '<span class="chip chip--soon">Pre-leasing</span>',
  leased:    '<span class="chip chip--muted">Leased</span>',
  sold:      '<span class="chip chip--muted">Sold</span>'
}[s] || '');

/* =========================================================
   Renderers
   ========================================================= */

function unitCard(u) {
  return `
  <article class="card reveal" data-unit="${u.id}">
    <div class="card__media">
      <div class="card__ribbon">${statusChip(u.status)}</div>
      <div class="ph ph--4x3" data-label="${u.label}">
        <img src="${u.img}" alt="${u.name}">
      </div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${u.name}</h3>
      <p class="card__meta">${u.city} · ${u.floor} · Available ${u.available}</p>
      <div class="specs">
        <span>🛏 ${u.beds} bd</span><span>🛁 ${u.baths} ba</span><span>📐 ${u.sqft.toLocaleString()} sf</span>
      </div>
      <div class="card__tagrow">${u.tags.map(t => `<span class="chip chip--muted">${t}</span>`).join('')}</div>
      <div class="card__foot">
        <div class="price">${money(u.rent)} <small>/ mo</small></div>
        <button class="btn btn--ghost btn--sm" data-open-unit="${u.id}">View unit</button>
      </div>
    </div>
  </article>`;
}

function unitModal(u) {
  return `
    <div class="ph ph--16x9" data-label="${u.label}" style="border-radius:24px 24px 0 0">
      <img src="${u.img}" alt="${u.name}">
    </div>
    <div class="modal__inner">
      <div class="row between">
        <div>
          <h2 style="margin-bottom:4px">${u.name}</h2>
          <p class="muted mb-0">${u.community} · ${u.city}</p>
        </div>
        <div class="price">${money(u.rent)} <small>/ mo</small></div>
      </div>
      <p class="mt-2">${u.blurb}</p>
      <div class="specs mt-1">
        <span>🛏 ${u.beds} bedroom</span><span>🛁 ${u.baths} bath</span>
        <span>📐 ${u.sqft.toLocaleString()} sq ft</span><span>🗓 ${u.available}</span>
      </div>
      <h3 class="mt-3">What's in the unit</h3>
      <ul class="checklist">${u.amenities.map(a => `<li><span>${a}</span></li>`).join('')}</ul>
      <div class="note mt-3">Applications, tours, and deposits are not wired up in this prototype.</div>
      <div class="row mt-2">
        <button class="btn btn--primary" data-demo-tour>Request a tour</button>
        <a class="btn btn--ghost" href="contact.html">Ask a question</a>
      </div>
    </div>`;
}

function triplexCard(t) {
  const noi = (t.rentRoll - t.expenses) * 12;
  return `
  <article class="card reveal">
    <div class="card__media">
      <div class="card__ribbon">${statusChip(t.status)}</div>
      <div class="ph ph--16x9" data-label="${t.label}">
        <img src="${t.img}" alt="${t.name}">
      </div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${t.name} <span class="muted" style="font-weight:500">· ${t.community}</span></h3>
      <p class="card__meta">${t.city} · ${t.mix} · ${t.sqft.toLocaleString()} sf on ${t.lot}</p>
      <p class="card__meta mb-0">${t.blurb}</p>
      <div class="table-scroll mt-1" style="border-radius:12px">
        <table style="min-width:0">
          <tbody>
            <tr><td>Gross rent roll</td><td style="text-align:right"><strong>${money(t.rentRoll)}/mo</strong></td></tr>
            <tr><td>Operating expenses</td><td style="text-align:right">${money(t.expenses)}/mo</td></tr>
            <tr><td>Net operating income</td><td style="text-align:right"><strong>${money(noi)}/yr</strong></td></tr>
            <tr><td>Pro-forma cap rate</td><td style="text-align:right"><strong>${t.capRate.toFixed(1)}%</strong></td></tr>
          </tbody>
        </table>
      </div>
      <ul class="checklist mt-1">${t.highlights.map(h => `<li><span>${h}</span></li>`).join('')}</ul>
      <div class="card__foot">
        <div class="price">${money(t.price)}</div>
        <a class="btn ${t.status === 'sold' ? 'btn--ghost' : 'btn--primary'} btn--sm" href="contact.html">
          ${t.status === 'sold' ? 'See similar' : t.status === 'soon' ? 'Reserve' : 'Book a walkthrough'}
        </a>
      </div>
    </div>
  </article>`;
}

function centerCard(c) {
  return `
  <article class="card reveal">
    <div class="card__media">
      <div class="card__ribbon"><span class="chip ${c.status === 'Open' ? '' : 'chip--soon'}">${c.status}</span></div>
      <div class="ph ph--4x3" data-label="${c.label}"><img src="${c.img}" alt="${c.name}"></div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${c.name}</h3>
      <p class="card__meta">${c.city} · ${c.size}</p>
      <p class="card__meta">${c.blurb}</p>
      <ul class="checklist mt-1">${c.features.map(f => `<li><span>${f}</span></li>`).join('')}</ul>
    </div>
  </article>`;
}

function kitCard(k) {
  return `
  <article class="card reveal">
    <div class="card__media">
      <div class="card__ribbon"><span class="chip chip--clay">${k.badge}</span></div>
      <div class="ph ph--4x3" data-label="${k.label}"><img src="${k.img}" alt="${k.name}"></div>
    </div>
    <div class="card__body">
      <h3 class="card__title">${k.name}</h3>
      <p class="card__meta" style="font-weight:600;color:var(--accent)">${k.price}</p>
      <p class="card__meta">${k.blurb}</p>
      <ul class="checklist mt-1">${k.contents.map(c => `<li><span>${c}</span></li>`).join('')}</ul>
      <div class="card__foot">
        <span class="muted" style="font-size:.85rem">Restocked yearly</span>
        <a class="btn btn--ghost btn--sm" href="contact.html">Request kit</a>
      </div>
    </div>
  </article>`;
}

/* =========================================================
   Page wiring
   ========================================================= */

function mount(sel, html) {
  const node = $(sel);
  if (!node) return false;
  node.innerHTML = html;
  wirePhotos(node);
  initReveal(node);
  return true;
}

function initUnitModals() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-open-unit]');
    if (btn) {
      const u = UNITS.find(x => x.id === btn.dataset.openUnit);
      if (u) openModal(unitModal(u));
      return;
    }
    if (e.target.closest('[data-demo-tour]')) {
      closeModal();
      toast('Tour request noted — this prototype has no backend yet.');
    }
  });
}

/* rentals page: filter + sort */
function initRentals() {
  const grid = $('#unit-grid');
  if (!grid) return;

  const controls = {
    community: $('#f-community'),
    beds: $('#f-beds'),
    price: $('#f-price'),
    status: $('#f-status'),
    sort: $('#f-sort')
  };

  // fill community options from the data
  const communities = [...new Set(UNITS.map(u => u.community))];
  communities.forEach(c => controls.community.appendChild(el(`<option value="${c}">${c}</option>`)));

  function apply() {
    let list = UNITS.filter(u => {
      if (controls.community.value !== 'all' && u.community !== controls.community.value) return false;
      if (controls.beds.value !== 'all' && u.beds < Number(controls.beds.value)) return false;
      if (controls.price.value !== 'all' && u.rent > Number(controls.price.value)) return false;
      if (controls.status.value === 'open' && u.status === 'leased') return false;
      if (controls.status.value === 'now' && u.status !== 'available') return false;
      return true;
    });

    const sorters = {
      'price-asc':  (a, b) => a.rent - b.rent,
      'price-desc': (a, b) => b.rent - a.rent,
      'size-desc':  (a, b) => b.sqft - a.sqft,
      'beds-desc':  (a, b) => b.beds - a.beds
    };
    list = list.sort(sorters[controls.sort.value] || sorters['price-asc']);

    grid.innerHTML = list.length
      ? list.map(unitCard).join('')
      : '<div class="empty" style="grid-column:1/-1">No units match those filters yet. Widen the search — or join the waitlist and we\'ll call when one opens.</div>';

    $('#result-count').textContent = list.length === 1 ? '1 unit' : `${list.length} units`;
    wirePhotos(grid);
    initReveal(grid);
  }

  Object.values(controls).forEach(c => c && c.addEventListener('change', apply));
  const reset = $('#f-reset');
  if (reset) reset.addEventListener('click', () => {
    controls.community.value = 'all'; controls.beds.value = 'all';
    controls.price.value = 'all'; controls.status.value = 'all';
    controls.sort.value = 'price-asc';
    apply();
  });

  apply();
}

function initEventList() {
  const node = $('#event-list');
  if (!node) return;
  node.innerHTML = `
    <div class="table-scroll">
      <table>
        <thead><tr><th>Date</th><th>What</th><th>Where</th><th>Notes</th></tr></thead>
        <tbody>
          ${EVENTS.map(ev => `<tr>
            <td><strong>${ev.date}</strong></td><td>${ev.title}</td>
            <td class="muted">${ev.place}</td><td class="muted">${ev.note}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

/* ---------- boot ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initForms();
  initUnitModals();

  // home page previews
  mount('#featured-units', UNITS.filter(u => u.status !== 'leased').slice(0, 3).map(unitCard).join(''));
  mount('#featured-triplexes', TRIPLEXES.filter(t => t.status !== 'sold').slice(0, 3).map(triplexCard).join(''));
  mount('#featured-centers', CENTERS.slice(0, 3).map(centerCard).join(''));
  mount('#featured-kits', KITS.map(kitCard).join(''));

  // full pages
  mount('#triplex-grid', TRIPLEXES.map(triplexCard).join(''));
  mount('#center-grid', CENTERS.map(centerCard).join(''));
  mount('#kit-grid', KITS.map(kitCard).join(''));

  initRentals();
  initEventList();
  wirePhotos();
  initReveal();
});
