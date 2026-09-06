/* =========================================================
   True You — site behavior. No framework, no build step.
   Sections: helpers · launch day · header/menu · hero ·
   products · product sheet · cart · checkout · quizzes ·
   upcoming · forms · effects · boot
   ========================================================= */
(function () {
  'use strict';
  const C = window.CONFIG, PRODUCTS = window.PRODUCTS || [], QUIZZES = window.QUIZZES || [];

  /* ---------- helpers ---------- */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: C.currency || 'USD' }).format(n);
  const el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } }
  };
  const product = id => PRODUCTS.find(p => p.id === id);
  const tileHTML = (p, cls = '') => `
    <div class="tile ${cls}" style="--from:${p.tile.from};--to:${p.tile.to}">
      <span class="tile__icon" aria-hidden="true">${p.tile.icon}</span>
      <img src="assets/media/products/${esc(p.id)}.jpg" alt="" loading="lazy" decoding="async">
    </div>`;

  let toastTimer;
  function toast(msg) {
    let t = $('.toast');
    if (!t) { t = el('<div class="toast" role="status" aria-live="polite"></div>'); document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(() => t.classList.add('is-on'));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('is-on'), 2800);
  }

  /* ---------- launch day ---------- */
  // 'before' | 'today' | 'after', evaluated in the visitor's local time.
  function launchState() {
    const [y, m, d] = (C.launchDate || '').split('-').map(Number);
    if (!y) return 'after';
    const start = new Date(y, m - 1, d, 0, 0, 0).getTime();
    const end = start + 24 * 3600 * 1000;
    const now = Date.now();
    if (now < start) return 'before';
    if (now < end) return 'today';
    return 'after';
  }
  const isLaunchDay = () => launchState() === 'today';

  function initLaunch() {
    const state = launchState();
    document.documentElement.dataset.launch = state;
    $$('[data-show-when]').forEach(n => {
      const wants = n.dataset.showWhen.split(/\s+/);
      n.hidden = !wants.includes(state);
    });
    if (state === 'before') $$('[data-countdown]').forEach(startCountdown);
    $$('[data-copy-code]').forEach(b => b.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.dataset.copyCode); toast(`Code ${b.dataset.copyCode} copied`); }
      catch { toast(`Use code ${b.dataset.copyCode} at checkout`); }
    }));
    $$('[data-surprise-code]').forEach(n => n.textContent = C.surprise.code);
    $$('[data-launch-date]').forEach(n => {
      const [y, m, d] = C.launchDate.split('-').map(Number);
      n.textContent = new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    });
  }
  function startCountdown(node) {
    const [y, m, d] = C.launchDate.split('-').map(Number);
    const target = new Date(y, m - 1, d).getTime();
    node.innerHTML = ['Days', 'Hours', 'Min', 'Sec'].map(l => `<div class="countdown__cell"><div class="countdown__n">00</div><div class="countdown__l">${l}</div></div>`).join('');
    const cells = $$('.countdown__n', node);
    let timer;
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const dd = Math.floor(diff / 864e5); diff -= dd * 864e5;
      const hh = Math.floor(diff / 36e5); diff -= hh * 36e5;
      const mm = Math.floor(diff / 6e4); diff -= mm * 6e4;
      const ss = Math.floor(diff / 1e3);
      [dd, hh, mm, ss].forEach((v, i) => cells[i].textContent = String(v).padStart(2, '0'));
      if (target - Date.now() <= 0) { clearInterval(timer); location.reload(); }
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- header, menu, ticker ---------- */
  function initHeader() {
    $$('[data-brand]').forEach(n => n.textContent = C.brand);
    const menu = $('[data-menu]');
    const setOpen = open => {
      if (!menu) return;
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      $$('[data-menu-toggle]').forEach(b => b.setAttribute('aria-expanded', String(open)));
    };
    $$('[data-menu-toggle]').forEach(b => b.addEventListener('click', () => setOpen(!menu.classList.contains('is-open'))));
    $$('[data-menu-close]').forEach(b => b.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { setOpen(false); closeSheet(); closeDrawer(); } });

    const here = location.pathname.split('/').pop() || 'index.html';
    $$('a[href]').forEach(a => { if (a.getAttribute('href') === here && a.closest('.nav__links, .menu__links, .dock')) a.setAttribute('aria-current', 'page'); });

    const track = $('[data-ticker]');
    if (track && window.TICKER) {
      const items = window.TICKER.map(t => `<span>${esc(t)}</span>`).join('');
      track.innerHTML = items + items; // doubled for the seamless loop
    }
    $$('[data-cart-open]').forEach(b => b.addEventListener('click', openDrawer));
  }

  /* ---------- hero: local video first, Instagram embed as fallback ---------- */
  function initHero() {
    const media = $('[data-hero-media]');
    if (!media) return;
    const video = $('video', media);
    const useEmbed = () => {
      if (media.classList.contains('is-embed')) return;
      media.classList.add('is-embed');
      if (video) video.remove();
      const wrap = el(`<div class="ig-embed">
        <blockquote class="instagram-media" data-instgrm-permalink="${esc(C.instagramPost)}" data-instgrm-version="14"
          style="background:#fff;border:0;border-radius:18px;margin:0;padding:0;width:100%">
          <a href="${esc(C.instagramPost)}" target="_blank" rel="noopener" style="display:block;padding:24px;color:#14052e;font-family:sans-serif;text-align:center;text-decoration:none">
            ▶ Watch the launch video on Instagram
          </a>
        </blockquote></div>`);
      media.appendChild(wrap);
      const s = document.createElement('script');
      s.async = true; s.src = 'https://www.instagram.com/embed.js';
      s.onload = () => { if (window.instgrm) window.instgrm.Embeds.process(); };
      document.body.appendChild(s);
    };
    if (!video) { useEmbed(); return; }
    video.muted = true; video.playsInline = true;
    video.addEventListener('error', useEmbed, { once: true });
    const src = $('source', video);
    if (src) src.addEventListener('error', useEmbed, { once: true });
    video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
    // If the file is missing, some browsers stay in "no data" silently. Give it a moment.
    setTimeout(() => { if (video.isConnected && video.readyState === 0 && video.networkState === 3) useEmbed(); }, 2500);
    fetch(C.heroVideo, { method: 'HEAD' }).then(r => { if (!r.ok) useEmbed(); }).catch(() => {});

    const sound = $('[data-hero-sound]');
    if (sound) sound.addEventListener('click', () => {
      video.muted = !video.muted;
      sound.textContent = video.muted ? '🔇' : '🔊';
      sound.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
      if (!video.muted) video.play().catch(() => {});
    });
  }

  /* ---------- products ---------- */
  function productCard(p) {
    const cmp = p.compareAt ? `<s>${money(p.compareAt)}</s>` : '';
    return `<article class="card product-card" data-product="${esc(p.id)}" style="position:relative">
      ${p.badge ? `<span class="sticker ${p.cat === 'glow' ? 'sticker--pink' : ''}">${esc(p.badge)}</span>` : ''}
      ${tileHTML(p)}
      <div class="card__body">
        <h3 class="card__title">${esc(p.name)}</h3>
        <p class="card__meta">${esc(p.blurb)}</p>
        <div class="price">${money(p.price)} ${cmp}</div>
        <button class="btn btn--sm btn--pink" data-open-product="${esc(p.id)}">Add to bag</button>
      </div></article>`;
  }
  function initProducts() {
    $$('[data-products]').forEach(grid => {
      const limit = Number(grid.dataset.productsLimit) || Infinity;
      const render = cat => {
        const list = PRODUCTS.filter(p => !cat || cat === 'all' || p.cat === cat).slice(0, limit);
        grid.innerHTML = list.map(productCard).join('') || '<p class="muted">Nothing here yet.</p>';
        wireImages(grid); initReveal(grid);
      };
      const filters = $('[data-filters]');
      if (filters && window.CATEGORIES) {
        const initial = new URLSearchParams(location.search).get('cat') || 'all';
        filters.innerHTML = window.CATEGORIES.map(c => `<button class="chip" aria-pressed="${c.id === initial}" data-cat="${c.id}">${esc(c.label)}</button>`).join('');
        filters.addEventListener('click', e => {
          const b = e.target.closest('[data-cat]'); if (!b) return;
          $$('[data-cat]', filters).forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          render(b.dataset.cat);
          history.replaceState(null, '', b.dataset.cat === 'all' ? location.pathname : `?cat=${b.dataset.cat}`);
        });
        render(initial);
      } else render('all');
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-open-product]');
      if (b) { e.preventDefault(); openSheet(b.dataset.openProduct); return; }
      const card = e.target.closest('.product-card');
      if (card && !e.target.closest('a,button')) openSheet(card.dataset.product);
    });
    // deep link: shop.html#product-id
    if (location.hash && product(location.hash.slice(1))) openSheet(location.hash.slice(1));
  }

  /* ---------- product sheet ---------- */
  let sheet;
  function openSheet(id) {
    const p = product(id); if (!p) return;
    if (!sheet) {
      sheet = el(`<div class="sheet" role="dialog" aria-modal="true" aria-label="Product">
        <div class="sheet__scrim" data-sheet-close></div>
        <div class="sheet__panel"><div class="sheet__handle"></div>
        <button class="icon-btn sheet__close" data-sheet-close aria-label="Close">✕</button>
        <div class="sheet__body"></div></div></div>`);
      document.body.appendChild(sheet);
      sheet.addEventListener('click', e => { if (e.target.closest('[data-sheet-close]')) closeSheet(); });
    }
    const sel = { color: p.colorways[0] || '', size: p.sizes[0] || '', qty: 1 };
    const opts = (label, list, key) => list.length ? `<div class="opts"><div class="opts__label">${label}: <span data-sel="${key}">${esc(sel[key])}</span></div>
      <div class="opts__row">${list.map((o, i) => `<button class="chip" aria-pressed="${i === 0}" data-opt="${key}" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div></div>` : '';
    $('.sheet__body', sheet).innerHTML = `
      <div class="sheet__grid">
        <div>${tileHTML(p)}</div>
        <div>
          ${p.badge ? `<span class="sticker">${esc(p.badge)}</span>` : ''}
          <h2>${esc(p.name)}</h2>
          <div class="price">${money(p.price)} ${p.compareAt ? `<s>${money(p.compareAt)}</s>` : ''}</div>
          <p>${esc(p.blurb)}</p>
          <ul class="details">${p.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
          ${opts('Color', p.colorways, 'color')}
          ${opts('Size', p.sizes, 'size')}
          <div class="sheet__buy">
            <div class="qty"><button data-qty="-1" aria-label="Less">−</button><span data-sel="qty">1</span><button data-qty="1" aria-label="More">+</button></div>
            <button class="btn btn--pink" style="flex:1" data-add>Add to bag <span data-line-total>${money(p.price)}</span></button>
          </div>
          ${isLaunchDay() ? `<p class="muted" style="margin-top:12px">🎁 ${esc(C.surprise.teaser)}</p>` : ''}
        </div>
      </div>`;
    wireImages(sheet);
    $('.sheet__body', sheet).onclick = e => {
      const o = e.target.closest('[data-opt]');
      if (o) { sel[o.dataset.opt] = o.dataset.val; $$(`[data-opt="${o.dataset.opt}"]`, sheet).forEach(x => x.setAttribute('aria-pressed', String(x === o))); $(`[data-sel="${o.dataset.opt}"]`, sheet).textContent = o.dataset.val; }
      const q = e.target.closest('[data-qty]');
      if (q) { sel.qty = Math.min(10, Math.max(1, sel.qty + Number(q.dataset.qty))); $('[data-sel="qty"]', sheet).textContent = sel.qty; $('[data-line-total]', sheet).textContent = money(sel.qty * p.price); }
      if (e.target.closest('[data-add]')) { addToCart(p.id, sel.color, sel.size, sel.qty); closeSheet(); confetti(); openDrawer(); }
    };
    sheet.classList.add('is-open'); document.body.classList.add('sheet-open');
    $('.sheet__panel', sheet).scrollTop = 0;
  }
  function closeSheet() { if (sheet) { sheet.classList.remove('is-open'); document.body.classList.remove('sheet-open'); } }

  /* ---------- cart ---------- */
  const CART_KEY = 'ty-cart', PROMO_KEY = 'ty-promo';
  let cart = store.get(CART_KEY, []);
  const saveCart = () => { store.set(CART_KEY, cart); syncBadges(); };
  const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
  function addToCart(id, color, size, qty) {
    const line = cart.find(l => l.id === id && l.color === color && l.size === size);
    if (line) line.qty = Math.min(10, line.qty + qty); else cart.push({ id, color, size, qty });
    saveCart(); toast('Added to your bag 🛍️');
  }
  function syncBadges() {
    const n = cartCount();
    $$('[data-cart-count]').forEach(b => { b.textContent = n; b.classList.toggle('is-on', n > 0); });
  }
  function promoInfo() {
    const code = (store.get(PROMO_KEY, '') || '').toUpperCase();
    const p = C.promoCodes[code];
    if (!p) return null;
    if (p.launchDayOnly && !isLaunchDay()) return null;
    return { code, ...p };
  }
  function totals() {
    const sub = cart.reduce((s, l) => s + (product(l.id)?.price || 0) * l.qty, 0);
    const promo = promoInfo();
    let discount = 0;
    if (promo?.type === 'percent') discount = Math.round(sub * promo.value) / 100;
    let ship = sub === 0 ? 0 : (sub >= C.freeShippingAt ? 0 : C.flatShipping);
    if (promo?.type === 'shipping') ship = 0;
    return { sub, discount, ship, total: Math.max(0, sub - discount + ship), promo };
  }
  function applyPromo(raw) {
    const code = String(raw || '').trim().toUpperCase();
    if (!code) { store.set(PROMO_KEY, ''); return true; }
    const p = C.promoCodes[code];
    if (!p) { toast('That code is not one of ours 🤔'); return false; }
    if (p.launchDayOnly && !isLaunchDay()) { toast('That code only works on launch day'); return false; }
    store.set(PROMO_KEY, code); toast(`${p.label} applied ✨`); return true;
  }
  function cartLinesHTML() {
    if (!cart.length) return `<div class="empty"><div class="big">🛍️</div><p><strong>Your bag is empty.</strong><br>Let's fix that.</p><a class="btn btn--sm" href="shop.html" data-drawer-close>Shop the drop</a></div>`;
    return cart.map((l, i) => { const p = product(l.id); if (!p) return ''; return `
      <div class="cart-line">
        ${tileHTML(p)}
        <div>
          <p class="cart-line__name">${esc(p.name)}</p>
          <p class="cart-line__opts">${[l.color, l.size].filter(Boolean).map(esc).join(' · ') || '&nbsp;'}</p>
          <div class="qty"><button data-cart-qty="-1" data-i="${i}" aria-label="Less">−</button><span>${l.qty}</span><button data-cart-qty="1" data-i="${i}" aria-label="More">+</button></div>
        </div>
        <div><div class="cart-line__price">${money(p.price * l.qty)}</div><button class="cart-line__remove" data-cart-remove="${i}">Remove</button></div>
      </div>`; }).join('');
  }
  function totalsHTML() {
    const t = totals();
    const left = Math.max(0, C.freeShippingAt - t.sub);
    return `
      <div class="ship-bar">${t.sub >= C.freeShippingAt ? '🎉 You unlocked free shipping!' : `Add ${money(left)} more for free shipping`}
        <div class="ship-bar__track"><div class="ship-bar__fill" style="width:${Math.min(100, t.sub / C.freeShippingAt * 100)}%"></div></div></div>
      <form class="promo" data-promo-form><input type="text" name="code" placeholder="Promo code" value="${esc(t.promo?.code || '')}" aria-label="Promo code" autocomplete="off"><button class="btn btn--sm">Apply</button></form>
      <div class="totals">
        <div><span>Subtotal</span><span>${money(t.sub)}</span></div>
        ${t.discount ? `<div><span>${esc(t.promo.label)}</span><span>−${money(t.discount)}</span></div>` : ''}
        <div><span>Shipping</span><span>${t.ship ? money(t.ship) : 'Free'}</span></div>
        <div class="grand"><span>Total</span><span>${money(t.total)}</span></div>
      </div>`;
  }
  let drawer;
  function openDrawer() {
    if (!drawer) {
      drawer = el(`<div class="drawer" role="dialog" aria-modal="true" aria-label="Your bag">
        <div class="drawer__scrim" data-drawer-close></div>
        <div class="drawer__panel">
          <div class="drawer__head"><h2>Your bag <span class="muted" data-drawer-count></span></h2><button class="icon-btn" data-drawer-close aria-label="Close">✕</button></div>
          <div class="drawer__body" data-drawer-body></div>
          <div class="drawer__foot" data-drawer-foot></div>
        </div></div>`);
      document.body.appendChild(drawer);
      drawer.addEventListener('click', e => {
        if (e.target.closest('[data-drawer-close]')) closeDrawer();
        const q = e.target.closest('[data-cart-qty]');
        if (q) { const l = cart[q.dataset.i]; l.qty = Math.min(10, Math.max(1, l.qty + Number(q.dataset.cartQty))); saveCart(); renderDrawer(); }
        const r = e.target.closest('[data-cart-remove]');
        if (r) { cart.splice(Number(r.dataset.cartRemove), 1); saveCart(); renderDrawer(); }
      });
      drawer.addEventListener('submit', e => { if (e.target.matches('[data-promo-form]')) { e.preventDefault(); if (applyPromo(e.target.code.value)) renderDrawer(); } });
    }
    renderDrawer();
    drawer.classList.add('is-open'); document.body.classList.add('drawer-open');
  }
  function renderDrawer() {
    if (!drawer) return;
    $('[data-drawer-count]', drawer).textContent = cartCount() ? `(${cartCount()})` : '';
    $('[data-drawer-body]', drawer).innerHTML = cartLinesHTML();
    $('[data-drawer-foot]', drawer).innerHTML = cart.length ? totalsHTML() + `<a class="btn btn--pink btn--block" href="checkout.html">Checkout →</a>` +
      (isLaunchDay() ? `<p class="muted center" style="margin:0;font-size:.9rem">🎁 ${esc(C.surprise.teaser)}</p>` : '') : '';
    wireImages(drawer);
  }
  function closeDrawer() { if (drawer) { drawer.classList.remove('is-open'); document.body.classList.remove('drawer-open'); } }

  /* ---------- delivery: Netlify Forms → JSON endpoint → (caller's fallback) ---------- */
  // Netlify Forms wants application/x-www-form-urlencoded posted to any path on
  // the site, with a form-name field matching a form in the static HTML.
  async function deliver(formName, payload, endpoint) {
    const flat = {};
    Object.entries(payload).forEach(([k, v]) => { flat[k] = (v && typeof v === 'object') ? JSON.stringify(v) : String(v ?? ''); });
    if (C.netlifyForms) {
      try {
        const body = new URLSearchParams({ 'form-name': formName, ...flat }).toString();
        const r = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
        if (r.ok) return true;
      } catch { /* fall through */ }
    }
    if (endpoint) {
      try {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
        if (r.ok) return true;
      } catch { /* fall through */ }
    }
    return false;
  }

  /* ---------- checkout page ---------- */
  function initCheckout() {
    const page = $('[data-checkout]'); if (!page) return;
    const summary = $('[data-checkout-summary]'), form = $('[data-checkout-form]');
    const render = () => {
      summary.innerHTML = cartLinesHTML() + (cart.length ? totalsHTML() : '');
      wireImages(summary);
      $('[data-place-order]', form)?.toggleAttribute('disabled', !cart.length);
    };
    summary.addEventListener('click', e => {
      const q = e.target.closest('[data-cart-qty]');
      if (q) { const l = cart[q.dataset.i]; l.qty = Math.min(10, Math.max(1, l.qty + Number(q.dataset.cartQty))); saveCart(); render(); }
      const r = e.target.closest('[data-cart-remove]');
      if (r) { cart.splice(Number(r.dataset.cartRemove), 1); saveCart(); render(); }
    });
    summary.addEventListener('submit', e => { if (e.target.matches('[data-promo-form]')) { e.preventDefault(); if (applyPromo(e.target.code.value)) render(); } });
    // pre-apply the launch code on launch day if nothing else is set
    if (isLaunchDay() && !promoInfo() && C.promoCodes[C.surprise.code]) store.set(PROMO_KEY, C.surprise.code);
    render();
    document.addEventListener('ty:refresh', render); // single-page previews re-render on navigation

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!cart.length) { toast('Your bag is empty'); return; }
      let ok = true;
      $$('.field', form).forEach(f => {
        const input = $('input,select', f); if (!input) return;
        const bad = input.required && !input.value.trim() || (input.type === 'email' && input.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value));
        f.classList.toggle('is-bad', bad); if (bad) ok = false;
      });
      if (!ok) { $('.field.is-bad input', form)?.focus(); toast('A couple of fields need love'); return; }

      const btn = $('[data-place-order]', form); btn.disabled = true; btn.textContent = 'Placing order…';
      const data = Object.fromEntries(new FormData(form).entries());
      const t = totals();
      const order = {
        id: 'TY-' + Date.now().toString(36).toUpperCase().slice(-6),
        placedAt: new Date().toISOString(),
        launchDay: isLaunchDay(),
        customer: data,
        items: cart.map(l => ({ ...l, name: product(l.id)?.name, price: product(l.id)?.price })),
        promo: t.promo?.code || null,
        subtotal: t.sub, discount: t.discount, shipping: t.ship, total: t.total
      };
      const orders = store.get('ty-orders', []); orders.push(order); store.set('ty-orders', orders);

      const itemsText = order.items.map(i => `${i.qty} x ${i.name}${i.color ? ' (' + [i.color, i.size].filter(Boolean).join(', ') + ')' : ''} @ ${money(i.price)}`).join('\n');
      const delivered = await deliver('order', {
        'order-id': order.id, 'placed-at': order.placedAt, 'launch-day': order.launchDay ? 'yes' : 'no',
        name: data.name, email: data.email, phone: data.phone || '', address: data.address, city: data.city, zip: data.zip, country: data.country, note: data.note || '',
        items: itemsText, promo: order.promo || '', subtotal: money(order.subtotal), discount: money(order.discount), shipping: money(order.shipping), total: money(order.total)
      }, C.orderEndpoint);
      cart = []; store.set(PROMO_KEY, ''); saveCart();
      showConfirmation(order, delivered);
    });
  }
  function showConfirmation(order, delivered) {
    const page = $('[data-checkout]');
    const lines = order.items.map(i => `${i.qty} × ${i.name}${i.color ? ' (' + i.color + (i.size ? ', ' + i.size : '') + ')' : ''}`).join('%0D%0A');
    const mail = `mailto:${encodeURIComponent(C.orderEmail)}?subject=${encodeURIComponent('Order ' + order.id)}&body=${encodeURIComponent(`Order ${order.id}\nName: ${order.customer.name}\nEmail: ${order.customer.email}\nShip to: ${order.customer.address}, ${order.customer.city} ${order.customer.zip}, ${order.customer.country}\n\n`)}${lines}%0D%0A%0D%0ATotal: ${encodeURIComponent(money(order.total))}${order.promo ? '%0D%0APromo: ' + order.promo : ''}`;
    const surprise = order.launchDay ? `
      <div class="surprise mt-3" style="text-align:left">
        <span class="surprise__spark" style="top:6px;right:10px">✨</span><span class="surprise__spark" style="bottom:0;left:14px">🎉</span>
        <div class="surprise__title">${esc(C.surprise.headline)}</div>
        <p style="margin:0">${esc(C.surprise.body)}</p>
      </div>` : '';
    const next = C.paymentLink
      ? `<p>One more step: pay securely and your order is locked in.</p><a class="btn btn--pink btn--block" href="${esc(C.paymentLink)}">Pay ${money(order.total)} →</a>`
      : delivered
        ? `<p>We got it. Bella will send a payment link and confirmation to <strong>${esc(order.customer.email)}</strong> shortly. Nothing has been charged yet.</p>`
        : `<p>Send us your order and we'll reply with a payment link. It's already filled in for you.</p><a class="btn btn--pink btn--block" href="${mail}">Send order email →</a>`;
    page.innerHTML = `<div class="panel order-done">
      <div class="big">📼</div>
      <h2>Order placed!</h2>
      <p>Your order number is</p>
      <div class="order-id">${esc(order.id)}</div>
      <p class="mt-2">Total <strong>${money(order.total)}</strong>${order.promo ? ` · code ${esc(order.promo)} applied` : ''}</p>
      ${next}
      ${surprise}
      <div class="btn-row mt-3" style="justify-content:center"><a class="btn btn--ghost" href="shop.html">Keep shopping</a><a class="btn btn--ghost" href="quiz.html">Take a quiz</a></div>
    </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    confetti(160);
  }

  /* ---------- quizzes ---------- */
  function initQuizzes() {
    const pick = $('[data-quiz-pick]'), stage = $('[data-quiz]');
    if (pick) pick.innerHTML = QUIZZES.map(q => `<button class="card quiz-card" data-start-quiz="${esc(q.id)}"><span class="big">${q.emoji}</span><span><strong style="font-family:var(--display);text-transform:uppercase;font-size:.95rem;display:block">${esc(q.title)}</strong><span class="muted">${q.questions.length} questions · ${esc(q.intro)}</span></span></button>`).join('');
    if (!stage) return;
    document.addEventListener('click', e => { const b = e.target.closest('[data-start-quiz]'); if (b) { e.preventDefault(); runQuiz(b.dataset.startQuiz, stage); } });
    const wanted = new URLSearchParams(location.search).get('q');
    if (wanted && QUIZZES.find(q => q.id === wanted)) runQuiz(wanted, stage);
  }
  function runQuiz(id, stage) {
    const quiz = QUIZZES.find(q => q.id === id); if (!quiz) return;
    const score = {}; let i = 0;
    stage.hidden = false; stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const step = () => {
      const q = quiz.questions[i];
      stage.innerHTML = `<div class="quiz">
        <div class="eyebrow">${quiz.emoji} ${esc(quiz.title)} · ${i + 1}/${quiz.questions.length}</div>
        <div class="quiz__progress"><div style="width:${(i / quiz.questions.length) * 100}%"></div></div>
        <h2 class="quiz__q">${esc(q.q)}</h2>
        <div class="quiz__opts">${q.a.map((a, k) => `<button class="quiz__opt" data-key="${'ABCD'[k]}" data-a="${k}">${esc(a.t)}</button>`).join('')}</div>
        <p class="muted mt-2" style="font-size:.9rem"><button class="cart-line__remove" data-quiz-quit>Quit quiz</button></p>
      </div>`;
      requestAnimationFrame(() => { $('.quiz__progress div', stage).style.width = `${((i + 1) / quiz.questions.length) * 100}%`; });
    };
    stage.onclick = e => {
      if (e.target.closest('[data-quiz-quit]')) { stage.hidden = true; stage.innerHTML = ''; return; }
      const o = e.target.closest('[data-a]'); if (!o) return;
      const a = quiz.questions[i].a[o.dataset.a];
      Object.entries(a.s).forEach(([k, v]) => score[k] = (score[k] || 0) + v);
      i += 1;
      if (i < quiz.questions.length) step(); else finish();
    };
    const finish = () => {
      const key = Object.keys(quiz.results).sort((a, b) => (score[b] || 0) - (score[a] || 0))[0];
      const r = quiz.results[key], p = product(r.product);
      const shareText = `I got "${r.title}" on the ${C.brand} quiz "${quiz.title}" ${r.emoji}`;
      stage.innerHTML = `<div class="quiz quiz__result">
        <div class="big">${r.emoji}</div>
        <div class="eyebrow">Your result</div>
        <h2>${esc(r.title)}</h2>
        <p class="lede">${esc(r.text)}</p>
        ${p ? `<div class="result-product">${tileHTML(p)}<div><div class="eyebrow" style="margin-bottom:6px">Made for you</div><strong style="font-family:var(--display);text-transform:uppercase;font-size:.85rem">${esc(p.name)}</strong><div class="price">${money(p.price)}</div><button class="btn btn--sm btn--pink mt-2" data-open-product="${esc(p.id)}">Add to bag</button></div></div>` : ''}
        <div class="share-row">
          <button class="btn btn--cyan btn--sm" data-share>Share result</button>
          <button class="btn btn--ghost btn--sm" data-start-quiz="${esc(quiz.id)}">Retake</button>
          <a class="btn btn--ghost btn--sm" href="quiz.html">Other quizzes</a>
        </div>
      </div>`;
      wireImages(stage); confetti(120);
      $('[data-share]', stage).addEventListener('click', async () => {
        const url = `${location.origin}${location.pathname.replace(/[^/]*$/, '')}quiz.html?q=${quiz.id}`;
        try {
          if (navigator.share) await navigator.share({ title: C.brand, text: shareText, url });
          else { await navigator.clipboard.writeText(`${shareText} ${url}`); toast('Copied! Paste it anywhere'); }
        } catch { /* user cancelled */ }
      });
    };
    step();
  }

  /* ---------- upcoming products ---------- */
  function initUpcoming() {
    $$('[data-upcoming]').forEach(grid => {
      const votes = store.get('ty-votes', {});
      const limit = Number(grid.dataset.upcomingLimit) || Infinity;
      grid.innerHTML = (window.UPCOMING || []).slice(0, limit).map(u => `
        <article class="card up-card">
          ${tileHTML(u)}
          <div class="card__body">
            <span class="stage">${esc(u.stage)} · ${esc(u.eta)}</span>
            <h3 class="card__title">${esc(u.name)}</h3>
            <p class="card__meta">${esc(u.blurb)}</p>
            <div class="vote">
              <button class="vote__btn ${votes[u.id] ? 'is-on' : ''}" data-vote="${esc(u.id)}">${votes[u.id] ? '♥ Voted' : '♡ Want it'}</button>
              <span class="vote__n" data-vote-n="${esc(u.id)}">${(u.votes + (votes[u.id] ? 1 : 0)).toLocaleString()}</span>
              <button class="cart-line__remove" data-notify="${esc(u.id)}" data-notify-name="${esc(u.name)}">Tell me first</button>
            </div>
          </div>
        </article>`).join('');
      wireImages(grid); initReveal(grid);
      grid.addEventListener('click', e => {
        const v = e.target.closest('[data-vote]');
        if (v) {
          const id = v.dataset.vote, item = window.UPCOMING.find(u => u.id === id);
          votes[id] = !votes[id]; store.set('ty-votes', votes);
          v.classList.toggle('is-on', votes[id]); v.textContent = votes[id] ? '♥ Voted' : '♡ Want it';
          $(`[data-vote-n="${id}"]`, grid).textContent = (item.votes + (votes[id] ? 1 : 0)).toLocaleString();
          if (votes[id]) confetti(40);
        }
        const n = e.target.closest('[data-notify]');
        if (n) {
          const email = prompt(`Where should we send the heads-up for ${n.dataset.notifyName}?`, store.get('ty-email', ''));
          if (email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { signup({ email, list: 'notify', product: n.dataset.notify }); }
          else if (email !== null) toast('That email looks off');
        }
      });
    });
  }

  /* ---------- sign-ups (newsletter, notify me, contact) ---------- */
  async function signup(payload) {
    store.set('ty-email', payload.email);
    const local = store.get('ty-signups', []); local.push({ ...payload, at: new Date().toISOString() }); store.set('ty-signups', local);
    const formName = ['newsletter', 'notify', 'ideas', 'contact'].includes(payload.list) ? payload.list : 'newsletter';
    await deliver(formName, payload, C.signupEndpoint);
    toast(payload.list === 'contact' ? 'Sent! We read every message 💌' : "You're on the list ⚡");
    confetti(60);
  }
  function initForms() {
    $$('form[data-signup]').forEach(f => f.addEventListener('submit', e => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(f).entries());
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || '')) { toast('Add a real email and try again'); $('input[type=email]', f)?.focus(); return; }
      signup({ list: f.dataset.signup, ...data }); f.reset();
    }));
    const faq = $('[data-faq]');
    if (faq && window.FAQ) faq.innerHTML = window.FAQ.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');
  }

  /* ---------- effects ---------- */
  function wireImages(root = document) {
    $$('.tile img, .portrait img', root).forEach(img => {
      if (img.dataset.wired) return; img.dataset.wired = '1';
      const done = () => img.classList.add('is-loaded');
      if (img.complete && img.naturalWidth > 0) done();
      img.addEventListener('load', done);
      img.addEventListener('error', () => img.classList.add('is-failed'));
    });
  }
  function initReveal(root = document) {
    const items = $$('.reveal:not([data-revealed])', root);
    if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries, obs) => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); obs.unobserve(en.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: .05 });
    items.forEach((it, i) => { it.dataset.revealed = '1'; it.style.transitionDelay = `${(i % 4) * 60}ms`; io.observe(it); });
  }
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function confetti(n = 90) {
    if (reduced()) return;
    let cv = $('.confetti');
    if (!cv) { cv = document.createElement('canvas'); cv.className = 'confetti'; document.body.appendChild(cv); }
    const ctx = cv.getContext('2d'); cv.width = innerWidth; cv.height = innerHeight;
    const colors = ['#ff2d95', '#19e6ff', '#fff01f', '#7b2cff', '#ff9d00', '#ffffff'];
    const bits = Array.from({ length: n }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * innerWidth * .5, y: innerHeight * .55, vx: (Math.random() - .5) * 14, vy: -Math.random() * 16 - 6, r: Math.random() * 7 + 4, c: colors[Math.random() * colors.length | 0], a: Math.random() * Math.PI, s: Math.random() > .5 ? 'rect' : 'circle' }));
    let frames = 0;
    (function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      bits.forEach(b => { b.x += b.vx; b.y += b.vy; b.vy += .45; b.a += .1; ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; if (b.s === 'rect') ctx.fillRect(-b.r / 2, -b.r / 2, b.r, b.r * 1.6); else { ctx.beginPath(); ctx.arc(0, 0, b.r / 2, 0, 7); ctx.fill(); } ctx.restore(); });
      if (++frames < 110) requestAnimationFrame(draw); else ctx.clearRect(0, 0, cv.width, cv.height);
    })();
  }

  /* ---------- boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLaunch(); initHeader(); initHero(); initProducts(); initCheckout(); initQuizzes(); initUpcoming(); initForms();
    wireImages(); initReveal(); syncBadges();
    document.addEventListener('click', e => { if (e.target.closest('[data-confetti]')) confetti(); });
  });

  window.TY = { openDrawer, openSheet, addToCart, launchState, confetti, cart: () => cart };
})();
