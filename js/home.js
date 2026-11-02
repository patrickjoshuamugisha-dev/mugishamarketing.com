/* Mugisha Marketing, Site B2: HOME script. Only the home page: hero intro and M, counters, ring, what-we-do pin, testimonial pull-apart.
   Needs theme.js first. Registered with MZ.add, so it runs inside theme.js boot, in the order the one-file script used. Does nothing if its sections are absent. */
(function () {
'use strict';
if (!window.MZ) return;
MZ.add(function (MZ) {
const { $, $$, RM, splitWords } = MZ;

/* ---------- Hero intro: headline lines and the text under them rise in, and the M wipes open once its first frame is there (their timeline).
   The header's own part is in theme.js. It waits for the two headline and text fonts (1.2 s at most). ---------- */
(function heroIntro() {
  const hero = $('.hero'); if (!hero) return;
  // the wipe runs on the video itself: on its parent the clip made a separate group, the multiply blend had nothing under it, and the box showed pure white until the wipe ended
  const media = $('.hero-m video'), lines = $$('.hero .h1 > span'), sub = $$('.hero .sub > *');
  if (RM) { gsap.set([...lines, ...sub], { opacity: 1, clearProps: 'transform,clipPath' }); if (media) media.style.clipPath = 'none'; return; }
  gsap.set(sub, { opacity: 0 });
  const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: true }, delay: 0.08, paused: true });
  lines.forEach((l, i) => tl.fromTo(l, { autoAlpha: 0, yPercent: 38 }, { autoAlpha: 1, yPercent: 0, duration: 0.9, ease: 'power4.out' }, 0.46 + i * 0.16));
  tl.fromTo(sub, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.72, ease: 'power2.out', stagger: 0.12 }, 0.95);
  const fonts = document.fonts ? Promise.race([Promise.all([document.fonts.load('300 40px "IvyPresto Headline"'), document.fonts.load('400 18px "Neue Haas Unica"')]), new Promise((r) => setTimeout(r, 1200))]) : Promise.resolve();
  fonts.then(() => tl.play());
  if (media) {
    let done = false;
    const wipe = () => { if (done) return; done = true; gsap.fromTo(media, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 1.25, ease: 'expo.inOut', delay: 0.3, onComplete: () => { media.style.clipPath = 'none'; } }); };
    if (media.readyState >= 2) fonts.then(wipe); else { media.addEventListener('loadeddata', () => fonts.then(wipe), { once: true }); setTimeout(() => fonts.then(wipe), 2500); }
  }
})();

/* ---------- The hero video only plays while the hero is on screen (it used to decode, filter and blend all the way down the page) ---------- */
(function pauseVideo() {
  const v = $('.hero-m video'), hero = $('.hero'); if (!v || !hero || !window.IntersectionObserver) return;
  new IntersectionObserver((e) => { if (e[0].isIntersecting) { v.play && v.play().catch(() => {}); } else v.pause(); }).observe(hero);
})();

/* ---------- The M: full size, flush under the header, as it stood when the text was 30px further right (about 21px clear), then 10px further left (round nine, still 3); never past 0, so the video's right edge stays on the window edge ---------- */
(function placeM() {
  const v = $('.hero-m video'), l2 = $('.hero .l2'), wrap = $('.hero .clip-w'); if (!v || !l2 || !wrap) return;
  const SHIFT_TEXT = 30, NUDGE = 10, GAP = 22, STEM = 0.4714;   // the first leg's left edge, as a share of the picture's width (measured in pixels)
  const put = () => {
    if (matchMedia('(max-width: 1024px)').matches) { v.style.transform = ''; return; }
    const hero = $('.hero'), W = hero.clientWidth, H = hero.clientHeight;
    const words = $$('.clip-t', wrap);
    const right = Math.max(...words.map((s) => { const r = document.createRange(); r.selectNodeContents(s.firstChild); return r.getBoundingClientRect().right - s.getBoundingClientRect().left + wrap.getBoundingClientRect().left; }));
    // the picture is 1920 x 1322 once its pixel shape is applied; it covers the hero box, centred
    const k = Math.max(W / 1920, H / 1322), drawW = 1920 * k, stem = (W - drawW) / 2 + STEM * drawW;
    v.style.transform = 'translateX(' + Math.max(0, right + SHIFT_TEXT + GAP - stem - NUDGE).toFixed(1) + 'px)';
  };
  put(); addEventListener('resize', put); document.fonts && document.fonts.ready.then(put); setTimeout(put, 1500);
})();

/* ---------- Counters: businesses count up over 2.5s, ease-out; continents tick 1 to 6, one step about every 0.42s ---------- */
$$('[data-count]').forEach((el) => {
  const end = +el.dataset.count, suf = el.dataset.suffix || '', steps = +el.dataset.steps || 0;
  if (RM) return;
  const o = { v: 0 }; el.textContent = '0' + suf;
  gsap.to(o, { v: end, duration: 2.5, ease: steps ? 'steps(' + steps + ')' : 'power2.out', delay: steps ? 0.5 : 0, onUpdate: () => { el.textContent = Math.round(o.v) + suf; }, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
});

/* ---------- Orbit: a drum of dots that turns and swells as you scroll (our own implementation) ---------- */
(function orbit() {
  const stage = document.getElementById('orbit'), canvas = document.getElementById('orbit-dots');
  if (!stage || !canvas || getComputedStyle(stage.parentElement).display === 'none') return;
  const run = $('.orbit-run', stage), line = $('.orbit-line', stage);
  const COLS = 140, ROWS = 28, RADIUS = 720, DRUM_H = 460, LENS = 1200;
  const BULGE = 98, MID = 1.2, RIM = 0.2;
  // the lattice: every other row is shifted half a column, every other dot is a touch smaller
  const dots = [];
  for (let r = 0; r < ROWS; r++) {
    const v = r / (ROWS - 1), swell = 1 - Math.pow(Math.abs(v - 0.5) * 2, 2);
    const y = (v - 0.5) * DRUM_H, rad = RADIUS + BULGE * swell, size = RIM + (MID - RIM) * swell;
    for (let c = 0; c < COLS; c++) {
      const ang = (c + (r % 2) * 0.5) / COLS * Math.PI * 2;
      dots.push({ x: Math.cos(ang) * rad, y, z: Math.sin(ang) * rad, k: size * ((c + r) % 2 ? 0.85 : 1) });
    }
  }
  // drawn on one canvas, one path and one fill per frame (it used to move about 12,000 SVG attributes per frame); same 1600 x 1000 picture space, fitted like the old viewBox
  const ctx = canvas.getContext('2d'); let cw = 0, ch = 0, dpr = 1;
  const fitCanvas = () => { dpr = Math.min(devicePixelRatio || 1, 2); cw = canvas.clientWidth; ch = canvas.clientHeight; canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr); };
  const pose = { tilt: Math.PI / 2.5 - 0.08, spin: 0, roll: Math.PI - 0.06, zoom: 0.4 };
  // one combined rotation matrix per frame (tilt about x, then spin about y, then roll about z)
  const draw = () => {
    const cx = Math.cos(pose.tilt), sx = Math.sin(pose.tilt), cy = Math.cos(pose.spin), sy = Math.sin(pose.spin), cz = Math.cos(pose.roll), sz = Math.sin(pose.roll);
    const sc = Math.min(cw / 1600, ch / 1000) * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(sc, 0, 0, sc, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#1a1a1a'; ctx.beginPath();
    for (const d of dots) {
      const y1 = d.y * cx - d.z * sx, z1 = d.y * sx + d.z * cx;
      const x2 = d.x * cy + z1 * sy, z2 = z1 * cy - d.x * sy;
      const px = x2 * cz - y1 * sz, py = x2 * sz + y1 * cz;
      const f = LENS / (LENS - z2), X = px * f * pose.zoom, Y = py * f * pose.zoom, R = Math.max(0.35, 2.8 * f * d.k);
      ctx.moveTo(X + R, Y); ctx.arc(X, Y, R, 0, 6.2832);
    }
    ctx.fill();
  };
  fitCanvas(); draw();
  addEventListener('resize', () => { fitCanvas(); draw(); });
  if (RM) return;
  const span = { trigger: run, start: 'top bottom', end: 'bottom top', scrub: 1.2, invalidateOnRefresh: true };
  gsap.to(pose, { spin: -Math.PI * 1.2, zoom: 1.5, ease: 'none', onUpdate: draw, scrollTrigger: span });
  ScrollTrigger.create({ trigger: run, start: 'top top', end: '+=100%', pin: stage, pinSpacing: true, anticipatePin: 1 });
  if (!line) return;
  const bits = splitWords(line).map((w) => { w.parentNode.replaceWith(w); w.classList.add('orbit-word'); return w; });
  gsap.set(bits, { yPercent: 40, opacity: 0, filter: 'blur(3px)' });
  gsap.set(line, { autoAlpha: 0 });
  const intro = gsap.timeline({ paused: true })
    .to(line, { autoAlpha: 1, yPercent: -50, duration: 0.2, ease: 'power2.out' }, 0)
    .to(bits, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.45, stagger: 0.018, ease: 'power3.out' }, 0.02);
  let shown = false;
  ScrollTrigger.create({ trigger: run, start: 'top top', end: '+=100%', invalidateOnRefresh: true,
    onUpdate: (self) => {
      const want = self.progress >= 0.1;
      if (want !== shown) { shown = want; want ? intro.play() : intro.reverse(); }
      if (shown) {
        const gone = Math.max(0, innerHeight - run.getBoundingClientRect().bottom) / innerHeight;
        gsap.set(line, { y: -innerHeight * 0.38 * Math.min(1, gone) });
      }
    },
    onLeaveBack: () => { shown = false; gsap.set(line, { y: 0 }); intro.reverse(); } });
})();

/* ---------- What we do: the title is pinned only until it lines up with the last card; the cards scroll normally, 7.5rem apart.
   The feel of "the next one comes over and pushes the last one out" is a scrubbed parallax: a card rises into place a little faster, and the one leaving steps back and softens. Nothing ever overlaps. ---------- */
(function what() {
  const sec = $('.what'); if (!sec || RM) return;
  const title = $('.what-title', sec), blocks = $$('.what-block', sec);
  const mm = gsap.matchMedia();
  blocks.forEach((b) => {
    const inner = $('.what-in', b), h = $('.what-h', inner), p = $('.what-p', inner), a = $('.btn', inner);
    gsap.timeline({ scrollTrigger: { trigger: b, start: 'top 86%', toggleActions: 'play none none reverse' } })
      .from(h, { yPercent: 30, opacity: 0, duration: 0.9, ease: 'power3.out' })
      .from(p, { y: 24, opacity: 0, duration: 0.72, ease: 'power2.out' }, '-=0.52')
      .from(a, { y: 14, opacity: 0, duration: 0.45, ease: 'power2.out' }, '-=0.42');
  });
  mm.add('(min-width: 1025px)', () => {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const last = blocks[blocks.length - 1];
    const pinTop = () => 15.5 * rem;   // where the title stands while pinned (the section's 8rem padding plus 7.5rem)
    // the title: pinned from where it first sits near the top, released when its top meets the last card's top
    ScrollTrigger.create({ trigger: title, start: () => 'top top+=' + Math.round(pinTop()), endTrigger: last, end: () => 'top top+=' + Math.round(pinTop()), pin: title, pinSpacing: false, invalidateOnRefresh: true });
    blocks.forEach((b, i) => {
      const inner = $('.what-in', b), img = $('.what-photo img', b);
      // arriving: a little extra speed, easing to rest as the card reaches the middle of the window
      gsap.fromTo(inner, { y: 56 }, { y: 0, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'top 42%', scrub: 0.6, invalidateOnRefresh: true } });
      // leaving: steps back and softens as the next card comes up behind it
      if (i < blocks.length - 1) gsap.fromTo(inner, { scale: 1, opacity: 1 }, { scale: 0.95, opacity: 0.35, ease: 'none', immediateRender: false, scrollTrigger: { trigger: b, start: 'bottom 38%', end: 'bottom top+=4%', scrub: 0.6, invalidateOnRefresh: true } });
      if (img) gsap.fromTo(img, { yPercent: -4, scale: 1.1 }, { yPercent: 4, scale: 1.1, ease: 'none', scrollTrigger: { trigger: b, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
    });
    return () => { blocks.forEach((b) => gsap.set($('.what-in', b), { clearProps: 'transform,opacity' })); };
  });
})();

/* ---------- Testimonials: their image-grid curtain (columns part, the call to action opens between) ---------- */
(function curtain() {
  const sec = $('[data-grid]'); if (!sec) return;
  const items = $('.grid-items', sec), L = $('[data-col="left"]', sec), Rr = $('[data-col="right"]', sec), over = $('[data-over]', sec);
  const title = $('h3', over), btn = $('.btn', over), head = $('.clients .clients-head');
  const words = splitWords(title).map((w) => { w.parentNode.replaceWith(w); w.classList.add('w'); return w; });
  if (RM) { over.style.cssText = 'position:relative;top:auto;left:auto;transform:none;opacity:1;margin-top:2rem'; return; }
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1025px)', () => {
    let tl;
    const setup = () => {
      if (tl) { tl.scrollTrigger.kill(); tl.kill(); }
      gsap.set([L, Rr, over, head], { clearProps: 'all' });
      gsap.set(over, { autoAlpha: 0, yPercent: 0, scale: 1 });
      gsap.set(words, { yPercent: 40, opacity: 0, filter: 'blur(3px)' });
      gsap.set(btn, { autoAlpha: 0, y: 18 });
      tl = gsap.timeline({ scrollTrigger: { id: 'grid', trigger: $('.clients'), start: 'top top', end: () => '+=' + Math.round(innerHeight * 0.7), scrub: 0.7, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
      tl.addLabel('go', 0.14);
      tl.to(L, { xPercent: -62, y: () => -(head.offsetHeight + 36) / 2, ease: 'none', duration: 1 }, 'go').to(Rr, { xPercent: 62, y: () => -(head.offsetHeight + 36) / 2, ease: 'none', duration: 1 }, 'go')
        .to(head, { y: () => -(head.offsetHeight + 90), autoAlpha: 0, ease: 'power2.in', duration: 0.5 }, 'go')
        .to(over, { autoAlpha: 1, yPercent: -50, ease: 'power2.out', duration: 0.12 }, 'go+=0.42')
        .to(words, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, stagger: 0.028, ease: 'power3.out' }, 'go+=0.44')
        .to(btn, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 'go+=0.62');
    };
    setup(); ScrollTrigger.addEventListener('refreshInit', setup);
    return () => { ScrollTrigger.removeEventListener('refreshInit', setup); if (tl) { tl.scrollTrigger.kill(); tl.kill(); } gsap.set([L, Rr, over, words, btn, head], { clearProps: 'all' }); };
  });
})();
});
})();
