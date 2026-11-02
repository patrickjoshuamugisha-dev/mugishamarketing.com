/* The globe in the black box: the same cobe globe as the live site (light sphere, dark land dots, our client places in blue, drag to spin), cut by the panel. */
import createGlobe from '/vendor/cobe.js';
const box = document.querySelector('.proof-globe');
if (box) {
  const canvas = box.querySelector('canvas'), over = box.querySelector('.marks'), ctx = over.getContext('2d');
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let onScreen = false, REM = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16, globe = null, phi = 4.35, grabAt = null, moved = 0, r = 0, near = false, W = 0, dpr = 1;
  const theta = 0.3;
  const PLACES = [[55.6761, 12.5683], [40.4168, -3.7038], [40.7128, -74.006], [34.0522, -118.2437], [8.9824, -79.5199], [14.7167, -17.4677], [30.0444, 31.2357], [-1.9441, 30.0619], [31.2304, 121.4737], [13.7563, 100.5018], [28.6139, 77.209], [-36.8485, 174.7633]];
  const ball = ([lat, lon]) => { const a = lat * Math.PI / 180, o = lon * Math.PI / 180 - Math.PI, c = Math.cos(a); return [-c * Math.cos(o), Math.sin(a), c * Math.sin(o)]; };
  const turn = (q, P) => { const c = Math.cos(theta), d = Math.cos(P), e = Math.sin(theta), f = Math.sin(P); return [q[0] * d + q[2] * f, q[0] * f * e + q[1] * c - q[2] * d * e, -q[0] * f * c + q[1] * e + q[2] * d * c]; };
  const pts = PLACES.map(ball);
  const S = (q) => [W / 2 * (1 + 0.8 * q[0]), W / 2 * (1 - 0.8 * q[1])];
  const INK = '26,26,26', CREAM = '247,245,246';
  const rgba = (c, a) => 'rgba(' + c + ',' + Math.max(0, a).toFixed(3) + ')';
  const KIND = 'A';
  // the client places, drawn in the page's own two colours (soft black and warm white): no blue
  const mark = (x, y, a, i, t, rem) => {
    const slow = (t + i * 0.83) % 4.2 / 4.2, wave = 0.5 - 0.5 * Math.cos(slow * 6.2832);
    if (KIND === 'A') {   // soft black dot, a thin warm-white ring around it, and a slow outer ring that opens and fades
      const r0 = 0.34 * rem, ph = slow, ease = 1 - Math.pow(1 - ph, 2);
      ctx.beginPath(); ctx.arc(x, y, r0 + 0.16 * rem + ease * 1.3 * rem, 0, 7); ctx.lineWidth = 1.2; ctx.strokeStyle = rgba(INK, 0.5 * a * (1 - ph)); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, r0 + 0.26 * rem, 0, 7); ctx.lineWidth = 1.8; ctx.strokeStyle = rgba(CREAM, 0.95 * a); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, r0, 0, 7); ctx.fillStyle = rgba(INK, a); ctx.fill();
    } else if (KIND === 'B') {   // small cream marker with a soft black edge and a slow breathing shadow
      const r0 = 0.25 * rem, gr = r0 * (2.1 + 1.3 * wave), g = ctx.createRadialGradient(x, y, r0 * 0.6, x, y, gr);
      g.addColorStop(0, rgba(INK, (0.3 - 0.12 * wave) * a)); g.addColorStop(1, rgba(INK, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, gr, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r0, 0, 7); ctx.fillStyle = rgba(CREAM, a); ctx.fill(); ctx.lineWidth = 1.5; ctx.strokeStyle = rgba(INK, 0.9 * a); ctx.stroke();
    } else {   // C: a city tick, a fine line standing on the place with a small bead on top and a flat ring at its foot
      const h = (1.05 + 0.08 * wave) * rem;
      ctx.beginPath(); ctx.ellipse(x, y, 0.42 * rem, 0.16 * rem, 0, 0, 7); ctx.lineWidth = 1; ctx.strokeStyle = rgba(INK, 0.55 * a); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y - h); ctx.lineWidth = 1.3; ctx.strokeStyle = rgba(INK, 0.9 * a); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y - h, 0.17 * rem, 0, 7); ctx.fillStyle = rgba(CREAM, a); ctx.fill(); ctx.lineWidth = 1.3; ctx.strokeStyle = rgba(INK, a); ctx.stroke();
      ctx.beginPath(); ctx.arc(x, y, 0.07 * rem, 0, 7); ctx.fillStyle = rgba(INK, a); ctx.fill();
    }
  };
  const draw = (P) => {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, W);
    const rem = REM, t = calm ? (window.__T || 0) : performance.now() / 1000;
    pts.forEach((p, i) => {
      const c = turn(p, P), a = Math.max(0, Math.min(1, (c[2] - 0.05) * 5)); if (a <= 0) return;
      const [x, y] = S(c); mark(x, y, a, i, t, rem);
    });
  };
  const build = () => {
    if (globe) globe.destroy();
    if (!near) { globe = null; return; }
    W = box.clientWidth; dpr = Math.min(devicePixelRatio || 1, 1.5);
    over.width = W * dpr; over.height = W * dpr;
    globe = createGlobe(canvas, { devicePixelRatio: dpr, width: W * dpr, height: W * dpr, phi, theta, dark: 0, diffuse: 0.3, mapSamples: 16000, mapBrightness: 1, baseColor: [0.9, 0.885, 0.87], markerColor: [21 / 255, 93 / 255, 193 / 255], glowColor: [0.38, 0.36, 0.34], markers: [],
      onRender: (state) => { if (grabAt === null && !calm) phi += 0.004; state.phi = phi + r; draw(phi + r); } });
    if (globe.toggle) globe.toggle(onScreen);
    requestAnimationFrame(() => canvas.classList.add('on'));
  };
  const grab = (x) => { grabAt = x; canvas.style.cursor = x === null ? 'grab' : 'grabbing'; };
  canvas.addEventListener('pointerdown', (e) => grab(e.clientX - moved));
  canvas.addEventListener('pointerup', () => grab(null));
  canvas.addEventListener('pointerout', () => grab(null));
  canvas.addEventListener('pointermove', (e) => { if (grabAt !== null) { moved = e.clientX - grabAt; r = moved / 200; } });
  new IntersectionObserver((e) => { near = e[0].isIntersecting; if (near && !globe) build(); if (!near && globe) { globe.destroy(); globe = null; canvas.classList.remove('on'); ctx.clearRect(0, 0, over.width, over.height); } }, { rootMargin: '300px 0px' }).observe(box);
  // inside that margin the globe is built but only draws while it is really on screen
  new IntersectionObserver((e) => { onScreen = e[0].isIntersecting; if (globe && globe.toggle) globe.toggle(onScreen); }).observe(box);
  addEventListener('resize', () => { REM = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16; if (globe) build(); });
}
