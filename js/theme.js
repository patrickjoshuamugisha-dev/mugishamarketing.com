/* Mugisha Marketing, Site B2: THEME script. Everything every page shares: smooth scroll, header, reveals, rotating word, FAQ, form, magnetic buttons, phone menu.
   Every part does nothing if its elements are absent. Page scripts (home.js) register with MZ.add(fn); they run in the middle of boot, in the same order the one-file script used. Read THEME.md. */
(function () {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
if (RM) document.documentElement.classList.add('rm');

const MZ = window.MZ = { $, $$, RM, FINE, lenis: null, splitWords: null, hooks: [], booted: false, ok: false };
MZ.add = (fn) => { if (MZ.booted) { if (MZ.ok) fn(MZ); } else MZ.hooks.push(fn); };

function boot() {
if (!window.gsap || !window.ScrollTrigger) { $$('.animated-titles,.animated-texts,[data-reveal]').forEach((e) => e.classList.add('is-ready')); document.documentElement.classList.remove('js'); MZ.booted = true; return; }
gsap.registerPlugin(ScrollTrigger);
MZ.ok = true;

/* ---------- Lenis smooth scroll, as theirs ---------- */
let lenis = null;
if (!RM && window.Lenis) {
  lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
MZ.lenis = lenis;

/* ---------- Header: hides on scroll down, returns on scroll up  ---------- */
(function header() {
  const h = $('.site-header'); if (!h) return;
  let last = Math.max(0, scrollY), hidden = false, ticking = false;
  const move = (hide) => {
    if (hidden === hide) return; hidden = hide;
    if (RM) { h.style.transform = hide ? 'translate3d(0,-110%,0)' : 'none'; return; }
    gsap.to(h, { yPercent: hide ? -110 : 0, duration: hide ? 0.34 : 0.2, ease: hide ? 'power2.out' : 'power3.out', overwrite: 'auto' });
  };
  const upd = () => {
    const y = Math.max(0, scrollY), d = y - last;
    if (y <= 32) move(false); else if (d > 10) move(true); else if (d < -1) move(false);
    h.classList.toggle('is-scrolled', y > 40);
    last = y; ticking = false;
  };
  addEventListener('scroll', () => { if (ticking) return; ticking = true; requestAnimationFrame(upd); }, { passive: true });
  upd();
})();

/* ---------- Word-mask splitter (their SplitText "words" reveal, written for us) ---------- */
function splitWords(el) {
  const words = [];
  const walk = (node) => {
    Array.from(node.childNodes).forEach((n) => {
      if (n.nodeType === 3) {
        const parts = n.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
          const m = document.createElement('span'); m.className = 'wm';
          const w = document.createElement('span'); w.className = 'ww'; w.textContent = p;
          m.appendChild(w); frag.appendChild(m); words.push(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
  };
  walk(el); return words;
}

MZ.splitWords = splitWords;

/* ---------- Header intro: logo, links, button and burger come in one after the other (their timeline). It waits for the two fonts (1.2 s at most). ---------- */
(function headerIntro() {
  const logo = $('.site-header .mark'), items = $$('.site-header .links li'), btn = $('.site-header .nav-r > .btn'), burger = $('.site-header .burger');
  const hdr = [logo, ...items, btn, burger].filter(Boolean);
  if (!hdr.length) return;
  if (RM) { gsap.set(hdr, { opacity: 1, clearProps: 'transform,clipPath' }); return; }
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: true }, delay: 0.08, paused: true });
  if (logo) tl.fromTo(logo, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0);
  if (items.length) tl.fromTo(items, { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.06 }, 0.14);
  if (btn) tl.fromTo(btn, { autoAlpha: 0, y: -14, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.64 }, 0.32);
  if (burger) tl.fromTo(burger, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.64 }, 0.32);
  const fonts = document.fonts ? Promise.race([Promise.all([document.fonts.load('300 40px "IvyPresto Headline"'), document.fonts.load('400 18px "Neue Haas Unica"')]), new Promise((r) => setTimeout(r, 1200))]) : Promise.resolve();
  fonts.then(() => tl.play());
})();

/* ---------- Reveals. Classes (animated-titles / animated-texts / animated-images) and data attributes do the same thing:
   data-reveal="title"  words rise out of a mask
   data-reveal="text"   fade up with a little blur (alias: "fade")
   data-reveal="image"  picture wipes open, then drifts (the <img> inside; add data-pan for the slow pan used in "Who we are")
   data-follows="<selector>" on a wrapper: its data-reveal="text" children wait for that element's title, 0.12 s apart ---------- */
const pick = (cls, ...vals) => $$([cls ? '.' + cls : '', ...vals.map((v) => '[data-reveal="' + v + '"]')].filter(Boolean).join(','));
pick('animated-titles', 'title').forEach((t) => {
  const words = splitWords(t);
  if (RM) { t.classList.add('is-ready'); return; }
  gsap.set(words, { yPercent: 40, opacity: 0, filter: 'blur(3px)' });
  gsap.to(words, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out', stagger: 0.012, scrollTrigger: { trigger: t, start: 'top 82%', toggleActions: 'play none none none' } });
  t.classList.add('is-ready');
});
// a group of texts that follows a title: the home page's "How it works" steps (.how .cols) and any wrapper with data-follows
const followOf = (t) => {
  const g = t.closest('[data-follows]');
  if (g) { const lead = $(g.dataset.follows); return lead ? { lead, items: $$('.animated-texts,[data-reveal="text"],[data-reveal="fade"]', g).filter((e) => e.parentElement === g || e.closest('[data-follows]') === g) } : null; }
  const cols = t.closest('.how .cols');
  return cols ? { lead: $('.how .h2'), items: $$('.col', cols) } : null;
};
pick('animated-texts', 'text', 'fade').forEach((t) => {
  if (t.closest('.hero') || RM) { t.classList.add('is-ready'); return; }
  const f = followOf(t);
  const tw = { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power2.out', scrollTrigger: { trigger: f && f.lead ? f.lead : t, start: f && f.lead ? 'top 82%' : 'top 85%', toggleActions: 'play none none none' } };
  if (f && f.lead) tw.delay = 0.62 + Math.max(0, f.items.indexOf(t)) * 0.12;
  gsap.fromTo(t, { y: 12, opacity: 0, filter: 'blur(2px)' }, tw);
  t.classList.add('is-ready');
});
pick('animated-images', 'image').forEach((w) => {
  const img = $('img', w); if (RM || !img) return;
  if (w.closest('.who') || w.hasAttribute('data-pan')) {
    const rad0 = getComputedStyle(w).borderTopLeftRadius || '0px';
    gsap.set(w, { clipPath: 'inset(0 100% 0 0 round ' + rad0 + ')' });
    gsap.set(img, { objectPosition: '50% 57%' });
    gsap.timeline({ scrollTrigger: { trigger: w, start: 'top 82%', toggleActions: 'play none none none', once: true } })
      .to(w, { clipPath: 'inset(0 0% 0 0 round ' + rad0 + ')', duration: 1.1, ease: 'expo.inOut' }, 0);
    gsap.to(img, { objectPosition: '50% 43%', ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    return;
  }
  const rad = getComputedStyle(w).borderTopLeftRadius || '0px';
  gsap.set(w, { clipPath: 'inset(0 100% 0 0 round ' + rad + ')' });
  gsap.set(img, { scale: 1.12, yPercent: 7 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: w, start: 'top 82%', toggleActions: 'play none none none', once: true } });
  tl.to(w, { clipPath: 'inset(0 0% 0 0 round ' + rad + ')', duration: 1.1, ease: 'expo.inOut' }, 0);
  tl.to(img, { scale: 1.04, duration: 1.35, ease: 'power2.out' }, 0.06);
  gsap.to(img, { yPercent: -7, ease: 'none', scrollTrigger: { trigger: w, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
});

/* ---------- Elementor's "clip" rotating headline: reveal 600ms, hold 1500ms, collapse 600ms; first hold 2500ms ---------- */
$$('.clip-h').forEach((root) => {
  const wrap = $('.clip-w', root); if (!wrap) return;
  if (root.hasAttribute('data-fixed') && matchMedia('(max-width: 640px)').matches) root.removeAttribute('data-fixed');   // phones: the word has its own centred line
  const fixed = root.hasAttribute('data-fixed');
  const words = root.dataset.words.split(',');
  const spans = words.map((w, i) => { const s = document.createElement('span'); s.className = 'clip-t' + (i === 0 ? ' on' : ''); s.textContent = w; wrap.appendChild(s); return s; });
  const wd = () => spans.map((s) => s.offsetWidth);
  let widths = wd(), cur = 0;
  const GAP = 12;   // the bar is 2px wide and sits 10px after the last letter that is showing
  const set = (w) => { if (fixed) wrap.style.setProperty('--w', w + 'px'); else { wrap.style.width = w + 'px'; wrap.style.setProperty('--cw', Math.max(0, w - GAP) + 'px'); } };
  const fit = () => { widths = wd(); if (fixed) wrap.style.width = (Math.max(...widths) + 12) + 'px'; set(widths[cur] + (fixed ? 0 : GAP)); };
  fit();
  addEventListener('resize', fit);
  document.fonts && document.fonts.ready.then(fit);
  if (RM) return;
  let seen = true; new IntersectionObserver((e) => { seen = e[0].isIntersecting; }).observe(root);
  const o = { w: 0 }, pad = fixed ? 0 : GAP, low = fixed ? 0 : 2;
  const collapse = () => {
    if (!seen || document.hidden) { setTimeout(collapse, 600); return; }
    o.w = widths[cur] + pad;
    gsap.to(o, { w: low, duration: 0.6, ease: 'sine.inOut', onUpdate: () => set(o.w), onComplete: () => {
      spans[cur].classList.remove('on'); cur = (cur + 1) % spans.length; spans[cur].classList.add('on');
      gsap.to(o, { w: widths[cur] + pad, duration: 0.6, ease: 'sine.inOut', onUpdate: () => set(o.w), onComplete: () => setTimeout(collapse, 1500) });
    } });
  };
  setTimeout(collapse, 2500 + (root.closest('.hero') ? 1200 : 0));
});

/* ---------- Page scripts (home.js) run here, as in the one-file script: after the reveals and the rotating word, before the FAQ ---------- */
MZ.hooks.forEach((fn) => fn(MZ));
MZ.booted = true;

/* ---------- FAQ (their timings) ---------- */
(function faq() {
  const qas = $$('.qa'); if (!qas.length) return;
  const panel = (q) => $('.a', q), content = (q) => Array.from($('.a', q).children);
  qas.forEach((q) => { const open = q.classList.contains('open'); if (!RM) { gsap.set(panel(q), { height: open ? 'auto' : 0, opacity: open ? 1 : 0 }); gsap.set(content(q), { opacity: open ? 1 : 0, y: open ? 0 : 10 }); } });
  const close = (q) => {
    const b = $('.q', q); q.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); panel(q).setAttribute('inert', '');
    if (RM) return; const p = panel(q), c = content(q); gsap.killTweensOf([p, ...c]);
    gsap.timeline().to(c, { opacity: 0, y: 8, duration: 0.22, ease: 'power2.inOut', overwrite: true }, 0).to(p, { height: 0, opacity: 0, duration: 0.42, ease: 'power2.inOut', overwrite: true }, 0.02);
  };
  const open = (q) => {
    qas.forEach((o) => { if (o !== q && o.classList.contains('open')) close(o); });
    const b = $('.q', q); q.classList.add('open'); b.setAttribute('aria-expanded', 'true'); panel(q).removeAttribute('inert');
    if (RM) { panel(q).style.height = 'auto'; panel(q).style.opacity = 1; return; }
    const p = panel(q), c = content(q); gsap.killTweensOf([p, ...c]); gsap.set(c, { opacity: 0, y: 10 });
    gsap.timeline({ onComplete: () => ScrollTrigger.refresh() }).fromTo(p, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.58, ease: 'power2.out', overwrite: true }, 0).to(c, { opacity: 1, y: 0, duration: 0.46, ease: 'power3.out', stagger: 0.035, overwrite: true }, 0.12);
  };
  qas.forEach((q) => { $('.q', q).addEventListener('click', () => { q.classList.contains('open') ? close(q) : open(q); }); });
})();

/* ---------- Form: every field required ---------- */
(function form() {
  const f = $('.form'); if (!f) return;
  const fields = $$('input[required],textarea[required]', f);
  const check = (el) => { const bad = !el.value.trim() || (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)); el.setAttribute('aria-invalid', bad ? 'true' : 'false'); return !bad; };
  fields.forEach((el) => { el.addEventListener('blur', () => check(el)); el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); }); });
  f.addEventListener('submit', (e) => { let ok = true; fields.forEach((el) => { if (!check(el)) ok = false; }); if (!ok) { e.preventDefault(); const first = fields.find((el) => el.getAttribute('aria-invalid') === 'true'); first && first.focus(); } });
})();

/* ---------- Magnetic buttons (pointer devices only) ---------- */
if (FINE && !RM) {
  $$('.btn:not(.send)').forEach((b) => {
    const xT = gsap.quickTo(b, 'x', { duration: 0.6, ease: 'power3' }), yT = gsap.quickTo(b, 'y', { duration: 0.6, ease: 'power3' });
    b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); xT((e.clientX - r.left - r.width / 2) * 0.22); yT((e.clientY - r.top - r.height / 2) * 0.3); });
    b.addEventListener('pointerleave', () => { xT(0); yT(0); gsap.to(b, { scale: 1, duration: 0.3 }); });
    b.addEventListener('pointerdown', () => gsap.to(b, { scale: 0.96, duration: 0.18, ease: 'power2.out' }));
    b.addEventListener('pointerup', () => gsap.to(b, { scale: 1, duration: 0.35, ease: 'power2.out' }));
  });
}

/* ---------- Small-screen menu ---------- */
(function menu() {
  const b = $('.burger'), m = $('#menu'); if (!b || !m) return;
  const set = (o) => { b.setAttribute('aria-expanded', o); m.classList.toggle('open', o); m.setAttribute('aria-hidden', !o); lenis && (o ? lenis.stop() : lenis.start()); };
  b.addEventListener('click', () => set(b.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { set(false); b.focus(); } });
  $$('a', m).forEach((a) => a.addEventListener('click', () => set(false)));
})();

/* ---------- Anchor links go through Lenis ---------- */
$$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => { const t = $(a.getAttribute('href')); if (!t || a.getAttribute('href') === '#') return; e.preventDefault(); lenis ? lenis.scrollTo(t, { offset: 0 }) : t.scrollIntoView({ behavior: 'smooth' }); }));

addEventListener('load', () => ScrollTrigger.refresh());
document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
