/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
  .forEach(el => revealObserver.observe(el));

/* ── Header ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile Nav Toggle ── */
const navToggle = document.getElementById('navToggle');
const headerNav = document.querySelector('.header-nav');
navToggle?.addEventListener('click', () => {
  if (headerNav.style.display === 'flex') {
    headerNav.style.display = '';
  } else {
    headerNav.style.display = 'flex';
    headerNav.style.flexDirection = 'column';
    headerNav.style.position = 'absolute';
    headerNav.style.top = '68px';
    headerNav.style.left = '0';
    headerNav.style.right = '0';
    headerNav.style.background = 'rgba(26, 15, 10, 0.98)';
    headerNav.style.padding = '20px 32px';
    headerNav.style.borderBottom = '1px solid rgba(245, 240, 235, 0.06)';
    headerNav.style.gap = '8px';
  }
});

/* ── Scrollytelling Canvas Engine ── */
(function() {
  const canvas = document.getElementById('scrollCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  let progress = 0;
  let particles = [];
  let milkDrops = [];

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = rect.width * window.devicePixelRatio;
    h = canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  resize();
  window.addEventListener('resize', resize);

  /* ── Particles (steam/aroma) ── */
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = h + Math.random() * 40;
      this.size = 2 + Math.random() * 8;
      this.speedY = -(0.3 + Math.random() * 0.8);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = 0.2 + Math.random() * 0.3;
      this.life = Math.random();
    }
    update(progress) {
      const speed = 0.3 + progress * 1.2;
      this.y += this.speedY * speed * 0.8;
      this.x += this.speedX * speed * 0.5;
      this.life += 0.003;
      if (this.y < -20 || this.life > 1) { this.reset(); this.life = 0; }
    }
    draw(ctx) {
      const alpha = this.opacity * (1 - this.life) * (0.3 + progress * 0.6);
      ctx.beginPath();
      ctx.arc(this.x / window.devicePixelRatio, this.y / window.devicePixelRatio,
              this.size * (0.5 + progress * 1.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 240, 235, ${alpha})`;
      ctx.fill();
    }
  }

  /* ── Milk Swirl Drops ── */
  class MilkDrop {
    constructor() { this.reset(); }
    reset() {
      this.x = w * 0.3 + Math.random() * w * 0.4;
      this.y = h * 0.25 + Math.random() * h * 0.15;
      this.radius = 30 + Math.random() * 60;
      this.angle = Math.random() * Math.PI * 2;
      this.speed = 0.002 + Math.random() * 0.004;
      this.opacity = 0.1 + Math.random() * 0.2;
      this.offsetX = (Math.random() - 0.5) * 60;
      this.offsetY = (Math.random() - 0.5) * 40;
    }
    update(progress) {
      this.angle += this.speed * (0.5 + progress * 2);
      this.radius *= 0.998;
      if (this.radius < 5) this.reset();
    }
    draw(ctx) {
      const cx = this.x / window.devicePixelRatio + this.offsetX * progress;
      const cy = this.y / window.devicePixelRatio + this.offsetY * progress;
      const r = this.radius * (1 - progress * 0.4);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const milkAlpha = this.opacity * (0.3 + progress * 0.7);
      grad.addColorStop(0, `rgba(232, 200, 168, ${milkAlpha * 0.8})`);
      grad.addColorStop(0.4, `rgba(200, 168, 130, ${milkAlpha * 0.4})`);
      grad.addColorStop(1, `rgba(200, 168, 130, 0)`);
      ctx.beginPath();
      ctx.ellipse(cx, cy, r, r * 0.8, this.angle, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  /* ── Initialize ── */
  for (let i = 0; i < 60; i++) particles.push(new Particle());
  for (let i = 0; i < 12; i++) milkDrops.push(new MilkDrop());

  /* ── Drawing Functions ── */
  function drawCup(cx, cy, fillLevel) {
    const bw = w * 0.15;
    const bh = h * 0.22;

    ctx.save();

    ctx.beginPath();
    ctx.ellipse(cx, cy - bh * 0.15, bw * 0.85, bh * 0.12, 0, Math.PI, 0);
    ctx.moveTo(cx - bw * 0.85, cy - bh * 0.15);
    ctx.quadraticCurveTo(cx - bw * 0.88, cy - bh * 0.15, cx - bw * 0.82, cy + bh * 0.85);
    ctx.quadraticCurveTo(cx - bw * 0.3, cy + bh * 1.0, cx, cy + bh * 0.95);
    ctx.quadraticCurveTo(cx + bw * 0.3, cy + bh * 1.0, cx + bw * 0.82, cy + bh * 0.85);
    ctx.quadraticCurveTo(cx + bw * 0.88, cy - bh * 0.15, cx + bw * 0.85, cy - bh * 0.15);
    ctx.closePath();
    ctx.strokeStyle = `rgba(200, 168, 130, ${0.2 + 0.3 * fillLevel})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Liquid inside */
    if (fillLevel > 0.02) {
      const lx = cx;
      const ly = cy + bh * 0.85 - bh * 0.65 * Math.min(fillLevel, 0.95);
      const lw = bw * 1.3 * Math.min(fillLevel * 1.5, 1);

      ctx.beginPath();
      ctx.ellipse(lx, ly, lw * 0.7, bh * 0.12, 0, Math.PI, 0);
      const liquidH = (cy + bh * 0.85 - ly);
      for (let row = 0; row < 20; row++) {
        const ry = ly + (liquidH / 20) * row;
        const rw = lw * 0.7 * (1 - (row / 20) * 0.3);
        if (rw < 1) break;
        const t = fillLevel;
        const r = 60 + 40 * t;
        const g = 30 + 20 * t;
        const b = 16 + 10 * t;
        const alpha = 0.5 + 0.5 * (1 - row / 20);
        ctx.beginPath();
        ctx.ellipse(lx, ry, rw, 2, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    }

    /* Saucer */
    if (fillLevel > 0.1) {
      ctx.beginPath();
      ctx.ellipse(cx, cy + bh * 1.05, bw * 1.1, bh * 0.06, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 168, 130, ${0.06 + 0.08 * fillLevel})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(200, 168, 130, ${0.08 + 0.1 * fillLevel})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawLatteArt(cx, cy, progress) {
    if (progress < 0.3) return;
    const pa = (progress - 0.3) / 0.7;

    ctx.save();

    const bh = h * 0.22;
    const bw = w * 0.15;

    /* Rosetta pattern */
    const rosettaX = cx;
    const rosettaY = cy + bh * 0.85 - bh * 0.55;
    const maxSize = bw * 0.45;

    ctx.beginPath();
    for (let i = 0; i < 7; i++) {
      const leafPa = Math.min(pa * 2 - i * 0.12, 1);
      if (leafPa <= 0) continue;
      const leafSize = maxSize * (0.08 + 0.12 * (1 - i / 7));
      const leafAngle = (i - 3) * 0.25;
      const leafY = rosettaY - (i - 3.5) * maxSize * 0.08;
      ctx.save();
      ctx.translate(rosettaX + Math.sin(leafAngle) * maxSize * 0.3 * leafPa, leafY);
      ctx.scale(leafPa, leafPa);
      ctx.beginPath();
      ctx.ellipse(0, 0, leafSize, leafSize * 0.3, leafAngle * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 240, 235, ${0.15 + 0.25 * leafPa})`;
      ctx.fill();
      ctx.restore();
    }

    /* Center line */
    if (pa > 0.1) {
      ctx.beginPath();
      ctx.moveTo(rosettaX, rosettaY - maxSize * 0.5);
      ctx.lineTo(rosettaX, rosettaY + maxSize * 0.5);
      ctx.strokeStyle = `rgba(245, 240, 235, ${0.05 + 0.15 * pa})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawEspressoStream(cx, progress) {
    if (progress > 0.6) return;
    const sp = Math.min(progress * 3, 1);
    const streamY = h * 0.05 + (h * 0.35) * (1 - sp);

    ctx.save();
    for (let i = 0; i < 5; i++) {
      const ox = (i - 2) * 2;
      ctx.beginPath();
      ctx.moveTo(cx + ox, h * 0.02);
      ctx.quadraticCurveTo(cx + ox + Math.sin(i) * 4, streamY + h * 0.05, cx + ox * 0.5, streamY);
      ctx.strokeStyle = `rgba(200, 168, 130, ${0.04 + 0.06 * (1 - sp)})`;
      ctx.lineWidth = 1 + i * 0.3;
      ctx.stroke();
    }

    for (let i = 0; i < 20; i++) {
      const t = Math.random();
      const sx = cx + (t - 0.5) * 20 * (1 - sp);
      const sy = h * 0.02 + (streamY - h * 0.02) * t;
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 168, 130, ${0.02 + 0.04 * (1 - t)})`;
      ctx.fill();
    }

    ctx.restore();
  }

  function drawAmbientGlow(progress) {
    const grd1 = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
    const warm = 0.02 + progress * 0.06;
    grd1.addColorStop(0, `rgba(212, 163, 115, ${warm})`);
    grd1.addColorStop(0.5, `rgba(212, 163, 115, ${warm * 0.4})`);
    grd1.addColorStop(1, `rgba(212, 163, 115, 0)`);
    ctx.fillStyle = grd1;
    ctx.fillRect(0, 0, w / window.devicePixelRatio, h / window.devicePixelRatio);

    const grd2 = ctx.createRadialGradient(w * 0.3, h * 0.8, 0, w * 0.3, h * 0.8, w * 0.5);
    grd2.addColorStop(0, `rgba(60, 34, 24, ${0.1 + 0.2 * progress})`);
    grd2.addColorStop(1, `rgba(60, 34, 24, 0)`);
    ctx.fillStyle = grd2;
    ctx.fillRect(0, 0, w / window.devicePixelRatio, h / window.devicePixelRatio);
  }

  /* ── Main Render Loop ── */
  function render() {
    ctx.clearRect(0, 0, w / window.devicePixelRatio, h / window.devicePixelRatio);

    /* Background */
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h / window.devicePixelRatio);
    const darkPct = 1 - progress * 0.3;
    bgGrad.addColorStop(0, `rgba(${26 * darkPct}, ${15 * darkPct}, ${10 * darkPct}, 1)`);
    bgGrad.addColorStop(1, `rgba(${44 * darkPct}, ${34 * darkPct}, ${24 * darkPct}, 1)`);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w / window.devicePixelRatio, h / window.devicePixelRatio);

    drawAmbientGlow(progress);

    /* Cup center */
    const cx = w * 0.5 / window.devicePixelRatio;
    const cy = h * 0.45 / window.devicePixelRatio;

    drawEspressoStream(cx / window.devicePixelRatio * window.devicePixelRatio, progress);
    drawCup(cx, cy, progress);
    drawLatteArt(cx, cy, progress);

    /* Particles */
    particles.forEach(p => { p.update(progress); p.draw(ctx); });
    milkDrops.forEach(m => { m.update(progress); m.draw(ctx); });

    /* Steam rings at certain progress */
    if (progress > 0.3 && progress < 0.9) {
      const ringProgress = (progress - 0.3) / 0.6;
      const ringR = 20 + ringProgress * 80;
      ctx.beginPath();
      ctx.arc(cx, cy - h * 0.06 / window.devicePixelRatio, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245, 240, 235, ${0.02 * (1 - ringProgress)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    requestAnimationFrame(render);
  }
  render();

  /* ── Scroll Mapping ── */
  const scrollSection = document.getElementById('scrollSection');
  const textOverlays = document.querySelectorAll('.scroll-text');
  if (scrollSection) {
    const updateScroll = () => {
      const rect = scrollSection.getBoundingClientRect();
      const sectionH = rect.height;
      const viewH = window.innerHeight;
      const scrollable = sectionH - viewH;
      if (scrollable <= 0) { progress = 0; return; }
      const scrolled = -rect.top;
      progress = Math.max(0, Math.min(1, scrolled / scrollable));

      /* Update text overlays */
      textOverlays.forEach(el => {
        const start = parseFloat(el.dataset.start || 0);
        const end = parseFloat(el.dataset.end || 1);
        const alpha = Math.max(0, Math.min(1, (progress - start) / (end - start)));
        const opacity = alpha < 0.5 ? alpha * 2 : (1 - alpha) * 2;
        el.style.opacity = Math.max(0, Math.min(1, alpha < 0.1 ? alpha / 0.1 : alpha > 0.9 ? (1 - alpha) / 0.1 : 1));
        el.style.transform = `translateY(${(1 - alpha) * 20}px)`;
      });
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
  }

  /* Expose for debugging */
  window.__scrollyProgress = () => progress;
})();

/* ── Menu Tabs ── */
document.querySelectorAll('.tabs-nav').forEach(nav => {
  const btns = nav.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      contents.forEach(c => c.classList.remove('active'));
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
});

/* ── Menu Hover Previews ── */
(function() {
  const preview = document.getElementById('menuPreview');
  if (!preview) return;
  const items = document.querySelectorAll('.menu-item[data-preview]');
  items.forEach(item => {
    item.addEventListener('mouseenter', (e) => {
      preview.src = item.dataset.preview;
      preview.classList.add('visible');
    });
    item.addEventListener('mousemove', (e) => {
      let x = e.clientX + 20;
      let y = e.clientY - 100;
      if (x + 280 > window.innerWidth) x = e.clientX - 300;
      if (y < 10) y = 10;
      preview.style.left = x + 'px';
      preview.style.top = y + 'px';
    });
    item.addEventListener('mouseleave', () => {
      preview.classList.remove('visible');
    });
  });
})();

/* ── Flavor Widget ── */
(function() {
  const notes = document.querySelectorAll('.flavor-note');
  const result = document.getElementById('flavorResult');
  if (!notes.length || !result) return;
  const blends = {
    fruity: 'Bright & Fruity — A light roast from Ethiopia with bergamot, blueberry, and honey tones. Perfect for pour-over.',
    nutty: 'Smooth & Nutty — A medium roast from Colombia with almond, caramel, and milk chocolate notes. Ideal for espresso.',
    chocolatey: 'Rich & Chocolatey — A dark roast from Guatemala with cacao, brown sugar, and dried cherry. Full-bodied and bold.',
    floral: 'Delicate & Floral — A light roast from Kenya with jasmine, blackcurrant, and citrus. Exceptionally aromatic.',
    spicy: 'Warm & Spicy — A medium-dark roast from Sumatra with clove, cedar, and dark fruit. Complex and earthy.',
    earthy: 'Deep & Earthy — A dark roast from Java with leather, tobacco, and dark chocolate. Classic and commanding.'
  };
  notes.forEach(note => {
    note.addEventListener('click', () => {
      notes.forEach(n => n.classList.remove('active'));
      note.classList.add('active');
      const flavor = note.dataset.flavor;
      result.innerHTML = `<p>${blends[flavor] || 'Select a flavor note to discover your perfect blend.'}</p>`;
    });
  });
})();

/* ── Forms ── */
document.querySelectorAll('.contact-form-side, .booking-form').forEach(form => {
  const feedback = form.querySelector('.form-feedback');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (feedback) {
      feedback.textContent = 'Thank you. We will confirm your inquiry within 24 hours.';
    }
    form.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
    if (feedback) {
      setTimeout(() => { feedback.textContent = ''; }, 6000);
    }
  });
});
