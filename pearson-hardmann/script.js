const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const navToggle = document.getElementById('navToggle');
const headerNav = document.querySelector('.header-nav');

navToggle?.addEventListener('click', () => {
  if (headerNav.style.display === 'flex') {
    headerNav.style.display = '';
  } else {
    headerNav.style.display = 'flex';
    headerNav.style.flexDirection = 'column';
    headerNav.style.position = 'absolute';
    headerNav.style.top = '64px';
    headerNav.style.left = '0';
    headerNav.style.right = '0';
    headerNav.style.background = 'rgba(245, 241, 234, 0.98)';
    headerNav.style.padding = '20px 32px';
    headerNav.style.backdropFilter = 'blur(12px)';
    headerNav.style.borderBottom = '1px solid var(--border)';
    headerNav.style.gap = '12px';
  }
});

const forms = document.querySelectorAll('.contact-form-side');

forms.forEach(form => {
  const feedback = form.querySelector('.form-feedback');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = 'Thank you. We will review your inquiry and respond within one business day.';
    form.querySelectorAll('input, textarea').forEach(el => el.value = '');
    setTimeout(() => { feedback.textContent = ''; }, 6000);
  });
});
