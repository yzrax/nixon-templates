const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

revealElements.forEach((el, i) => {
  el.dataset.delay = (i % 5) * 80;
  revealObserver.observe(el);
});

const topbar = document.getElementById('topbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    topbar.classList.add('scrolled');
  } else {
    topbar.classList.remove('scrolled');
  }
});

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.topbar-link:not(.topbar-link--accent)');
const applyLink = document.querySelector('.topbar-link--accent');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
      if (id === 'apply') {
        applyLink?.classList.add('active');
      } else {
        applyLink?.classList.remove('active');
      }
    }
  });
}, { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' });

sections.forEach(s => sectionObserver.observe(s));

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn?.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    faqItems.forEach(i => {
      i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      i.classList.remove('open');
    });
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      item.classList.add('open');
    }
  });
});

document.getElementById('applyBtn')?.addEventListener('click', () => {
  window.open('staff-apply.html', '_blank');
});

const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.querySelector('.topbar-nav');

menuToggle?.addEventListener('click', () => {
  mobileNav?.classList.toggle('open');
});

const tracker = document.getElementById('scroll-tracker');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? scrollTop / docHeight : 0;
  tracker.style.transform = `scaleX(${progress})`;
  tracker.style.background = `linear-gradient(90deg, var(--accent), var(--accent-light))`;
}, { passive: true });
