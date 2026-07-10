const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(11, 18, 31, 0.92)';
    nav.style.borderColor = 'rgba(212, 168, 83, 0.08)';
  } else {
    nav.style.background = 'rgba(11, 18, 31, 0.75)';
    nav.style.borderColor = 'rgba(212, 168, 83, 0.1)';
  }
});

const form = document.querySelector('.contact-form');
const feedback = form?.querySelector('.form-feedback');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  feedback.textContent = 'Thanks for reaching out. We\'ll get back to you within one business day.';
  form.querySelectorAll('input, textarea').forEach(el => el.value = '');

  setTimeout(() => {
    feedback.textContent = '';
  }, 5000);
});
